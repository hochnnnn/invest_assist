// @vitest-environment node

import { describe, expect, it, vi } from "vitest";
import {
  MarketOverviewUnavailableError,
  YahooMarketOverviewService,
  type YahooMarketDataClient,
  type YahooQuoteLike,
  type YahooScreenerQuoteLike,
} from "./marketOverviewService";

function buildService({
  indexQuotes = {},
  watchlistQuotes = {},
  mostActiveQuotes = [],
  cacheTtlMs = 60_000,
  now = () => 1_000_000,
}: {
  indexQuotes?: Record<string, YahooQuoteLike>;
  watchlistQuotes?: Record<string, YahooQuoteLike>;
  mostActiveQuotes?: YahooScreenerQuoteLike[];
  cacheTtlMs?: number;
  now?: () => number;
}) {
  const client: YahooMarketDataClient = {
    getQuotes: vi.fn(async (symbols: string[]) => {
      return symbols[0]?.startsWith("^") ? indexQuotes : watchlistQuotes;
    }),
    getMostActives: vi.fn(async () => mostActiveQuotes),
  };

  const service = new YahooMarketOverviewService({
    client,
    cacheTtlMs,
    timeoutMs: 500,
    now,
  });

  return {
    client,
    service,
  };
}

describe("YahooMarketOverviewService", () => {
  it("normalizes Yahoo quotes into the market overview response", async () => {
    const { service } = buildService({
      indexQuotes: {
        "^GSPC": buildQuote("^GSPC", {
          fullExchangeName: "SNP",
          marketState: "REGULAR",
          regularMarketPrice: 5300.12,
          regularMarketChange: 21.35,
          regularMarketChangePercent: 0.4,
        }),
        "^DJI": buildQuote("^DJI", {
          fullExchangeName: "DJI",
          marketState: "REGULAR",
          regularMarketPrice: 40000.55,
          regularMarketChange: -45.22,
          regularMarketChangePercent: -0.11,
        }),
        "^IXIC": buildQuote("^IXIC", {
          fullExchangeName: "Nasdaq GIDS",
          marketState: "PRE",
          regularMarketPrice: 16654.21,
          regularMarketChange: 88.42,
          regularMarketChangePercent: 0.53,
        }),
        "^RUT": buildQuote("^RUT", {
          fullExchangeName: "Russell",
          marketState: "POST",
          regularMarketPrice: 2110.33,
          regularMarketChange: 10.15,
          regularMarketChangePercent: 0.48,
        }),
        "^VIX": buildQuote("^VIX", {
          fullExchangeName: "CBOE",
          marketState: "CLOSED",
          regularMarketPrice: 16.8,
          regularMarketChange: -0.65,
          regularMarketChangePercent: -3.73,
        }),
      },
      watchlistQuotes: {
        NVDA: buildQuote("NVDA", {
          fullExchangeName: "NasdaqGS",
          regularMarketPrice: 910.1,
          regularMarketChange: 12.4,
          regularMarketChangePercent: 1.38,
        }),
        MSFT: buildQuote("MSFT", {
          fullExchangeName: "NasdaqGS",
          regularMarketPrice: 428.2,
          regularMarketChange: -3.1,
          regularMarketChangePercent: -0.72,
        }),
        AAPL: buildQuote("AAPL", {
          fullExchangeName: "NasdaqGS",
          regularMarketPrice: 202.4,
          regularMarketChange: 1.2,
          regularMarketChangePercent: 0.6,
        }),
      },
      mostActiveQuotes: [
        {
          symbol: "A",
          regularMarketPrice: 100,
          regularMarketChangePercent: 1.2,
          regularMarketVolume: 2_000_000,
        },
        {
          symbol: "B",
          regularMarketPrice: 50,
          regularMarketChangePercent: -0.5,
          regularMarketVolume: 3_000_000,
        },
        {
          symbol: "C",
          regularMarketPrice: 25,
          regularMarketChangePercent: 2.4,
          regularMarketVolume: 4_000_000,
        },
      ],
    });

    const overview = await service.getMarketOverview();

    expect(overview.watchlist.map((item) => item.ticker)).toEqual(["NVDA", "MSFT", "AAPL"]);
    expect(overview.watchlist[0]).toMatchObject({
      ticker: "NVDA",
      market: "NASDAQ",
      price: 910.1,
      changePercent: 1.38,
    });
    expect(overview.marketIndexes.map((index) => index.code)).toEqual([
      "SPX",
      "DJI",
      "IXIC",
      "RUT",
      "VIX",
    ]);
    expect(overview.marketIndexes.map((index) => index.sessionLabelKey)).toEqual([
      "index.session.usRegularUp",
      "index.session.usRegularDown",
      "index.session.usPreMarket",
      "index.session.usAfterHours",
      "index.session.usClosed",
    ]);
    expect(overview.marketPulse.advancers).toBe(2);
    expect(overview.marketPulse.decliners).toBe(1);
    expect(overview.marketPulse.riskMoodKey).toBe("market.riskPositive");
    expect(overview.marketPulse.turnover).toMatch(/^\$/);
    expect(overview.marketPulse.hotThemeKey).toBe("market.hotThemeCompute");
    expect(overview.macroEvents.every((event) => event.market === "US")).toBe(true);
    expect(overview.recentSymbols).toEqual(["NVDA", "MSFT", "AAPL"]);
  });

  it("serves fresh cache entries without re-fetching Yahoo data", async () => {
    let currentTime = 1_000_000;
    const { client, service } = buildService({
      now: () => currentTime,
      indexQuotes: buildIndexQuoteMap(),
      watchlistQuotes: buildWatchlistQuoteMap(),
      mostActiveQuotes: buildMostActiveQuotes(),
    });

    const first = await service.getMarketOverview();
    currentTime += 10_000;
    const second = await service.getMarketOverview();

    expect(second).toBe(first);
    expect(client.getQuotes).toHaveBeenCalledTimes(2);
    expect(client.getMostActives).toHaveBeenCalledTimes(1);
  });

  it("returns the last successful snapshot when a refresh fails after cache expiry", async () => {
    let currentTime = 1_000_000;
    const { client, service } = buildService({
      cacheTtlMs: 100,
      now: () => currentTime,
      indexQuotes: buildIndexQuoteMap(),
      watchlistQuotes: buildWatchlistQuoteMap(),
      mostActiveQuotes: buildMostActiveQuotes(),
    });

    const first = await service.getMarketOverview();

    currentTime += 101;
    vi.mocked(client.getQuotes).mockRejectedValueOnce(new Error("Yahoo quote failure"));

    const fallback = await service.getMarketOverview();

    expect(fallback).toBe(first);
  });

  it("throws a 502-style error when the first Yahoo refresh fails", async () => {
    const client: YahooMarketDataClient = {
      getQuotes: vi.fn(async () => {
        throw new Error("Yahoo quote failure");
      }),
      getMostActives: vi.fn(async () => []),
    };
    const service = new YahooMarketOverviewService({
      client,
      timeoutMs: 500,
    });

    await expect(service.getMarketOverview()).rejects.toBeInstanceOf(
      MarketOverviewUnavailableError,
    );
    await expect(service.getMarketOverview()).rejects.toThrow(
      "Failed to load market overview from Yahoo Finance",
    );
  });
});

