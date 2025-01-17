import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import ModalRoleCheck from "./ModalRoleCheck";
import ModalPresetCheck from "./ModalPresetCheck";
import { fetcher } from "../../Functions/AuthFunctions";
import { useHistory } from "react-router";

export default function Modal({ isOpen, setIsOpen, type, FolderPath }) {
  function genererateFetchurl(type) {
    if (type === "document") return "/documents/addDoc?path=" + FolderPath;
    if (type === "folder") return "/documents/addFolder?path=" + FolderPath;
  }

  function generateHeading(type) {
    if (type === "document") return "Neues Dokument";
    if (type === "folder") return "Neuer Ordner";
  }

  function generratePlaceHolder(type) {
    if (type === "document") return "Name des Dokuments";
    if (type === "folder") return "Name des Ordners";
  }

  const history = useHistory();
  const [error, setError] = useState(false);
  const [roles, setRoles] = useState([]);
  const [presets, sePresets] = useState([]);
  const [preset, setPreset] = useState(null);
  const [publicState, setPublicState] = useState(false);
  useEffect(() => {
    if (type === "document") {
      async function x() {
        let y = await fetcher("/documents/getPresets", "GET");
        sePresets(y.data);
        let x = await fetcher("/roles/getAll", "GET");
        setRoles(x.data);
      }
      x();
    }
  }, [isOpen, type]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[0].value === "") {
      setError(true);
      return;
    }
    let roles = [];
    for (var i = 1; i < e.target.length - 2; i++) {
      if (e.target[i].type === "checkbox") {
        roles.push({
          role: e.target[i].name,
          value: JSON.parse(e.target[i].value),
        });
      }
    }
    roles = roles.filter((role) => role.value === true);
    roles = roles.map((role) => role.role);
    const body = { name: e.target[0].value, roles, preset };
    const res = await fetcher(genererateFetchurl(type), "POST", body);
    setIsOpen(false);
    if (type === "document")
      history.push("/documents/" + res.document._id + "?path=" + FolderPath);
    if (type === "folder")
      history.push("/documents?path=" + FolderPath + res.folder._id + "/");
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
        style={{ maxHeight: "60vh" }}
        className="bg-white z-30 rounded-2xl fixed overflow-y-auto top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 p-5 flex items-center flex-col"
        onClose={() => setIsOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex-col">
            <Dialog.Overlay />

            <Dialog.Title className="text-center font-semibold text-lg">
              {generateHeading(type)}
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
              placeholder={generratePlaceHolder(type)}
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
          {type === "document" ? (
            <>
              <div className="p-3 w-screen modal-document pt-0 flex justify-center flex-col">
                <Dialog.Title className="text-center font-semibold text-lg pb-1">
                  Berechtigungen
                </Dialog.Title>
                <div className="space-y-5">
                  <label className="container-check">
                    Öffentlich
                    <input
                      type="checkbox"
                      name="public"
                      value={publicState}
                      checked={publicState}
                      onChange={() => setPublicState(!publicState)}
                    />
                    <span className="checkmark" />
                  </label>
                  {!publicState
                    ? roles.map((role) => (
                        <ModalRoleCheck
                          text={role.displayName}
                          id={role._id}
                          key={role._id}
                        />
                      ))
                    : ""}
                </div>
              </div>
              <div className="p-3 w-screen modal-document pt-0 flex justify-center flex-col">
                {presets.length !== 0 ? (
                  <>
                    <Dialog.Title className="text-center font-semibold text-lg pb-1">
                      Vorlagen
                    </Dialog.Title>
                    <div className="space-y-5">
                      <ModalPresetCheck
                        presets={presets}
                        setPreset={setPreset}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            ""
          )}
          <div className="flex-row space-x-4 text-white mt-4">
            <button
              className="bg-accent py-2 px-5 rounded-full hover:bg-white hover:border-accent border-2 border-white hover:text-accent"
              type="submit"
            >
              Erstellen
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
