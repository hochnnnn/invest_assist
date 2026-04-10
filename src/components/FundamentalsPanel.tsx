import { useI18n } from "../context/SettingsContext";
import { SymbolFundamentals } from "../types";

interface FundamentalsPanelProps {
  fundamentals: SymbolFundamentals;
}

export function FundamentalsPanel({ fundamentals }: FundamentalsPanelProps) {
  const { t } = useI18n();
  const relativeValuationLabel = fundamentals.valuation.pbRatio
    ? "PB"
    : fundamentals.valuation.psRatio
      ? "PS"
      : t("fundamentals.relativeValuation");

  const sections = [
    {
      title: t("fundamentals.section.valuation"),
      items: [
        { label: t("fundamentals.marketCap"), value: fundamentals.profile.marketCap },
        { label: t("fundamentals.peTtm"), value: fundamentals.valuation.peTtm },
        { label: t("fundamentals.peForward"), value: fundamentals.valuation.peForward },
        {
          label: relativeValuationLabel,
          value: fundamentals.valuation.pbRatio ?? fundamentals.valuation.psRatio,
        },
        {
          label: t("fundamentals.dividendYield"),
          value: fundamentals.valuation.dividendYield,
        },
        {
          label: t("fundamentals.valuationPercentile"),
          value: fundamentals.valuation.valuationPercentile,
        },
      ],
    },
    {
      title: t("fundamentals.section.growth"),
      items: [
        { label: t("fundamentals.revenueGrowth"), value: fundamentals.growth.revenueGrowth },
        {
          label: t("fundamentals.netIncomeGrowth"),
          value: fundamentals.growth.netIncomeGrowth,
        },
        { label: t("fundamentals.grossMargin"), value: fundamentals.growth.grossMargin },
        { label: t("fundamentals.roe"), value: fundamentals.growth.roe },
        { label: t("fundamentals.freeCashFlow"), value: fundamentals.growth.freeCashFlow },
      ],
    },
    {
      title: t("fundamentals.section.health"),
      items: [
        { label: t("fundamentals.debtRatio"), value: fundamentals.health.debtRatio },
        { label: t("fundamentals.cashBuffer"), value: fundamentals.health.cashBuffer },
        { label: t("fundamentals.goodwillRatio"), value: fundamentals.health.goodwillRatio },
        { label: t("fundamentals.dso"), value: fundamentals.health.dso },
      ],
    },
    {
      title: t("fundamentals.section.expectation"),
      items: [
        { label: t("fundamentals.targetPrice"), value: fundamentals.expectation.targetPrice },
        {
          label: t("fundamentals.impliedReturn"),
          value: fundamentals.expectation.impliedReturn,
        },
        { label: t("fundamentals.ratingMix"), value: fundamentals.expectation.ratingMix },
        { label: t("fundamentals.holderFlow"), value: fundamentals.expectation.holderFlow },
      ],
    },
  ];

  return (
    <section className="panel fundamentals-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{t("fundamentals.eyebrow")}</p>
          <h2>{t("fundamentals.title")}</h2>
        </div>
      </div>
      <div className="fundamentals-summary-card">
        <div className="fundamentals-summary-meta">
          <span>{t("fundamentals.industry")}</span>
          <strong>{t(fundamentals.profile.industryKey)}</strong>
        </div>
        <p className="fundamentals-copy">{t(fundamentals.summaryKey)}</p>
        <div className="tag-row fundamentals-priority-tags">
          <span className="tag-pill tag-pill-accent">
            {t(fundamentals.profile.positioningTagKey)}
          </span>
          <span className="tag-pill tag-pill-muted-strong">
            {t(fundamentals.valuation.valuationTagKey)}
          </span>
        </div>
        <div className="tag-row">
          {fundamentals.profile.tagKeys.map((tagKey) => (
            <span key={tagKey} className="tag-pill">
              {t(tagKey)}
            </span>
          ))}
        </div>
      </div>
      <div className="fundamentals-section-grid">
        {sections.map((section) => (
          <section key={section.title} className="fundamentals-section-card">
            <div className="fundamentals-section-heading">
              <h3>{section.title}</h3>
            </div>
            <div className="fundamentals-grid">
              {section.items.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value ?? t("fundamentals.notAvailable")}</strong>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
