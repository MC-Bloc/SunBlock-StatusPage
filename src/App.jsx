import { useEffect, useState } from "react";
import viteLogo from "/milieux.svg";
import "./App.css";
import { socket_one, socket_two } from "./socket";
import DataEntry from "./components/DataEntry";
import ViewersIcon from "./components/ViewersIcon";
import { Analytics } from "@vercel/analytics/next";

function App() {
  const [solarDataOne, setSolarDataOne] = useState(null);
  const [isConnectedOne, setIsConnectedOne] = useState(socket_one.connected);

  const [solarDataTwo, setSolarDataTwo] = useState(null);
  const [isConnectedTwo, setIsConnectedTwo] = useState(socket_two.connected);

  useEffect(() => {
    function onConnectOne() {
      setIsConnectedOne(true);
    }

    function onDisconnectOne() {
      setIsConnectedOne(false);
    }

    function onSolarDataOneEvent(value) {
      setSolarDataOne(value);
    }

    function onConnectTwo() {
      setIsConnectedTwo(true);
    }

    function onDisconnectTwo() {
      setIsConnectedTwo(false);
    }

    function onSolarDataTwoEvent(value) {
      setSolarDataTwo(value);
    }

    socket_one.on("connect", onConnectOne);
    socket_one.on("disconnect", onDisconnectOne);
    socket_one.on("solar_data", onSolarDataOneEvent);

    socket_two.on("connect", onConnectTwo);
    socket_two.on("disconnect", onDisconnectTwo);
    socket_two.on("solar_data", onSolarDataTwoEvent);

    return () => {
      socket_one.off("connect", onConnectOne);
      socket_one.off("disconnect", onDisconnectOne);
      socket_one.off("solar_data", onSolarDataOneEvent);

      socket_two.off("connect", onConnectTwo);
      socket_two.off("disconnect", onDisconnectTwo);
      socket_two.off("solar_data", onSolarDataTwoEvent);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div>
        <a href="https://minecraftbloc.milieux.ca/sunblock/" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1 style={{ color: "white" }}>SUNBLOCK</h1>
      <div className="container">
        <SolarDataCard data={solarDataOne} title={"ONE"} />

        <SolarDataCard data={solarDataTwo} title={"TWO"} />
      </div>
      <p className="read-the-docs">
        A Project by the TAG MC Bloc at Milieux Institute, Concordia University,
        Montreal CA.
      </p>
    </div>
  );
}

export default App;

function SolarDataCard({ data, title }) {
  return (
    <div className="cards-container">
      <DataEntry
        label={title + ":"}
        data={data?.Timestamp ? "Active" : "Not Available"}
        noValidation={true}
        style={{ color: data?.Timestamp ? "#7FFFB0" : "#FF7F7F" }}
      />
      <div className="card">
        <DataEntry
          label={"Solar Power: "}
          data={data?.PVPower ?? -1}
          unit={"W"}
        />

        <DataEntry
          label={"Solar Voltage: "}
          data={data?.PVVoltage ?? -1}
          unit={"V"}
        />

        <DataEntry
          label={"Solar Current: "}
          data={data?.PVCurrent ?? -1}
          unit={"A"}
        />
      </div>
      <div className="card">
        <DataEntry
          label={"Battery Percentage: "}
          data={data?.BattPercentage ?? -1}
          unit={"%"}
        />
        <DataEntry
          label={"Battery Voltage: "}
          data={data?.BattVoltage ?? -1}
          unit={"V"}
        />
      </div>
      <div className="card">
        <DataEntry
          label={"System Power Draw: "}
          data={data?.LoadPower ?? -1}
          unit={"W"}
        />
        <DataEntry
          label={"CPU Power Draw: "}
          data={data?.CPUPowerDraw ?? -1}
          unit={"W"}
        />

        <DataEntry
          label={"Power Profile: "}
          data={data?.PowerProfile ?? "Unavailable"}
          noValidation={true}
        />
      </div>

      <DataEntry label={""} data={data?.Timestamp ?? null} timeEntry={true} />
      <ViewersIcon viewerCount={data?.ConnectedUsers ?? "0"} />
      
      
      <Analytics />
    </div>
  );
}
