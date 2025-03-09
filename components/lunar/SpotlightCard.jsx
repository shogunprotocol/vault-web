"use client"

import clsx from "clsx"
import { useRef } from "react"
import { useMouse } from "react-use"

export function SpotlightCard({
    as: Component = "div",
    from = "rgba(25,25,25,0.2)",
    via = null,
    to = "rgba(0, 255, 247, 0.2)",
    size = 350,
    mode = "before",
    children,
    className,
    ...props
}) {
    const container = useRef(null)

    const { elX, elY } = useMouse(container)

    const spotlightColorStops = [from, via, to].filter((value) => !!value).join(",")

    const classes =
        mode == "before"
            ? `before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]`
            : `after:absolute after:inset-0 after:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]`

    return (
        <Component
            ref={container}
            className={clsx("relative transform-gpu overflow-hidden", classes, className)}
            {...props}
            style={{
                "--x": `${elX}px`,
                "--y": `${elY}px`,
                "--spotlight-color-stops": spotlightColorStops,
                "--spotlight-size": `${size}px`,
            }}>
            {children}
        </Component>
    )
}
