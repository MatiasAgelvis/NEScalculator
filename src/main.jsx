import { render } from "preact";
import Calculator from "./calculator";
import "nes.css/css/nes.css";
import "./index.scss";

// ----------------------------------

render(
    <>
        <header className="head-container">
            <div>
                <h1 className="title">NES Calculator</h1>
                <h2 className="subtitle">Hours of FUN!!</h2>
            </div>
            <a
                href="https://github.com/MatiasAgelvis"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
            >
                <i className="nes-icon github is-large"></i>
            </a>
        </header>
        <Calculator />
    </>,
    document.getElementById("root")
);
