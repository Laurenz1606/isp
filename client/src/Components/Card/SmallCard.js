import React from "react";

export default function SmallCard({ children, header, classes = "" }) {
  return (
    <div
      className={
        "p-6 pt-4 font-medium shadow-xl hover:shadow-2xl rounded-3xl border border-gray-400 border-opacity-50 " +
        classes
      }
    >
      <div className="text-lg font-bold">{header}</div>
      <div className="mt-4 text-lg font-bold">{children}</div>
    </div>
  );
}
