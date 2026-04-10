import { useI18n } from "../context/SettingsContext";
import { MarketIndexSnapshot } from "../types";

interface IndexCardGridProps {
  indexes: MarketIndexSnapshot[];
}

export function IndexCardGrid({ indexes }: IndexCardGridProps) {
  const { t } = useI18n();

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{t("indexes.eyebrow")}</p>
          <h2>{t("indexes.title")}</h2>
        </div>
        <span className="panel-caption">{t("indexes.caption")}</span>
      </div>
      <div className="index-grid">
        {indexes.map((index) => {
          const isPositive = index.change >= 0;

          return (
            <article key={index.code} className="index-card">
              <div className="index-card-header">
                <div>
                  <h3>{t(index.nameKey)}</h3>
                  <span>{index.code}</span>
                </div>
                <span className="region-badge">{index.region}</span>
              </div>
              <strong>{index.value.toLocaleString()}</strong>
              <div className={isPositive ? "price-up" : "price-down"}>
                <span>
                  {isPositive ? "+" : ""}
                  {index.change.toFixed(2)}
                </span>
                <span>
                  {isPositive ? "+" : ""}
                  {index.changePercent.toFixed(2)}%
                </span>
              </div>
              <p>{t(index.sessionLabelKey)}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
