import Fastify from "fastify";
import {
  getEventDigest,
  getEvents,
  getFundamentals,
  getPriceSeries,
  getQuote,
  getSentiment,
  getTrendNarrative,
  macroEvents,
  marketIndexes,
  marketPulse,
  recentSymbols,
  watchlist,
} from "../src/data/mockData";
import type {
  HealthResponse,
  MarketOverviewResponse,
  SymbolDetailResponse,
} from "./contracts";

export const apiServiceName = "invest-assist-api";

export function buildApiServer() {
  const app = Fastify({
    logger: false,
  });

  app.get<{ Reply: HealthResponse }>("/api/health", async () => ({
    ok: true,
    service: apiServiceName,
    uptime: process.uptime(),
  }));

  app.get<{ Reply: MarketOverviewResponse }>("/api/market/overview", async () => ({
    watchlist,
    marketIndexes,
    macroEvents,
    marketPulse,
    recentSymbols,
  }));

  app.get<{ Params: { ticker: string }; Reply: SymbolDetailResponse }>(
    "/api/symbols/:ticker",
    async (request) => {
      const { ticker } = request.params;
      const quote = getQuote(ticker);
      const resolvedTicker = quote.ticker;

      return {
        ticker: resolvedTicker,
        quote,
        fundamentals: getFundamentals(ticker),
        sentiment: getSentiment(ticker),
        trendNarrative: getTrendNarrative(ticker),
        events: getEvents(ticker),
        eventDigest: getEventDigest(ticker),
        priceSeries: getPriceSeries(ticker),
      };
    },
  );

  return app;
}

export async function startApiServer({
  host = "127.0.0.1",
  port = 3002,
}: {
  host?: string;
  port?: number;
} = {}) {
  const app = buildApiServer();

  try {
    await app.listen({ host, port });
    return app;
  } catch (error) {
    await app.close();
    throw error;
  }
}
