import { DocumentTextIcon, FolderIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dateFormat } from "../../Functions/CommonFunctions";
import DocumentRolesTag from "./DocumentRolesTag";

export default function DocumentCard({
  type,
  title,
  id,
  changedAt,
  createdAt,
  roles,
  owner,
  currPath,
  setLoading,
  setFolder,
  editMode,
  toggle = () => "",
}) {
  const [checked, setChecked] = useState(false);
  // eslint-disable-next-line
  useEffect(() => {toggle(id, type, checked)}, [checked])
  useEffect(() => {setChecked(false)}, [editMode])
  return (
    <>
      {editMode === 0 ? (
        <Link
          onClick={
            type === "document"
              ? () => ""
              : () => {
                  setLoading(true);
                  setFolder([]);
                }
          }
          to={
            type === "document"
              ? "/documents/" + id + "?path=" + currPath
              : "/documents?path=" + currPath + id + "/"
          }
        >
          <div className="bg-white group select-none shadow-lg rounded-lg p-5 group hover:bg-accent">
            <div className="flex text-accent group-hover:text-white space-x-1 justify-between">
              <div className="flex flex-row items-start">
                <div>
                  {type === "document" ? (
                    <DocumentTextIcon className="w-5" />
                  ) : (
                    <FolderIcon className="w-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold break-all">{title}</h3>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500 group-hover:text-gray-800">
              {type === "document" ? (
                <>
                  <span>Geändert: {dateFormat(changedAt)}</span>
                  <br />
                </>
              ) : (
                ""
              )}
              <span>Erstellt: {dateFormat(createdAt)}</span>
              <br />
              <span>Ersteller: {owner.name}</span>
            </div>
            {type === "document" ? (
              <div className="flex flex-row flex-wrap mt-2">
                {roles.map((role, idx) => (
                  <DocumentRolesTag name={role} key={idx} />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </Link>
      ) : (
        <div className="cursor-pointer select-none" onClick={() => setChecked(!checked)}>
          <div className={"break-all bg-white group shadow-lg rounded-lg p-5 group hover:bg-accent" + (!checked ? "" : " bg-accent")}>
            <div className={"flex group-hover:text-white space-x-1 justify-between" + (!checked ? " text-accent" : " text-white")}>
              <div className="flex items-start flex-row">
                <div>
                  {type === "document" ? (
                    <DocumentTextIcon className="w-5" />
                  ) : (
                    <FolderIcon className="w-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold break-all">{title}</h3>
                </div>
              </div>
              <input
                type="checkbox"
                className=""
                name={id}
                value={type}
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </div>
            <div className={"text-sm text-left text-gray-500 group-hover:text-gray-800" + (!checked ? "" : " text-gray-800")}>
              {type === "document" ? (
                <>
                  <span>Geändert: {dateFormat(changedAt)}</span>
                  <br />
                </>
              ) : (
                ""
              )}
              <span>Erstellt: {dateFormat(createdAt)}</span>
              <br />
              <span>Ersteller: {owner.name}</span>
            </div>
            {type === "document" ? (
              <div className="flex flex-row flex-wrap mt-2">
                {roles.map((role, idx) => (
                  <DocumentRolesTag checked={checked} name={role} key={idx} />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}
