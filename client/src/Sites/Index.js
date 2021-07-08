import React, { useEffect, useState } from "react";
import { decodeToken, fetcher } from "../Functions/AuthFunctions";
import {
  dateFormat,
  fillArrayWithZero
} from "../Functions/CommonFunctions";
import SplitCard from "../Components/Card/SplitCard";
import SmallCard from "../Components/Card/SmallCard";
import CardItemOuterContainer from "../Components/Card/CardItemOuterContainer";
import MailWrapper from "../Components/Card/MailWrapper";
import TaskWrapper from "../Components/Card/TaskWrapper";
import CardMore from "../Components/Card/CardMore";
import CardLink from "../Components/Card/CardLink";
import Current from "../Components/Provision/Current";

const Mails = [
  {
    _id: 1,
    betreff: "Text für BS Zeitung",
    date: randomDate(new Date(0), new Date()),
    recipient: "info@mk-return.de",
    sender: "info@zeitung-bs.de",
  },
  {
    _id: 2,
    betreff: "Neue Provision",
    date: randomDate(new Date(0), new Date()),
    recipient: "david.jankowski@mk-return.de, laurenz.rausche@mk-return.de",
    sender: "maximilian.seitz@interseroh.com",
  },
  {
    _id: 3,
    betreff: "BETREFF",
    date: randomDate(new Date(0), new Date()),
    recipient: "empfänger@example.com",
    sender: "absender@example.com",
  },
  {
    _id: 4,
    betreff: "fortnite season pass",
    date: randomDate(new Date(0), new Date()),
    recipient: "david.jankowski@mk-return.de",
    sender: "lolomat68@example.com",
  },
];

const Tasks = [
  {
    _id: 1,
    text: "Beantworten der BS Zeitung Mail",
    date: randomDate(new Date(0), new Date()),
    from: "Laurenz Rausche",
  },
  {
    _id: 2,
    text: "Unterschreiben der neuen Verträge",
    date: randomDate(new Date(0), new Date()),
    from: "Thorben Stauber",
  },
  {
    _id: 3,
    text: "BEISPIEL",
    date: randomDate(new Date(0), new Date()),
    from: "AUFTRAGENDER",
  },
];

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

//-----------NUR ZUM TEST-------------------//
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
//-----------NUR ZUM TEST-------------------//

export default function Index() {
  const [data, setData] = useState({ all: [{ currentIncome: 1 }] });
  const [name, setName] = useState("");
  const [growth, setGrowth] = useState(0);
  useEffect(() => {
    document.title = document.config.title.replace("[SITE]", "Dashboard");
  }, []);

  useEffect(() => {
    const x = async () => {
      setName((await decodeToken()).name);
    };
    x();
  }, []);

  useEffect(() => {
    setGrowth(
      Math.round(
        (data.current?.currentIncome / data.all[0].currentIncome - 1) * 100
      )
    );
  }, [data]);

  useEffect(() => {
    const x = async () => {
      setName((await decodeToken()).name);
      let res = await fetcher("/provision/getAll", "GET");
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
                  date={dateFormat(mail.date)}
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
            <SmallCard header="Provision diesen Monat">
              <Current data={data} growth={growth} />
            </SmallCard>
            <SmallCard header="Geburtstage">
              {Birthdays.map((day, idx) => (
                <p className="text-sm md:text-lg" key={idx}>
                  {day.name} {day.date}({day.age})
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
                  date={dateFormat(task.date)}
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
