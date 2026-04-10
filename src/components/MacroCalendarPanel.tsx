import { MacroEvent } from "../types";

interface MacroCalendarPanelProps {
  events: MacroEvent[];
}

export function MacroCalendarPanel({ events }: MacroCalendarPanelProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Calendar</p>
          <h2>宏观日历</h2>
        </div>
        <span className="panel-caption">
          Today and this week, sorted for awareness rather than depth.
        </span>
      </div>

      <div className="calendar-list">
        {events.map((event) => (
          <article key={event.id} className="calendar-item">
            <div className="calendar-time">
              <strong>{event.time}</strong>
              <span>{event.dayLabel}</span>
            </div>
            <div className="calendar-content">
              <h3>{event.title}</h3>
              <p>{event.market}</p>
            </div>
            <span className={`importance-pill importance-${event.importance.toLowerCase()}`}>
              {event.importance}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
