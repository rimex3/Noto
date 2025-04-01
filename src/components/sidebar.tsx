import { icons } from "@/constants/icons";
import PagesList from "./pages-list";
import SidebarItem from "./sidebar-item";
import UserAvatar from "./user-avatar";
import { Separator } from "./ui/separator";

export default function Sidebar() {
    return (
        <aside className="bg-[#F8F8F7] w-[300px] min-h-screen shadow-sidebar p-1">
            <div>
                <UserAvatar />
                <SidebarItem>
                    <div className="flex items-center space-x-2">
                        <span>{icons.home}</span> <span>Home</span>
                    </div>
                </SidebarItem>
                <SidebarItem>
                    <div className="flex items-center space-x-2">
                        <span>{icons.home}</span> <span>Home</span>
                    </div>
                </SidebarItem>
                <SidebarItem>
                    <div className="flex items-center space-x-2">
                        <span>{icons.home}</span> <span>Home</span>
                    </div>
                </SidebarItem>
                <SidebarItem>
                    <div className="flex items-center space-x-2">
                        <span>{icons.home}</span> <span>Home</span>
                    </div>
                </SidebarItem>
            </div>
            <div className="px-3">
                <Separator className="my-5 " />
            </div>
            <div>
                <PagesList />
            </div>
        </aside>
    )
}
