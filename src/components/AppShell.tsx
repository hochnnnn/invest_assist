import { Outlet, useNavigate, useParams } from "react-router-dom";
import { watchlist } from "../data/mockData";
import { SettingsDrawer } from "./SettingsDrawer";
import { TopBar } from "./TopBar";
import { WatchlistSidebar } from "./WatchlistSidebar";

export function AppShell() {
  const navigate = useNavigate();
  const params = useParams();
  const activeTicker = params.ticker ?? watchlist[0].ticker;

  return (
    <div className="app-frame">
      <div className="app-backdrop" />
      <WatchlistSidebar
        items={watchlist}
        activeTicker={activeTicker}
        onSelectTicker={(ticker) => navigate(`/symbol/${ticker}`)}
      />
      <main className="workspace">
        <TopBar />
        <Outlet />
      </main>
      <SettingsDrawer />
    </div>
  );
}
