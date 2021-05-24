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