function buildQuote(symbol: string, overrides: Partial<YahooQuoteLike>): YahooQuoteLike {
  return {
    symbol,
    exchange: "NMS",
    fullExchangeName: "NasdaqGS",
    marketState: "REGULAR",
    regularMarketPrice: 100,
    regularMarketChange: 1,
    regularMarketChangePercent: 1,
    regularMarketVolume: 1_000_000,
    volume: 1_000_000,
    ...overrides,
  };
}

function buildIndexQuoteMap(): Record<string, YahooQuoteLike> {
  return {
    "^GSPC": buildQuote("^GSPC", {
      fullExchangeName: "SNP",
      regularMarketPrice: 5300,
      regularMarketChange: 21,
      regularMarketChangePercent: 0.4,
    }),
    "^DJI": buildQuote("^DJI", {
      fullExchangeName: "DJI",
      regularMarketPrice: 40000,
      regularMarketChange: -45,
      regularMarketChangePercent: -0.11,
    }),
    "^IXIC": buildQuote("^IXIC", {
      fullExchangeName: "Nasdaq GIDS",
      regularMarketPrice: 16600,
      regularMarketChange: 88,
      regularMarketChangePercent: 0.53,
    }),
    "^RUT": buildQuote("^RUT", {
      fullExchangeName: "Russell",
      regularMarketPrice: 2100,
      regularMarketChange: 10,
      regularMarketChangePercent: 0.48,
    }),
    "^VIX": buildQuote("^VIX", {
      fullExchangeName: "CBOE",
      regularMarketPrice: 16,
      regularMarketChange: -1,
      regularMarketChangePercent: -4,
    }),
  };
}

function buildWatchlistQuoteMap(): Record<string, YahooQuoteLike> {
  return {
    NVDA: buildQuote("NVDA", {
      regularMarketPrice: 910,
      regularMarketChange: 12,
      regularMarketChangePercent: 1.33,
    }),
    MSFT: buildQuote("MSFT", {
      regularMarketPrice: 425,
      regularMarketChange: -2,
      regularMarketChangePercent: -0.47,
    }),
    AAPL: buildQuote("AAPL", {
      regularMarketPrice: 202,
      regularMarketChange: 1,
      regularMarketChangePercent: 0.5,
    }),
  };
}

function buildMostActiveQuotes(): YahooScreenerQuoteLike[] {
  return [
    {
      symbol: "A",
      regularMarketPrice: 100,
      regularMarketChangePercent: 1.2,
      regularMarketVolume: 2_000_000,
    },
    {
      symbol: "B",
      regularMarketPrice: 50,
      regularMarketChangePercent: -0.5,
      regularMarketVolume: 3_000_000,
    },
  ];
}
