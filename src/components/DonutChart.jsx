import React from "react";

export default function DonutChart({ value, max, label }) {
  const radius = 48;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;
  const ratio = max > 0 ? Math.min(1, value / max) : 0;
  const dash = circumference * ratio;
  const gap = circumference - dash;

  return (
    <div className="donut-wrap">
      <svg width="120" height="120" viewBox="0 0 120 120" className="donut">
        <circle
          className="donut-track"
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth={stroke}
        />
        <circle
          className="donut-value"
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${gap}`}
          transform="rotate(-90 60 60)"
          strokeLinecap="round"
        />
        <text x="60" y="56" textAnchor="middle" className="donut-text-main">
          {Math.round(ratio * 100)}%
        </text>
        <text x="60" y="76" textAnchor="middle" className="donut-text-sub">
          {value} / {max} L
        </text>
      </svg>
      <div className="donut-label">{label}</div>
    </div>
  );
}
