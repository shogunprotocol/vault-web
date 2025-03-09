import { SpotlightButton } from "@/components/lunar/SpotlightButton";

export default function ButtonNext({ text, onClick }) {
    return (
        <div className="flex items-center justify-center group">
            <SpotlightButton onClick={onClick}>
                <span className="relative mt-px uppercase group-hover:text-basement-cyan bg-gradient-to-b from-white/25 to-white bg-clip-text font-mona text-lg font-medium text-transparent transition-all duration-200">
                    {text}
                </span>
            </SpotlightButton>
        </div>
    )
}