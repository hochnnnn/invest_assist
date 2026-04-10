// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { apiServiceName, buildApiServer } from "./server";

describe("api server", () => {
  let app: ReturnType<typeof buildApiServer> | undefined;

  beforeEach(() => {
    app = buildApiServer();
  });

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it("serves a health endpoint", async () => {
    const response = await app!.inject({
      method: "GET",
      url: "/api/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      ok: true,
      service: apiServiceName,
    });
  });

  it("serves the market overview payload", async () => {
    const response = await app!.inject({
      method: "GET",
      url: "/api/market/overview",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json() as {
      watchlist: Array<{ ticker: string }>;
      marketIndexes: Array<{ code: string }>;
      macroEvents: Array<{ id: string }>;
      marketPulse: { turnover: string };
      recentSymbols: string[];
    };

    expect(body.watchlist).toHaveLength(5);
    expect(body.watchlist[0]).toMatchObject({ ticker: "NVDA" });
    expect(body.marketIndexes).toHaveLength(5);
    expect(body.macroEvents).toHaveLength(4);
    expect(body.marketPulse.turnover).toBe("¥1.14T");
    expect(body.recentSymbols).toEqual(["NVDA", "MSFT", "0700.HK", "600519.SH"]);
  });

  it("serves symbol details and falls back to NVDA for unknown tickers", async () => {
    const response = await app!.inject({
      method: "GET",
      url: "/api/symbols/UNKNOWN",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json() as {
      ticker: string;
      quote: { ticker: string; price: number };
      events: Array<{ id: string }>;
      eventDigest: { todayNewsCount: number };
      priceSeries: Array<{ label: string; value: number }>;
    };

    expect(body.ticker).toBe("NVDA");
    expect(body.quote.ticker).toBe("NVDA");
    expect(body.quote.price).toBe(942.38);
    expect(body.events).toHaveLength(5);
    expect(body.eventDigest.todayNewsCount).toBe(3);
    expect(body.priceSeries).toHaveLength(12);
  });
});
