'use client'
import { icons } from "@/constants/icons";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useMutation } from "@tanstack/react-query";
import { updatePage } from "@/actions";
import { useParams } from "next/navigation";
import { useIsSaving } from "@/hooks/use-is-saving";
import { useDocuments } from "@/hooks/use-documents";
import { useCoverImage } from "@/hooks/use-cover-image";
import { PageType } from "@/types";
import IconPicker from "./icon-picker";
import { cn } from "@/lib/utils";


type NotoPageTitleEditorProps = {
  page: PageType
  setIsEnabled?: Dispatch<SetStateAction<boolean>>
  isEditorFocused?: boolean
}

export default function NotoPageTitleEditor({ page }: NotoPageTitleEditorProps) {
  const [currentTitle, setCurrentTitle] = useState<string>()
  const [currentEmoji, setCurrentEmoji] = useState<string>()
  const { pageId } = useParams()
  const { mutateAsync } = useMutation({
    mutationFn: updatePage,
  })

  const coverImage = useCoverImage()
  const setTitle = useDocuments(state => state.setTitle)
  const setIsSaving = useIsSaving(state => state.setIsSaving)
  const debouncedOnChange = useDebounce((title) => {
    setCurrentTitle(title)
    setTitle(title, pageId?.[0]!)
  }, 300);
  const document = useDocuments()

  const handleMutate = useCallback(async () => {
    setIsSaving(true)
    await mutateAsync({
      id: pageId?.[0]!,
      title: currentTitle,
      icon: currentEmoji
    })
    setIsSaving(false)
  }, [currentTitle, pageId, setIsSaving, mutateAsync, currentEmoji])


  const handleEmojiChange = (emoji: string) => {
    setCurrentEmoji(emoji)
  }

  useEffect(() => {
    handleMutate()
  }, [currentTitle, currentEmoji])

  return (
    <div className={cn("group w-fit h-fit", page.icon && page.coverUrl ? "mt-8" : "")}>
      <div className={" items-center  opacity-0 flex group-hover:opacity-100 transition-all"}>
        {
          !page.icon && (
            <IconPicker asChild onEmojiChange={handleEmojiChange}>
              <div className="hover:bg-[#f3f3f3] transition-colors cursor-pointer rounded-[6px] w-fit py-1 px-2 flex items-center ">
                <div>
                  {icons.emoji}

                </div>
                <div className="text-[#9B9A97] text-[14px]">
                  Add icon
                </div>
              </div>
            </IconPicker>
          )
        }
        {
          !page.coverUrl && (
            <div onClick={coverImage.onOpen} className="hover:bg-[#f3f3f3] transition-colors cursor-pointer rounded-[6px] w-fit py-1 px-2 flex items-center ">
              <div>
                {icons.image}

              </div>
              <div className="text-[#9B9A97] text-[14px]">
                Add cover
              </div>
            </div>
          )
        }
      </div>
      <Input
        className="border-none shadow-none focus:!outline-none focus:!ring-0 placeholder:text-[#E1E1E0] placeholder:text-[40px] placeholder:font-bold h-[80px] !text-[40px] !text-[#37352F] font-bold p-0 !rounded-none group"
        onChange={(e) => {
          const value = e.target.value
          debouncedOnChange(value)
          document.setTitle(value, page.id!)
        }}
        defaultValue={currentTitle || page.title}
        placeholder="New Page"
      />
    </div>
  )
}
