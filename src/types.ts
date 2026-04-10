export type WatchlistGroup = "Core" | "AI" | "Dividend";

export interface WatchlistItem {
  ticker: string;
  name: string;
  market: string;
  group: WatchlistGroup;
  price: number;
  change: number;
  changePercent: number;
}

export interface MarketIndexSnapshot {
  code: string;
  name: string;
  region: string;
  value: number;
  change: number;
  changePercent: number;
  sessionLabel: string;
}

export type MacroEventImportance = "High" | "Medium" | "Low";

export interface MacroEvent {
  id: string;
  title: string;
  time: string;
  market: string;
  importance: MacroEventImportance;
  dayLabel: "Today" | "This Week";
}

export interface PriceSeriesPoint {
  label: string;
  value: number;
}

export type PriceSeriesPeriod = "1D" | "1W" | "1M";

export interface SymbolQuote {
  ticker: string;
  name: string;
  market: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  turnover: string;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export interface SymbolFundamentals {
  ticker: string;
  summary: string;
  industry: string;
  tags: string[];
  marketCap: string;
  peRatio: string;
  pbRatio: string;
  dividendYield: string;
  turnoverRate: string;
  amplitude: string;
}

export interface SymbolEvent {
  id: string;
  title: string;
  type: "News" | "Announcement" | "Earnings";
  time: string;
  note: string;
}
