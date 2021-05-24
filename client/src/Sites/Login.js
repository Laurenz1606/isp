import React, { useEffect, useState } from "react";
import { checktokensAndRefresh, login } from "../Functions/AuthFunctions";
import { useQuery } from "../Functions/ReactRouterDomHooks";

export default function Login() {
  useEffect(() => {
    const trylogin = async () => await checktokensAndRefresh();
    trylogin();
  }, []);
  const redirectTo = useQuery().get("r")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(username, password, redirectTo);
        }}
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          type="text"
          name="username"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          name="password"
          autoComplete="off"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
