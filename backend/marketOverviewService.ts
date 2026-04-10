import YahooFinance from "yahoo-finance2";
import type { MarketOverviewResponse } from "./contracts";

const DEFAULT_CACHE_TTL_MS = readPositiveInteger(
  process.env.MARKET_OVERVIEW_CACHE_TTL_MS,
  90_000,
);
const DEFAULT_TIMEOUT_MS = readPositiveInteger(
  process.env.MARKET_OVERVIEW_TIMEOUT_MS,
  8_000,
);
const DEFAULT_ACTIVE_SAMPLE_SIZE = 25;

const INDEX_CONFIG = [
  { symbol: "^GSPC", code: "SPX", nameKey: "index.sp500.name" },
  { symbol: "^DJI", code: "DJI", nameKey: "index.dow.name" },
  { symbol: "^IXIC", code: "IXIC", nameKey: "index.nasdaqComposite.name" },
  { symbol: "^RUT", code: "RUT", nameKey: "index.russell2000.name" },
  { symbol: "^VIX", code: "VIX", nameKey: "index.vix.name" },
] as const;

const WATCHLIST_CONFIG = [
  { ticker: "NVDA", nameKey: "company.nvda", group: "AI" as const },
  { ticker: "MSFT", nameKey: "company.msft", group: "Core" as const },
  { ticker: "AAPL", nameKey: "company.aapl", group: "Core" as const },
] as const;

const STATIC_MACRO_EVENTS: MarketOverviewResponse["macroEvents"] = [
  {
    id: "cpi-us",
    titleKey: "macro.usCpi",
    time: "20:30",
    market: "US",
    importance: "high",
    dayLabel: "today",
  },
  {
    id: "fomc-minutes",
    titleKey: "macro.fomcMinutes",
    time: "02:00",
    market: "US",
    importance: "high",
    dayLabel: "thisWeek",
  },
  {
    id: "ppi-us",
    titleKey: "macro.usPpi",
    time: "20:30",
    market: "US",
    importance: "medium",
    dayLabel: "today",
  },
  {
    id: "jobless-claims",
    titleKey: "macro.usJoblessClaims",
    time: "20:30",
    market: "US",
    importance: "medium",
    dayLabel: "thisWeek",
  },
];

const RECENT_SYMBOLS = WATCHLIST_CONFIG.map((item) => item.ticker);

type MarketState = "REGULAR" | "CLOSED" | "PRE" | "PREPRE" | "POST" | "POSTPOST";

export interface YahooQuoteLike {
  symbol: string;
  exchange?: string;
  fullExchangeName?: string;
  marketState?: string;
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  regularMarketVolume?: number;
  volume?: number;
}

export interface YahooScreenerQuoteLike {
  symbol: string;
  marketState?: string;
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  regularMarketVolume?: number;
}

export interface YahooMarketDataClient {
  getQuotes(symbols: string[], signal: AbortSignal): Promise<Record<string, YahooQuoteLike | undefined>>;
  getMostActives(count: number, signal: AbortSignal): Promise<YahooScreenerQuoteLike[]>;
}

export interface MarketOverviewService {
  getMarketOverview(): Promise<MarketOverviewResponse>;
}

export class MarketOverviewUnavailableError extends Error {
  statusCode = 502 as const;
  cause: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "MarketOverviewUnavailableError";
    this.cause = cause;
  }
}

interface CachedOverview {
  expiresAt: number;
  value: MarketOverviewResponse;
}

interface YahooMarketOverviewServiceOptions {
  client?: YahooMarketDataClient;
  cacheTtlMs?: number;
  timeoutMs?: number;
  activeSampleSize?: number;
  now?: () => number;
}

export class YahooMarketOverviewService implements MarketOverviewService {
  private readonly client: YahooMarketDataClient;
  private readonly cacheTtlMs: number;
  private readonly timeoutMs: number;
  private readonly activeSampleSize: number;
  private readonly now: () => number;
  private cache: CachedOverview | null = null;
  private inFlightRefresh: Promise<MarketOverviewResponse> | null = null;

  constructor({
    client = createYahooMarketDataClient(),
    cacheTtlMs = DEFAULT_CACHE_TTL_MS,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    activeSampleSize = DEFAULT_ACTIVE_SAMPLE_SIZE,
    now = Date.now,
  }: YahooMarketOverviewServiceOptions = {}) {
    this.client = client;
    this.cacheTtlMs = cacheTtlMs;
    this.timeoutMs = timeoutMs;
    this.activeSampleSize = activeSampleSize;
    this.now = now;
  }

  async getMarketOverview(): Promise<MarketOverviewResponse> {
    const currentTime = this.now();

    if (this.cache && currentTime < this.cache.expiresAt) {
      return this.cache.value;
    }

    if (!this.inFlightRefresh) {
      this.inFlightRefresh = this.refreshOverview();
    }

    try {
      return await this.inFlightRefresh;
    } catch (error) {
      if (this.cache) {
        return this.cache.value;
      }

      const reason = error instanceof Error ? error.message : "unknown Yahoo Finance error";
      throw new MarketOverviewUnavailableError(
        `Failed to load market overview from Yahoo Finance: ${reason}`,
        error,
      );
    } finally {
      this.inFlightRefresh = null;
    }
  }

