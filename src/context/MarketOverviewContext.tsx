import { createContext, ReactNode, useContext } from "react";
import type { MarketOverviewResponse } from "../api/contracts";
import type { ResourceState } from "../api/state";

const MarketOverviewContext = createContext<ResourceState<MarketOverviewResponse> | null>(null);

export function MarketOverviewProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: ResourceState<MarketOverviewResponse>;
}) {
  return <MarketOverviewContext.Provider value={value}>{children}</MarketOverviewContext.Provider>;
}

export function useMarketOverviewContext() {
  const context = useContext(MarketOverviewContext);

  if (!context) {
    throw new Error("useMarketOverviewContext must be used within MarketOverviewProvider");
  }

  return context;
}
