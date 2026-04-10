import { useMemo } from "react";
import { useI18n } from "../context/SettingsContext";
import { PriceSeriesPoint, SymbolQuote, SymbolTrendNarrative } from "../types";

interface PriceChartPanelProps {
  quote: SymbolQuote;
  trendNarrative: SymbolTrendNarrative;
  getSeries: () => PriceSeriesPoint[];
}

export function PriceChartPanel({
  quote,
  trendNarrative,
  getSeries,
}: PriceChartPanelProps) {
  const { t } = useI18n();
  const series = getSeries();

  const chartPath = useMemo(() => {
    const values = series.map((point) => point.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    return series
      .map((point, index) => {
        const x = (index / (series.length - 1 || 1)) * 100;
        const y = 100 - ((point.value - min) / range) * 80 - 10;
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, [series]);

  const isPositive = quote.change >= 0;
  const marketStats = [
    { label: t("chart.latestPrice"), value: quote.price.toFixed(2) },
    {
      label: t("chart.changePercent"),
      value: `${isPositive ? "+" : ""}${quote.changePercent.toFixed(2)}%`,
      tone: isPositive ? "price-up" : "price-down",
    },
    { label: t("quote.turnover"), value: quote.turnover },
    { label: t("quote.volume"), value: quote.volume },
  ];

  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{t("chart.eyebrow")}</p>
          <h2>{t("chart.title")}</h2>
        </div>
      </div>

      <div className="chart-shell">
        <div className="chart-stat-strip">
          {marketStats.map((stat) => (
            <div key={stat.label} className="chart-stat-item">
              <span>{stat.label}</span>
              <strong className={stat.tone}>{stat.value}</strong>
            </div>
          ))}
        </div>
        <div className="chart-summary">
          <span>{t("chart.trendSummaryLabel")}</span>
          <p>{t(trendNarrative.trendSummaryKey)}</p>
        </div>
        <svg viewBox="0 0 100 100" aria-label={`${quote.ticker} 1Y chart`}>
          <defs>
            <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(52, 115, 246, 0.32)" />
              <stop offset="100%" stopColor="rgba(52, 115, 246, 0.02)" />
            </linearGradient>
          </defs>
          <path d={`${chartPath} L 100 100 L 0 100 Z`} fill="url(#chartFill)" />
          <path d={chartPath} className="chart-line" />
        </svg>
        <div className="chart-axis">
          {series.map((point) => (
            <span key={point.label}>{point.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
