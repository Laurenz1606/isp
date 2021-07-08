import React from "react";

export default function CardBody({children}) {
  return (
    <div className="p-5 border-t border-gray-400 border-opacity-50">
      {children}
    </div>
  );
}
