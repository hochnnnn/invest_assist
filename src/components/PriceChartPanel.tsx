import { useMemo, useState } from "react";
import { PriceSeriesPeriod, PriceSeriesPoint, SymbolQuote } from "../types";

interface PriceChartPanelProps {
  quote: SymbolQuote;
  getSeries: (period: PriceSeriesPeriod) => PriceSeriesPoint[];
}

const periods: PriceSeriesPeriod[] = ["1D", "1W", "1M"];

export function PriceChartPanel({ quote, getSeries }: PriceChartPanelProps) {
  const [period, setPeriod] = useState<PriceSeriesPeriod>("1D");
  const series = getSeries(period);

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

  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Price Action</p>
          <h2>价格走势</h2>
        </div>
        <div className="period-switcher" role="tablist" aria-label="Chart period switcher">
          {periods.map((option) => (
            <button
              key={option}
              type="button"
              className={period === option ? "is-selected" : ""}
              onClick={() => setPeriod(option)}
              aria-pressed={period === option}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-shell">
        <div className="chart-summary">
          <span>Current range</span>
          <strong>
            {series[0].value.toFixed(2)} - {series[series.length - 1].value.toFixed(2)}
          </strong>
          <p className={isPositive ? "price-up" : "price-down"}>
            {isPositive ? "Trend holding above prior close" : "Price trading below prior close"}
          </p>
        </div>
        <svg viewBox="0 0 100 100" aria-label={`${quote.ticker} ${period} chart`}>
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
