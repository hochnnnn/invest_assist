import { useI18n } from "../context/SettingsContext";
import { SymbolFundamentals, SymbolQuote } from "../types";

interface KeyMetricsPanelProps {
  quote: SymbolQuote;
  fundamentals: SymbolFundamentals;
}

export function KeyMetricsPanel({
  quote,
  fundamentals,
}: KeyMetricsPanelProps) {
  const { t } = useI18n();

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{t("metrics.eyebrow")}</p>
          <h2>{t("metrics.title")}</h2>
        </div>
      </div>
      <div className="metrics-grid">
        <div className="metric-card">
          <span>{t("metrics.amplitude")}</span>
          <strong>{fundamentals.amplitude}</strong>
        </div>
        <div className="metric-card">
          <span>{t("metrics.turnoverRate")}</span>
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
          <span>{t("metrics.high")}</span>
          <strong>{quote.high}</strong>
        </div>
        <div className="metric-card">
          <span>{t("metrics.low")}</span>
          <strong>{quote.low}</strong>
        </div>
      </div>
    </section>
  );
}
