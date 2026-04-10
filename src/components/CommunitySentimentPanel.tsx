import { useI18n } from "../context/SettingsContext";
import { SymbolSentiment } from "../types";

interface CommunitySentimentPanelProps {
  sentiment: SymbolSentiment;
}

export function CommunitySentimentPanel({
  sentiment,
}: CommunitySentimentPanelProps) {
  const { t } = useI18n();

  return (
    <section className="panel sentiment-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{t("sentiment.eyebrow")}</p>
          <h2>{t("sentiment.title")}</h2>
        </div>
      </div>

      <div className="sentiment-summary-card">
        <span>{t("sentiment.summaryLabel")}</span>
        <p>{t(sentiment.summaryKey)}</p>
      </div>

      <div className="sentiment-index-card">
        <div>
          <span>{t("sentiment.fearGreed")}</span>
          <strong>{t(sentiment.fearGreedLabelKey)}</strong>
        </div>
        <div className="sentiment-score-block">
          <strong>{sentiment.fearGreedScore}</strong>
          <span>{t(sentiment.trendLabelKey)}</span>
        </div>
      </div>

      <div className="sentiment-meter" aria-hidden="true">
        <div
          className="sentiment-meter-fill"
          style={{ width: `${sentiment.fearGreedScore}%` }}
        />
      </div>

      <div className="sentiment-topics">
        <span>{t("sentiment.hotTopics")}</span>
        <div className="tag-row">
          {sentiment.topicKeys.map((topicKey) => (
            <span key={topicKey} className="tag-pill sentiment-tag">
              {t(topicKey)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
