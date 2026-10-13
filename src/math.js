// Minimal recursive-descent evaluator for +, -, x, / with decimals.
// Replaces ez-calculator, whose eval() approach tripped minifier
// warnings and gave no control over errors.

const TOKEN_RE = /\d+\.\d*|\.\d+|\d+|[+\-*/]/g;

function tokenize(expression) {
    const tokens = expression.match(TOKEN_RE) ?? [];
    // anything the token regex didn't cover (letters, parens, ...) is invalid
    if (tokens.join("") !== expression) {
        throw new SyntaxError(`Invalid character in expression: "${expression}"`);
    }
    return tokens;
}

export function evaluate(expression) {
    const tokens = tokenize(expression);
    let pos = 0;
    const peek = () => tokens[pos];

    // number, possibly signed: "-3", "+.5", ...
    const parsePrimary = () => {
        let sign = 1;
        if (peek() === "-" || peek() === "+") {
            if (peek() === "-") sign = -1;
            pos += 1;
        }
        const token = peek();
        if (token === undefined || /[+\-*/]/.test(token)) {
            throw new SyntaxError(`Unexpected "${token ?? "end of expression"}"`);
        }
        pos += 1;
        return sign * parseFloat(token);
    };

    // multiplication and division bind tighter than addition/subtraction
    const parseTerm = () => {
        let value = parsePrimary();
        while (peek() === "*" || peek() === "/") {
            const operator = tokens[pos++];
            const rhs = parsePrimary();
            value = operator === "*" ? value * rhs : value / rhs;
        }
        return value;
    };

    const parseExpression = () => {
        let value = parseTerm();
        while (peek() === "+" || peek() === "-") {
            const operator = tokens[pos++];
            const rhs = parseTerm();
            value = operator === "+" ? value + rhs : value - rhs;
        }
        return value;
    };

    const result = parseExpression();
    if (pos !== tokens.length) {
        throw new SyntaxError(`Unexpected "${tokens[pos]}"`);
    }
    // reject NaN/Infinity (e.g. 1/0) and clean up binary float noise
    // so 0.1 + 0.2 reads as 0.3
    if (!Number.isFinite(result)) {
        throw new RangeError(`Result is not finite: ${result}`);
    }
    return parseFloat(result.toPrecision(12));
}
