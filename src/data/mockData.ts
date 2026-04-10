import {
  MacroEvent,
  MarketIndexSnapshot,
  MarketPulse,
  PriceSeriesPeriod,
  PriceSeriesPoint,
  SymbolEvent,
  SymbolFundamentals,
  SymbolQuote,
  WatchlistItem,
} from "../types";

export const watchlist: WatchlistItem[] = [
  {
    ticker: "NVDA",
    nameKey: "company.nvda",
    market: "NASDAQ",
    group: "AI",
    price: 942.38,
    change: 18.43,
    changePercent: 1.99,
  },
  {
    ticker: "MSFT",
    nameKey: "company.msft",
    market: "NASDAQ",
    group: "Core",
    price: 421.12,
    change: -3.17,
    changePercent: -0.75,
  },
  {
    ticker: "AAPL",
    nameKey: "company.aapl",
    market: "NASDAQ",
    group: "Core",
    price: 198.67,
    change: 0.91,
    changePercent: 0.46,
  },
  {
    ticker: "0700.HK",
    nameKey: "company.tencent",
    market: "HKEX",
    group: "Dividend",
    price: 318.2,
    change: -1.8,
    changePercent: -0.56,
  },
  {
    ticker: "600519.SH",
    nameKey: "company.moutai",
    market: "SSE",
    group: "Dividend",
    price: 1736.0,
    change: 12.35,
    changePercent: 0.72,
  },
];

export const marketIndexes: MarketIndexSnapshot[] = [
  {
    code: "000001.SH",
    nameKey: "index.sseComposite.name",
    region: "CN",
    value: 3098.42,
    change: 16.2,
    changePercent: 0.53,
    sessionLabelKey: "index.sseComposite.session",
  },
  {
    code: "399001.SZ",
    nameKey: "index.szseComponent.name",
    region: "CN",
    value: 9578.33,
    change: 72.91,
    changePercent: 0.77,
    sessionLabelKey: "index.szseComponent.session",
  },
  {
    code: "399006.SZ",
    nameKey: "index.chinext.name",
    region: "CN",
    value: 1870.56,
    change: 21.35,
    changePercent: 1.15,
    sessionLabelKey: "index.chinext.session",
  },
  {
    code: "HSI",
    nameKey: "index.hsi.name",
    region: "HK",
    value: 16782.91,
    change: -94.16,
    changePercent: -0.56,
    sessionLabelKey: "index.hsi.session",
  },
  {
    code: "IXIC",
    nameKey: "index.nasdaq.name",
    region: "US",
    value: 16284.74,
    change: 123.84,
    changePercent: 0.77,
    sessionLabelKey: "index.nasdaq.session",
  },
];

export const macroEvents: MacroEvent[] = [
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
    id: "cn-m2",
    titleKey: "macro.cnCredit",
    time: "15:00",
    market: "CN",
    importance: "medium",
    dayLabel: "today",
  },
  {
    id: "eu-gdp",
    titleKey: "macro.euGdp",
    time: "17:00",
    market: "EU",
    importance: "low",
    dayLabel: "thisWeek",
  },
];

export const marketPulse: MarketPulse = {
  advancers: 3128,
  decliners: 1540,
  turnover: "¥1.14T",
  riskMoodKey: "market.riskPositive",
  hotThemeKey: "market.hotThemeCompute",
};

export const recentSymbols = ["NVDA", "MSFT", "0700.HK", "600519.SH"];

const quoteMap: Record<string, SymbolQuote> = {
  NVDA: {
    ticker: "NVDA",
    nameKey: "company.nvda",
    market: "NASDAQ",
    sectorKey: "sector.semiconductors",
    price: 942.38,
    change: 18.43,
    changePercent: 1.99,
    volume: "42.8M",
    turnover: "$39.6B",
    high: 949.8,
    low: 923.6,
    open: 926.4,
    previousClose: 923.95,
  },
  MSFT: {
    ticker: "MSFT",
    nameKey: "company.msft",
    market: "NASDAQ",
    sectorKey: "sector.softwareInfrastructure",
    price: 421.12,
    change: -3.17,
    changePercent: -0.75,
    volume: "24.3M",
    turnover: "$10.2B",
    high: 426.7,
    low: 419.6,
    open: 425.2,
    previousClose: 424.29,
  },
  AAPL: {
    ticker: "AAPL",
    nameKey: "company.aapl",
    market: "NASDAQ",
    sectorKey: "sector.consumerElectronics",
    price: 198.67,
    change: 0.91,
    changePercent: 0.46,
    volume: "61.1M",
    turnover: "$12.1B",
    high: 199.34,
    low: 196.86,
    open: 197.52,
    previousClose: 197.76,
  },
  "0700.HK": {
    ticker: "0700.HK",
    nameKey: "company.tencent",
    market: "HKEX",
    sectorKey: "sector.interactiveMedia",
    price: 318.2,
    change: -1.8,
    changePercent: -0.56,
    volume: "18.2M",
    turnover: "HK$5.76B",
    high: 321.4,
    low: 316.5,
    open: 320.0,
    previousClose: 320.0,
  },
  "600519.SH": {
    ticker: "600519.SH",
    nameKey: "company.moutai",
    market: "SSE",
    sectorKey: "sector.beverages",
    price: 1736.0,
    change: 12.35,
    changePercent: 0.72,
    volume: "2.4M",
    turnover: "¥4.12B",
    high: 1741.2,
    low: 1710.5,
    open: 1718.4,
    previousClose: 1723.65,
  },
};

