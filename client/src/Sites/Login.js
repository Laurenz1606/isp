import React, { useEffect, useState } from "react";
import { checktokensAndRefresh, login } from "../Functions/AuthFunctions";
import { useQuery } from "../Functions/ReactRouterDomHooks";
import { Link } from "react-router-dom";
import { ExclamationIcon, LoginIcon } from "@heroicons/react/outline";

export default function Login() {
  const redirectTo = useQuery().get("r");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  useEffect(() => {
    document.title = document.config.title.replace("[SITE]", "Login");
  }, []);

  useEffect(() => {
    console.log(errorCode);
  }, [errorCode]);

  useEffect(() => {
    const trylogin = async () => await checktokensAndRefresh();
    trylogin();
  }, []);
  return (
    <>
      <div className="login-bg"></div>
      <div className="z-20 top-0 left-0 absolute w-screen h-screen flex flex-col items-center justify-center">
        <div style={{ maxWidth: "90vw" }} className="space-y-8">
          <div
            className={
              "bg-red-400 p-3 rounded-2xl top-1/5 text-white flex flex-grow-0 flex-shrink-0 text-lg space-x-4 items-center pr-6 md:max-w-2xl " +
              ((errorCode === 1) |
              (errorCode === 2) |
              (errorCode === 3) |
              (errorCode === 10)
                ? "bg-opacity-100 text-opacity-100"
                : "bg-opacity-0 text-opacity-0")
            }
          >
            <ExclamationIcon className="h-16 w-16" />
            <div className="flex items-center">
              {(errorCode === 1) | (errorCode === 2)
                ? "Der Benutzername oder das Kennwort ist falsch oder der Account existiert nicht."
                : errorCode === 3
                ? "Es ist ein Problem mit dem Server aufgetreten, probiere es in paar Minuten nochmal."
                : errorCode === 10
                ? "Dein Account ist deaktiviert. Wenn sich dies um einen Fehler handelt, kontaktiere einen Server-Administrator."
                : "Der Benutzername oder das Kennwort ist falsch oder der Account existiert nicht."}
            </div>
          </div>
          <div className="bg-white opacity-80 p-6 rounded-2xl">
            <div className="text-lg font-bold mr-24">
              mk:return Anmeldung | Internes-Mitarbeiter-Portal
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const x = async () => {
                  setErrorCode(await login(username, password, redirectTo));
                };
                x();
              }}
              className="mt-4"
            >
              <div>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Benutzername"
                  type="text"
                  name="username"
                  className={
                    "py-2 text-xl text-black font-medium border-b-2 focus:border-accent w-4/5 " +
                    (username !== ""
                      ? "border-accent"
                      : "border-gray-400 border-opacity-50")
                  }
                />
              </div>
              <div className="mt-5">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Passwort"
                  type="password"
                  name="password"
                  autoComplete="off"
                  className={
                    "py-2 text-xl text-black font-medium border-b-2 focus:border-accent w-4/5 " +
                    (password !== ""
                      ? "border-accent"
                      : "border-gray-400 border-opacity-50")
                  }
                />
              </div>
              <div className="my-2">
                Passwort vergessen?{" "}
                <Link className="text-blue-600 hover:underline">
                  Hier Klicken
                </Link>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-accent  flex px-5 justify-center items-center rounded-lg text-white font-semibold text-lg py-2 space-x-2 text-center hover:shadow-md"
                >
                  <LoginIcon className="w-6 rotate-180 transform h-6" />
                  <div>Anmelden</div>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="z-20 absolute bottom-0 inset-x-0 bg-white flex items-center justify-center p-2 text-lg font-semibold">
          <a href="https://mk-return.de">©2021 mk:return</a>
        </div>
      </div>
    </>
  );
}