  private async refreshOverview(): Promise<MarketOverviewResponse> {
    const overview = await withAbortTimeout(this.timeoutMs, async (signal) => {
      const [indexQuotes, watchlistQuotes, mostActiveQuotes] = await Promise.all([
        this.client.getQuotes(
          INDEX_CONFIG.map((item) => item.symbol),
          signal,
        ),
        this.client.getQuotes(
          WATCHLIST_CONFIG.map((item) => item.ticker),
          signal,
        ),
        this.client.getMostActives(this.activeSampleSize, signal),
      ]);

      return {
        watchlist: WATCHLIST_CONFIG.map((item) => {
          const quote = watchlistQuotes[item.ticker];

          if (!quote) {
            throw new Error(`Missing Yahoo quote for ${item.ticker}`);
          }

          return {
            ticker: item.ticker,
            nameKey: item.nameKey,
            market: resolveMarketLabel(quote),
            group: item.group,
            price: requireNumber(quote.regularMarketPrice, `${item.ticker} regularMarketPrice`),
            change: requireNumber(quote.regularMarketChange, `${item.ticker} regularMarketChange`),
            changePercent: requireNumber(
              quote.regularMarketChangePercent,
              `${item.ticker} regularMarketChangePercent`,
            ),
          };
        }),
        marketIndexes: INDEX_CONFIG.map((item) => {
          const quote = indexQuotes[item.symbol];

          if (!quote) {
            throw new Error(`Missing Yahoo quote for ${item.symbol}`);
          }

          const change = requireNumber(quote.regularMarketChange, `${item.symbol} regularMarketChange`);

          return {
            code: item.code,
            nameKey: item.nameKey,
            region: "US",
            value: requireNumber(quote.regularMarketPrice, `${item.symbol} regularMarketPrice`),
            change,
            changePercent: requireNumber(
              quote.regularMarketChangePercent,
              `${item.symbol} regularMarketChangePercent`,
            ),
            sessionLabelKey: resolveSessionLabelKey(quote.marketState, change),
          };
        }),
        macroEvents: STATIC_MACRO_EVENTS,
        marketPulse: buildMarketPulse(mostActiveQuotes),
        recentSymbols: [...RECENT_SYMBOLS],
      };
    });

    this.cache = {
      value: overview,
      expiresAt: this.now() + this.cacheTtlMs,
    };

    return overview;
  }
}

export const defaultMarketOverviewService = new YahooMarketOverviewService();

export function createYahooMarketDataClient(
  yahooFinance = new YahooFinance(),
): YahooMarketDataClient {
  return {
    async getQuotes(symbols, signal) {
      const response = await yahooFinance.quote(
        symbols,
        { return: "object" },
        { fetchOptions: { signal } },
      );

      return response as Record<string, YahooQuoteLike | undefined>;
    },
    async getMostActives(count, signal) {
      const response = await yahooFinance.screener(
        {
          scrIds: "most_actives",
          count,
          lang: "en-US",
          region: "US",
        },
        undefined,
        { fetchOptions: { signal } },
      );

      return response.quotes as YahooScreenerQuoteLike[];
    },
  };
}

function buildMarketPulse(quotes: YahooScreenerQuoteLike[]): MarketOverviewResponse["marketPulse"] {
  const usableQuotes = quotes.filter((quote) => {
    return (
      typeof quote.regularMarketPrice === "number" &&
      typeof quote.regularMarketChangePercent === "number"
    );
  });

  const advancers = usableQuotes.filter((quote) => {
    return (quote.regularMarketChangePercent ?? 0) > 0;
  }).length;
  const decliners = usableQuotes.filter((quote) => {
    return (quote.regularMarketChangePercent ?? 0) < 0;
  }).length;
  const turnover = usableQuotes.reduce((total, quote) => {
    const price = quote.regularMarketPrice ?? 0;
    const volume = quote.regularMarketVolume ?? 0;
    return total + price * volume;
  }, 0);

  return {
    advancers,
    decliners,
    turnover: formatUsdCompact(turnover),
    riskMoodKey: resolveRiskMoodKey(advancers, decliners),
    hotThemeKey: "market.hotThemeCompute",
  };
}

function resolveSessionLabelKey(marketState: string | undefined, change: number): string {
  switch (marketState as MarketState | undefined) {
    case "REGULAR":
      return change >= 0 ? "index.session.usRegularUp" : "index.session.usRegularDown";
    case "PRE":
    case "PREPRE":
      return "index.session.usPreMarket";
    case "POST":
    case "POSTPOST":
      return "index.session.usAfterHours";
    case "CLOSED":
    default:
      return "index.session.usClosed";
  }
}

function resolveRiskMoodKey(advancers: number, decliners: number): string {
  if (advancers === 0 && decliners === 0) {
    return "market.riskBalanced";
  }

  if (advancers >= decliners * 1.2) {
    return "market.riskPositive";
  }

  if (decliners >= advancers * 1.2) {
    return "market.riskCautious";
  }

  return "market.riskBalanced";
}

function resolveMarketLabel(quote: YahooQuoteLike): string {
  const exchangeName = quote.fullExchangeName ?? quote.exchange ?? "US";
  const normalized = exchangeName.toUpperCase();

  if (normalized.includes("NASDAQ")) {
    return "NASDAQ";
  }

  if (normalized.includes("NYSE")) {
    return "NYSE";
  }

  if (normalized.includes("CBOE")) {
    return "CBOE";
  }

  return exchangeName;
}

function requireNumber(value: number | undefined, fieldName: string): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`Yahoo Finance did not return ${fieldName}`);
  }

  return value;
}

function formatUsdCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

async function withAbortTimeout<T>(
  timeoutMs: number,
  operation: (signal: AbortSignal) => Promise<T>,
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(new Error(`Yahoo Finance request timed out after ${timeoutMs}ms`));
  }, timeoutMs);

  try {
    return await operation(controller.signal);
  } finally {
    clearTimeout(timeoutId);
  }
}

function readPositiveInteger(rawValue: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(rawValue ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
