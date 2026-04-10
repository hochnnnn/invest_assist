export type AppLanguage = "zh-CN" | "en-US";

export type AppTheme = "light" | "dark";

export interface UserPreferences {
  language: AppLanguage;
  theme: AppTheme;
}

export interface SubscriptionPlan {
  id: string;
  nameKey: string;
  priceLabelKey: string;
  featureKeys: string[];
  isCurrent?: boolean;
}

export interface ReferralConfig {
  shareUrl: string;
  rewardTextKey: string;
}

export type WatchlistGroup = "Core" | "AI" | "Dividend";

export interface WatchlistItem {
  ticker: string;
  nameKey: string;
  market: string;
  group: WatchlistGroup;
  price: number;
  change: number;
  changePercent: number;
}

export interface MarketIndexSnapshot {
  code: string;
  nameKey: string;
  region: string;
  value: number;
  change: number;
  changePercent: number;
  sessionLabelKey: string;
}

export type MacroEventImportance = "high" | "medium" | "low";

export type MacroEventDayLabel = "today" | "thisWeek";

export interface MacroEvent {
  id: string;
  titleKey: string;
  time: string;
  market: string;
  importance: MacroEventImportance;
  dayLabel: MacroEventDayLabel;
}

export interface MarketPulse {
  advancers: number;
  decliners: number;
  turnover: string;
  riskMoodKey: string;
  hotThemeKey: string;
}

export interface PriceSeriesPoint {
  label: string;
  value: number;
}

export interface SymbolQuote {
  ticker: string;
  nameKey: string;
  market: string;
  sectorKey: string;
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
  summaryKey: string;
  profile: {
    industryKey: string;
    tagKeys: string[];
    marketCap: string;
    positioningTagKey: string;
  };
  valuation: {
    valuationTagKey: string;
    peTtm: string;
    peForward: string;
    pbRatio?: string;
    psRatio?: string;
    dividendYield: string;
    valuationPercentile: string;
  };
  growth: {
    revenueGrowth: string;
    netIncomeGrowth: string;
    grossMargin: string;
    roe: string;
    freeCashFlow: string;
  };
  health: {
    debtRatio?: string;
    cashBuffer?: string;
    goodwillRatio?: string;
    dso?: string;
  };
  expectation: {
    targetPrice?: string;
    impliedReturn?: string;
    ratingMix?: string;
    holderFlow?: string;
  };
  trading: {
    turnoverRate: string;
    amplitude: string;
  };
}

export interface SymbolSentiment {
  ticker: string;
  overall: {
    stanceKey: string;
    evidenceKey: string;
  };
  distribution: {
    bullishPercent: number;
    cautiousPercent: number;
    neutralPercent: number;
    bullishViewKeys: string[];
    bearishViewKeys: string[];
  };
  panic: {
    score: number;
    dailyChange: number;
    stateKey: string;
    reasonKey: string;
    history: PriceSeriesPoint[];
  };
}

export interface SymbolTrendNarrative {
  ticker: string;
  trendSummaryKey: string;
}

export type SymbolEventType = "news" | "announcement" | "earnings";

export interface SymbolEvent {
  id: string;
  titleKey: string;
  type: SymbolEventType;
  timeKey: string;
  noteKey: string;
}
