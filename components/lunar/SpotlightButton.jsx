import clsx from "clsx"

export function SpotlightButton({ as: Component = "button", children, className, onClick, ...props }) {
    return (
        <Component
            className={clsx(
                className,
                "group relative text-black inline-flex items-center overflow-hidden rounded-full bg-zinc-900 px-8 py-3 transition",
            )}
            onClick={onClick}
            {...props}>
            <div className="absolute inset-0 flex items-center [container-type:inline-size]">
                <div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(0,255,247,0.9)_0deg,transparent_60deg,transparent_300deg,rgba(0,255,247,0.9)_360deg)] opacity-0 transition duration-300 [animation-duration:3s] group-hover:opacity-100"></div>
            </div>

            <div className="absolute inset-0.5 rounded-full bg-black-tr"></div>

            <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100"></div>

            {children}
        </Component>
    )
}
