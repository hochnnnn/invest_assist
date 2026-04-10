import { useI18n } from "../context/SettingsContext";
import { SymbolEvent } from "../types";

interface RelatedEventsPanelProps {
  events: SymbolEvent[];
}

export function RelatedEventsPanel({ events }: RelatedEventsPanelProps) {
  const { t } = useI18n();

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{t("events.eyebrow")}</p>
          <h2>{t("events.title")}</h2>
        </div>
        <span className="panel-caption">{t("events.caption")}</span>
      </div>
      <div className="related-events">
        {events.map((event) => (
          <article key={event.id} className="event-card">
            <div className="event-meta">
              <span>{t(`events.type.${event.type}`)}</span>
              <strong>{t(event.timeKey)}</strong>
            </div>
            <h3>{t(event.titleKey)}</h3>
            <p>{t(event.noteKey)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