const fundamentalsMap: Record<string, SymbolFundamentals> = {
  NVDA: {
    ticker: "NVDA",
    summaryKey: "fundamental.nvda.summary",
    industryKey: "sector.semiconductors",
    tagKeys: ["tag.ai", "tag.gpu", "tag.dataCenter"],
    marketCap: "$2.32T",
    peRatio: "71.4",
    pbRatio: "49.8",
    dividendYield: "0.03%",
    turnoverRate: "1.85%",
    amplitude: "2.84%",
  },
  MSFT: {
    ticker: "MSFT",
    summaryKey: "fundamental.msft.summary",
    industryKey: "sector.softwareInfrastructure",
    tagKeys: ["tag.cloud", "tag.aiCopilot", "tag.enterprise"],
    marketCap: "$3.13T",
    peRatio: "36.2",
    pbRatio: "12.1",
    dividendYield: "0.72%",
    turnoverRate: "0.41%",
    amplitude: "1.68%",
  },
  AAPL: {
    ticker: "AAPL",
    summaryKey: "fundamental.aapl.summary",
    industryKey: "sector.consumerElectronics",
    tagKeys: ["tag.hardware", "tag.services", "tag.ecosystem"],
    marketCap: "$3.02T",
    peRatio: "31.8",
    pbRatio: "46.4",
    dividendYield: "0.49%",
    turnoverRate: "0.88%",
    amplitude: "1.25%",
  },
  "0700.HK": {
    ticker: "0700.HK",
    summaryKey: "fundamental.tencent.summary",
    industryKey: "sector.interactiveMedia",
    tagKeys: ["tag.gaming", "tag.ads", "tag.cashReturn"],
    marketCap: "HK$2.95T",
    peRatio: "17.9",
    pbRatio: "2.6",
    dividendYield: "1.02%",
    turnoverRate: "0.52%",
    amplitude: "1.54%",
  },
  "600519.SH": {
    ticker: "600519.SH",
    summaryKey: "fundamental.moutai.summary",
    industryKey: "sector.beverages",
    tagKeys: ["tag.consumption", "tag.dividend", "tag.blueChip"],
    marketCap: "¥2.18T",
    peRatio: "28.6",
    pbRatio: "9.4",
    dividendYield: "2.71%",
    turnoverRate: "0.19%",
    amplitude: "1.79%",
  },
};

const eventsMap: Record<string, SymbolEvent[]> = {
  NVDA: [
    {
      id: "nvda-news-1",
      titleKey: "symbolEvent.nvda.1.title",
      type: "news",
      timeKey: "symbolEvent.nvda.1.time",
      noteKey: "symbolEvent.nvda.1.note",
    },
    {
      id: "nvda-earnings-1",
      titleKey: "symbolEvent.nvda.2.title",
      type: "earnings",
      timeKey: "symbolEvent.nvda.2.time",
      noteKey: "symbolEvent.nvda.2.note",
    },
  ],
  MSFT: [
    {
      id: "msft-news-1",
      titleKey: "symbolEvent.msft.1.title",
      type: "news",
      timeKey: "symbolEvent.msft.1.time",
      noteKey: "symbolEvent.msft.1.note",
    },
    {
      id: "msft-ann-1",
      titleKey: "symbolEvent.msft.2.title",
      type: "announcement",
      timeKey: "symbolEvent.msft.2.time",
      noteKey: "symbolEvent.msft.2.note",
    },
  ],
  AAPL: [
    {
      id: "aapl-news-1",
      titleKey: "symbolEvent.aapl.1.title",
      type: "news",
      timeKey: "symbolEvent.aapl.1.time",
      noteKey: "symbolEvent.aapl.1.note",
    },
    {
      id: "aapl-earnings-1",
      titleKey: "symbolEvent.aapl.2.title",
      type: "earnings",
      timeKey: "symbolEvent.aapl.2.time",
      noteKey: "symbolEvent.aapl.2.note",
    },
  ],
  "0700.HK": [
    {
      id: "700-news-1",
      titleKey: "symbolEvent.tencent.1.title",
      type: "news",
      timeKey: "symbolEvent.tencent.1.time",
      noteKey: "symbolEvent.tencent.1.note",
    },
    {
      id: "700-ann-1",
      titleKey: "symbolEvent.tencent.2.title",
      type: "announcement",
      timeKey: "symbolEvent.tencent.2.time",
      noteKey: "symbolEvent.tencent.2.note",
    },
  ],
  "600519.SH": [
    {
      id: "moutai-news-1",
      titleKey: "symbolEvent.moutai.1.title",
      type: "news",
      timeKey: "symbolEvent.moutai.1.time",
      noteKey: "symbolEvent.moutai.1.note",
    },
    {
      id: "moutai-ann-1",
      titleKey: "symbolEvent.moutai.2.title",
      type: "announcement",
      timeKey: "symbolEvent.moutai.2.time",
      noteKey: "symbolEvent.moutai.2.note",
    },
  ],
};

