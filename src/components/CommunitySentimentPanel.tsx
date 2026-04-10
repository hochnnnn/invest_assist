import { useMemo } from "react";
import { useI18n } from "../context/SettingsContext";
import { SymbolSentiment } from "../types";

interface CommunitySentimentPanelProps {
  sentiment: SymbolSentiment;
}

export function CommunitySentimentPanel({
  sentiment,
}: CommunitySentimentPanelProps) {
  const { t } = useI18n();

  const panicPath = useMemo(() => {
    const values = sentiment.panic.history.map((point) => point.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    return sentiment.panic.history
      .map((point, index) => {
        const x = (index / (sentiment.panic.history.length - 1 || 1)) * 100;
        const y = 56 - ((point.value - min) / range) * 40;
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, [sentiment.panic.history]);

  const panicDeltaTone =
    sentiment.panic.dailyChange > 0
      ? "price-up"
      : sentiment.panic.dailyChange < 0
        ? "price-down"
        : "sentiment-delta-neutral";
  const panicDeltaPrefix = sentiment.panic.dailyChange > 0 ? "+" : "";

  const distributionStats = [
    {
      key: "sentiment.bullishShare",
      value: sentiment.distribution.bullishPercent,
      className: "sentiment-segment-bullish",
    },
    {
      key: "sentiment.cautiousShare",
      value: sentiment.distribution.cautiousPercent,
      className: "sentiment-segment-cautious",
    },
    {
      key: "sentiment.neutralShare",
      value: sentiment.distribution.neutralPercent,
      className: "sentiment-segment-neutral",
    },
  ];

  return (
    <section className="panel sentiment-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{t("sentiment.eyebrow")}</p>
          <h2>{t("sentiment.title")}</h2>
        </div>
      </div>

      <section className="sentiment-section sentiment-overall-card">
        <span className="sentiment-section-label">{t("sentiment.section.overall")}</span>
        <strong className="sentiment-overall-statement">
          {t(sentiment.overall.stanceKey)}
        </strong>
        <p className="sentiment-overall-evidence">{t(sentiment.overall.evidenceKey)}</p>
      </section>

      <section className="sentiment-section sentiment-distribution-card">
        <div className="sentiment-section-header">
          <span className="sentiment-section-label">
            {t("sentiment.section.distribution")}
          </span>
        </div>

        <div className="sentiment-distribution-bar" aria-hidden="true">
          {distributionStats.map((item) => (
            <div
              key={item.key}
              className={`sentiment-distribution-segment ${item.className}`}
              style={{ width: `${item.value}%` }}
            />
          ))}
        </div>

        <div className="sentiment-distribution-stats">
          {distributionStats.map((item) => (
            <div key={item.key} className="sentiment-distribution-stat">
              <span>{t(item.key)}</span>
              <strong>{item.value}%</strong>
            </div>
          ))}
        </div>

        <div className="sentiment-opinion-columns">
          <div className="sentiment-opinion-card">
            <span className="sentiment-opinion-label">{t("sentiment.bullishViews")}</span>
            <ul>
              {sentiment.distribution.bullishViewKeys.map((viewKey) => (
                <li key={viewKey}>{t(viewKey)}</li>
              ))}
            </ul>
          </div>
          <div className="sentiment-opinion-card">
            <span className="sentiment-opinion-label">{t("sentiment.bearishViews")}</span>
            <ul>
              {sentiment.distribution.bearishViewKeys.map((viewKey) => (
                <li key={viewKey}>{t(viewKey)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sentiment-section sentiment-panic-card">
        <span className="sentiment-section-label">{t("sentiment.section.panic")}</span>
        <div className="sentiment-panic-header">
          <div className="sentiment-panic-score">
            <span>{t("sentiment.panicScore")}</span>
            <strong>{sentiment.panic.score}</strong>
          </div>
          <div className="sentiment-panic-meta">
            <div>
              <span>{t("sentiment.dailyChange")}</span>
              <strong className={panicDeltaTone}>
                {panicDeltaPrefix}
                {sentiment.panic.dailyChange}
              </strong>
            </div>
            <div>
              <span>{t("sentiment.panicState")}</span>
              <strong>{t(sentiment.panic.stateKey)}</strong>
            </div>
          </div>
        </div>

        <p className="sentiment-panic-reason">{t(sentiment.panic.reasonKey)}</p>

        <div className="sentiment-panic-trend">
          <span className="sentiment-panic-trend-label">
            {t("sentiment.panicTrendLabel")}
          </span>
          <svg
            viewBox="0 0 100 60"
            aria-label={`${sentiment.ticker} ${t("sentiment.panicTrendLabel")}`}
          >
            <defs>
              <linearGradient id="sentimentPanicFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(52, 115, 246, 0.26)" />
                <stop offset="100%" stopColor="rgba(52, 115, 246, 0.04)" />
              </linearGradient>
            </defs>
            <path d={`${panicPath} L 100 60 L 0 60 Z`} fill="url(#sentimentPanicFill)" />
            <path d={panicPath} className="sentiment-panic-line" />
          </svg>
          <div className="sentiment-panic-axis">
            <span>{t("sentiment.periodStart")}</span>
            <span>{t("sentiment.periodEnd")}</span>
          </div>
        </div>
      </section>
    </section>
  );
}
