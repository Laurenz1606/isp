import { Dialog } from "@headlessui/react";
import { fetcher } from "../../Functions/AuthFunctions";

export default function DeleteFolderModal({ isOpen, setIsOpen }) {
  function handleSubmit(e) {
    e.preventDefault();
  }
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
              Möchtest du diesen Ordner löschen?
            </Dialog.Title>
            <p>
              Dein jetziger Ordner wird inklusive aller Dateien und Ordnern in
              ihm irreversibel gelöscht.
            </p>
          </div>
          <div className="flex-row space-x-4 text-white mt-4">
            <button
              className="bg-accent py-2 px-5 rounded-full hover:bg-white hover:border-accent border-2 border-white hover:text-accent"
              type="submit"
            >
              Löschen
            </button>
            <button
              className="bg-red-500 py-2 px-5 rounded-full hover:bg-white hover:border-red-500 border-2 border-white hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              Abbrechen
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
