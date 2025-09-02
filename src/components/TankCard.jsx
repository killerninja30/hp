import React from "react";

function percent(filled, capacity) {
  if (!capacity) return 0;
  return Math.max(0, Math.min(100, Math.round((filled / capacity) * 100)));
}

export default function TankCard({ tank, onClick }) {
  const p = percent(tank.filled, tank.capacity);
  return (
    <button className="tank" onClick={() => onClick(tank)} title={`Open ${tank.name}`}>
      <div className="tank-liquid" style={{ height: `${p}%` }} />
      <div className="tank-label">{tank.name}</div>
      <div className="tank-capacity">
        {tank.filled}/{tank.capacity} L
      </div>
      <div className="tank-percent">{p}%</div>
    </button>
  );
}
