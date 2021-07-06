import React from "react";
import { Link } from "react-router-dom";

export default function CardLink({name, id, link}) {
  return (
    <div key={id}>
      <Link
        className="text-blue-600 hover:underline"
        to={link}
      >
        {name}
      </Link>
    </div>
  );
}
