import React from "react";
import { Link } from "react-router-dom";

export default function SidebarItem({ to, icon, text, action = () => {} }) {
  return (
    <Link
      onClick={action}
      to={to}
      className="flex select-none items-center space-x-3 font-semibold py-2.5 px-4 rounded transition duration-100 hover:bg-white hover:text-accent hover:shadow"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
