'use client'

import { useState } from "react"
import { Input } from "./ui/input"
import { useKey } from "@/hooks/use-key"
import { useIsSaving } from "@/hooks/use-is-saving"

export default function NotoPageHeader() {
    const [isEditable, setIsEditable] = useState(false)
    const isSaving = useIsSaving(state => state.isSaving)
    useKey({ keys: "Enter", handler: () => setIsEditable(false) });

    return (
        <div className="h-[44px] pl-[12px] pr-[10px] flex items-center justify-between overflow-hidden">
            {
                isEditable ?
                    <Input onBlur={() => setIsEditable(false)} autoFocus className="w-[100px] h-[25px] rounded-[6px]" placeholder="New page" />
                    :
                    <div onClick={() => setIsEditable(true)} className="hover:bg-[#F0F0EF] transition-colors cursor-pointer rounded-[6px] w-fit px-3">
                        Page
                    </div>
            }

            <div className="text-[#9E9A97] px-7">
                {
                    isSaving ? "Saving..." : "Saved"
                }
            </div>
        </div>
    )
}