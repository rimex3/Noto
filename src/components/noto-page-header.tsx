'use client'

import { useCallback, useState } from "react"
import { Input } from "./ui/input"
import { useKey } from "@/hooks/use-key"
import { useIsSaving } from "@/hooks/use-is-saving"
import { PageType } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { updatePage } from "@/actions"
import { useDocuments } from "@/hooks/use-documents"

export default function NotoPageHeader({ page }: { page: PageType }) {
    const [isEditable, setIsEditable] = useState(false)
    const [title, setTitle] = useState(page.title)
    const isSaving = useIsSaving(state => state.isSaving)
    const { mutateAsync } = useMutation({
        mutationFn: updatePage
    })


    const document = useDocuments()
    const newTitle = page.id === document.id ? document.title : page.title

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
        document.setTitle(e.target.value, page.id!)
    }, [document, page.id])


    const handleUpdatePage = useCallback(async () => {
        await mutateAsync({
            id: page.id!,
            title
        })
        document.setTitle(title!, page.id!)
        setIsEditable(false)
    }, [mutateAsync, page.id, title, document])

    useKey({ keys: "Enter", handler: handleUpdatePage });

    return (
        <div className="h-[44px] pl-[12px] pr-[10px] flex items-center justify-between overflow-hidden">
            {
                isEditable ?
                    <Input onBlur={() => setIsEditable(false)} onChange={handleChange} autoFocus defaultValue={page.title || "New page"} className="w-[100px] h-[25px] rounded-[6px]" placeholder="New page" />
                    :
                    <div onClick={() => setIsEditable(true)} className="hover:bg-[#F0F0EF] transition-colors cursor-pointer rounded-[6px] w-fit px-3 space-x-1 text-[15px]">
                        <span>
                            {page.icon}
                        </span>
                        <span>
                            {newTitle || "New page"}
                        </span>
                    </div>
            }

            <div className="text-[#9E9A97] px-7">
                {
                    isSaving ? "saving..." : "saved"
                }
            </div>
        </div>
    )
}