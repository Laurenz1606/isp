import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AdjustmentsIcon,
  CalendarIcon,
  ClipboardListIcon,
  CloudIcon,
  CogIcon,
  CreditCardIcon,
  DatabaseIcon,
  DocumentTextIcon,
  LogoutIcon,
  MailIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import SidebarItem from "./SidebarItem";
import { logout } from "../../Functions/AuthFunctions";

export default function Sidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation().pathname;

  function toggleNavbar() {
    setSidebarOpen((prev) => !prev);
  }

  function checkIfdocuments() {
    if (location.match(/^\/documents\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g) === null) return false;
    return true
  }
  console.log()

  return (
    <div className="relative min-h-screen md:flex">
      <div className="sidebar bg-gray-800 text-gray-100 flex justify-between md:hidden">
        <Link to="/dashboard" className="block p-4 text-white font-bold">
          mk:return ISP
        </Link>

        <button onClick={toggleNavbar} className="group p-4 hover:bg-gray-700">
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>

      <div
        className={
          "sidebar bg-accent text-white w-64 py-3 px-2 inset-y-0 left-0 flex-shrink-0 z-10 transform fixed md:translate-x-0 transition duration-200 ease-in-out" +
          (sidebarOpen ? "" : " -translate-x-full")
        }
      >
        <div className="md:hidden text-white flex justify-end px-1">
          <button
            onClick={toggleNavbar}
            className="hover:bg-white hover:text-accent hover:shadow rounded"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <Link
          onClick={toggleNavbar}
          to="/dashboard"
          className="text-white flex items-center my-4 space-x-2 px-3"
        >
          <AdjustmentsIcon className="h-8 w-8" />
          <span className="text-2xl font-extrabold">mk:return ISP</span>
        </Link>
        <nav>
          <SidebarItem
            action={toggleNavbar}
            to="/mails"
            text="E-Mails"
            icon={<MailIcon className="h-6 w-6" />}
          />
          <SidebarItem
            action={toggleNavbar}
            to="/calendar"
            text="Kalender"
            icon={<CalendarIcon className="h-6 w-6" />}
          />
          <SidebarItem
            action={toggleNavbar}
            to="/sammelwettbewerb"
            text="Sammelwettbewerb"
            icon={<ClipboardListIcon className="h-6 w-6" />}
          />
          <SidebarItem
            action={toggleNavbar}
            to="/alt-it-datenbank"
            text="Alt-IT Datenbank"
            icon={<DatabaseIcon className="h-6 w-6" />}
          />
          <SidebarItem
            action={toggleNavbar}
            to="/provision"
            text="Provision"
            icon={<CreditCardIcon className="h-6 w-6" />}
          />
          <SidebarItem
            action={toggleNavbar}
            to="/cloud"
            text="Cloud"
            icon={<CloudIcon className="h-6 w-6" />}
          />
          <SidebarItem
            action={toggleNavbar}
            to="/documents"
            text="Dokumente"
            icon={<DocumentTextIcon className="h-6 w-6" />}
          />
          <SidebarItem
            action={toggleNavbar}
            to="/settings"
            text="Einstellungen"
            icon={<CogIcon className="h-6 w-6" />}
          />
          <button
            onClick={logout}
            className="flex w-full items-center space-x-3 font-semibold py-2.5 px-4 rounded transition duration-100 hover:bg-red-500 hover:shadow"
          >
            <LogoutIcon className="h-6 w-6" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
      <div className={"flex-1 md:ml-64 " + (checkIfdocuments() === true ? "flex justify-center" : "p-5")}>
        {children}
      </div>
    </div>
  );
}
