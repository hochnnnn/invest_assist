import { ChangeEvent, useEffect, useId, useMemo, useState } from "react";
import { referralConfig, subscriptionPlans } from "../data/settingsMockData";
import { useSettings } from "../context/SettingsContext";
import { AppLanguage, AppTheme } from "../types";

const languageOptions: AppLanguage[] = ["zh-CN", "en-US"];
const themeOptions: AppTheme[] = ["light", "dark"];

export function SettingsDrawer() {
  const {
    closeSettings,
    isSettingsOpen,
    language,
    setLanguage,
    setTheme,
    t,
    theme,
  } = useSettings();
  const [currentPlanId, setCurrentPlanId] = useState(
    subscriptionPlans.find((plan) => plan.isCurrent)?.id ?? subscriptionPlans[0].id,
  );
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [isSubscriptionExpanded, setIsSubscriptionExpanded] = useState(false);
  const titleId = useId();
  const uiText =
    language === "zh-CN"
      ? {
          managePlans: "管理订阅",
          hidePlans: "收起方案",
          selectLanguage: "选择语言",
        }
      : {
          managePlans: "Manage plans",
          hidePlans: "Hide plans",
          selectLanguage: "Choose language",
        };

  const currentPlan = useMemo(
    () => subscriptionPlans.find((plan) => plan.id === currentPlanId) ?? subscriptionPlans[0],
    [currentPlanId],
  );

  useEffect(() => {
    if (!isSettingsOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSettings();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeSettings, isSettingsOpen]);

  useEffect(() => {
    if (!isSettingsOpen) {
      setIsSubscriptionExpanded(false);
      setCopyState("idle");
    }
  }, [isSettingsOpen]);

  useEffect(() => {
    if (copyState !== "copied") {
      return;
    }

    const timer = window.setTimeout(() => setCopyState("idle"), 1800);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  if (!isSettingsOpen) {
    return null;
  }

  const handleCopyLink = async () => {
    await navigator.clipboard?.writeText(referralConfig.shareUrl);
    setCopyState("copied");
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as AppLanguage);
  };

  return (
    <>
      <button
        type="button"
        className="settings-overlay"
        aria-label={t("settings.close")}
        onClick={closeSettings}
      />
      <aside
        className="settings-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="settings-header">
          <div>
            <p className="eyebrow">{t("settings.title")}</p>
            <h2 id={titleId}>{t("settings.title")}</h2>
            <p className="settings-subtitle">{t("settings.subtitle")}</p>
          </div>
          <button
            type="button"
            className="settings-close"
            aria-label={t("settings.close")}
            onClick={closeSettings}
          >
            x
          </button>
        </div>

        <section className="settings-section">
          <div className="settings-row">
            <div className="settings-copy-block">
              <p className="eyebrow">{t("settings.subscription.title")}</p>
              <h3>{t("settings.subscription.title")}</h3>
              <p className="settings-value" data-testid="current-plan-summary">
                {t(currentPlan.nameKey)} · {t(currentPlan.priceLabelKey)}
              </p>
              <p className="settings-copy">{t(currentPlan.featureKeys[0])}</p>
            </div>
            <button
              type="button"
              className="settings-action is-secondary"
              data-testid="subscription-toggle"
              onClick={() => setIsSubscriptionExpanded((current) => !current)}
            >
              {isSubscriptionExpanded ? uiText.hidePlans : uiText.managePlans}
            </button>
          </div>

          {isSubscriptionExpanded ? (
            <div className="settings-subpanel" data-testid="subscription-panel">
              <div className="subscription-grid">
                {subscriptionPlans.map((plan) => {
                  const isCurrent = plan.id === currentPlanId;

                  return (
                    <article
                      key={plan.id}
                      className={`subscription-card ${isCurrent ? "is-current" : ""}`}
                    >
                      <div className="subscription-card-header">
                        <div>
                          <strong>{t(plan.nameKey)}</strong>
                          <span>{t(plan.priceLabelKey)}</span>
                        </div>
                        {isCurrent ? (
                          <span className="tag-pill settings-badge">
                            {t("settings.subscription.currentBadge")}
                          </span>
                        ) : null}
                      </div>
                      <div className="settings-list">
                        {plan.featureKeys.map((featureKey) => (
                          <span key={featureKey}>{t(featureKey)}</span>
                        ))}
                      </div>
                      <button
                        type="button"
                        className={`settings-action ${isCurrent ? "is-secondary" : ""}`}
                        data-testid={`subscription-select-${plan.id}`}
                        onClick={() => setCurrentPlanId(plan.id)}
                      >
                        {isCurrent
                          ? t("settings.subscription.currentAction")
                          : t("settings.subscription.chooseAction")}
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : null}
        </section>

        <section className="settings-section">
          <div className="settings-row">
            <div className="settings-copy-block">
              <p className="eyebrow">{t("settings.referral.title")}</p>
              <h3>{t("settings.referral.title")}</h3>
              <p className="settings-copy">{t(referralConfig.rewardTextKey)}</p>
            </div>
            <button
              type="button"
              className="settings-action"
              data-testid="referral-copy"
              onClick={handleCopyLink}
            >
              {copyState === "copied"
                ? t("settings.referral.copied")
                : t("settings.referral.copy")}
            </button>
          </div>
        </section>

        <section className="settings-section">
          <div className="settings-row">
            <div className="settings-copy-block">
              <p className="eyebrow">{t("settings.language.title")}</p>
              <h3>{t("settings.language.title")}</h3>
              <p className="settings-value">{t(`settings.language.${language}`)}</p>
              <p className="settings-copy">{t("settings.language.description")}</p>
            </div>
            <label className="settings-select-shell">
              <span className="settings-select-label">{uiText.selectLanguage}</span>
              <select
                className="settings-select"
                data-testid="settings-language-select"
                value={language}
                onChange={handleLanguageChange}
              >
                {languageOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(`settings.language.${option}`)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="settings-section">
          <div className="settings-row">
            <div className="settings-copy-block">
              <p className="eyebrow">{t("settings.theme.title")}</p>
              <h3>{t("settings.theme.title")}</h3>
              <p className="settings-value">{t(`settings.theme.${theme}`)}</p>
              <p className="settings-copy">{t("settings.theme.description")}</p>
            </div>
            <div
              className="settings-segmented"
              role="radiogroup"
              aria-label={t("settings.theme.title")}
              data-testid="theme-segmented"
            >
              {themeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={theme === option}
                  className={`settings-segment ${theme === option ? "is-active" : ""}`}
                  data-testid={`theme-option-${option}`}
                  onClick={() => setTheme(option)}
                >
                  {t(`settings.theme.${option}`)}
                </button>
              ))}
            </div>
          </div>
        </section>
      </aside>
    </>
  );
}
