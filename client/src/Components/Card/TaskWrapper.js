import React from "react";

export default function MailWrapper({ text, date, from }) {
  return (
    <>
      <div className="text-lg font-bold">
        <div className="flex text-lg font-bold justify-between">
          <div>{text}</div>
          <div>bis {date}</div>
        </div>
      </div>
      <span className="text-xs text-gray-500">aufgetragen von {from}</span>
    </>
  );
}
