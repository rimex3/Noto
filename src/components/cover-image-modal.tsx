'use client'

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { SingleImageDropzone } from "./signle-image-dropzone";
import { useCallback, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "@tanstack/react-query";
import { updatePage } from "@/actions";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function CoverImageModal() {
    const [file, setFile] = useState<File>()
    const [tab, setTab] = useState<"gallery" | "upload">("gallery")
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
            coverImage.onClose()
        }
    }, [coverImage, edgestore.publicFiles, mutateAsync, pageId])

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent className="w-full max-w-[230px]">
                <DialogHeader>
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


                </DialogHeader>
                <div className="w-full flex items-center justify-start">
                    {
                        tab === "gallery" ?
                            <div className="w-full">
                                <div className="text-[#7D7C78] text-[14px]  mb-2 font-medium">
                                    Color & Gradient
                                </div>
                                <div className="flex flex-wrap px-[12px] content-start">
                                    <div className="w-[25%] p-[3px]  cursor-pointer hover:opacity-85 hover:bg-white">
                                        <Image src="/images/solid_red.png" alt="" width={1000} height={1000} className="w-full h-[64px] object-cover object-center block select-none rounded-[6px] " />
                                    </div>

                                </div>

                                <div className="text-[#7D7C78] text-[14px]  mb-2 font-medium mt-5">
                                    The MET Museum - Japanese Prints
                                </div>
                                <div className="flex flex-wrap px-[12px] content-start">
                                    <div className="w-[25%] p-[3px]  cursor-pointer hover:opacity-85 hover:bg-white">
                                        <Image src="/images/woodcuts_1.jpg" alt="" width={1000} height={1000} className="w-full h-[64px] object-cover object-center block select-none rounded-[6px] " />
                                    </div>
                                    <div className="w-[25%] p-[3px]  cursor-pointer hover:opacity-85 hover:bg-white">
                                        <Image src="/images/woodcuts_2.jpg" alt="" width={1000} height={1000} className="w-full h-[64px] object-cover object-center block select-none rounded-[6px] " />
                                    </div>
                                </div>
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
            </DialogContent>
        </Dialog>
    );
};
