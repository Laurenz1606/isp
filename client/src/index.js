import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import  Config from "./Config"

document.config = Config

ReactDOM.render(<Router />, document.getElementById("root"));
