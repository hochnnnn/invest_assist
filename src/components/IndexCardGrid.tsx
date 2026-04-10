import { MarketIndexSnapshot } from "../types";

interface IndexCardGridProps {
  indexes: MarketIndexSnapshot[];
}

export function IndexCardGrid({ indexes }: IndexCardGridProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Macro Pulse</p>
          <h2>主要指数</h2>
        </div>
        <span className="panel-caption">
          Track broad market direction before drilling into symbols.
        </span>
      </div>
      <div className="index-grid">
        {indexes.map((index) => {
          const isPositive = index.change >= 0;

          return (
            <article key={index.code} className="index-card">
              <div className="index-card-header">
                <div>
                  <h3>{index.name}</h3>
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
              <p>{index.sessionLabel}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
