'use client'
import { icons } from "@/constants/icons";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useMutation } from "@tanstack/react-query";
import { updatePage } from "@/actions";
import { useParams } from "next/navigation";
import { useIsSaving } from "@/hooks/use-is-saving";
import { useUser } from "@clerk/nextjs";
import { useDocuments } from "@/hooks/use-documents";


type NotoPageTitleEditorProps = {
  title: string
} & {
  setIsEnabled?: Dispatch<SetStateAction<boolean>>
  isEditorFocused?: boolean
}

export default function NotoPageTitleEditor({ title }: NotoPageTitleEditorProps) {
  const { pageId } = useParams()
  const { user } = useUser()
  const [currentTitle, setCurrentTitle] = useState("")
  const { mutateAsync } = useMutation({
    mutationFn: updatePage,
  })
  const setTitle = useDocuments(state => state.setTitle)
  const setIsSaving = useIsSaving(state => state.setIsSaving)
  console.log("title", user?.id)
  const debouncedOnChange = useDebounce((title) => {
    setCurrentTitle(title)
    setTitle(title)
  }, 300);

  console.log(pageId?.[0])

  const handleMutate = useCallback(async () => {
    setIsSaving(true)
    await mutateAsync({
      id: pageId?.[0]!,
      title: currentTitle,
    })
    setIsSaving(false)
  }, [currentTitle, pageId, setIsSaving, mutateAsync])

  useEffect(() => {
    if (currentTitle !== "") {
      handleMutate()
    }
  }, [currentTitle])

  return (
    <div className="group w-fit h-fit">
      <div className=" items-center mb-4  opacity-0 flex group-hover:opacity-100 transition-all">
        <div className="hover:bg-[#f3f3f3] transition-colors cursor-pointer rounded-[6px] w-fit py-1 px-2 flex items-center ">
          <div>
            {icons.emoji}

          </div>
          <div className="text-[#9B9A97] text-[14px]">
            Add icon
          </div>
        </div>
        <div className="hover:bg-[#f3f3f3] transition-colors cursor-pointer rounded-[6px] w-fit py-1 px-2 flex items-center ">
          <div>
            {icons.image}

          </div>
          <div className="text-[#9B9A97] text-[14px]">
            Add cover
          </div>
        </div>
      </div>
      <Input
        className="border-none shadow-none focus:!outline-none focus:!ring-0 placeholder:text-[#E1E1E0] placeholder:text-[40px] placeholder:font-bold h-[50px] !text-[40px] !text-[#37352F] font-bold p-0 !rounded-none group"
        onChange={(e) => {
          const value = e.target.value
          debouncedOnChange(value)
        }}
        defaultValue={title}
        placeholder="New Page"
      />
    </div>
  )
}
