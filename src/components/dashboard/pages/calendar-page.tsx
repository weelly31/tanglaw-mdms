import { Icon } from "@/components/icon";

const dates = Array.from({ length: 35 }, (_, index) => String(index < 3 ? 28 + index : index - 2));
const events = [
  ["OCT 08", "Small Group Leaders Huddle", "9:00 AM · Taytay Community Hall", "indigo"],
  ["OCT 14", "Family Nutrition Workshop", "10:30 AM · Antipolo Center", "teal"],
  ["OCT 22", "Metro East Area Gathering", "2:00 PM · Marikina City", "rose"],
];

export default function CalendarPage() {
  return <>
    <div className="page-heading"><div><div className="eyebrow"><span className="status-dot" /> METRO EAST AREA</div><h1>SD Calendar</h1><p>Upcoming gatherings, training sessions and area activities.</p></div></div>
    <div className="calendar-layout">
      <section className="panel calendar-panel"><div className="panel-heading"><div><h2>October 2026</h2><p>Community schedule</p></div><div className="calendar-controls"><button className="pagination-button" aria-label="Previous month"><Icon name="chevron-left" size={15} /></button><button className="pagination-button" aria-label="Next month"><Icon name="chevron-right" size={15} /></button></div></div><div className="calendar-grid">{["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", ...dates].map((item, index) => <div key={`${item}-${index}`} className={`${index < 7 ? "calendar-day-label" : "calendar-day"} ${index >= 7 && Number(item) === 2 ? "calendar-today" : ""}`}><span>{item}</span>{index === 10 && <i className="event-dot event-indigo" />}{index === 18 && <i className="event-dot event-teal" />}{index === 27 && <i className="event-dot event-rose" />}</div>)}</div></section>
      <section className="panel upcoming-panel"><div className="panel-heading"><div><h2>Upcoming events</h2><p>What&apos;s next in your area</p></div></div>{events.map(([date, name, details, color]) => <div className="event-item" key={name}><div className={`event-date ${color}`}>{date}</div><div><strong>{name}</strong><span>{details}</span></div></div>)}</section>
    </div>
  </>;
}
