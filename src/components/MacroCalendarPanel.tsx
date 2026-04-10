import { useI18n } from "../context/SettingsContext";
import { MacroEvent } from "../types";

interface MacroCalendarPanelProps {
  events: MacroEvent[];
}

export function MacroCalendarPanel({ events }: MacroCalendarPanelProps) {
  const { t } = useI18n();

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{t("calendar.eyebrow")}</p>
          <h2>{t("calendar.title")}</h2>
        </div>
        <span className="panel-caption">{t("calendar.caption")}</span>
      </div>

      <div className="calendar-list">
        {events.map((event) => (
          <article key={event.id} className="calendar-item">
            <div className="calendar-time">
              <strong>{event.time}</strong>
              <span>{t(`calendar.day.${event.dayLabel}`)}</span>
            </div>
            <div className="calendar-content">
              <h3>{t(event.titleKey)}</h3>
              <p>{event.market}</p>
            </div>
            <span className={`importance-pill importance-${event.importance}`}>
              {t(`calendar.importance.${event.importance}`)}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
