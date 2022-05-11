export default function Key({ id, classNames, content, clickHandle }) {
    return (
        <div id={id} className={classNames + " nes-btn"} onClick={clickHandle}>
            {content}
        </div>
    );
}
