import React from "react";

export default function CardBody({children, noborder}) {
  return (
    <div className={"p-5 "+ (noborder ? "" : "border-t border-gray-400 border-opacity-50")}>
      {children}
    </div>
  );
}
