import { SymbolFundamentals, SymbolQuote } from "../types";

interface KeyMetricsPanelProps {
  quote: SymbolQuote;
  fundamentals: SymbolFundamentals;
}

export function KeyMetricsPanel({
  quote,
  fundamentals,
}: KeyMetricsPanelProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Key Numbers</p>
          <h2>关键指标</h2>
        </div>
      </div>
      <div className="metrics-grid">
        <div className="metric-card">
          <span>振幅</span>
          <strong>{fundamentals.amplitude}</strong>
        </div>
        <div className="metric-card">
          <span>换手率</span>
          <strong>{fundamentals.turnoverRate}</strong>
        </div>
        <div className="metric-card">
          <span>PE</span>
          <strong>{fundamentals.peRatio}</strong>
        </div>
        <div className="metric-card">
          <span>PB</span>
          <strong>{fundamentals.pbRatio}</strong>
        </div>
        <div className="metric-card">
          <span>最高</span>
          <strong>{quote.high}</strong>
        </div>
        <div className="metric-card">
          <span>最低</span>
          <strong>{quote.low}</strong>
        </div>
      </div>
    </section>
  );
}
