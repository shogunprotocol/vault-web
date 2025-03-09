import Image from 'next/image';
import { SectionBadge, SectionHeading } from '@/components/lunar/Section';
const items = [
    {
        image: "/images/logo/sonic-logo.png",
    },
    {
        image: "/images/logo/allora-logo-white.png",
    },
    {
        image: "/images/logo/debridge-logo.png",
    },
];

export default function MarqueeBrands() {
    return (
        <>
            <SectionHeading>
                <SectionBadge>Sponsors</SectionBadge>
            </SectionHeading>

            <div className="relative flex py-10 w-screen items-center">
                <div className="relative flex max-w-[100vw] overflow-hidden">
                    <div className="flex w-max animate-marquee [--duration:30s] hover:[animation-play-state:paused]">
                        {[...items, ...items].map((item, index) => (
                            <div key={index} className="h-full px-2.5">
                                <div className="relative h-full w-[28rem] rounded-2xl border border-white/5 bg-white/5 p-20">
                                    <Image
                                        src={item.image}
                                        alt=""
                                        layout="fill"
                                        objectFit="contain"
                                        className="rounded-2xl filter grayscale hover:filter-none transition-all duration-200 px-6"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}