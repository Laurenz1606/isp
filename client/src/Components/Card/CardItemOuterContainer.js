import React from "react";
import { Link } from "react-router-dom";

export default function CardItemOuterContainer({ children, to }) {
  return (
    <Link to={to}>
      <div
        style={{ flex: "0 0 100%" }}
        className="border-t border-gray-400 border-opacity-50 p-3"
      >
        {children}
      </div>
    </Link>
  );
}
