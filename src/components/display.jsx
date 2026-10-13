import { useRef, useEffect } from "preact/hooks";

export default function Display({ content }) {
    const displayRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const display = displayRef.current;
        const text = textRef.current;
        const style = getComputedStyle(display);
        const innerWidth =
            display.clientWidth -
            parseFloat(style.paddingLeft) -
            parseFloat(style.paddingRight);
        // exact distance the text must travel so its end is visible,
        // plus a little breathing room
        const overflow = text.scrollWidth - innerWidth + 8;
        if (overflow > 0) {
            text.style.setProperty("--scroll", `${-overflow}px`);
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
