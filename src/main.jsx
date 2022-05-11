import React from "react";
import ReactDOM from "react-dom";
import Calculator from "./calculator";
import "./index.scss";

// ----------------------------------

ReactDOM.render(
    <React.StrictMode>
        <header className="head-container">
            <div>
                <h1 className="title">NES Calculator</h1>
                <h2 className="subtitle">Hours of FUN!!</h2>
            </div>
            <a href="https://github.com/MatiasAgelvis" target="_blank">
                <i className="nes-icon github is-large"></i>
            </a>
        </header>
        <Calculator />
    </React.StrictMode>,
    document.getElementById("root")
);
