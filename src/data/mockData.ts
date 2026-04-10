import {
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
    profile: {
      industryKey: "sector.semiconductors",
      tagKeys: ["tag.ai", "tag.gpu", "tag.dataCenter"],
      marketCap: "$2.32T",
      positioningTagKey: "fundamentals.positioning.aiInfrastructure",
    },
    valuation: {
      valuationTagKey: "fundamentals.valuationTag.premium",
      peTtm: "71.4",
      peForward: "39.2",
      pbRatio: "49.8",
      dividendYield: "0.03%",
      valuationPercentile: "5Y P94",
    },
    growth: {
      revenueGrowth: "+126% YoY",
      netIncomeGrowth: "+491% YoY",
      grossMargin: "75.1%",
      roe: "91.9%",
      freeCashFlow: "$27.0B",
    },
    health: {
      debtRatio: "12%",
      cashBuffer: "$31.4B net cash",
      goodwillRatio: "0.2%",
      dso: "58 days",
    },
    expectation: {
      targetPrice: "$1,020",
      impliedReturn: "+8.2%",
      ratingMix: "28 / 4 / 1",
      holderFlow: "Top 10 +0.7pt",
    },
    trading: {
      turnoverRate: "1.85%",
      amplitude: "2.84%",
    },
  },
  MSFT: {
    ticker: "MSFT",
    summaryKey: "fundamental.msft.summary",
    profile: {
      industryKey: "sector.softwareInfrastructure",
      tagKeys: ["tag.cloud", "tag.aiCopilot", "tag.enterprise"],
      marketCap: "$3.13T",
      positioningTagKey: "fundamentals.positioning.platformCompounder",
    },
    valuation: {
      valuationTagKey: "fundamentals.valuationTag.qualityPremium",
      peTtm: "36.2",
      peForward: "31.4",
      pbRatio: "12.1",
      dividendYield: "0.72%",
      valuationPercentile: "5Y P71",
    },
    growth: {
      revenueGrowth: "+16% YoY",
      netIncomeGrowth: "+22% YoY",
      grossMargin: "69.8%",
      roe: "33.1%",
      freeCashFlow: "$62.4B",
    },
    health: {
      debtRatio: "42%",
      cashBuffer: "$80.7B cash",
      goodwillRatio: "6.1%",
      dso: "84 days",
    },
    expectation: {
      targetPrice: "$465",
      impliedReturn: "+10.4%",
      ratingMix: "44 / 6 / 0",
      holderFlow: "Top 10 +0.4pt",
    },
    trading: {
      turnoverRate: "0.41%",
      amplitude: "1.68%",
    },
  },
  AAPL: {
    ticker: "AAPL",
    summaryKey: "fundamental.aapl.summary",
    profile: {
      industryKey: "sector.consumerElectronics",
      tagKeys: ["tag.hardware", "tag.services", "tag.ecosystem"],
      marketCap: "$3.02T",
      positioningTagKey: "fundamentals.positioning.ecosystemCashflow",
    },
    valuation: {
      valuationTagKey: "fundamentals.valuationTag.premium",
      peTtm: "31.8",
      peForward: "28.7",
      pbRatio: "46.4",
      dividendYield: "0.49%",
      valuationPercentile: "5Y P83",
    },
    growth: {
      revenueGrowth: "+4% YoY",
      netIncomeGrowth: "+8% YoY",
      grossMargin: "45.9%",
      roe: "147.2%",
      freeCashFlow: "$99.6B",
    },
    health: {
      debtRatio: "79%",
      cashBuffer: "$57.0B cash",
      goodwillRatio: "0.0%",
      dso: "29 days",
    },
    expectation: {
      targetPrice: "$214",
      impliedReturn: "+7.9%",
      ratingMix: "31 / 7 / 1",
      holderFlow: "Top 10 +0.2pt",
    },
    trading: {
      turnoverRate: "0.88%",
      amplitude: "1.25%",
    },
  },
  "0700.HK": {
    ticker: "0700.HK",
    summaryKey: "fundamental.tencent.summary",
    profile: {
      industryKey: "sector.interactiveMedia",
      tagKeys: ["tag.gaming", "tag.ads", "tag.cashReturn"],
      marketCap: "HK$2.95T",
      positioningTagKey: "fundamentals.positioning.internetRecovery",
    },
    valuation: {
      valuationTagKey: "fundamentals.valuationTag.reasonable",
      peTtm: "17.9",
      peForward: "15.2",
      pbRatio: "2.6",
      dividendYield: "1.02%",
      valuationPercentile: "5Y P43",
    },
    growth: {
      revenueGrowth: "+8% YoY",
      netIncomeGrowth: "+35% YoY",
      grossMargin: "49.2%",
      roe: "16.3%",
      freeCashFlow: "CN¥189B",
    },
    health: {
      debtRatio: "31%",
      cashBuffer: "CN¥312B cash",
      goodwillRatio: "14.7%",
      dso: "46 days",
    },
    expectation: {
      impliedReturn: "+11.8%",
      ratingMix: "34 / 8 / 0",
      holderFlow: "Southbound +1.1pt",
    },
    trading: {
      turnoverRate: "0.52%",
      amplitude: "1.54%",
    },
  },
  "600519.SH": {
    ticker: "600519.SH",
    summaryKey: "fundamental.moutai.summary",
    profile: {
      industryKey: "sector.beverages",
      tagKeys: ["tag.consumption", "tag.dividend", "tag.blueChip"],
      marketCap: "CN¥2.18T",
      positioningTagKey: "fundamentals.positioning.premiumConsumer",
    },
    valuation: {
      peTtm: "28.6",
      peForward: "25.1",
      pbRatio: "9.4",
      dividendYield: "2.71%",
      valuationTagKey: "fundamentals.valuationTag.defensiveIncome",
      valuationPercentile: "5Y P58",
    },
    growth: {
      revenueGrowth: "+16% YoY",
      netIncomeGrowth: "+19% YoY",
      grossMargin: "91.7%",
      roe: "34.7%",
      freeCashFlow: "CN¥74B",
    },
    health: {
      debtRatio: "18%",
      cashBuffer: "CN¥174B cash",
      goodwillRatio: "0.0%",
      dso: "9 days",
    },
    expectation: {
      targetPrice: "CN¥1,920",
      impliedReturn: "+10.6%",
      ratingMix: "29 / 3 / 0",
      holderFlow: "Northbound +0.2pt",
    },
    trading: {
      turnoverRate: "0.19%",
      amplitude: "1.79%",
    },
  },
};

