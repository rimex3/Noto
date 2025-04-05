'use client'

import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useMutation } from "@tanstack/react-query";
import { updatePage } from "@/actions";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function PublishMenu({ children }: { children: React.ReactNode }) {
    const { pageId } = useParams()
    const { user } = useUser()
    const { mutateAsync, isPending } = useMutation({
        mutationFn: updatePage
    })


    const handlePublish = async () => {
        await mutateAsync({
            id: pageId?.[0]!,
            auth_id: user?.id!,
            isPublished: true
        })
    }

    return (
        <Popover >
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className=" w-[456px] min-w-[180px] max-w-[calc(-24px + 100vw)] shadow-none -translate-x-5  relative !z-20 p-4 rounded-[10px] flex flex-col items-center justify-center ">
                <div className="mb-3">
                    <Globe color="#37352F" size={50} />
                </div>
                <div className="text-[#37352F] text-[18px] font-medium mb-4">
                    Publish to web
                </div>

                {
                    isPending ? <Button className="cursor-pointer bg-[#2383E2] rounded-[5px] flex items-center justify-center h-[28px] hover:bg-[#0077D4] w-full">
                        Publishing...
                    </Button> : <Button onClick={handlePublish} className="cursor-pointer bg-[#2383E2] rounded-[5px] flex items-center justify-center h-[28px] hover:bg-[#0077D4] w-full">
                        Publish
                    </Button>
                }
            </PopoverContent>
        </Popover>
    )
}
