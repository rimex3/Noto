'use client'

import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "./signle-image-dropzone";
import { useCallback, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "@tanstack/react-query";
import { updatePage } from "@/actions";
import { useParams } from "next/navigation";
import { cn } from "@/lib/cn";
import Image from "next/image";
import { GALLERY } from "@/constants/gallery";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

interface CoverImageProps {
    onOpen?: () => void
    children: React.ReactNode;
    asChild?: boolean;
    open?: boolean
}

export function CoverImage({ asChild, children }: CoverImageProps) {
    const [file, setFile] = useState<File>()
    const [tab, setTab] = useState<"gallery" | "upload">("gallery")
    const [open, setOpen] = useState(false)
    const { pageId } = useParams()
    const [isUploading, setIsUploading] = useState(false)
    const { edgestore } = useEdgeStore()
    const { mutateAsync } = useMutation({
        mutationFn: updatePage
    })
    const coverImage = useCoverImage();

    const handleTabChange = (tab: "gallery" | "upload") => {
        setTab(tab)
    }

    const onOpen = () => {
        setOpen(prev => !prev)
    }

    const handleUploadOnChange = useCallback(async (file?: File) => {
        if (file) {
            setIsUploading(true)
            setFile(file)
            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url,
                }
            })

            await mutateAsync({
                id: pageId?.[0]!,
                coverUrl: res.url
            })

            setIsUploading(false)
            setFile(undefined)
            setOpen(false)
        }
    }, [coverImage, edgestore.publicFiles, mutateAsync, pageId])

    const handleAddLocalCover = useCallback(async (url: string) => {
        setIsUploading(true)
        await mutateAsync({
            id: pageId?.[0]!,
            coverUrl: url
        })

        setIsUploading(false)
        setOpen(false)
    }, [mutateAsync, pageId])

    return (
        <Popover open={open} onOpenChange={onOpen} >
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="relative w-[540px] min-[180px] max-[calc(-24px + 100vw)] h-full max-h-[485px] !z-10 -left-[70px]" >
                <div className="my-5 ">
                    <div className="flex items-center justify-between w-full border-b border-[#F0F0EF]">
                        <div className="flex items-center space-x-1 w-full ">
                            <div className={cn(" border-[#37352F] ", tab === "gallery" ? "border-b-2" : "text-[#37352f80]")}>
                                <div onClick={() => handleTabChange("gallery")} className="hover:bg-[#F3F3F3] transition-colors rounded-[6px] h-[28px] text-[14px] inline-flex items-center cursor-pointer px-[8px] mb-1">
                                    Gallery
                                </div>
                            </div>
                            <div className={cn(" border-[#37352F]", tab === "upload" ? "border-b-2" : "text-[#37352f80]")}>
                                <div onClick={() => handleTabChange("upload")} className="hover:bg-[#F3F3F3] transition-colors rounded-[6px] h-[28px] text-[14px] inline-flex items-center cursor-pointer px-[8px] mb-1">
                                    Upload
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="hover:bg-[#F3F3F3] text-[#37352f80] transition-colors rounded-[6px] h-[28px] text-[14px] inline-flex items-center cursor-pointer px-[8px] mb-1">
                                Remove
                            </div>
                        </div>
                    </div>


                </div>
                <div className="w-full flex items-center justify-start">
                    {
                        tab === "gallery" ?
                            <div className="w-full">
                                {
                                    Object.entries(GALLERY).map(([categoryName, images]) => {
                                        return (
                                            <>
                                                <div className="text-[#7D7C78] text-[14px]  mb-2 font-medium">
                                                    {categoryName}
                                                </div>

                                                <div className="flex flex-wrap px-[12px] content-start">
                                                    {
                                                        images.map((imageUrl, idx) => (
                                                            <div onClick={() => handleAddLocalCover(imageUrl)} key={idx} className="w-[25%] p-[3px]  cursor-pointer hover:opacity-85 hover:bg-white">
                                                                <Image src={imageUrl} alt="" width={1000} height={1000} className="w-full h-[64px] object-cover object-center block select-none rounded-[6px] " />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div> :
                            <SingleImageDropzone
                                className={cn("w-full outline-none", isUploading && "opacity-50")}
                                value={file}
                                onChange={handleUploadOnChange}
                                height={200}
                                width={200}
                                disabled={isUploading}
                                dropzoneOptions={{
                                    maxSize: 5 * 1024 * 1024, // 5mb
                                    accept: {
                                        "image/png": [".png"],
                                        "image/jpeg": [".jpeg", ".jpg"],
                                        "image/gif": [".gif"],
                                    },
                                }}
                            />
                    }

                </div>
            </PopoverContent>
        </Popover>
    );
};