function createPanicHistory(values: number[]): PriceSeriesPoint[] {
  return values.map((value, index) => ({
    label: `D${index + 1}`,
    value,
  }));
}

const sentimentMap: Record<string, SymbolSentiment> = {
  NVDA: {
    ticker: "NVDA",
    overall: {
      stanceKey: "sentiment.overall.optimistic",
      evidenceKey: "sentiment.nvda.evidence",
    },
    distribution: {
      bullishPercent: 58,
      cautiousPercent: 24,
      neutralPercent: 18,
      bullishViewKeys: [
        "sentiment.nvda.bullish.1",
        "sentiment.nvda.bullish.2",
        "sentiment.nvda.bullish.3",
      ],
      bearishViewKeys: [
        "sentiment.nvda.bearish.1",
        "sentiment.nvda.bearish.2",
        "sentiment.nvda.bearish.3",
      ],
    },
    panic: {
      score: 68,
      dailyChange: 5,
      stateKey: "sentiment.panicState.greed",
      reasonKey: "sentiment.nvda.panicReason",
      history: createPanicHistory([
        46, 48, 49, 47, 50, 53, 52, 55, 57, 59,
        58, 60, 62, 61, 63, 64, 62, 65, 66, 64,
        67, 68, 66, 69, 70, 68, 67, 69, 71, 68,
      ]),
    },
  },
  MSFT: {
    ticker: "MSFT",
    overall: {
      stanceKey: "sentiment.overall.divided",
      evidenceKey: "sentiment.msft.evidence",
    },
    distribution: {
      bullishPercent: 37,
      cautiousPercent: 28,
      neutralPercent: 35,
      bullishViewKeys: [
        "sentiment.msft.bullish.1",
        "sentiment.msft.bullish.2",
        "sentiment.msft.bullish.3",
      ],
      bearishViewKeys: [
        "sentiment.msft.bearish.1",
        "sentiment.msft.bearish.2",
        "sentiment.msft.bearish.3",
      ],
    },
    panic: {
      score: 52,
      dailyChange: -1,
      stateKey: "sentiment.panicState.neutral",
      reasonKey: "sentiment.msft.panicReason",
      history: createPanicHistory([
        49, 50, 48, 47, 49, 51, 50, 52, 53, 51,
        50, 49, 51, 52, 54, 55, 53, 52, 54, 55,
        56, 54, 53, 52, 51, 50, 52, 53, 54, 52,
      ]),
    },
  },
  AAPL: {
    ticker: "AAPL",
    overall: {
      stanceKey: "sentiment.overall.pessimistic",
      evidenceKey: "sentiment.aapl.evidence",
    },
    distribution: {
      bullishPercent: 24,
      cautiousPercent: 45,
      neutralPercent: 31,
      bullishViewKeys: [
        "sentiment.aapl.bullish.1",
        "sentiment.aapl.bullish.2",
        "sentiment.aapl.bullish.3",
      ],
      bearishViewKeys: [
        "sentiment.aapl.bearish.1",
        "sentiment.aapl.bearish.2",
        "sentiment.aapl.bearish.3",
      ],
    },
    panic: {
      score: 36,
      dailyChange: -4,
      stateKey: "sentiment.panicState.fear",
      reasonKey: "sentiment.aapl.panicReason",
      history: createPanicHistory([
        55, 54, 53, 52, 50, 49, 47, 48, 46, 45,
        43, 44, 42, 41, 39, 38, 37, 36, 35, 34,
        33, 35, 34, 36, 37, 38, 37, 36, 35, 36,
      ]),
    },
  },
  "0700.HK": {
    ticker: "0700.HK",
    overall: {
      stanceKey: "sentiment.overall.optimistic",
      evidenceKey: "sentiment.tencent.evidence",
    },
    distribution: {
      bullishPercent: 44,
      cautiousPercent: 23,
      neutralPercent: 33,
      bullishViewKeys: [
        "sentiment.tencent.bullish.1",
        "sentiment.tencent.bullish.2",
        "sentiment.tencent.bullish.3",
      ],
      bearishViewKeys: [
        "sentiment.tencent.bearish.1",
        "sentiment.tencent.bearish.2",
        "sentiment.tencent.bearish.3",
      ],
    },
    panic: {
      score: 57,
      dailyChange: 3,
      stateKey: "sentiment.panicState.neutral",
      reasonKey: "sentiment.tencent.panicReason",
      history: createPanicHistory([
        42, 43, 44, 46, 45, 47, 48, 49, 48, 50,
        51, 52, 50, 49, 51, 53, 54, 55, 56, 54,
        53, 55, 56, 57, 58, 56, 55, 56, 57, 57,
      ]),
    },
  },
  "600519.SH": {
    ticker: "600519.SH",
    overall: {
      stanceKey: "sentiment.overall.divided",
      evidenceKey: "sentiment.moutai.evidence",
    },
    distribution: {
      bullishPercent: 35,
      cautiousPercent: 39,
      neutralPercent: 26,
      bullishViewKeys: [
        "sentiment.moutai.bullish.1",
        "sentiment.moutai.bullish.2",
        "sentiment.moutai.bullish.3",
      ],
      bearishViewKeys: [
        "sentiment.moutai.bearish.1",
        "sentiment.moutai.bearish.2",
        "sentiment.moutai.bearish.3",
      ],
    },
    panic: {
      score: 41,
      dailyChange: -2,
      stateKey: "sentiment.panicState.fear",
      reasonKey: "sentiment.moutai.panicReason",
      history: createPanicHistory([
        52, 51, 50, 49, 48, 47, 46, 45, 44, 43,
        42, 41, 40, 39, 40, 41, 42, 43, 44, 45,
        44, 43, 42, 41, 40, 39, 40, 41, 42, 41,
      ]),
    },
  },
};

