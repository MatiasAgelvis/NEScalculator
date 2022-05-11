import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import calc from "ez-calculator";
import "./index.scss";

// ----------------------------------

function Calculator() {
    const [operation, setOperation] = useState("");
    const [input, setInput] = useState("");
    const [ans, setAns] = useState("");

    const operators = ["+", "-", "*", "/"];
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const inputKey = (x) => () => {
        if (input != "0") {
            // if it's an operator clear the input screen
            setInput(operators.some((x) => input.includes(x)) ? x : input + x);
            setOperation(operation + x);
        } else {
            // remove the leading zero
            setOperation(backspace(operation) + x);
            setInput(backspace(input) + x);
        }
    };

    const inputDecimal = () => {
      if (input.includes('.')){
        let saveInput = input
        setInput('Input Already Contains Decimal Point')
        setTimeout(() => setInput(saveInput), 1000)
      }else{
        inputKey('.')()
      }
    }

    const inputOperator = (x) => () => {
        setInput(x);
        setOperation(operation + x);
    };

    function backspace(strng) {
        return strng.substring(0, strng.length - 1);
    }

    const backspaceInput = () => {
        console.log(input.length);
        if (input.length > 0) {
            setOperation(backspace(operation));
            setInput(backspace(input));
        }
    };

    const clearAll = () => {
        setOperation("0");
        setInput("0");
    };

    const inputAns = () => {
        setOperation(operation + ans);
        setInput(ans);
    };

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
                <div className="btn-container nes-container">
                    <Key
                        id="seven"
                        classNames="_7"
                        clickHandle={inputKey("7")}
                        content="7"
                    />
                    <Key
                        id="eight"
                        classNames="_8"
                        clickHandle={inputKey("8")}
                        content="8"
                    />
                    <Key
                        id="nine"
                        classNames="_9"
                        clickHandle={inputKey("9")}
                        content="9"
                    />
                    <Key
                        id="four"
                        classNames="_4"
                        clickHandle={inputKey("4")}
                        content="4"
                    />
                    <Key
                        id="five"
                        classNames="_5"
                        clickHandle={inputKey("5")}
                        content="5"
                    />
                    <Key
                        id="six"
                        classNames="_6"
                        clickHandle={inputKey("6")}
                        content="6"
                    />
                    <Key
                        id="one"
                        classNames="_1"
                        clickHandle={inputKey("1")}
                        content="1"
                    />
                    <Key
                        id="two"
                        classNames="_2"
                        clickHandle={inputKey("2")}
                        content="2"
                    />
                    <Key
                        id="three"
                        classNames="_3"
                        clickHandle={inputKey("3")}
                        content="3"
                    />
                    <Key
                        id="zero"
                        classNames="_0"
                        clickHandle={inputKey("0")}
                        content="0"
                    />
                    <Key
                        id="decimal"
                        classNames="point is-warning"
                        clickHandle={inputDecimal}
                        content="."
                    />
                    <Key
                        id="equals"
                        classNames="equal is-success"
                        clickHandle={calculate}
                        content="="
                    />
                    <Key
                        id="add"
                        classNames="plus is-primary"
                        clickHandle={inputOperator("+")}
                        content="+"
                    />
                    <Key
                        id="subtract"
                        classNames="minus is-primary"
                        clickHandle={inputOperator("-")}
                        content="-"
                    />
                    <Key
                        id="multiply"
                        classNames="mult is-primary"
                        clickHandle={inputOperator("*")}
                        content="x"
                    />
                    <Key
                        id="divide"
                        classNames="div is-primary"
                        clickHandle={inputOperator("/")}
                        content="/"
                    />
                    <Key
                        id="ans"
                        classNames="ans is-success"
                        clickHandle={inputAns}
                        content="ANS"
                    />
                    <Key
                        id="clear"
                        classNames="AC is-error"
                        clickHandle={clearAll}
                        content="AC"
                    />
                    <Key
                        id="backspace"
                        classNames="back is-warning"
                        clickHandle={backspaceInput}
                        content="&lt;#"
                    />
                </div>
            </div>
        </section>
    );
}

function Key({ id, classNames, content, clickHandle }) {
    return (
        <div id={id} className={classNames + " nes-btn"} onClick={clickHandle}>
            {content}
        </div>
    );
}

function Display({ content }) {
    const displayRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        let display = displayRef.current;
        let text = textRef.current;
        console.log(display.clientWidth, text.clientWidth);
        if (0.85 * display.clientWidth < text.clientWidth) {
            text.classList.add("animate");
        } else {
            text.classList.remove("animate");
        }
    }, [content]);

    return (
        <div
            id="display"
            className="nes-container text-container right-aling"
            ref={displayRef}
        >
            <span className="text" ref={textRef}>
                {content}
            </span>
        </div>
    );
}

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
