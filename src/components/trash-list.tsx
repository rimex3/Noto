import { icons } from "@/constants/icons";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";


interface TrashListProps {
    open?: boolean
    onOpen?: () => void
    children?: React.ReactNode
}

export default function TrashList({ onOpen, open, children }: TrashListProps) {
    return (
        <Popover open={open} onOpenChange={onOpen}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className=" w-[265px] min-w-[180px] max-w-[calc(-24px + 100vw)] shadow-none translate-x-2 relative !z-20 p-1 rounded-[6px] ">
                <div className="py-[4px] px-[8px] mt-[10px]">
                    <Input className="h-[28px] !ring-[#B2D4F5] rounded-[6px]" placeholder="Search pages in trash" />
                </div>
                <div className="min-h-[200px] w-full flex items-center justify-center">
                    <div className="w-full flex flex-col items-center justify-center mx-auto">
                        <span className="text-[#CECBC8] ">
                            {icons.trash}
                        </span>
                        <span className="text-[#5E5C57] text-[14px]">
                            No results
                        </span>
                    </div>
                </div>
            </PopoverContent>
        </Popover>

    )
}
