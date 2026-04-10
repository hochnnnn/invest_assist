import { WatchlistGroup, WatchlistItem } from "../types";

interface WatchlistSidebarProps {
  items: WatchlistItem[];
  activeTicker: string;
  onSelectTicker: (ticker: string) => void;
}

const groups: WatchlistGroup[] = ["Core", "AI", "Dividend"];

export function WatchlistSidebar({
  items,
  activeTicker,
  onSelectTicker,
}: WatchlistSidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">PM</div>
        <div>
          <p className="eyebrow">Workspace</p>
          <h2>自选看板</h2>
        </div>
      </div>

      <label className="sidebar-search" aria-label="Watchlist search">
        <span>Quick find</span>
        <input placeholder="Add or search..." readOnly aria-label="Add or search" />
      </label>

      <div className="sidebar-groups" aria-label="Watchlist groups">
        {groups.map((group) => (
          <button key={group} type="button" className="group-pill">
            {group}
          </button>
        ))}
      </div>

      <div className="watchlist">
        {items.map((item) => {
          const isPositive = item.change >= 0;
          const isActive = item.ticker === activeTicker;

          return (
            <button
              key={item.ticker}
              type="button"
              className={`watchlist-item ${isActive ? "is-active" : ""}`}
              onClick={() => onSelectTicker(item.ticker)}
            >
              <div>
                <strong>{item.ticker}</strong>
                <span>{item.name}</span>
              </div>
              <div className={isPositive ? "price-up" : "price-down"}>
                <strong>{item.price.toFixed(2)}</strong>
                <span>
                  {item.changePercent > 0 ? "+" : ""}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
