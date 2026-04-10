import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { watchlist } from "../data/mockData";
import { TopBar } from "./TopBar";
import { WatchlistSidebar } from "./WatchlistSidebar";

export function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const activeTicker = params.ticker ?? watchlist[0].ticker;

  const handleTickerSelect = (ticker: string) => {
    if (location.pathname === "/") {
      navigate(`/symbol/${ticker}`);
      return;
    }
    navigate(`/symbol/${ticker}`);
  };

  return (
    <div className="app-frame">
      <div className="app-backdrop" />
      <WatchlistSidebar
        items={watchlist}
        activeTicker={activeTicker}
        onSelectTicker={handleTickerSelect}
      />
      <main className="workspace">
        <TopBar />
        <Outlet />
      </main>
    </div>
  );
}
