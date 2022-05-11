import Key from "./key";


export default function Keyborad({
	operation,
	setOperation,
	input,
	setInput,
	ans,
	setAns,
	calculate
}) {
	const operators = ["+", "-", "*", "/"];
	// Order is important, do not change
	const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

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
		if (input.includes(".")) {
			let saveInput = input;
			setInput("Input Already Contains Decimal Point");
			setTimeout(() => setInput(saveInput), 1000);
		} else {
			inputKey(".")();
		}
	};

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
		if (operation !== '0'){
			setOperation(operation + ans);
		}
		else {setOperation(ans);}
		setInput(ans);
	};

	return (
		<div className="btn-container nes-container">
		{numbers.map(num => <Key
				id={'_' + num}
				key={'_' + num}
				classNames={'_' + num}
				clickHandle={inputKey(num)}
				content={num}
			/>)}
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
	);
}
