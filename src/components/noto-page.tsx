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
import { useMemo, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { createPageInside } from "@/actions"
import { useUser } from "@clerk/nextjs"

export interface NotoPageProps extends PageType {
  empty?: boolean
}


export default function NotoPage({ id, title, icon, children }: NotoPageProps) {
  const [open, setOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { mutateAsync } = useMutation({
    mutationFn: createPageInside
  })
  const { user } = useUser()
  const pathname = usePathname()
  const document = useDocuments()
  const currentTitle = document.id === id ? document.title : title


  const onOpen = () => {
    setOpen(prev => !prev)
  }


  const handleOpenControlMenu = async (e: React.MouseEvent) => {
    e.preventDefault()
    onOpen()
  }

  const handleAddPageInside = async (e: React.MouseEvent) => {
    e.preventDefault()
    await mutateAsync({
      auth_id: user?.id!,
      parentId: id!
    })
  }

  const onCollapse = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsCollapsed(prev => !prev)
  }


  const memoizedChildrenList = useMemo(() => {
    if (children.length === 0) return <div className="text-[#989793] text-[13px] w-fit mt-2 ml-3 select-none">
      No pages inside
    </div>
    return children?.map((page) => <NotoPage key={page.id} {...page} />)
  }, [children])

  return (
    <>
      <Link prefetch href={`/pages/${id}`}>
        <SidebarItem className={cn("hover:!text-[#5E5C57] text-[#91918E] text-[13px] font-semibold px-2 group", pathname.includes(id!) ? "bg-[#F0F0EF] text-[#5E5C57]" : "")} >
          <div className="flex items-center space-x-2">
            <div className="relative w-5 h-5 group">
              <div className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
                {icon || icons.pageEmpty}
              </div>

              <div
                onClick={onCollapse}
                className="absolute inset-0 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-[#e5e5e4] flex items-center justify-center rounded cursor-pointer"
              >
                <span
                  className={`transition-transform duration-300 ease-in-out ${!isCollapsed ? "rotate-0" : "rotate-90"
                    }`}
                >
                  {icons.chevronDownRoundedThick}
                </span>
              </div>
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

                  onClick={handleOpenControlMenu}
                >
                  {icons.ellipsis}
                </div>
              </ControlMenu>
            </NotoTooltip>
            <NotoTooltip content="Add a page inside">
              <div
                className="hover:bg-[#E8E8E8] h-[20px] w-[20px] rounded-[4px] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                onClick={handleAddPageInside}
              >
                {icons.plus}
              </div>
            </NotoTooltip>

          </div>
        </SidebarItem>

      </Link>
      {
        isCollapsed && (
          <div className="ml-5 mt-0.5">
            {
              memoizedChildrenList
            }

          </div>
        )
      }
    </>
  )
}
