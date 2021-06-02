import { DocumentTextIcon, FolderIcon } from "@heroicons/react/outline";
import React from "react";
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
}) {
  return (
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
      <div className="bg-white group shadow-lg rounded-lg p-5 group hover:bg-accent">
        <div className="flex text-accent group-hover:text-white space-x-1">
          <div className="flex flex-row">
            <div className="text-center self-center">
              {type === "document" ? (
                <DocumentTextIcon className="w-5" />
              ) : (
                <FolderIcon className="w-5" />
              )}
            </div>
            <div>
              <h3 className="font-semibold">{title}</h3>
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
  );
}
