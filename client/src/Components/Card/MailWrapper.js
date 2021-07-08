import React from "react";

export default function MailWrapper({ sender, recipient, betreff, date }) {
  return (
    <div className="text-base mdtext-lg font-bold">
      {sender}
      <div className="text-sm md:text-base font-medium break-words grid grid-cols-10">
        <div className="col-span-7">
          {betreff} ({recipient})
        </div>
        <div className="col-span-3">
          <span className="float-right">{date}</span>
        </div>
      </div>
    </div>
  );
}
