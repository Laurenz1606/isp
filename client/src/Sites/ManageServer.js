import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Doughnut } from "react-chartjs-2";

export default function ManageServer() {
  const [socket, setSocket] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const s = io("https://isp-socket.mk-return.de");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;

    socket.emit("server/get");
  }, [socket]);

  useEffect(() => {
    if (socket == null) return;
    const handler = (data) => {
      setData(data);
    };
    socket.on("server/data", handler);
    return () => {
      socket.off("server/data", handler);
    };
  }, [socket]);
  return (
    <div>
      <div
        className="relative pointer"
        style={{ maxWidth: "", margin: "auto" }}
      >
        <Doughnut
          style={{ maxHeight: "50vh" }}
          data={{
            labels: ["Freier Speicher", "Benutzter Speicher"],
            datasets: [
              {
                label: "Dataset 1",
                data: [
                  (data?.diskSpache._available / 1073741824) * 1024,
                  (data?.diskSpache._used / 1073741824) * 1024,
                ],
                backgroundColor: ["rgba(0, 218, 0, 0.1)", "rgba(255, 0, 0, 0.1)"],
                borderColor: ["rgba(0, 218, 0, 1)", "rgba(255, 0, 0, 1)"],
              },
            ],
          }}
          options={{
            options: {
              responsive: true,
            },
            animation: {
              duration: 0,
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
