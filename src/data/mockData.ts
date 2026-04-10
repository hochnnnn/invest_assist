import {
  MacroEvent,
  MarketIndexSnapshot,
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
    name: "NVIDIA",
    market: "NASDAQ",
    group: "AI",
    price: 942.38,
    change: 18.43,
    changePercent: 1.99,
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    market: "NASDAQ",
    group: "Core",
    price: 421.12,
    change: -3.17,
    changePercent: -0.75,
  },
  {
    ticker: "AAPL",
    name: "Apple",
    market: "NASDAQ",
    group: "Core",
    price: 198.67,
    change: 0.91,
    changePercent: 0.46,
  },
  {
    ticker: "0700.HK",
    name: "Tencent",
    market: "HKEX",
    group: "Dividend",
    price: 318.2,
    change: -1.8,
    changePercent: -0.56,
  },
  {
    ticker: "600519.SH",
    name: "Kweichow Moutai",
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
    name: "上证指数",
    region: "CN",
    value: 3098.42,
    change: 16.2,
    changePercent: 0.53,
    sessionLabel: "午后延续反弹",
  },
  {
    code: "399001.SZ",
    name: "深证成指",
    region: "CN",
    value: 9578.33,
    change: 72.91,
    changePercent: 0.77,
    sessionLabel: "科技权重回暖",
  },
  {
    code: "399006.SZ",
    name: "创业板指",
    region: "CN",
    value: 1870.56,
    change: 21.35,
    changePercent: 1.15,
    sessionLabel: "成长板块领涨",
  },
  {
    code: "HSI",
    name: "恒生指数",
    region: "HK",
    value: 16782.91,
    change: -94.16,
    changePercent: -0.56,
    sessionLabel: "互联网分化",
  },
  {
    code: "IXIC",
    name: "纳斯达克",
    region: "US",
    value: 16284.74,
    change: 123.84,
    changePercent: 0.77,
    sessionLabel: "AI 主线延续",
  },
];

export const macroEvents: MacroEvent[] = [
  {
    id: "cpi-us",
    title: "US CPI Release",
    time: "20:30",
    market: "US",
    importance: "High",
    dayLabel: "Today",
  },
  {
    id: "fomc-minutes",
    title: "FOMC Minutes",
    time: "02:00",
    market: "US",
    importance: "High",
    dayLabel: "This Week",
  },
  {
    id: "cn-m2",
    title: "China Credit Data",
    time: "15:00",
    market: "CN",
    importance: "Medium",
    dayLabel: "Today",
  },
  {
    id: "eu-gdp",
    title: "Eurozone GDP Final",
    time: "17:00",
    market: "EU",
    importance: "Low",
    dayLabel: "This Week",
  },
];

export const marketPulse = {
  advancers: 3128,
  decliners: 1540,
  turnover: "¥1.14T",
  riskMood: "偏积极",
  hotTheme: "算力与半导体",
};

export const recentSymbols = ["NVDA", "MSFT", "0700.HK", "600519.SH"];

const quoteMap: Record<string, SymbolQuote> = {
  NVDA: {
    ticker: "NVDA",
    name: "NVIDIA",
    market: "NASDAQ",
    sector: "Semiconductors",
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
    name: "Microsoft",
    market: "NASDAQ",
    sector: "Software Infrastructure",
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
    name: "Apple",
    market: "NASDAQ",
    sector: "Consumer Electronics",
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
    name: "Tencent",
    market: "HKEX",
    sector: "Interactive Media",
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
    name: "Kweichow Moutai",
    market: "SSE",
    sector: "Beverages",
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
    summary:
      "AI accelerator demand remains the core growth engine, while data center and software attach rates continue to expand.",
    industry: "Semiconductors",
    tags: ["AI", "GPU", "Data Center"],
    marketCap: "$2.32T",
    peRatio: "71.4",
    pbRatio: "49.8",
    dividendYield: "0.03%",
    turnoverRate: "1.85%",
    amplitude: "2.84%",
  },
  MSFT: {
    ticker: "MSFT",
    summary:
      "Cloud recurring revenue and enterprise AI adoption provide resilient cash flow and premium valuation support.",
    industry: "Software Infrastructure",
    tags: ["Cloud", "AI Copilot", "Enterprise"],
    marketCap: "$3.13T",
    peRatio: "36.2",
    pbRatio: "12.1",
    dividendYield: "0.72%",
    turnoverRate: "0.41%",
    amplitude: "1.68%",
  },
  AAPL: {
    ticker: "AAPL",
    summary:
      "Hardware installed base remains sticky, with services margin acting as the primary stability anchor.",
    industry: "Consumer Electronics",
    tags: ["Hardware", "Services", "Ecosystem"],
    marketCap: "$3.02T",
    peRatio: "31.8",
    pbRatio: "46.4",
    dividendYield: "0.49%",
    turnoverRate: "0.88%",
    amplitude: "1.25%",
  },
  "0700.HK": {
    ticker: "0700.HK",
    summary:
      "Gaming and ad monetization stabilize, while capital return and cost discipline support valuation repair.",
    industry: "Interactive Media",
    tags: ["Gaming", "Ads", "Cash Return"],
    marketCap: "HK$2.95T",
    peRatio: "17.9",
    pbRatio: "2.6",
    dividendYield: "1.02%",
    turnoverRate: "0.52%",
    amplitude: "1.54%",
  },
  "600519.SH": {
    ticker: "600519.SH",
    summary:
      "Premium baijiu pricing power and brand moat remain intact, with distribution rhythm closely watched by funds.",
    industry: "Beverages",
    tags: ["Consumption", "Dividend", "Blue Chip"],
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
      title: "Channel checks point to continued AI server demand",
      type: "News",
      time: "Today 13:20",
      note: "Prototype item, no live news feed connected yet.",
    },
    {
      id: "nvda-earnings-1",
      title: "Next earnings window",
      type: "Earnings",
      time: "May 22",
      note: "Watch for data center guidance and gross margin outlook.",
    },
  ],
  MSFT: [
    {
      id: "msft-news-1",
      title: "Enterprise AI bundle pricing discussed by brokers",
      type: "News",
      time: "Today 10:10",
      note: "Used as a structural placeholder for future content feeds.",
    },
    {
      id: "msft-ann-1",
      title: "Cloud infrastructure update",
      type: "Announcement",
      time: "This Week",
      note: "Potentially impacts Azure capacity narrative.",
    },
  ],
  AAPL: [
    {
      id: "aapl-news-1",
      title: "Supply-chain commentary remains mixed",
      type: "News",
      time: "Today 09:35",
      note: "Placeholder card for the event rail.",
    },
    {
      id: "aapl-earnings-1",
      title: "Services growth focus for next results",
      type: "Earnings",
      time: "This Month",
      note: "Keep services ARPU and China commentary in view.",
    },
  ],
  "0700.HK": [
    {
      id: "700-news-1",
      title: "Gaming pipeline sentiment improves",
      type: "News",
      time: "Today 14:05",
      note: "Structural placeholder only.",
    },
    {
      id: "700-ann-1",
      title: "Capital return update",
      type: "Announcement",
      time: "This Week",
      note: "Buyback pace remains a watch item.",
    },
  ],
  "600519.SH": [
    {
      id: "moutai-news-1",
      title: "Channel inventory focus ahead of holiday demand",
      type: "News",
      time: "Today 11:40",
      note: "Structural placeholder only.",
    },
    {
      id: "moutai-ann-1",
      title: "Dividend expectations remain stable",
      type: "Announcement",
      time: "This Month",
      note: "Used for layout and timing hierarchy only.",
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