const trendNarrativeMap: Record<string, SymbolTrendNarrative> = {
  NVDA: {
    ticker: "NVDA",
    trendSummaryKey: "chart.trendSummary.nvda",
  },
  MSFT: {
    ticker: "MSFT",
    trendSummaryKey: "chart.trendSummary.msft",
  },
  AAPL: {
    ticker: "AAPL",
    trendSummaryKey: "chart.trendSummary.aapl",
  },
  "0700.HK": {
    ticker: "0700.HK",
    trendSummaryKey: "chart.trendSummary.tencent",
  },
  "600519.SH": {
    ticker: "600519.SH",
    trendSummaryKey: "chart.trendSummary.moutai",
  },
};

function selectEventRail(events: SymbolEvent[]): SymbolEvent[] {
  const todayNews = events.filter((event) => event.isToday && event.type === "news");
  const upcomingCatalysts = events.filter((event) => !event.isToday && event.type !== "news");
  const remainingEvents = events.filter(
    (event) => !todayNews.includes(event) && !upcomingCatalysts.includes(event),
  );

  return [...todayNews, ...upcomingCatalysts, ...remainingEvents].slice(0, 5);
}

const eventsMap: Record<string, SymbolEvent[]> = {
  NVDA: [
    {
      id: "nvda-news-1",
      titleKey: "symbolEvent.nvda.1.title",
      type: "news",
      timeKey: "symbolEvent.nvda.1.time",
      noteKey: "symbolEvent.nvda.1.note",
      sourceKey: "symbolEvent.nvda.1.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.nvda.1.impactNote",
      isToday: true,
    },
    {
      id: "nvda-news-2",
      titleKey: "symbolEvent.nvda.2.title",
      type: "news",
      timeKey: "symbolEvent.nvda.2.time",
      noteKey: "symbolEvent.nvda.2.note",
      sourceKey: "symbolEvent.nvda.2.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.nvda.2.impactNote",
      isToday: true,
    },
    {
      id: "nvda-news-3",
      titleKey: "symbolEvent.nvda.3.title",
      type: "news",
      timeKey: "symbolEvent.nvda.3.time",
      noteKey: "symbolEvent.nvda.3.note",
      sourceKey: "symbolEvent.nvda.3.source",
      impact: "neutral",
      impactNoteKey: "symbolEvent.nvda.3.impactNote",
      isToday: true,
    },
    {
      id: "nvda-earnings-1",
      titleKey: "symbolEvent.nvda.4.title",
      type: "earnings",
      timeKey: "symbolEvent.nvda.4.time",
      noteKey: "symbolEvent.nvda.4.note",
      sourceKey: "symbolEvent.nvda.4.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.nvda.4.impactNote",
      isToday: false,
    },
    {
      id: "nvda-ann-1",
      titleKey: "symbolEvent.nvda.5.title",
      type: "announcement",
      timeKey: "symbolEvent.nvda.5.time",
      noteKey: "symbolEvent.nvda.5.note",
      sourceKey: "symbolEvent.nvda.5.source",
      impact: "neutral",
      impactNoteKey: "symbolEvent.nvda.5.impactNote",
      isToday: false,
    },
  ],
  MSFT: [
    {
      id: "msft-news-1",
      titleKey: "symbolEvent.msft.1.title",
      type: "news",
      timeKey: "symbolEvent.msft.1.time",
      noteKey: "symbolEvent.msft.1.note",
      sourceKey: "symbolEvent.msft.1.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.msft.1.impactNote",
      isToday: true,
    },
    {
      id: "msft-news-2",
      titleKey: "symbolEvent.msft.2.title",
      type: "news",
      timeKey: "symbolEvent.msft.2.time",
      noteKey: "symbolEvent.msft.2.note",
      sourceKey: "symbolEvent.msft.2.source",
      impact: "neutral",
      impactNoteKey: "symbolEvent.msft.2.impactNote",
      isToday: true,
    },
    {
      id: "msft-news-3",
      titleKey: "symbolEvent.msft.3.title",
      type: "news",
      timeKey: "symbolEvent.msft.3.time",
      noteKey: "symbolEvent.msft.3.note",
      sourceKey: "symbolEvent.msft.3.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.msft.3.impactNote",
      isToday: true,
    },
    {
      id: "msft-ann-1",
      titleKey: "symbolEvent.msft.4.title",
      type: "announcement",
      timeKey: "symbolEvent.msft.4.time",
      noteKey: "symbolEvent.msft.4.note",
      sourceKey: "symbolEvent.msft.4.source",
      impact: "neutral",
      impactNoteKey: "symbolEvent.msft.4.impactNote",
      isToday: false,
    },
    {
      id: "msft-earnings-1",
      titleKey: "symbolEvent.msft.5.title",
      type: "earnings",
      timeKey: "symbolEvent.msft.5.time",
      noteKey: "symbolEvent.msft.5.note",
      sourceKey: "symbolEvent.msft.5.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.msft.5.impactNote",
      isToday: false,
    },
  ],
  AAPL: [
    {
      id: "aapl-news-1",
      titleKey: "symbolEvent.aapl.1.title",
      type: "news",
      timeKey: "symbolEvent.aapl.1.time",
      noteKey: "symbolEvent.aapl.1.note",
      sourceKey: "symbolEvent.aapl.1.source",
      impact: "neutral",
      impactNoteKey: "symbolEvent.aapl.1.impactNote",
      isToday: true,
    },
    {
      id: "aapl-news-2",
      titleKey: "symbolEvent.aapl.2.title",
      type: "news",
      timeKey: "symbolEvent.aapl.2.time",
      noteKey: "symbolEvent.aapl.2.note",
      sourceKey: "symbolEvent.aapl.2.source",
      impact: "negative",
      impactNoteKey: "symbolEvent.aapl.2.impactNote",
      isToday: true,
    },
    {
      id: "aapl-news-3",
      titleKey: "symbolEvent.aapl.3.title",
      type: "news",
      timeKey: "symbolEvent.aapl.3.time",
      noteKey: "symbolEvent.aapl.3.note",
      sourceKey: "symbolEvent.aapl.3.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.aapl.3.impactNote",
      isToday: true,
    },
    {
      id: "aapl-earnings-1",
      titleKey: "symbolEvent.aapl.4.title",
      type: "earnings",
      timeKey: "symbolEvent.aapl.4.time",
      noteKey: "symbolEvent.aapl.4.note",
      sourceKey: "symbolEvent.aapl.4.source",
      impact: "neutral",
      impactNoteKey: "symbolEvent.aapl.4.impactNote",
      isToday: false,
    },
    {
      id: "aapl-ann-1",
      titleKey: "symbolEvent.aapl.5.title",
      type: "announcement",
      timeKey: "symbolEvent.aapl.5.time",
      noteKey: "symbolEvent.aapl.5.note",
      sourceKey: "symbolEvent.aapl.5.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.aapl.5.impactNote",
      isToday: false,
    },
  ],
  "0700.HK": [
    {
      id: "700-news-1",
      titleKey: "symbolEvent.tencent.1.title",
      type: "news",
      timeKey: "symbolEvent.tencent.1.time",
      noteKey: "symbolEvent.tencent.1.note",
      sourceKey: "symbolEvent.tencent.1.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.tencent.1.impactNote",
      isToday: true,
    },
    {
      id: "700-news-2",
      titleKey: "symbolEvent.tencent.2.title",
      type: "news",
      timeKey: "symbolEvent.tencent.2.time",
      noteKey: "symbolEvent.tencent.2.note",
      sourceKey: "symbolEvent.tencent.2.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.tencent.2.impactNote",
      isToday: true,
    },
    {
      id: "700-news-3",
      titleKey: "symbolEvent.tencent.3.title",
      type: "news",
      timeKey: "symbolEvent.tencent.3.time",
      noteKey: "symbolEvent.tencent.3.note",
      sourceKey: "symbolEvent.tencent.3.source",
      impact: "neutral",
      impactNoteKey: "symbolEvent.tencent.3.impactNote",
      isToday: true,
    },
    {
      id: "700-ann-1",
      titleKey: "symbolEvent.tencent.4.title",
      type: "announcement",
      timeKey: "symbolEvent.tencent.4.time",
      noteKey: "symbolEvent.tencent.4.note",
      sourceKey: "symbolEvent.tencent.4.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.tencent.4.impactNote",
      isToday: false,
    },
    {
      id: "700-earnings-1",
      titleKey: "symbolEvent.tencent.5.title",
      type: "earnings",
      timeKey: "symbolEvent.tencent.5.time",
      noteKey: "symbolEvent.tencent.5.note",
      sourceKey: "symbolEvent.tencent.5.source",
      impact: "neutral",
      impactNoteKey: "symbolEvent.tencent.5.impactNote",
      isToday: false,
    },
  ],
  "600519.SH": [
    {
      id: "moutai-news-1",
      titleKey: "symbolEvent.moutai.1.title",
      type: "news",
      timeKey: "symbolEvent.moutai.1.time",
      noteKey: "symbolEvent.moutai.1.note",
      sourceKey: "symbolEvent.moutai.1.source",
      impact: "neutral",
      impactNoteKey: "symbolEvent.moutai.1.impactNote",
      isToday: true,
    },
    {
      id: "moutai-news-2",
      titleKey: "symbolEvent.moutai.2.title",
      type: "news",
      timeKey: "symbolEvent.moutai.2.time",
      noteKey: "symbolEvent.moutai.2.note",
      sourceKey: "symbolEvent.moutai.2.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.moutai.2.impactNote",
      isToday: true,
    },
    {
      id: "moutai-news-3",
      titleKey: "symbolEvent.moutai.3.title",
      type: "news",
      timeKey: "symbolEvent.moutai.3.time",
      noteKey: "symbolEvent.moutai.3.note",
      sourceKey: "symbolEvent.moutai.3.source",
      impact: "negative",
      impactNoteKey: "symbolEvent.moutai.3.impactNote",
      isToday: true,
    },
    {
      id: "moutai-ann-1",
      titleKey: "symbolEvent.moutai.4.title",
      type: "announcement",
      timeKey: "symbolEvent.moutai.4.time",
      noteKey: "symbolEvent.moutai.4.note",
      sourceKey: "symbolEvent.moutai.4.source",
      impact: "positive",
      impactNoteKey: "symbolEvent.moutai.4.impactNote",
      isToday: false,
    },
    {
      id: "moutai-earnings-1",
      titleKey: "symbolEvent.moutai.5.title",
      type: "earnings",
      timeKey: "symbolEvent.moutai.5.time",
      noteKey: "symbolEvent.moutai.5.note",
      sourceKey: "symbolEvent.moutai.5.source",
      impact: "neutral",
      impactNoteKey: "symbolEvent.moutai.5.impactNote",
      isToday: false,
    },
  ],
};

