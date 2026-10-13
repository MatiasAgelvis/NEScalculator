export default function Key({ id, classNames, content, clickHandle }) {
    return (
        <button
            id={id}
            type="button"
            className={classNames + " nes-btn"}
            onClick={clickHandle}
        >
            {content}
        </button>
    );
}
