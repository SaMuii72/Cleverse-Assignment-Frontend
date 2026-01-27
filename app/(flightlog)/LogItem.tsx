"use client";

type FlightLog = {
  passengerName: string;
  airport: string;
  timestamp: number;
  type: "departure" | "arrival";
};

type LogItemProps = {
  item: FlightLog;
};

function LogItem({ item }: LogItemProps) {
  return (
    <div style={{ display: "flex", padding: "4px 0" }}>
      <span style={{ flex: 1 }}>{item.passengerName}</span>
      <span style={{ flex: 1 }}>{item.airport}</span>
      <span style={{ flex: 1 }}>{item.timestamp}</span>
      <span style={{ flex: 1 }}>
        {item.type === "departure" ? "Departure" : "Arrival"}
      </span>
    </div>
  );
}

export default LogItem;
