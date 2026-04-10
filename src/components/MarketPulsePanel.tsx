import { useI18n } from "../context/SettingsContext";
import { MarketPulse } from "../types";

interface MarketPulsePanelProps {
  pulse: MarketPulse;
}

export function MarketPulsePanel({ pulse }: MarketPulsePanelProps) {
  const { t } = useI18n();

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{t("pulse.eyebrow")}</p>
          <h2>{t("pulse.title")}</h2>
        </div>
      </div>
      <div className="pulse-grid">
        <div className="metric-card">
          <span>{t("pulse.advancers")}</span>
          <strong>{pulse.advancers}</strong>
        </div>
        <div className="metric-card">
          <span>{t("pulse.decliners")}</span>
          <strong>{pulse.decliners}</strong>
        </div>
        <div className="metric-card">
          <span>{t("pulse.turnover")}</span>
          <strong>{pulse.turnover}</strong>
        </div>
        <div className="metric-card">
          <span>{t("pulse.riskMood")}</span>
          <strong>{t(pulse.riskMoodKey)}</strong>
        </div>
      </div>
      <div className="pulse-banner">
        <span>{t("pulse.hotTheme")}</span>
        <strong>{t(pulse.hotThemeKey)}</strong>
      </div>
    </section>
  );
}
