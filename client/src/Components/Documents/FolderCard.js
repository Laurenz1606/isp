import { FolderIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import { dateFormat } from "../../Functions/CommonFunctions";

export default function DocumentCard({
  title,
  id,
  createdAt,
  owner,
  currPath,
  setLoading,
  setFolder,
}) {
  return (
    <Link
      onClick={() => {
        setLoading(true);
        setFolder([]);
      }}
      to={"/documents?path=" + currPath + id + "/"}
    >
      <div className="bg-white group shadow-lg rounded-lg p-5 group hover:bg-accent">
        <div className="flex text-accent group-hover:text-white space-x-1">
          <FolderIcon className="w-5" />
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="text-sm text-gray-500 group-hover:text-gray-800">
          <span>Erstellt: {dateFormat(createdAt)}</span>
          <br />
          <span>Ersteller: {owner.name}</span>
        </div>
      </div>
    </Link>
  );
}
