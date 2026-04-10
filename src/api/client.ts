import type {
  MarketOverviewResponse,
  SymbolDetailResponse,
} from "./contracts";

const API_BASE_URL = "/api";

async function requestJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(body || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  getMarketOverview(signal?: AbortSignal) {
    return requestJson<MarketOverviewResponse>("/market/overview", signal);
  },
  getSymbolDetail(ticker: string, signal?: AbortSignal) {
    return requestJson<SymbolDetailResponse>(`/symbols/${encodeURIComponent(ticker)}`, signal);
  },
};
