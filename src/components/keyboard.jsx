import Key from "./key";

export default function Keyboard({
	pressDigit,
	pressDecimal,
	pressOperator,
	pressAns,
	backspace,
	clearAll,
	calculate
}) {
	// Order is important, do not change
	const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

	return (
		<div className="btn-container nes-container">
			{numbers.map(num => <Key
					id={'_' + num}
					key={'_' + num}
					classNames={'_' + num}
					clickHandle={() => pressDigit(num)}
					content={num}
				/>)}
			<Key
				id="decimal"
				classNames="point is-warning"
				clickHandle={pressDecimal}
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
				clickHandle={() => pressOperator("+")}
				content="+"
			/>
			<Key
				id="subtract"
				classNames="minus is-primary"
				clickHandle={() => pressOperator("-")}
				content="-"
			/>
			<Key
				id="multiply"
				classNames="mult is-primary"
				clickHandle={() => pressOperator("*")}
				content="x"
			/>
			<Key
				id="divide"
				classNames="div is-primary"
				clickHandle={() => pressOperator("/")}
				content="/"
			/>
			<Key
				id="ans"
				classNames="ans is-success"
				clickHandle={pressAns}
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
				clickHandle={backspace}
				content="&lt;#"
			/>
		</div>
	);
}
