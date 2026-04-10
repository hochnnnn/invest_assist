import { useEffect, useState } from "react";
import { apiClient } from "./client";
import type { SymbolDetailResponse } from "./contracts";
import type { ResourceState } from "./state";

const initialState: ResourceState<SymbolDetailResponse> = {
  data: null,
  loading: true,
  error: null,
};

export function useSymbolDetail(ticker: string) {
  const [state, setState] = useState<ResourceState<SymbolDetailResponse>>(initialState);

  useEffect(() => {
    const controller = new AbortController();

    setState(initialState);

    apiClient
      .getSymbolDetail(ticker, controller.signal)
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
            error: error instanceof Error ? error.message : "Failed to load symbol detail",
          });
        }
      });

    return () => {
      controller.abort();
    };
  }, [ticker]);

  return state;
}
