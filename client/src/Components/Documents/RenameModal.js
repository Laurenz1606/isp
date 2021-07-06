import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { fetcher } from "../../Functions/AuthFunctions";

export default function Modal({
  isOpen,
  setIsOpen,
  data,
  setRefetch,
  setEdit,
}) {
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[0].value === "") {
      setError(true);
      return;
    } else {
      await fetcher("/documents/rename", "POST", {
        name: e.target[0].value,
        data: data,
      });
      setRefetch((refetch) => !refetch);
      setIsOpen((open) => !open);
      setEdit(0);
    }
  };

  return (
    <>
      <div
        className={
          (isOpen ? "bg-black opacity-10" : "hidden") +
          " z-20 inset-0 w-screen h-screen fixed"
        }
      ></div>

      <Dialog
        open={isOpen}
        className="bg-white z-30 rounded-2xl fixed top-1/4 left-1/2 transform -translate-y-1/2 -translate-x-1/2 p-5 flex justify-center items-center flex-col"
        onClose={() => setIsOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex-col">
            <Dialog.Overlay />

            <Dialog.Title className="text-center font-semibold text-lg">
              Umbenennen
            </Dialog.Title>
          </div>
          <div className="flex-row p-3 w-screen modal-document">
            <input
              id="DocumentAddModal"
              onChange={(e) => {
                if (e.target.value !== "") {
                  setError(false);
                }
              }}
              className={
                "w-full border-2 rounded-lg p-2 focus:border-accent" +
                (error ? " border-red-500" : "")
              }
              placeholder={"Neuer Name"}
              type="text"
              name="DocumentName"
            />
            {error ? (
              <span className="text-sm text-red-500">
                Der Name darf nicht Leer sein!
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="flex-row space-x-4 text-white mt-4">
            <button
              className="bg-accent py-2 px-5 rounded-full hover:bg-white hover:border-accent border-2 border-white hover:text-accent"
              type="submit"
            >
              Umbenennen
            </button>
            <button
              className="bg-red-500 py-2 px-5 rounded-full hover:bg-white hover:border-red-500 border-2 border-white hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              Schließen
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
