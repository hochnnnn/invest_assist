import { FocusListPanel } from "../components/FocusListPanel";
import { IndexCardGrid } from "../components/IndexCardGrid";
import { MacroCalendarPanel } from "../components/MacroCalendarPanel";
import { MarketPulsePanel } from "../components/MarketPulsePanel";
import { useI18n } from "../context/SettingsContext";
import {
  macroEvents,
  marketIndexes,
  marketPulse,
  recentSymbols,
  watchlist,
} from "../data/mockData";

export function MarketOverviewPage() {
  const { t } = useI18n();
  const focusItems = watchlist.filter((item) => recentSymbols.includes(item.ticker));

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
            <strong>{watchlist.length}</strong>
          </div>
          <div>
            <span>{t("overview.todayEvents")}</span>
            <strong>{macroEvents.filter((event) => event.dayLabel === "today").length}</strong>
          </div>
        </div>
      </section>

      <IndexCardGrid indexes={marketIndexes} />

      <div className="overview-grid">
        <MacroCalendarPanel events={macroEvents} />
        <MarketPulsePanel pulse={marketPulse} />
      </div>

      <FocusListPanel items={focusItems} />
    </div>
  );
}
