import React from "react";

export default function MailWrapper({ sender, recipient, betreff, date }) {
  return (
    <div className="text-lg font-bold">
      {sender}
      <div className="flex text-base font-medium justify-between">
        <div>
          {betreff} ({recipient})
        </div>
        <div>{date}</div>
      </div>
    </div>
  );
}
