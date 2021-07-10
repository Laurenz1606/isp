import React from "react";

export default function MailWrapper({ text, date, from }) {
  return (
    <>
      <div className="text-sm md:text-base font-medium break-words grid grid-cols-10">
        <div className="col-span-7 text-base md:text-lg  font-bold">
          {text}
        </div>
        <div className="col-span-3">
          <span className="float-right">bis {date}</span>
        </div>
      </div>
      <span className="text-xs text-gray-500">aufgetragen von {from}</span>
    </>
  );
}
