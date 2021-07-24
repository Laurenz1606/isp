import React from "react";

export default function SplitCard({
  children,
  classes = "",
  header,
  noheader = false,
}) {
  return (
    <div
      className={
        "font-medium shadow-xl hover:shadow-2xl rounded-3xl border border-gray-400 border-opacity-50 " +
        classes
      }
    >
      {noheader ? (
        ""
      ) : (
        <div className="flex p-4">
          <h2 className="text-2xl font-bold">{header}</h2>
        </div>
      )}
      {children}
    </div>
  );
}
