import React from "react";

export default function DocumentHeaderButton({
  icon,
  text,
  action,
  type = "normal",
  editMode = 0,
}) {
  return (
    <>
      {editMode === 0 ? (
        <button
          onClick={action}
          className={
            "bg-white select-none items-center flex py-3 px-5 md:rounded-full shadow-lg font-semibold hover:text-white my-2 md:m-3 w-full md:w-auto rounded-lg space-x-2" +
            (type === "delete"
              ? " hover:bg-red-500 text-red-500"
              : " hover:bg-accent text-accent")
          }
        >
          <span>{icon}</span>
          <span className="inline-block">{text}</span>
        </button>
      ) : (
        <button
          type="submit"
          className={
            "bg-white items-center flex py-3 px-5 md:rounded-full shadow-lg font-semibold hover:text-white my-2 select-none md:m-3 w-full md:w-auto rounded-lg space-x-2" +
            (type === "delete"
              ? " hover:bg-red-500 text-red-500"
              : " hover:bg-accent text-accent")
          }
        >
          <span>{icon}</span>
          <span className="inline-block">{text}</span>
        </button>
      )}
    </>
  );
}
