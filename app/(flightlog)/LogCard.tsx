import { useState, useEffect } from "react";
import LogItem from "./LogItem";

type FlightLog = {
  passengerName: string;
  airport: string;
  timestamp: number;
  type: "departure" | "arrival";
};

type LogCardProps = {
  data: FlightLog[];
};

function LogCard({data}: LogCardProps) {
  if (!data || data.length === 0) {
    return <div>No flight logs</div>;
  }
 
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 4,
      }}
    >
      <div
        style={{
          display: "flex",
          marginBottom: 4,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        <span style={{ flex: 1 }}>Passenger Name</span>
        <span style={{ flex: 1 }}>Airport</span>
        <span style={{ flex: 1 }}>Timestamp</span>
        <span style={{ flex: 1 }}>Type</span>
      </div>
      {data.map((item,index) => (
          <LogItem
          key={`${item.passengerName}-${index}`}
          item={item}
        />      ))}
    </div>
  );
}

export default LogCard;
