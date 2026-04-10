import { useEffect, useState } from "react";
import { apiClient } from "./client";
import type { MarketOverviewResponse } from "./contracts";
import type { ResourceState } from "./state";

const initialState: ResourceState<MarketOverviewResponse> = {
  data: null,
  loading: true,
  error: null,
};

export function useMarketOverview() {
  const [state, setState] = useState<ResourceState<MarketOverviewResponse>>(initialState);

  useEffect(() => {
    const controller = new AbortController();

    setState(initialState);

    apiClient
      .getMarketOverview(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setState({
            data,
            loading: false,
            error: null,
          });
        }
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : "Failed to load market overview",
          });
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return state;
}
