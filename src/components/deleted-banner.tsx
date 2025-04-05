'use client'

import { deletePage, updatePage } from "@/actions"
import { icons } from "@/constants/icons"
import { useMutation } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"



export default function DeletedBanner() {
    const { pageId } = useParams()
    const router = useRouter()
    const { mutateAsync: updatePageMutation } = useMutation({
        mutationFn: updatePage
    })
    const { mutateAsync: deletePageMutation } = useMutation({
        mutationFn: deletePage
    })

    const handleRestore = async () => {
        await updatePageMutation({ id: pageId?.[0]!, isArchived: false })
        router.push(`/pages/${pageId?.[0]}`)
    }

    const handleDelete = async () => {
        await deletePageMutation({ id: pageId?.[0]! })
    }

    return (
        <div className="bg-[#EB5757] min-h-[44px] flex items-center justify-center px-[12px] w-full">
            <div className="text-white text-[14px] mr-5">
                This Page has been moved to the Trash.
            </div>
            <div className="flex items-center space-x-2">
                <div onClick={handleRestore} className="border border-white text-[14px] text-white rounded-[6px] h-[28px] flex items-center space-x-2 px-[8px] cursor-pointer hover:bg-[#e05555]">
                    <span className="text-white">
                        {icons.undo}
                    </span>

                    <span className="text-white">
                        Restore page
                    </span>
                </div>

                <div onClick={handleDelete} className="border border-white text-[14px] text-white rounded-[6px] h-[28px] flex items-center space-x-2 px-[8px] cursor-pointer hover:bg-[#e05555]">
                    <span className="text-white">
                        {icons.trash}
                    </span>

                    <span className="text-white">
                        Delete from Trash
                    </span>
                </div>
            </div>
        </div>
    )
}
