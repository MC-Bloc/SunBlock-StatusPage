"use client"

import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";
import DataEntry from "./components/DataEntry";
import ViewersIcon from "./components/ViewersIcon";

export default function Home() {
  const [solarData, setSolarData] = useState({});

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onSolarDataEvent(value) {
      setSolarData(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("solar_data", onSolarDataEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("solar_data", onSolarDataEvent);
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://minecraftbloc.milieux.ca/sunblock/" target="_blank">
          <img src={"/milieux.svg"} className="logo" alt="Milieux logo" />
        </a>
      </div>
      <h1>SUNBLOCK ONE</h1>
      <DataEntry
        label={"Status: "}
        data={solarData.Timestamp ? "Active" : "Not Available"}
        noValidation={true}
        style={{ color: solarData.Timestamp ? "#7FFFB0" : "#FF7F7F" }}
      />
      <div className="cards-container">
        <div className="card">
          <DataEntry
            label={"Battery Percentage: "}
            data={solarData?.BattPercentage ?? -1}
            unit={"%"}
          />
          <DataEntry
            label={"Battery Voltage: "}
            data={solarData?.BattVoltage ?? -1}
            unit={"V"}
          />
        </div>
        <div className="card">
          <DataEntry
            label={"System Power Draw: "}
            data={solarData?.LoadPower ?? -1}
            unit={"W"}
          />
          <DataEntry
            label={"CPU Power Draw: "}
            data={solarData?.CPUPowerDraw ?? -1}
            unit={"W"}
          />

          <DataEntry
            label={"Power Profile: "}
            data={solarData?.PowerProfile ?? "Unavailable"}
            noValidation={true}
          />
        </div>
        <div className="card">
          <DataEntry
            label={"Solar Power: "}
            data={solarData?.PVPower ?? -1}
            unit={"W"}
          />

          <DataEntry
            label={"Solar Voltage: "}
            data={solarData?.PVVoltage ?? -1}
            unit={"V"}
          />

          <DataEntry
            label={"Solar Current: "}
            data={solarData?.PVCurrent ?? -1}
            unit={"A"}
          />
        </div>
        <DataEntry
          label={"Local Time (Montreal): "}
          data={solarData?.Timestamp ?? null}
          timeEntry={true}
        />
        <ViewersIcon viewerCount={solarData?.ConnectedUsers ?? "0"} />
      </div>

      <p className="read-the-docs">
        A Project by the TAG MC Bloc at Milieux Institute, Concordia University,
        Montreal CA.
      </p>
    </>
  );
}
