import React from "react";
import { Link } from "react-router-dom";

export default function CardMore({ more, to }) {
  return (
    <div className="flex p-4 justify-end border-t border-gray-400 border-opacity-50">
      <Link className="text-blue-600 hover:underline" to={to}>
        und {more} weitere...
      </Link>
    </div>
  );
}
