import { SymbolEvent } from "../types";

interface RelatedEventsPanelProps {
  events: SymbolEvent[];
}

export function RelatedEventsPanel({ events }: RelatedEventsPanelProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Event Rail</p>
          <h2>相关事件</h2>
        </div>
        <span className="panel-caption">
          Placeholder structure for future news, filings, and earnings feeds.
        </span>
      </div>
      <div className="related-events">
        {events.map((event) => (
          <article key={event.id} className="event-card">
            <div className="event-meta">
              <span>{event.type}</span>
              <strong>{event.time}</strong>
            </div>
            <h3>{event.title}</h3>
            <p>{event.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