const eventDigestMap: Record<string, SymbolEventDigest> = {
  NVDA: {
    ticker: "NVDA",
    summaryKey: "events.digest.nvda.summary",
    todayNewsCount: 3,
    latestUpdateKey: "events.digest.nvda.latestUpdate",
  },
  MSFT: {
    ticker: "MSFT",
    summaryKey: "events.digest.msft.summary",
    todayNewsCount: 3,
    latestUpdateKey: "events.digest.msft.latestUpdate",
  },
  AAPL: {
    ticker: "AAPL",
    summaryKey: "events.digest.aapl.summary",
    todayNewsCount: 3,
    latestUpdateKey: "events.digest.aapl.latestUpdate",
  },
  "0700.HK": {
    ticker: "0700.HK",
    summaryKey: "events.digest.tencent.summary",
    todayNewsCount: 3,
    latestUpdateKey: "events.digest.tencent.latestUpdate",
  },
  "600519.SH": {
    ticker: "600519.SH",
    summaryKey: "events.digest.moutai.summary",
    todayNewsCount: 3,
    latestUpdateKey: "events.digest.moutai.latestUpdate",
  },
};

const priceSeriesMap: Record<string, PriceSeriesPoint[]> = {
  NVDA: [
    { label: "Jun", value: 1180 },
    { label: "Jul", value: 1115 },
    { label: "Aug", value: 1048 },
    { label: "Sep", value: 968 },
    { label: "Oct", value: 895 },
    { label: "Nov", value: 918 },
    { label: "Dec", value: 884 },
    { label: "Jan", value: 902 },
    { label: "Feb", value: 948 },
    { label: "Mar", value: 926 },
    { label: "Apr", value: 958 },
    { label: "May", value: 942 },
  ],
  MSFT: [
    { label: "Jun", value: 456 },
    { label: "Jul", value: 449 },
    { label: "Aug", value: 438 },
    { label: "Sep", value: 431 },
    { label: "Oct", value: 417 },
    { label: "Nov", value: 409 },
    { label: "Dec", value: 398 },
    { label: "Jan", value: 405 },
    { label: "Feb", value: 413 },
    { label: "Mar", value: 427 },
    { label: "Apr", value: 418 },
    { label: "May", value: 421 },
  ],
  AAPL: [
    { label: "Jun", value: 213 },
    { label: "Jul", value: 209 },
    { label: "Aug", value: 203 },
    { label: "Sep", value: 196 },
    { label: "Oct", value: 189 },
    { label: "Nov", value: 184 },
    { label: "Dec", value: 187 },
    { label: "Jan", value: 191 },
    { label: "Feb", value: 195 },
    { label: "Mar", value: 199 },
    { label: "Apr", value: 201 },
    { label: "May", value: 198.7 },
  ],
  "0700.HK": [
    { label: "Jun", value: 356 },
    { label: "Jul", value: 348 },
    { label: "Aug", value: 338 },
    { label: "Sep", value: 331 },
    { label: "Oct", value: 322 },
    { label: "Nov", value: 312 },
    { label: "Dec", value: 305 },
    { label: "Jan", value: 309 },
    { label: "Feb", value: 314 },
    { label: "Mar", value: 321 },
    { label: "Apr", value: 316 },
    { label: "May", value: 318.2 },
  ],
  "600519.SH": [
    { label: "Jun", value: 1888 },
    { label: "Jul", value: 1856 },
    { label: "Aug", value: 1812 },
    { label: "Sep", value: 1768 },
    { label: "Oct", value: 1706 },
    { label: "Nov", value: 1662 },
    { label: "Dec", value: 1648 },
    { label: "Jan", value: 1672 },
    { label: "Feb", value: 1708 },
    { label: "Mar", value: 1726 },
    { label: "Apr", value: 1743 },
    { label: "May", value: 1736 },
  ],
};

export function getQuote(ticker: string): SymbolQuote {
  return quoteMap[ticker] ?? quoteMap.NVDA;
}

export function getFundamentals(ticker: string): SymbolFundamentals {
  return fundamentalsMap[ticker] ?? fundamentalsMap.NVDA;
}

export function getEvents(ticker: string): SymbolEvent[] {
  return selectEventRail(eventsMap[ticker] ?? eventsMap.NVDA);
}

export function getEventDigest(ticker: string): SymbolEventDigest {
  return eventDigestMap[ticker] ?? eventDigestMap.NVDA;
}

export function getSentiment(ticker: string): SymbolSentiment {
  return sentimentMap[ticker] ?? sentimentMap.NVDA;
}

export function getTrendNarrative(ticker: string): SymbolTrendNarrative {
  return trendNarrativeMap[ticker] ?? trendNarrativeMap.NVDA;
}

export function getPriceSeries(ticker: string): PriceSeriesPoint[] {
  return priceSeriesMap[ticker] ?? priceSeriesMap.NVDA;
}
