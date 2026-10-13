import { useState, useEffect } from "preact/hooks";
import Keyboard from "./components/keyboard";
import Display from "./components/display";
import { evaluate } from "./math";

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
    // unclosed "(" count — ")" is only allowed while this is positive
    const openParens =
        (operation.match(/\(/g)?.length ?? 0) -
        (operation.match(/\)/g)?.length ?? 0);

    const pressDigit = (digit) => {
        if (isError) {
            setOperation(digit);
        } else if (/[)]$/.test(operation)) {
            // implicit multiplication after a closed paren: "2*(3)" + 5 -> "2*(3)*5"
            setOperation(operation + "*" + digit);
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
        } else if (/[)]$/.test(operation)) {
            setOperation(operation + "*0.");
        } else if (!input.includes(".")) {
            // start the operand with "0." when there is no digit yet
            setOperation(input === "" ? operation + "0." : operation + ".");
        }
        // a second decimal point in the same operand is ignored
    };

    const pressParen = (paren) => {
        if (isError) return;
        if (paren === "(") {
            // implicit multiplication: "2(" -> "2*("
            setOperation(
                operation + (/[0-9)]$/.test(operation) ? "*(" : "(")
            );
        } else if (openParens > 0 && /[0-9)]$/.test(operation)) {
            setOperation(operation + ")");
        }
        // ")" with nothing open is ignored
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
        // insert ANS as a factor when a digit or ")" precedes it,
        // otherwise treat it as the operand itself
        setOperation(
            operation === ""
                ? ans
                : /[0-9)]$/.test(operation)
                  ? operation + "*" + ans
                  : operation + ans
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
        // auto-close open parens before evaluating: "2*(3+4" -> "2*(3+4)"
        const expression = operation + ")".repeat(Math.max(openParens, 0));
        try {
            const x = evaluate(expression).toString();
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
            // Enter/Space natively activate a focused button; every other key
            // is a global shortcut even while a button holds focus
            const onButton =
                e.target instanceof HTMLElement && e.target.closest("button");
            if (e.key === "Enter" && onButton) return;
            if (e.key === " ") return;
            if (e.key === "Enter" || e.key === "=") {
                e.preventDefault();
                calculate();
            } else if (/^[0-9]$/.test(e.key)) pressDigit(e.key);
            else if (e.key === ".") pressDecimal();
            else if (OPERATORS.includes(e.key)) pressOperator(e.key);
            else if (e.key === "(" || e.key === ")") pressParen(e.key);
            else if (e.key === "Backspace") backspace();
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
                    pressParen={pressParen}
                    pressAns={pressAns}
                    backspace={backspace}
                    clearAll={clearAll}
                    calculate={calculate}
                />
            </div>
        </section>
    );
}
