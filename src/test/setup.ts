import "@testing-library/jest-dom";
import { afterEach, beforeEach, vi } from "vitest";
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
} from "../data/mockData";

function buildResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = new URL(
        typeof input === "string" || input instanceof URL ? input.toString() : input.url,
        "http://127.0.0.1",
      );

      if (url.pathname === "/api/health") {
        return buildResponse({
          ok: true,
          service: "invest-assist-api",
          uptime: 1,
        });
      }

      if (url.pathname === "/api/market/overview") {
        return buildResponse({
          watchlist,
          marketIndexes,
          macroEvents,
          marketPulse,
          recentSymbols,
        });
      }

      if (url.pathname.startsWith("/api/symbols/")) {
        const ticker = decodeURIComponent(url.pathname.replace("/api/symbols/", ""));
        const quote = getQuote(ticker);
        const resolvedTicker = quote.ticker;

        return buildResponse({
          ticker: resolvedTicker,
          quote,
          fundamentals: getFundamentals(ticker),
          sentiment: getSentiment(ticker),
          trendNarrative: getTrendNarrative(ticker),
          events: getEvents(ticker),
          eventDigest: getEventDigest(ticker),
          priceSeries: getPriceSeries(ticker),
        });
      }

      return buildResponse({ message: "Not Found" }, 404);
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});
