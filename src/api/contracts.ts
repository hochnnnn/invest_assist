import type {
  MacroEvent,
  MarketIndexSnapshot,
  MarketPulse,
  PriceSeriesPoint,
  SymbolEvent,
  SymbolEventDigest,
  SymbolFundamentals,
  SymbolQuote,
  SymbolSentiment,
  SymbolTrendNarrative,
  WatchlistItem,
} from "../types";

export interface HealthResponse {
  ok: true;
  service: string;
  uptime: number;
}

export interface MarketOverviewResponse {
  watchlist: WatchlistItem[];
  marketIndexes: MarketIndexSnapshot[];
  macroEvents: MacroEvent[];
  marketPulse: MarketPulse;
  recentSymbols: string[];
}

export interface SymbolDetailResponse {
  ticker: string;
  quote: SymbolQuote;
  fundamentals: SymbolFundamentals;
  sentiment: SymbolSentiment;
  trendNarrative: SymbolTrendNarrative;
  events: SymbolEvent[];
  eventDigest: SymbolEventDigest;
  priceSeries: PriceSeriesPoint[];
}
