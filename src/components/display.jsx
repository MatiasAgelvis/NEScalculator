import { useRef, useEffect } from "preact/hooks";

export default function Display({ content }) {
    const displayRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        let display = displayRef.current;
        let text = textRef.current;

        if (0.85 * display.clientWidth < text.clientWidth) {
            text.classList.add("animate");
        } else {
            text.classList.remove("animate");
        }
    }, [content]);

    return (
        <div className="nes-container text-container right-align" ref={displayRef}>
            <span className="text" ref={textRef}>
                {content}
            </span>
        </div>
    );
}
