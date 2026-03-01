import { cn } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";

interface SectionHeaderProps {
    label: string;
    title: React.ReactNode;
    subtitle: string;
    className?: string;
}

export function SectionHeader({
    label,
    title,
    subtitle,
    className,
}: SectionHeaderProps) {
    return (
        <div className={cn("text-center space-y-4 mb-12", className)}>
            <SectionLabel>{label}</SectionLabel>
            <h2
                className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
                {title}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    );
}
