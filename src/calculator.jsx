import React, { useState } from "react";
import Keyboard from "./components/keyboard";
import Display from "./components/display";
import calc from "ez-calculator";

// ----------------------------------

export default function Calculator() {
    const [operation, setOperation] = useState("");
    const [input, setInput] = useState("");
    const [ans, setAns] = useState("");

    const calculate = () => {
        let x = calc.calculate(operation).toString();
        setAns(x);
        setOperation(x);
        setInput(x);
    };

    return (
        <section className="calculator-container">
            <div className="nes-container is-rounded calculator-body">
                <div className="display-container">
                    <Display content={operation} />
                    <Display content={input} />
                </div>
                <Keyboard
                    operation={operation}
                    setOperation={setOperation}
                    input={input}
                    setInput={setInput}
                    ans={ans}
                    setAns={setAns}
                    calculate={calculate}
                />
            </div>
        </section>
    );
}