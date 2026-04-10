import { useSettings } from "../context/SettingsContext";

export function TopBar() {
  const { isSettingsOpen, openSettings, t } = useSettings();

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{t("app.eyebrow")}</p>
        <h1>{t("app.title")}</h1>
      </div>
      <div className="topbar-meta">
        <div className="status-chip">
          <span className="status-dot" />
          {t("topbar.status")}
        </div>
        <label className="search-shell" aria-label="Global search shell">
          <span>{t("topbar.searchLabel")}</span>
          <input
            type="text"
            placeholder={t("topbar.searchPlaceholder")}
            readOnly
            aria-label={t("topbar.searchPlaceholder")}
          />
        </label>
        <button
          type="button"
          className="settings-trigger"
          data-testid="settings-open"
          aria-haspopup="dialog"
          aria-expanded={isSettingsOpen}
          aria-label={t("topbar.settings")}
          onClick={openSettings}
        >
          {t("topbar.settings")}
        </button>
        <div className="clock-card">
          <span>{t("topbar.timezone")}</span>
          <strong>15:42</strong>
        </div>
      </div>
    </header>
  );
}
