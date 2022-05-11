import React, { useRef, useEffect } from "react";

export default function Display({ content }) {
    const displayRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        let display = displayRef.current;
        let text = textRef.current;

        // console.log(display.clientWidth, text.clientWidth);

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
