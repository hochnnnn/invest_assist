import {
  macroEvents,
  marketIndexes,
  marketPulse,
  recentSymbols,
  watchlist,
} from "../data/mockData";
import { FocusListPanel } from "../components/FocusListPanel";
import { IndexCardGrid } from "../components/IndexCardGrid";
import { MacroCalendarPanel } from "../components/MacroCalendarPanel";
import { MarketPulsePanel } from "../components/MarketPulsePanel";

export function MarketOverviewPage() {
  const focusItems = watchlist.filter((item) => recentSymbols.includes(item.ticker));

  return (
    <div className="page">
      <section className="hero-banner">
        <div>
          <p className="eyebrow">Opening View</p>
          <h2>先看市场，再切到你关心的标的</h2>
          <p>
            首页聚焦主要指数、宏观事件与市场温度，让你先判断环境，再快速跳转到单个标的的详情工作台。
          </p>
        </div>
        <div className="hero-stats">
          <div>
            <span>Tracked Symbols</span>
            <strong>{watchlist.length}</strong>
          </div>
          <div>
            <span>Today Events</span>
            <strong>{macroEvents.filter((event) => event.dayLabel === "Today").length}</strong>
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
