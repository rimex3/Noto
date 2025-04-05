'use client'

import { updatePage } from "@/actions"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { icons } from "@/constants/icons"
import { useMutation } from "@tanstack/react-query"
import { useUser } from "@clerk/nextjs"

interface ControlMenuProps {
    pageId: string
    children: React.ReactNode
    onOpen?: () => void
    open?: boolean
}

export default function ControlMenu({ children, onOpen, open, pageId }: ControlMenuProps) {
    const { mutateAsync } = useMutation({
        mutationFn: updatePage
    })
    
    const {user} = useUser()
    const handleArchive = async () => {
        try {
            await mutateAsync({
                id: pageId,
                auth_id: user?.id!,
                isArchived: true,
            })
        } finally {
            onOpen?.()
        }
    }

    return (
        <Popover open={open} onOpenChange={onOpen}>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent className=" w-[265px] min-w-[180px] max-w-[calc(-24px + 100vw)] shadow-none translate-x-2 relative !z-20 p-1 rounded-[6px] ">
                <div className="hover:bg-[#F3F3F3] transition-colors cursor-pointer rounded-[6px] h-[28px] flex items-center space-x-3 text-[14px] px-[8px]">
                    {icons.link} <span>Copy link</span>
                </div>
                <div className="hover:bg-[#F3F3F3] transition-colors cursor-pointer rounded-[6px] h-[28px] flex items-center space-x-3 text-[14px] px-[8px]">
                    {icons.duplicate} <span>Duplicate</span>
                </div>
                <div className="hover:bg-[#F3F3F3] transition-colors cursor-pointer rounded-[6px] h-[28px] flex items-center space-x-3 text-[14px] px-[8px]">
                    {icons.arrowTurnUpRight} <span>Move to</span>
                </div>
                <div onClick={handleArchive} className="hover:bg-[#F3F3F3] transition-colors cursor-pointer rounded-[6px] h-[28px] flex items-center space-x-3 text-[14px] px-[8px] hover:text-[#EB5757] ">
                    {icons.trash} <span>Move to trash</span>
                </div>
            </PopoverContent>
        </Popover>
    )
}
