
'use client'

import { icons } from "@/constants/icons"
import SidebarItem from "./sidebar-item"
import { useSearch } from "@/hooks/use-search"
import NotoTooltip from "./noto-tooltip"

export default function SearchItem() {
    const search = useSearch()
    return (
        <NotoTooltip content="Ctrl + K">
            <div onClick={search.onOpen}>
                <SidebarItem>
                    <div className="flex items-center space-x-1 text-[#5E5C57] font-medium text-[13px]">
                        <span>{icons.search}</span> <span>Search</span>
                    </div>
                </SidebarItem>
            </div>
        </NotoTooltip>
    )
}
