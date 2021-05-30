import React from "react";

export default function DocumentHeaderButton({
  icon,
  text,
  action,
  type = "normal",
}) {
  return (
    <button
      onClick={action}
      className={
        "bg-white items-center flex py-3 px-5 rounded-full shadow-lg font-semibold hover:text-white space-x-2 " +
        (type === "delete"
          ? "hover:bg-red-500 text-red-500"
          : "hover:bg-accent text-accent")
      }
    >
      <span>{icon}</span>
      <span className="inline-block">{text}</span>
    </button>
  );
}
