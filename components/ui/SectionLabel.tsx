import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import React from "react";

interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
}

const SectionLabel = React.forwardRef<HTMLDivElement, SectionLabelProps>(
    ({ className, children, icon, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full bg-[#69E300]/10 border border-[#69E300]/20 px-4 py-2 text-sm font-medium text-[#69E300]",
                    className
                )}
                {...props}
            >
                {icon || <Zap className="h-4 w-4" />}
                <span>{children}</span>
            </div>
        );
    }
);

SectionLabel.displayName = "SectionLabel";

export { SectionLabel };
