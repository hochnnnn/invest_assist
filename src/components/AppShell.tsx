import { Outlet, useNavigate, useParams } from "react-router-dom";
import { MarketOverviewProvider } from "../context/MarketOverviewContext";
import { useMarketOverview } from "../api/useMarketOverview";
import { SettingsDrawer } from "./SettingsDrawer";
import { TopBar } from "./TopBar";
import { WatchlistSidebar } from "./WatchlistSidebar";

export function AppShell() {
  const navigate = useNavigate();
  const params = useParams();
  const overview = useMarketOverview();
  const activeTicker =
    params.ticker ??
    overview.data?.recentSymbols[0] ??
    overview.data?.watchlist[0]?.ticker ??
    "NVDA";
  const items = overview.data?.watchlist ?? [];

  return (
    <div className="app-frame">
      <div className="app-backdrop" />
      <WatchlistSidebar
        items={items}
        activeTicker={activeTicker}
        onSelectTicker={(ticker) => navigate(`/symbol/${ticker}`)}
      />
      <main className="workspace">
        <TopBar />
        <MarketOverviewProvider value={overview}>
          <Outlet />
        </MarketOverviewProvider>
      </main>
      <SettingsDrawer />
    </div>
  );
}
