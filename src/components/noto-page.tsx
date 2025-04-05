'use client'

import { icons } from "@/constants/icons"
import NotoTooltip from "./noto-tooltip"
import SidebarItem from "./sidebar-item"
import { type PageType } from "@/types"
import Link from "next/link"
import { cn } from "@/lib/cn"
import { usePathname } from "next/navigation"
import { useDocuments } from "@/hooks/use-documents"
import ControlMenu from "./control-menu"
import { useState } from "react"

export interface NotoPageProps extends PageType {
  empty?: boolean
}


export default function NotoPage({ id, title, icon }: NotoPageProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const document = useDocuments()
  const currentTitle = document.id === id ? document.title : title

  
  const onOpen = () => {
    setOpen(prev => !prev)
}

  const handlePreventNavigate = (e: React.MouseEvent) => {
    e.preventDefault()
    onOpen()
  }

  return (
    <Link prefetch href={`/pages/${id}`}>
      <SidebarItem className={cn("hover:!text-[#5E5C57] text-[#91918E] text-[13px] font-semibold px-2 group", pathname.includes(id!) ? "bg-[#F0F0EF] text-[#5E5C57]" : "")} >
        <div className="flex items-center space-x-2">
          <div>
            {icon || icons.pageEmpty}
          </div>
          <div>
            {currentTitle || "New page"}
          </div>
        </div>
        <div className="flex items-center space-x-1 relative ">
          <NotoTooltip content="Delete, duplicate, and more...">
            <ControlMenu pageId={id!} open={open} onOpen={onOpen}>
              <div
                className="hover:bg-[#E8E8E8] h-[20px] w-[20px] rounded-[4px] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer"

                onClick={handlePreventNavigate}
              >
                {icons.ellipsis}
              </div>
            </ControlMenu>
          </NotoTooltip>
          <NotoTooltip content="Add a page inside">
            <div
              className="hover:bg-[#E8E8E8] h-[20px] w-[20px] rounded-[4px] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              onClick={handlePreventNavigate}
            >
              {icons.plus}
            </div>
          </NotoTooltip>

        </div>
      </SidebarItem>
    </Link>
  )
}
