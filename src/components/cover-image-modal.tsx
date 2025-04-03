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

export function CoverImageModal() {
    const { pageId } = useParams()
    const [file, setFile] = useState<File>()
    const [isUploading, setIsUploading] = useState(false)
    const { edgestore } = useEdgeStore()
    const { mutateAsync } = useMutation({
        mutationFn: updatePage
    })
    const coverImage = useCoverImage();

    console.log(pageId?.[0]!);

    const handleUploadOnChange = useCallback(async (file?: File) => {
        if (file) {
            setIsUploading(true)
            setFile(file)
            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url
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
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <div className="w-full flex items-center justify-center">
                    <SingleImageDropzone
                        className={cn("w-full outline-none", isUploading && "opacity-50")}
                        value={file}
                        onChange={handleUploadOnChange}
                        height={200}
                        width={200}
                        disabled={isUploading}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
