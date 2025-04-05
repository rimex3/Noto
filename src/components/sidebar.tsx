import { icons } from "@/constants/icons";
import PagesList from "./pages-list";
import SidebarItem from "./sidebar-item";
import UserAvatar from "./user-avatar";
import { Separator } from "./ui/separator";
import TrashList from "./trash-list";
import SearchItem from "./search-item";

export default function Sidebar() {
    return (
        <aside className="bg-[#F8F8F7] w-[300px] min-h-screen shadow-sidebar p-1 z-20 fixed top-0">
            <div>
                <UserAvatar />
                <SidebarItem>
                    <div className="flex items-center space-x-1 text-[#5E5C57] font-medium text-[13px]">
                        <span>{icons.home}</span> <span>Home</span>
                    </div>
                </SidebarItem>

                <SearchItem />
            </div>
            <div className="px-3">
                <Separator className="my-5 " />
            </div>
            <div>
                <PagesList />
            </div>

            <TrashList>
                <SidebarItem className="mt-4">
                    <div className="flex items-center space-x-1.5 text-[#5E5C57] text-[13px] font-medium" >
                        <span>{icons.trash}</span> <span>Trash</span>
                    </div>
                </SidebarItem>
            </TrashList>
        </aside>
    )
}
