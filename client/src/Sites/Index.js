import React, { useEffect, useState } from "react";
import { decodeToken, fetcher } from "../Functions/AuthFunctions";
import SplitCard from "../Components/Card/SplitCard";
import SmallCard from "../Components/Card/SmallCard";
import CardItemOuterContainer from "../Components/Card/CardItemOuterContainer";
import MailWrapper from "../Components/Card/MailWrapper";
import TaskWrapper from "../Components/Card/TaskWrapper";
import CardMore from "../Components/Card/CardMore";
import CardLink from "../Components/Card/CardLink";

const Mails = [
  {
    _id: 1,
    betreff: "Text für BS Zeitung",
    date: "30.06.2021 22:37",
    recipient: "info@mk-return.de",
    sender: "yung.hurn@example.com",
  },
  {
    _id: 2,
    betreff: "fortnite season pass",
    date: "21.06.2021 13:37",
    recipient: "david.jankowski@mk-return.de",
    sender: "lolomat68@example.com",
  },
  {
    _id: 3,
    betreff: "BETREFF",
    date: "DATUM UHRZEIT",
    recipient: "empfänger@example.com",
    sender: "absender@example.com",
  },
  {
    _id: 4,
    betreff: "fortnite season pass",
    date: "21.06.2021 13:37",
    recipient: "david.jankowski@mk-return.de",
    sender: "lolomat68@example.com",
  },
];

const Tasks = [
  {
    _id: 1,
    text: "Beantworten der BS Zeitung Mail",
    date: "03.07.2021 18:00",
    from: "Laurenz Rausche",
  },
  {
    _id: 2,
    text: "Unterschreiben der neuen Verträge",
    date: "06.07.2021 21:00",
    from: "Thorben Stauber",
  },
  {
    _id: 3,
    text: "BEISPIEL",
    date: "DATUM UHRZEIT",
    from: "AUFTRAGENDER",
  },
];

const Provision = {
  value: 187.69,
  growth: 187,
};

const Birthdays = [
  {
    name: "Laurenz Rausche",
    age: 15,
    date: "01.02.",
  },
  {
    name: "David Jankowski",
    age: 10,
    date: "01.01.",
  },
];

const Protokolle = [
  {
    _id: "2ad9f673-2bd9-49f8-a9f5-d38f0a787b5a",
    name: "Laurenz Rausche",
    date: "",
  },
  {
    _id: "u001f499",
    name: "Laurenz Rausche",
    date: "",
  },
];

export default function Index() {
  useEffect(() => {
    document.title = document.config.title.replace("[SITE]", "Dashboard");
  }, []);

  const [name, setName] = useState("");

  useEffect(() => {
    const x = async () => {
      setName((await decodeToken()).name);
    };
    x();
  }, []);

  return (
    <>
      <h1 className="mb-5 text-3xl font-bold">Wilkommen zurück, {name}!</h1>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 focus:outline-none outline-none">
          <SplitCard classes="row-span-2" header="Ungelesene E-Mails">
            {Mails.slice(0, 3).map((mail) => (
              <CardItemOuterContainer to={"/mails/" + mail._id} key={mail._id}>
                <MailWrapper
                  betreff={mail.betreff}
                  date={mail.date}
                  recipient={mail.recipient}
                  sender={mail.sender}
                />
              </CardItemOuterContainer>
            ))}
            {Mails.length > 3 ? (
              <CardMore more={Mails.length - 3} to="/mails" />
            ) : (
              ""
            )}
          </SplitCard>

          <div className="grid grid-cols-2 gap-3 focus:outline-none outline-none">
            <SmallCard header="Provision des letzten Monats">
              {<div className="p-4 pl-0 text-5xl">
                <sup
                  className={
                    "text-4xl " +
                    (Provision.growth > 0 ? "text-accent" : "text-red-500")
                  }
                >
                  {Provision.growth > 0
                    ? "+" + Provision.growth
                    : Provision.growth}
                  %
                </sup>
              </div>}
            </SmallCard>
            <SmallCard header="Geburtstag">
              {Birthdays.map((day, idx) => (
                <p key={idx}>
                  {day.name}({day.age}) {day.date}
                </p>
              ))}
            </SmallCard>
          </div>

          <SmallCard header="Kalender" classes="row-span-2"></SmallCard>

          <SplitCard classes="row-span-2" header="Aufgaben">
            {Tasks.slice(0, 3).map((task) => (
              <CardItemOuterContainer to={"/tasks/" + task._id} key={task._id}>
                <TaskWrapper
                  text={task.text}
                  date={task.date}
                  from={task.from}
                />
              </CardItemOuterContainer>
            ))}
            {Tasks.length > 3 ? (
              <CardMore more={Tasks.length - 3} to="/tasks" />
            ) : (
              ""
            )}
          </SplitCard>
          <SmallCard header="Protokolle">
            {Protokolle.map((protokoll) => (
              <CardLink
                id={protokoll._id}
                link={"/documents/" + protokoll._id}
                name={protokoll.name}
                key={protokoll._id}
              />
            ))}
          </SmallCard>
        </div>
      </div>
    </>
  );
}
