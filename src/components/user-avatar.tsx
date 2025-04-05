'use client'

import Image from "next/image"
import { icons } from "@/constants/icons"
import SidebarItem from "./sidebar-item"
import NotoTooltip from "./noto-tooltip"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "@tanstack/react-query"
import { createPage } from "@/actions"
import { useCallback } from "react"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { usePagesList } from "@/hooks/use-pages-list"
import { PageType } from "@/types"

export default function UserAvatar() {
    const router = useRouter()
    const { user } = useUser()
    const { pageId }: { pageId: string[] } = useParams()
    const pagesList = usePagesList()

    const { mutateAsync } = useMutation({
        mutationFn: createPage,
        onMutate: async (newPage) => {
            const tempId = `temp-${Date.now()}`

            const optimisticPage: PageType = {
                id: tempId,
                title: newPage.title,
                auth_id: newPage.auth_id,
                isArchived: false,
                content: [],
                type: 'empty',
                icon: undefined,
                coverUrl: undefined,
                isPublished: false,
                created_at: new Date(),
                updated_at: new Date(),
                children: [],
            }
            const previousPages = pagesList.pagesList

            pagesList.setPagesList([optimisticPage, ...previousPages])

            return { previousPages, tempId }
        },
        onSuccess: (data, _variables, context) => {
            pagesList.setPagesList([
                { ...data as any},
                ...pagesList.pagesList.filter((p) => p.id !== context?.tempId),
            ])

            router.push(`/pages/${data.id}`)
            toast.success("Page has been created")
        },
        onError: (_err, _variables, context) => {
            if (context?.previousPages) {
                pagesList.setPagesList(context.previousPages)
            }
            toast.error("Failed to create page")
        },
    })

    const handleMutate = useCallback(async () => {
        await mutateAsync({
            title: 'New page',
            auth_id: user?.id!,
            currentPageId: pageId?.[0],

        })
    }, [user, mutateAsync, pageId])

    return (
        <SidebarItem className="my-[8px] " >
            <div className="flex items-center space-x-2 ">
                <Image src={user?.imageUrl || ""} alt="avatar" width={20} height={20} className="rounded-[5px]" />
                <span className="font-semibold text-[#37352F] text-[14px]">
                    {user?.fullName || user?.firstName}
                </span>
            </div>
            <NotoTooltip content="Create a new page">
                <div onClick={handleMutate} className="hover:bg-[#E8E8E8] h-[28px] w-[28px] rounded-[6px] flex items-center justify-center transition-colors">
                    <span>{icons.compose}</span>
                </div>
            </NotoTooltip>
        </SidebarItem>
    )
}
