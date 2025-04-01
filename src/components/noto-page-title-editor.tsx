'use client'
import { icons } from "@/constants/icons";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from "react";
import { useKey } from "@/hooks/use-key";
import { useDebounce } from "@/hooks/use-debounce";


type NotoPageTitleEditorProps = {
  setTitle?: (value: string) => void
} & {
  setIsEnabled?: Dispatch<SetStateAction<boolean>>
  isEditorFocused?: boolean
}

export default function NotoPageTitleEditor({ setTitle, setIsEnabled }: NotoPageTitleEditorProps) {


  const debouncedOnChange = useDebounce((title) => {
    setTitle?.(title)
  }, 300);




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

        placeholder="New Page"
      />
    </div>
  )
}
