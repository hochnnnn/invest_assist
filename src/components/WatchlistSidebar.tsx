import { useI18n } from "../context/SettingsContext";
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
  const { t } = useI18n();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">PM</div>
        <div>
          <p className="eyebrow">{t("sidebar.eyebrow")}</p>
          <h2>{t("sidebar.title")}</h2>
        </div>
      </div>

      <label className="sidebar-search" aria-label={t("sidebar.searchLabel")}>
        <span>{t("sidebar.searchLabel")}</span>
        <input
          placeholder={t("sidebar.searchPlaceholder")}
          readOnly
          aria-label={t("sidebar.searchPlaceholder")}
        />
      </label>

      <div className="sidebar-groups" aria-label={t("sidebar.groups")}>
        {groups.map((group) => (
          <button key={group} type="button" className="group-pill">
            {t(`watchlist.group.${group}`)}
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
                <span>{t(item.nameKey)}</span>
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
