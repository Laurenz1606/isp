import { DocumentTextIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import { dateFormat } from "../../Functions/CommonFunctions";
import DocumentRolesTag from "./DocumentRolesTag";

export default function DocumentCard({
  title,
  id,
  changedAt,
  createdAt,
  roles,
  owner,
  currPath,
}) {
  return (
    <Link to={"/documents/" + id + "?path=" + currPath}>
      <div className="bg-white group shadow-lg rounded-lg p-5 group hover:bg-accent">
        <div className="flex text-accent group-hover:text-white space-x-1">
          <DocumentTextIcon className="w-5" />
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="text-sm text-gray-500 group-hover:text-gray-800">
          <span>Geändert: {dateFormat(changedAt)}</span>
          <br />
          <span>Erstellt: {dateFormat(createdAt)}</span>
          <br />
          <span>Ersteller: {owner.name}</span>
        </div>
        <div className="flex flex-row flex-wrap mt-2">
          {roles.map((role, idx) => (
            <DocumentRolesTag name={role} key={idx} />
          ))}
        </div>
      </div>
    </Link>
  );
}