const priceSeriesMap: Record<string, Record<PriceSeriesPeriod, PriceSeriesPoint[]>> = {
  NVDA: {
    "1D": [
      { label: "09:30", value: 926 },
      { label: "10:30", value: 931 },
      { label: "11:30", value: 936 },
      { label: "13:00", value: 932 },
      { label: "14:30", value: 941 },
      { label: "16:00", value: 942 },
    ],
    "1W": [
      { label: "Mon", value: 901 },
      { label: "Tue", value: 915 },
      { label: "Wed", value: 924 },
      { label: "Thu", value: 938 },
      { label: "Fri", value: 942 },
    ],
    "1M": [
      { label: "W1", value: 865 },
      { label: "W2", value: 882 },
      { label: "W3", value: 913 },
      { label: "W4", value: 928 },
      { label: "Now", value: 942 },
    ],
  },
  MSFT: {
    "1D": [
      { label: "09:30", value: 425 },
      { label: "10:30", value: 423 },
      { label: "11:30", value: 422 },
      { label: "13:00", value: 421 },
      { label: "14:30", value: 420 },
      { label: "16:00", value: 421 },
    ],
    "1W": [
      { label: "Mon", value: 431 },
      { label: "Tue", value: 428 },
      { label: "Wed", value: 425 },
      { label: "Thu", value: 423 },
      { label: "Fri", value: 421 },
    ],
    "1M": [
      { label: "W1", value: 438 },
      { label: "W2", value: 432 },
      { label: "W3", value: 429 },
      { label: "W4", value: 424 },
      { label: "Now", value: 421 },
    ],
  },
  AAPL: {
    "1D": [
      { label: "09:30", value: 197.5 },
      { label: "10:30", value: 198.2 },
      { label: "11:30", value: 198.6 },
      { label: "13:00", value: 198.4 },
      { label: "14:30", value: 198.8 },
      { label: "16:00", value: 198.7 },
    ],
    "1W": [
      { label: "Mon", value: 193.2 },
      { label: "Tue", value: 195.1 },
      { label: "Wed", value: 196.8 },
      { label: "Thu", value: 197.4 },
      { label: "Fri", value: 198.7 },
    ],
    "1M": [
      { label: "W1", value: 188.4 },
      { label: "W2", value: 191.7 },
      { label: "W3", value: 194.8 },
      { label: "W4", value: 197.5 },
      { label: "Now", value: 198.7 },
    ],
  },
  "0700.HK": {
    "1D": [
      { label: "09:30", value: 320.1 },
      { label: "10:30", value: 319.7 },
      { label: "11:30", value: 318.9 },
      { label: "13:00", value: 317.8 },
      { label: "14:30", value: 318.5 },
      { label: "16:00", value: 318.2 },
    ],
    "1W": [
      { label: "Mon", value: 325.5 },
      { label: "Tue", value: 323.1 },
      { label: "Wed", value: 321.6 },
      { label: "Thu", value: 319.5 },
      { label: "Fri", value: 318.2 },
    ],
    "1M": [
      { label: "W1", value: 334.2 },
      { label: "W2", value: 329.8 },
      { label: "W3", value: 324.4 },
      { label: "W4", value: 320.6 },
      { label: "Now", value: 318.2 },
    ],
  },
  "600519.SH": {
    "1D": [
      { label: "09:30", value: 1718 },
      { label: "10:30", value: 1726 },
      { label: "11:30", value: 1731 },
      { label: "13:00", value: 1729 },
      { label: "14:30", value: 1734 },
      { label: "15:00", value: 1736 },
    ],
    "1W": [
      { label: "Mon", value: 1692 },
      { label: "Tue", value: 1704 },
      { label: "Wed", value: 1715 },
      { label: "Thu", value: 1728 },
      { label: "Fri", value: 1736 },
    ],
    "1M": [
      { label: "W1", value: 1658 },
      { label: "W2", value: 1682 },
      { label: "W3", value: 1706 },
      { label: "W4", value: 1721 },
      { label: "Now", value: 1736 },
    ],
  },
};

export function getQuote(ticker: string): SymbolQuote {
  return quoteMap[ticker] ?? quoteMap.NVDA;
}

export function getFundamentals(ticker: string): SymbolFundamentals {
  return fundamentalsMap[ticker] ?? fundamentalsMap.NVDA;
}

export function getEvents(ticker: string): SymbolEvent[] {
  return eventsMap[ticker] ?? eventsMap.NVDA;
}

export function getPriceSeries(
  ticker: string,
  period: PriceSeriesPeriod,
): PriceSeriesPoint[] {
  return priceSeriesMap[ticker]?.[period] ?? priceSeriesMap.NVDA[period];
}
