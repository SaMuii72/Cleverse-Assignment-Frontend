"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
import { FlightLogService } from "../(flightlog)/fightlog.service";
import LogCard from "../(flightlog)/LogCard";
import LogForm from "../(flightlog)/LogForm";
// import BoardingPassCard from "../(boardingpass)/BoardingPassCard";
type FlightLog = {
  passengerName: string;
  airport: string;
  timestamp: number;
  type: "departure" | "arrival";
};

const flightLogService = new FlightLogService();

export default function Home() {
  const [logs, setLogs] = useState<FlightLog[]>([]);
  const [avgRoutes, setAvgRoutes] = useState<Record<string,{sum: number, count: number}>>({});
  const [printed, setPrinted] = useState(false);

  const handleAddLog = useCallback(
    (log:FlightLog) => {
      setLogs((prevLogs) => [...prevLogs, log]);
    },
    []
  );

  useEffect(() => {
    const fetch = async () => {
      const data = await flightLogService.getLogs();
      setLogs(data);
    };

    fetch();
  }, []);

  useEffect(() => {
    const routeMap: Record<string,{sum: number, count: number}> = {};
    const departureMap: Record<string, any[]> = {};
    logs.forEach((log) => {
      if (log.type === "departure") {
        if (!departureMap[log.passengerName]) {
          departureMap[log.passengerName] = [];
        }
        departureMap[log.passengerName].push(log);
      }

      if (log.type === "arrival") {
        const departures = departureMap[log.passengerName];
        if (!departures || departures.length === 0) return;

        const departure = departures.shift(); 
        const routeKey = `${departure.airport}->${log.airport}`;
        const duration = log.timestamp - departure.timestamp;

        if (duration <= 0) return;

        if (!routeMap[routeKey]) {
          routeMap[routeKey] = { sum: 0, count: 0 };
        }
        routeMap[routeKey].sum += duration;
        routeMap[routeKey].count += 1;

      }
    });
    setAvgRoutes(routeMap);
  }, [logs]); 

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next Airline!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>app/(home)/page.tsx</code>
        </p>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <div className="flex items-center justify-between">
              <h2>Flight Logs</h2>

              <div className="flex items-center gap-3">
                {printed && (
                  <span className="text-sm text-green-500">
                    Printed ✔
                  </span>
                )}

                <button
                  className="bg-black rounded-md text-white py-1 px-3 hover:bg-[#3EBAD0]"
                  onClick={() => {
                    Object.entries(avgRoutes).forEach(([route, { sum, count }]) => {
                      const avg = sum / count;
                      
                      console.log(
                        `${route} avg time = ${avg.toFixed(2)} seconds`
                      );
                    });
                    
                    setPrinted(true);
                  }}
                >
                  Print avg time to console
                </button>
              </div>
            </div>
            <LogCard style={{ width: "100%" }} data={logs}></LogCard>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Departure Logging</h2>
          <LogForm onSubmit={handleAddLog}/>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Arrival Logging</h2>
          <LogForm onSubmit={handleAddLog}/>
        </div>
        {/* Render boarding pass here */}
        {/* {[].map((_, i) => ( */}
        {/*   <BoardingPassCard key={i} /> */}
        {/* ))} */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
