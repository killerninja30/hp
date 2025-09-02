import React, { useState, useMemo } from "react";

function msToDuration(ms) {
  if (ms == null || isNaN(ms)) return "NaN";
  const secs = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const parts = [];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  if (s || parts.length === 0) parts.push(`${s}s`);
  return parts.join(" ");
}

export default function EventSection({ events, onUpdateEvent }) {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ title: "" });

  const eventOptions = [
    "Filling line paused",
    "Maintenance",
    "Inspection",
    "Cleaning",
    "Other",
  ];

  const handleEditSave = (e) => {
    e.preventDefault();
    if (!editValues.title) return;
    onUpdateEvent(editingId, editValues.title);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    onUpdateEvent(id, null); // passing null means delete
  };

  const rows = useMemo(() => {
    return (events || [])
      .sort((a, b) => new Date(b.start) - new Date(a.start))
      .map((ev) => {
        const startD = ev.start ? new Date(ev.start) : null;
        const endD = ev.end ? new Date(ev.end) : null;
        return {
          ...ev,
          startD,
          endD,
          duration: startD && endD ? msToDuration(endD - startD) : "NaN",
        };
      });
  }, [events]);

  return (
    <div className="event-list scrollable">
      {rows.length === 0 ? (
        <div className="event-empty">No events yet.</div>
      ) : (
        rows.map((ev) => (
          <div key={ev.id} className={`event-row ${ev.type}`}>
            {editingId === ev.id ? (
              <form onSubmit={handleEditSave} className="edit-form">
                <select
                  value={editValues.title}
                  onChange={(e) =>
                    setEditValues({ ...editValues, title: e.target.value })
                  }
                >
                  {eventOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div className="event-title">{ev.title}</div>
                <div className="event-meta">
                  {ev.startD ? ev.startD.toLocaleString() : "NaN"} →{" "}
                  {ev.endD ? ev.endD.toLocaleString() : "NaN"} • {ev.duration}
                </div>
                {ev.type === "manual" && (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingId(ev.id);
                        setEditValues({ title: ev.title });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(ev.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
