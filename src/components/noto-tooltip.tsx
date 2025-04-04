'use client'

import { cn } from "@/lib/cn";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { memo } from "react";

const NotoTooltip = memo(({ className, content, children }: { className?: string, content: string, children?: Readonly<React.ReactElement> }) => {
    return (
        <div className={cn(className)}>
            <TooltipProvider >
                <Tooltip >
                    <TooltipTrigger asChild>
                        {children}
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{content}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
})

NotoTooltip.displayName = "NotoTooltip"

export default NotoTooltip