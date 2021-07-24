import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { checktokensAndRefresh, logout } from "./Functions/AuthFunctions";
import Error from "./Sites/Error";
import Index from "./Sites/Index";
import Login from "./Sites/Login";
import SidebarManager from "./Components/SidebarManager";
import Provision from "./Sites/Provision";
import Document from "./Sites/Document";
import Documents from "./Sites/Documents";
import Mails from "./Sites/Mails";
import ManageServer from "./Sites/ManageServer";
import AdminProtect from "./Components/AdminProtect";
import Calendar from "./Sites/Calendar";

function Start() {
  useEffect(() => {
    const trylogin = async () => {
      if ((await checktokensAndRefresh()) === false) {
        logout(true);
      }
    };
    trylogin();
  }, []);
  return <></>;
}

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* login page */}
          <Route path="/login">
            <SidebarManager>
              <Login />
            </SidebarManager>
          </Route>

          {/* dashboard[landing] page */}
          <Route path="/dashboard">
            <SidebarManager>
              <Index />
            </SidebarManager>
          </Route>

          {/* provisions page */}
          <Route path="/provision">
            <SidebarManager>
              <Provision />
            </SidebarManager>
          </Route>

          {/* calender page */}
          <Route path="/calendar">
            <SidebarManager>
              <Calendar />
            </SidebarManager>
          </Route>

          {/* provisions mails */}
          <Route path="/mails">
            <SidebarManager>
              <Mails />
            </SidebarManager>
          </Route>

          {/* single document */}
          <Route path="/documents/:id">
            <SidebarManager>
              <Document />
            </SidebarManager>
          </Route>

          {/* document overview */}
          <Route path="/documents">
            <SidebarManager>
              <Documents />
            </SidebarManager>
          </Route>

          {/* manage-server */}
          <Route path="/manage-server">
            <SidebarManager>
              <AdminProtect>
                <ManageServer />
              </AdminProtect>
            </SidebarManager>
          </Route>

          {/* admincontrolpanel */}
          <Route path="/acp">
            <SidebarManager>
              <AdminProtect>
                <p>ACP</p>
              </AdminProtect>
            </SidebarManager>
          </Route>

          {/* start page -> redirect to login */}
          <Route exact path="/">
            <Start />
          </Route>

          {/* 404 */}
          <Route path="/">
            <Error />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
