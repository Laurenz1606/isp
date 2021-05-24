import { ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";

export default function FolderLink({ link, pathName }) {
  return (
    <Link
      className="text-gray-800 flex justify-center font-medium items-center -space-x-1 hover:text-accent"
      to={link}
    >
      <ChevronRightIcon className="w-5" />
      <span>{pathName}</span>
    </Link>
  );
}
