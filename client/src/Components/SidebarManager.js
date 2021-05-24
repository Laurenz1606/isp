import React from "react";
import { useRouteMatch } from "react-router";
import { refreshToken } from "../Functions/AuthFunctions";
import Sidebar from "./Sidebar/Sidebar";

export default function SidebarManager({ children }) {
  let match = useRouteMatch();
  if (match.url !== "/login") {
    window.onload = function () {
      const trylogin = async () => await refreshToken();
      trylogin();
    };
  }
  return (
    <>
      {match.url !== "/login" ?  <Sidebar>{children}</Sidebar> : children}
    </>
  );
}
