import { useI18n } from "../context/SettingsContext";
import { SymbolFundamentals } from "../types";

interface FundamentalsPanelProps {
  fundamentals: SymbolFundamentals;
}

export function FundamentalsPanel({ fundamentals }: FundamentalsPanelProps) {
  const { t } = useI18n();

  return (
    <section className="panel fundamentals-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{t("fundamentals.eyebrow")}</p>
          <h2>{t("fundamentals.title")}</h2>
        </div>
      </div>
      <p className="fundamentals-copy">{t(fundamentals.summaryKey)}</p>
      <div className="fundamentals-grid">
        <div>
          <span>{t("fundamentals.industry")}</span>
          <strong>{t(fundamentals.industryKey)}</strong>
        </div>
        <div>
          <span>{t("fundamentals.marketCap")}</span>
          <strong>{fundamentals.marketCap}</strong>
        </div>
        <div>
          <span>{t("fundamentals.dividendYield")}</span>
          <strong>{fundamentals.dividendYield}</strong>
        </div>
      </div>
      <div className="tag-row">
        {fundamentals.tagKeys.map((tagKey) => (
          <span key={tagKey} className="tag-pill">
            {t(tagKey)}
          </span>
        ))}
      </div>
    </section>
  );
}
