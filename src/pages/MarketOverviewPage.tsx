import { FocusListPanel } from "../components/FocusListPanel";
import { IndexCardGrid } from "../components/IndexCardGrid";
import { MacroCalendarPanel } from "../components/MacroCalendarPanel";
import { MarketPulsePanel } from "../components/MarketPulsePanel";
import { useI18n } from "../context/SettingsContext";
import { useMarketOverviewContext } from "../context/MarketOverviewContext";

export function MarketOverviewPage() {
  const { t } = useI18n();
  const { data, loading, error } = useMarketOverviewContext();

  if (loading && !data) {
    return (
      <div className="page">
        <section className="panel">
          <p>{t("overview.title")}</p>
          <p>Loading market overview...</p>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <section className="panel">
          <p>{t("overview.title")}</p>
          <p>{error}</p>
        </section>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const focusItems = data.watchlist.filter((item) => data.recentSymbols.includes(item.ticker));

  return (
    <div className="page">
      <section className="hero-banner">
        <div>
          <p className="eyebrow">{t("overview.eyebrow")}</p>
          <h2>{t("overview.title")}</h2>
          <p>{t("overview.copy")}</p>
        </div>
        <div className="hero-stats">
          <div>
            <span>{t("overview.trackedSymbols")}</span>
            <strong>{data.watchlist.length}</strong>
          </div>
          <div>
            <span>{t("overview.todayEvents")}</span>
            <strong>{data.macroEvents.filter((event) => event.dayLabel === "today").length}</strong>
          </div>
        </div>
      </section>

      <IndexCardGrid indexes={data.marketIndexes} />

      <div className="overview-grid">
        <MacroCalendarPanel events={data.macroEvents} />
        <MarketPulsePanel pulse={data.marketPulse} />
      </div>

      <FocusListPanel items={focusItems} />
    </div>
  );
}
