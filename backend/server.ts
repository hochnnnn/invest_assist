import Fastify from "fastify";
import {
  getEventDigest,
  getEvents,
  getFundamentals,
  getPriceSeries,
  getQuote,
  getSentiment,
  getTrendNarrative,
} from "../src/data/mockData";
import {
  defaultMarketOverviewService,
  MarketOverviewUnavailableError,
  type MarketOverviewService,
} from "./marketOverviewService";
import type {
  HealthResponse,
  MarketOverviewResponse,
  SymbolDetailResponse,
} from "./contracts";

export const apiServiceName = "invest-assist-api";

export function buildApiServer({
  marketOverviewService = defaultMarketOverviewService,
}: {
  marketOverviewService?: MarketOverviewService;
} = {}) {
  const app = Fastify({
    logger: false,
  });

  app.get<{ Reply: HealthResponse }>("/api/health", async () => ({
    ok: true,
    service: apiServiceName,
    uptime: process.uptime(),
  }));

  app.get<{ Reply: MarketOverviewResponse | string }>(
    "/api/market/overview",
    async (_request, reply) => {
      try {
        return await marketOverviewService.getMarketOverview();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load market overview from Yahoo Finance";
        const statusCode =
          error instanceof MarketOverviewUnavailableError ? error.statusCode : 502;

        return reply.code(statusCode).type("text/plain; charset=utf-8").send(message);
      }
    },
  );

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
