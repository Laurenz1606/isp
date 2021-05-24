import React from "react";
import { Line, defaults } from "react-chartjs-2";

export default function Provision() {
  defaults.plugins.legend.display = false;
  defaults.animation = false;
  function getLast12Months(type) {
    var data = [12, 19, 3, 5, 2, 3, 12, 10, 3, 5, 2, 30];
    var months = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];
    const prev = months.splice(0, new Date().getMonth());
    const prev2 = data.splice(0, new Date().getMonth());
    months = [...months, ...prev];
    data = [...data, ...prev2];
    if (type === 1) {
      return months;
    } else {
      return data;
    }
  }

  return (
    <div
      className="relative"
      style={{ maxWidth: "98%", margin: "auto", maxHeight: "60vh" }}
    >
      <Line
        data={{
          labels: getLast12Months(1),
          datasets: [
            {
              label: "Provision pro Monat in €",
              fill: true,
              data: getLast12Months(2),
              backgroundColor: "rgba(0, 218, 0, 0.1)",
              pointBackgroundColor: "rgba(0, 218, 0, 1)",
              borderColor: "rgba(0, 218, 0, 1)",
              borderWidth: 3,
              tension: 0,
            },
          ],
        }}
        options={{
          legend: false,
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
        }}
      />
    </div>
  );
}
