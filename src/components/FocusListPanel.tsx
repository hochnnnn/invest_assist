import { useNavigate } from "react-router-dom";
import { useI18n } from "../context/SettingsContext";
import { WatchlistItem } from "../types";

interface FocusListPanelProps {
  items: WatchlistItem[];
}

export function FocusListPanel({ items }: FocusListPanelProps) {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{t("focus.eyebrow")}</p>
          <h2>{t("focus.title")}</h2>
        </div>
        <span className="panel-caption">{t("focus.caption")}</span>
      </div>
      <div className="focus-list">
        {items.map((item) => (
          <button
            key={item.ticker}
            type="button"
            className="focus-row"
            onClick={() => navigate(`/symbol/${item.ticker}`)}
          >
            <div>
              <strong>{t(item.nameKey)}</strong>
              <span>{item.ticker}</span>
            </div>
            <div className={item.change >= 0 ? "price-up" : "price-down"}>
              <strong>{item.price.toFixed(2)}</strong>
              <span>
                {item.changePercent > 0 ? "+" : ""}
                {item.changePercent.toFixed(2)}%
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
