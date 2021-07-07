import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line, defaults } from "react-chartjs-2";
import { decodeToken, fetcher } from "../Functions/AuthFunctions";
import SplitCard from "../Components/Card/SplitCard";
import SmallCard from "../Components/Card/SmallCard";
import CardBody from "../Components/Card/CardBody";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/outline";

export default function Provision() {
  const [data, setData] = useState({ all: [{ currentIncome: 1 }] });
  const [chartState, setChartState] = useState(0);
  const [name, setName] = useState("");
  const [growth, setGrowth] = useState(0);

  useEffect(() => {
    document.title = document.config.title.replace("[SITE]", "Provision");
  }, []);

  function fillArrayWithZero(arr, length) {
    let newArray = [];
    for (let index = 0; index < length - arr.length; index++) {
      newArray.push(0);
    }
    return [...arr, ...newArray];
  }

  useEffect(() => {
    setGrowth(
      Math.round(
        (data.current?.currentIncome / data.all[0].currentIncome - 1) * 100
      )
    );
  }, [data]);

  function formatToEUR(number) {
    let str = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(number).replace(/\u00A0/g, "")
    console.log(str)
    return str;
  }

  useEffect(() => {
    const x = async () => {
      setName((await decodeToken()).name);
      let res = await fetcher("/provision/getAll", "GET");
      console.log(res.provision.prevMonths.slice(0, 12));
      setData({
        income: fillArrayWithZero(
          res.provision.prevMonths
            .slice(0, 12)
            .map((current) => current.currentIncome),
          12
        ).reverse(),
        out: fillArrayWithZero(
          res.provision.prevMonths
            .slice(0, 12)
            .map((current) => current.currentOut),
          12
        ).reverse(),
        total: fillArrayWithZero(
          res.provision.prevMonths
            .slice(0, 12)
            .map(
              (current) =>
                current.currentIncome + current.prevMonth - current.currentOut
            ),
          12
        ).reverse(),
        current: res.provision.currentMonth,
        all: res.provision.prevMonths,
      });
    };
    x();
  }, []);

  defaults.plugins.legend.display = false;

  function getLast12Months() {
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
    months = [...months, ...prev];
    return months;
  }

  return (
    <>
      <h1 className="mb-5 text-3xl font-bold">Finanzübersicht für {name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 focus:outline-none outline-none">
        <SplitCard
          header="Provision der letzten 12 Monate"
          classes="lg:col-span-4"
        >
          <CardBody>
            <div className="flex justify-between items-center">
              <button onClick={() => setChartState((prev) => prev - 1)}>
                <ChevronDoubleLeftIcon className="h-6 w-6" />
              </button>
              <h2>
                {chartState === 0
                  ? "Einkommen pro Monat in €"
                  : chartState === 1
                  ? "Ausgaben pro Monat in €"
                  : "Gesamtprovision pro Monat in €"}
              </h2>
              <button onClick={() => setChartState((prev) => prev + 1)}>
                <ChevronDoubleRightIcon className="h-6 w-6" />
              </button>
            </div>
            <div
              className="relative pointer"
              style={{ maxWidth: "100%", margin: "auto" }}
            >
              {chartState === 0 ? (
                <Line
                  style={{ maxHeight: "50vh" }}
                  data={{
                    labels: getLast12Months(),
                    datasets: [
                      {
                        label: "Einkommen pro Monat in €",
                        fill: true,
                        data: data.income,
                        backgroundColor: "rgba(0, 218, 0, 0.1)",
                        pointBackgroundColor: "rgba(0, 218, 0, 1)",
                        borderColor: "rgba(0, 218, 0, 1)",
                        borderWidth: 3,
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
              ) : chartState === 1 ? (
                <Line
                  style={{ maxHeight: "50vh" }}
                  data={{
                    labels: getLast12Months(),
                    datasets: [
                      {
                        label: "Ausgaben pro Monat in €",
                        fill: true,
                        data: data.out,
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                        pointBackgroundColor: "rgba(255, 0, 0, 1)",
                        borderColor: "rgba(255, 0, 0, 1)",
                        borderWidth: 3,
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
              ) : chartState === 2 ? (
                <Line
                  style={{ maxHeight: "50vh" }}
                  data={{
                    labels: getLast12Months(),
                    datasets: [
                      {
                        label: "Gesamtprovision pro Monat in €",
                        fill: true,
                        data: data.total,
                        backgroundColor: "rgba(0, 0, 255, 0.1)",
                        pointBackgroundColor: "rgba(0, 0, 255, 1)",
                        borderColor: "rgba(0, 0, 255, 1)",
                        borderWidth: 3,
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
              ) : chartState > 2 ? (
                setChartState(0)
              ) : (
                setChartState(2)
              )}
            </div>
          </CardBody>
        </SplitCard>
        <SmallCard header="Ranking"></SmallCard>
        <SplitCard header="Persönliche Statistiken" classes="lg:col-span-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 focus:outline-none outline-none">
            <CardBody>
              {!isNaN(growth) ? (
                <div className="text-5xl">
                  {formatToEUR(
                    data.current?.prevMonth +
                      data.current?.currentIncome -
                      data.current?.currentOut
                  )}
                  <sup
                    className={
                      "text-4xl " +
                      (growth > 0 ? "text-accent" : "text-red-500")
                    }
                  >
                    {growth}%
                  </sup>
                </div>
              ) : (
                ""
              )}
            </CardBody>
            <CardBody>
              <table>
                <tr>
                  <td>Einkommen Gesamt:</td>
                  <td className="text-accent pl-3">
                    {formatToEUR(
                      data.all?.reduce((a, b) => a + b.currentIncome, 0) +
                        data.current?.currentIncome
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Einkommen letzten 12 Monate:</td>
                  <td className="text-accent pl-3">
                    {formatToEUR(data.income?.reduce((a, b) => a + b, 0))}
                  </td>
                </tr>
                <tr>
                  <td>Einkommen diesen Monat:</td>
                  <td className="text-accent pl-3">
                    {formatToEUR(data.current?.currentIncome)}
                  </td>
                </tr>
              </table>
            </CardBody>
            <CardBody>
              <table>
                <tr>
                  <td>Ausgaben Gesamt:</td>
                  <td className="text-red-500 pl-3">
                    {formatToEUR(
                      data.all?.reduce((a, b) => a + b.currentOut, 0) +
                        data.current?.currentOut
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Ausgaben letzten 12 Monate:</td>
                  <td className="text-red-500 pl-3">
                    {formatToEUR(data.out?.reduce((a, b) => a + b, 0))}
                  </td>
                </tr>
                <tr>
                  <td>Ausgaben diesen Monat:</td>
                  <td className="text-red-500 pl-3">
                    {formatToEUR(data.current?.currentOut)}
                  </td>
                </tr>
              </table>
              <Link className="float-right text-blue-600 hover:underline">
                Transaktionsverlauf
              </Link>
            </CardBody>
          </div>
        </SplitCard>
      </div>
    </>
  );
}
