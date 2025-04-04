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
import { DialogTitle } from "@radix-ui/react-dialog";

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
                            <div className={cn(" border-[#37352F]", tab === "gallery" && "border-b-2")}>
                                <div onClick={() => handleTabChange("gallery")} className="hover:bg-[#F3F3F3] transition-colors rounded-[6px] h-[28px] text-[14px] inline-flex items-center cursor-pointer px-[8px] mb-1">
                                    Gallery
                                </div>
                            </div>
                            <div className={cn(" border-[#37352F]", tab === "upload" && "border-b-2")}>
                                <div onClick={() => handleTabChange("upload")} className="hover:bg-[#F3F3F3] transition-colors rounded-[6px] h-[28px] text-[14px] inline-flex items-center cursor-pointer px-[8px] mb-1">
                                    Upload
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="hover:bg-[#F3F3F3] transition-colors rounded-[6px] h-[28px] text-[14px] inline-flex items-center cursor-pointer px-[8px] mb-1">
                                Remove
                            </div>
                        </div>
                    </div>


                </DialogHeader>
                <div className="w-full flex items-center justify-center">
                    {
                        tab === "gallery" ? <div></div> : <SingleImageDropzone
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
