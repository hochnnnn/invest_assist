import { useI18n } from "../context/SettingsContext";
import { SymbolEvent, SymbolEventDigest } from "../types";

interface RelatedEventsPanelProps {
  events: SymbolEvent[];
  digest: SymbolEventDigest;
}

export function RelatedEventsPanel({ events, digest }: RelatedEventsPanelProps) {
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
      <article className="events-digest-card" data-testid="events-digest">
        <div className="events-digest-header">
          <div>
            <p className="eyebrow">{t("events.digest.eyebrow")}</p>
            <h3>{t("events.digest.title")}</h3>
          </div>
        </div>
        <p className="events-digest-copy">{t(digest.summaryKey)}</p>
        <div className="events-digest-stats">
          <div>
            <span>{t("events.digest.todayCount")}</span>
            <strong>{digest.todayNewsCount}</strong>
          </div>
          <div>
            <span>{t("events.digest.latestUpdate")}</span>
            <strong>{t(digest.latestUpdateKey)}</strong>
          </div>
        </div>
      </article>
      <div className="related-events" data-testid="related-events-list">
        {events.map((event) => (
          <article key={event.id} className="event-card">
            <div className="event-meta">
              <span>{t(`events.type.${event.type}`)}</span>
              <strong>{t(event.timeKey)}</strong>
            </div>
            <h3>{t(event.titleKey)}</h3>
            <p>{t(event.noteKey)}</p>
            <div className="event-card-footer">
              <span className="event-source">{t(event.sourceKey)}</span>
              <span className={`impact-pill impact-${event.impact}`}>
                {t(`events.impact.${event.impact}`)}
              </span>
            </div>
            <p className="event-impact-note">{t(event.impactNoteKey)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
