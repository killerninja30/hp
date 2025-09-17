import React, { useEffect, useState } from "react";
import tankDataRaw from "../data/tankData.json";
import TankCard from "../components/TankCard";
import TankModal from "../components/TankModal";
import "../css/QC.css";

export default function QC() {
  const [tanks, setTanks] = useState([]);
  const [activeTank, setActiveTank] = useState(null);

  useEffect(() => {
    setTanks(tankDataRaw);
  }, []);

  const closeModal = () => setActiveTank(null);

  const handleEventTrigger = (tankId, eventTitle) => {
    const now = new Date().toISOString();

    setTanks(prev =>
      prev.map(tank => {
        if (tank.id !== tankId) return tank;

        const updatedEvents = [...(tank.events || [])];

        // End previous event if ongoing
        if (updatedEvents.length > 0 && !updatedEvents[0].end) {
          updatedEvents[0] = { ...updatedEvents[0], end: now };
        }

        // Add new event
        updatedEvents.unshift({
          id: `e_${Date.now()}`,
          type: "system",
          title: eventTitle,
          start: now,
          end: null,
        });

        return { ...tank, events: updatedEvents };
      })
    );

    // Update activeTank
    setActiveTank(prev => {
      if (!prev || prev.id !== tankId) return prev;
      const updatedEvents = [...(prev.events || [])];

      if (updatedEvents.length > 0 && !updatedEvents[0].end) {
        updatedEvents[0] = { ...updatedEvents[0], end: now };
      }

      updatedEvents.unshift({
        id: `e_${Date.now()}`,
        type: "system",
        title: eventTitle,
        start: now,
        end: null,
      });

      return { ...prev, events: updatedEvents };
    });
  };

  return (
      <div className="qc-container">
    {tanks.map(tank => (
      <TankCard
        key={tank.id}
        tank={tank}
        onClick={setActiveTank} // clicking opens modal
      />
    ))}

    {activeTank && (
      <TankModal
        tank={activeTank}
        onClose={closeModal}
        onEventTrigger={handleEventTrigger}
      />
    )}
  </div>
  );
}
