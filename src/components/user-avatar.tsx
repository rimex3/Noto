import { currentUser } from "@clerk/nextjs/server"
import { Button } from "./ui/button"
import Image from "next/image"
import { icons } from "@/constants/icons"
import SidebarItem from "./sidebar-item"
import NotoTooltip from "./noto-tooltip"

export default async function UserAvatar() {
    const user = await currentUser()

    return (
        <SidebarItem className="my-[8px] " >
            <div className="flex items-center space-x-2 ">
                <Image src={user?.imageUrl || ""} alt="avatar" width={20} height={20} className="rounded-[5px]" />
                <span className="font-semibold text-[#37352F] text-[14px]">
                    {user?.fullName || user?.firstName}
                </span>
            </div>
            <NotoTooltip content="Create a new page">
                <div className="hover:bg-[#E8E8E8] h-[28px] w-[28px] rounded-[6px] flex items-center justify-center transition-colors">
                    <span>{icons.compose}</span>
                </div>
            </NotoTooltip>
        </SidebarItem>
    )
}
