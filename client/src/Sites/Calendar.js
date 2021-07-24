import React, { useEffect, useState } from "react";
import { decodeToken } from "../Functions/AuthFunctions";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import SplitCard from "../Components/Card/SplitCard";
import SmallCard from "../Components/Card/SmallCard";
import CardBody from "../Components/Card/CardBody";

export default function Calendar() {
  const [name, setName] = useState("");
  const [feierTage, setFeierTage] = useState({});
  const [feierTageArray, setFeierTageArray] = useState([]);
  useEffect(() => {
    document.title = document.config.title.replace("[SITE]", "Provision");
  }, []);
  useEffect(() => {
    const x = async () => {
      setName((await decodeToken()).name);
      setFeierTage(
        (
          await fetch(
            "https://feiertage-api.de/api/?jahr=" + new Date().getFullYear()
          ).then((res) => res.json())
        ).NI
      );
    };
    x();
  }, []);

  useEffect(() => {
    let tage = [];
    for (let tag in feierTage) {
      tage.push({
        title: tag,
        start: new Date(feierTage[tag].datum),
        allDay: true,
        display: "background",
      });
    }
    setFeierTageArray(tage);
    console.log(tage);
  }, [feierTage]);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return (
    <>
      <h1 className="mb-5 text-3xl font-bold">Kalender für {name}</h1>
      <div className="grid grid-cols-4 lg:grid-cols-5 gap-6">
        <SplitCard classes="col-span-4 font-normal" noheader>
          <CardBody noborder>
            <div className="col-span-4">
              <FullCalendar
                weekNumbers={true}
                headerToolbar={{
                  start: "title",
                  center: "dayGridMonth,dayGridWeek,dayGridDay",
                  end: "today prev,next",
                }}
                firstDay={"1"}
                height="72vh"
                editable={false}
                initialView="dayGridMonth"
                themeSystem="bootstrap"
                navLinks={true}
                buttonText={{
                  today: "Heute",
                  month: "Monat",
                  week: "Woche",
                  day: "Tag",
                }}
                locale="de"
                plugins={[dayGridPlugin, interactionPlugin]}
                dateClick={console.log}
                eventClick={console.log}
                eventDrop={console.log}
                events={[
                  {
                    id: "termin-id",
                    title: "my event",
                    start: formatDate(new Date()),
                  },
                  ...feierTageArray,
                ]}
              />
            </div>
          </CardBody>
        </SplitCard>
        <SmallCard classes="col-span-4 lg:col-span-1">
          <h1 className="text-2xl font-semibold">
            Aktuelles Quartal: {Math.floor(new Date().getMonth() / 4 + 1)}
          </h1>
        </SmallCard>
      </div>
    </>
  );
}
