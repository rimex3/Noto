'use client'

import { PageType } from "@/types"
import IconPicker from "./icon-picker"
import { useParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { updatePage } from "@/actions"
import { useCallback, useState } from "react"
import { useUser } from "@clerk/nextjs"

type NotoPageIconProps = {
    page: PageType
}

export default function NotoPageIcon({ page }: NotoPageIconProps) {
    const [open, setOpen] = useState(false)
    const { pageId } = useParams()
    const { mutateAsync } = useMutation({ mutationFn: updatePage })
    const { user } = useUser()


    const onOpen = () => {
        setOpen(prev => !prev)
    }

    const handleUpdateIcon = useCallback(async (icon: string) => {
        await mutateAsync({
            id: pageId?.[0]!,
            icon,
            auth_id: user?.id
        })
        setOpen(false)
    }, [pageId, mutateAsync, user?.id])

    return (
        <IconPicker
            asChild
            onEmojiChange={handleUpdateIcon}
            open={open}
            onOpen={onOpen}
        >
            <div className="absolute text-[5rem] -left-[165px] -top-[90px] select-none w-fit cursor-pointer">
                {page?.icon}
            </div>
        </IconPicker>
    )
}