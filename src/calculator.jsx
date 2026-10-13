import { useState, useEffect } from "preact/hooks";
import Keyboard from "./components/keyboard";
import Display from "./components/display";
import calc from "ez-calculator";

// ----------------------------------

const OPERATORS = ["+", "-", "*", "/"];

// The operand the user is currently typing: everything after the
// last operator, e.g. "12+3.4" -> "3.4"
const trailingOperand = (operation) => operation.match(/[0-9.]*$/)?.[0] ?? "";

export default function Calculator() {
    // `operation` is the single source of truth (the full expression);
    // the input display is derived from it, so the two can never desync
    const [operation, setOperation] = useState("");
    const [ans, setAns] = useState("");

    const input = trailingOperand(operation);
    const isError = operation === "ERROR";

    const pressDigit = (digit) => {
        if (isError) {
            setOperation(digit);
        } else if (input === "0") {
            // replace a leading zero instead of appending to it
            setOperation(operation.slice(0, -1) + digit);
        } else {
            setOperation(operation + digit);
        }
    };

    const pressDecimal = () => {
        if (isError) {
            setOperation("0.");
        } else if (!input.includes(".")) {
            // start the operand with "0." when there is no digit yet
            setOperation(input === "" ? operation + "0." : operation + ".");
        }
        // a second decimal point in the same operand is ignored
    };

    const pressOperator = (operator) => {
        if (isError || operation === "") return;
        // pressing an operator twice swaps it instead of stacking, e.g. "5+" then "-" -> "5-"
        setOperation(
            OPERATORS.includes(operation.slice(-1))
                ? operation.slice(0, -1) + operator
                : operation + operator
        );
    };

    const pressAns = () => {
        if (isError || ans === "") return;
        // insert ANS as a factor when the current operand has digits,
        // otherwise treat it as the operand itself
        setOperation(
            operation === ""
                ? ans
                : input === ""
                  ? operation + ans
                  : operation + "*" + ans
        );
    };

    const backspace = () => {
        if (!isError) setOperation(operation.slice(0, -1));
    };

    const clearAll = () => {
        setOperation("");
    };

    const calculate = () => {
        if (operation === "" || isError || OPERATORS.includes(operation.slice(-1)))
            return;
        try {
            const x = calc.calculate(operation).toString();
            if (!Number.isFinite(Number(x))) {
                setOperation("ERROR");
                return;
            }
            setAns(x);
            setOperation(x);
        } catch {
            setOperation("ERROR");
        }
    };

    // Physical keyboard support
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            // let Enter/Space activate a focused button instead of the shortcut
            if (e.target instanceof HTMLElement && e.target.closest("button")) return;
            if (/^[0-9]$/.test(e.key)) pressDigit(e.key);
            else if (e.key === ".") pressDecimal();
            else if (OPERATORS.includes(e.key)) pressOperator(e.key);
            else if (e.key === "Enter" || e.key === "=") {
                e.preventDefault();
                calculate();
            } else if (e.key === "Backspace") backspace();
            else if (e.key === "Escape") clearAll();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [operation, ans, isError]);

    return (
        <section className="calculator-container">
            <div className="nes-container is-rounded calculator-body">
                <div className="display-container">
                    <Display content={operation} />
                    <Display content={input} />
                </div>
                <Keyboard
                    pressDigit={pressDigit}
                    pressDecimal={pressDecimal}
                    pressOperator={pressOperator}
                    pressAns={pressAns}
                    backspace={backspace}
                    clearAll={clearAll}
                    calculate={calculate}
                />
            </div>
        </section>
    );
}
