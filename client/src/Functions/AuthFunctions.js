const APIURL = "https://isp-server.mk-return.de";
const AUTHURL = APIURL + "/auth";

export async function logout(noRedirect = false) {
  await fetch(AUTHURL + "/logout", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: getTokenFromLocalstorage("refreshToken") }),
  });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  console.log(!noRedirect);
  console.log(!window.location.pathname);
  if (!noRedirect)
    window.location.href = "/login?r=" + window.location.pathname;
  else window.location.href = "/login";
}

export async function refreshToken() {
  const response = await fetch(AUTHURL + "/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: getTokenFromLocalstorage("refreshToken") }),
  })
    .then((res) => res.json())
    .catch(() => logout());
  console.log(response);
  if (response.code === 7 || response.code === 8 || response.code === 9) {
    logout();
  } else if (response.code === 0) {
    localStorage.setItem("accessToken", response.accessToken);
    console.log("refreshed Token");
    return 0;
  } else {
    logout();
  }
}

export async function login(username, password, redirect) {
  const response = await fetch(AUTHURL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  }).then((res) => res.json());
  if (response.code === 0) {
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
    if (redirect === null) redirect = "/dashboard";
    window.location.href = redirect;
  } else {
    return response.code;
  }
}

export async function checktokensAndRefresh() {
  const response = await fetch(AUTHURL + "/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      accessToken: getTokenFromLocalstorage("accessToken"),
      refreshToken: getTokenFromLocalstorage("refreshToken"),
    }),
  }).then((res) => res.json());
  console.log(response);
  if (response.code === 0) {
    window.location.href = "/dashboard";
  } else {
    const result = await fetch(AUTHURL + "/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: getTokenFromLocalstorage("refreshToken") }),
    }).then((res) => res.json());
    if (result.code === 7 || result.code === 8 || result.code === 9) {
      return false;
    } else if (result.code === 0) {
      localStorage.setItem("accessToken", result.accessToken);
      window.location.href = "/dashboard";
    }
  }
}

export async function checktokens() {
  const response = await fetch(AUTHURL + "/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      accessToken: getTokenFromLocalstorage("accessToken"),
      refreshToken: getTokenFromLocalstorage("refreshToken"),
    }),
  }).then((res) => res.json());
  console.log(response);
}

export async function fetcher(path, method, body = {}, headers = {}) {
  let result = await apicall(path, method, body, headers);
  // console.log(result);
  if (result.code === 0) {
    return result;
  } else {
    await refreshToken();
    result = await apicall(path, method, body, headers);
    if (result.code === 0) {
      return result;
    } else {
      logout();
    }
  }
}

async function apicall(path, method, body = {}, headers = {}) {
  let options = {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      Authorization: " Bearer " + localStorage.getItem("accessToken"),
      ...headers,
    },
  };
  if (method.toUpperCase() !== "GET") {
    options = { ...options, body: JSON.stringify(body) };
  }
  return fetch(APIURL + path, options)
    .then((res) => res.json())
    .catch((err) => {
      return { err: err, code: 7 };
    });
}

function getTokenFromLocalstorage(type) {
  const temporaryToken = localStorage.getItem(type);
  if (temporaryToken === null) return "";
  return temporaryToken;
}
