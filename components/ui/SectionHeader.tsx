import { cn } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";

interface SectionHeaderProps {
    label: string;
    title: React.ReactNode;
    subtitle: string;
    className?: string;
    icon?: React.ReactNode;
}

export function SectionHeader({
    label,
    title,
    subtitle,
    className,
    icon,
}: SectionHeaderProps) {
    return (
        <div className={cn("text-center space-y-4 mb-12", className)}>
            <SectionLabel icon={icon}>{label}</SectionLabel>
            <h2
                className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
                {title}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-6 mb-8 px-4">{subtitle}</p>
        </div>
    );
}
