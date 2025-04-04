'use client'

import { icons } from "@/constants/icons"
import NotoTooltip from "./noto-tooltip"
import SidebarItem from "./sidebar-item"
import { type PageType } from "@/types"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useDocuments } from "@/hooks/use-documents"

export interface NotoPageProps extends PageType {
  empty?: boolean
}


export default function NotoPage({ id, title, icon }: NotoPageProps) {
  const pathname = usePathname()
  const document = useDocuments()
  const currentTitle = document.id === id ? document.title : title
  return (
    <Link href={`/pages/${id}`}>
      <SidebarItem className={cn("hover:!text-[#5E5C57] text-[#91918E] text-[13px] font-semibold px-2 group", pathname.includes(id!) ? "bg-[#F0F0EF] text-[#5E5C57]" : "")} >
        <div className="flex items-center space-x-2">
          <div>
            {icon || icons.pageEmpty}
          </div>
          <div>
            {currentTitle || "New page"}
          </div>
        </div>
        <div className="flex items-center space-x-1 relative z-50">
          <NotoTooltip content="Delete, duplicate, and more...">
            <div className="hover:bg-[#E8E8E8]  h-[20px] w-[20px] rounded-[4px] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
              {icons.ellipsis}
            </div>
          </NotoTooltip>
          <NotoTooltip content="Add a page inside">
            <div className="hover:bg-[#E8E8E8]  h-[20px] w-[20px] rounded-[4px] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
              {icons.plus}
            </div>

          </NotoTooltip>
        </div>
      </SidebarItem>
    </Link>
  )
}
