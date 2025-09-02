import React from "react";
import DonutChart from "./DonutChart";
import EventSection from "./EventSection";

function percent(filled, capacity) {
  if (!capacity) return 0;
  return Math.max(0, Math.min(100, Math.round((filled / capacity) * 100)));
}

const EVENT_TYPES = [
  "Filling line paused",
  "Maintenance",
  "Inspection",
  "Cleaning",
  "Other",
  "QC Check",
  "Lid Press",
  "Quality Issue paint"
];

export default function TankModal({ tank, onClose, onEventTrigger }) {
  const filled = tank?.filled ?? 0;
  const capacity = tank?.capacity ?? 1;
  const currentHourLitres = tank?.currentHourLitres ?? 0;
  const previousHourLitres = tank?.previousHourLitres ?? 0;
  const currentMax = Math.max(currentHourLitres, previousHourLitres, capacity);

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="details-top">
          {/* Tank */}
          <div className="details-tank">
            <div className="tank tank-large">
              <div
                className="tank-liquid"
                style={{ height: `${percent(filled, capacity)}%` }}
              />
              <div className="tank-label">{tank.name}</div>
              <div className="tank-capacity">
                {filled}/{capacity} L
              </div>
              <div className="tank-percent tank-percent-large">
                {percent(filled, capacity)}%
              </div>
            </div>
          </div>

          {/* Donut Charts */}
          <div className="details-donuts">
            <DonutChart value={currentHourLitres} max={currentMax} label="This hour" />
            <DonutChart value={previousHourLitres} max={currentMax} label="Previous hour" />
          </div>

          {/* Event history */}
          <EventSection events={tank.events || []} />
        </div>

        {/* Event buttons below */}
        <div className="event-buttons">
          {EVENT_TYPES.map(ev => (
            <button
              key={ev}
              onClick={() => onEventTrigger(tank.id, ev)}
              className="event-btn"
            >
              {ev}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
