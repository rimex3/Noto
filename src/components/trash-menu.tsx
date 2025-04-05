'use client'

import { PageType } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import TrashContent from "./trash-content";
import { useState } from "react";

interface TrashMenuProps {
    children?: React.ReactNode
    trash: PageType[]
}

export default function TrashMenu({ children, trash }: TrashMenuProps) {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(prev => !prev)
    }

    return (
        <Popover open={open} onOpenChange={handleOpen}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className=" w-[265px] min-w-[180px] max-w-[calc(-24px + 100vw)] shadow-none translate-x-2 relative !z-20 p-1 rounded-[10px] ">
                <TrashContent trash={trash as any} setOpen={setOpen} />
            </PopoverContent>
        </Popover>
    )
}
