'use client'

import { useCallback, useEffect, useState } from "react";
import { DynamicNotoEditor } from "./dynamic-noto-editor";
import NotoPageTitleEditor from "./noto-page-title-editor";
import { useKey } from "@/hooks/use-key";
import { updatePage } from "@/actions";
import { useIsSaving } from "@/hooks/use-is-saving";
import { useMutation } from "@tanstack/react-query";
import { PageType } from "@/types";
import { BlockType } from "./noto-editor";
import { useUser } from "@clerk/nextjs";

export default function NotoPageContent({ pageId, page }: { pageId: string, page: PageType, userId: string }) {
    const [isEnabled, setIsEnabled] = useState(true)
    const [isEditorFocused, setIsEditorFocused] = useState(false)
    const [documents, setDocuments] = useState<BlockType[]>([])
    const { mutateAsync } = useMutation({
        mutationFn: updatePage,
    })
    const { user } = useUser()

    const setIsSaving = useIsSaving(state => state.setIsSaving)

    const handleEditorFocus = useCallback(() => {
        if (!isEnabled) return;
        setIsEditorFocused(true);
    }, [isEnabled]);

    useKey({ keys: "Enter", handler: handleEditorFocus })

    const handleMutate = useCallback(async () => {
        setIsSaving(true);
        await mutateAsync({
            id: pageId,
            content: documents,
            auth_id: user?.id
        });
        setIsSaving(false);
    }, [pageId, documents, mutateAsync, setIsSaving, user?.id]);

    useEffect(() => {
        if (documents.length > 0) {
            handleMutate()
        }
    }, [documents])
    return (
        <div className="flex flex-col">
            <div className="pb-[30vh] w-[600px]">
                <div>
                    <NotoPageTitleEditor setIsEnabled={setIsEnabled} isEditorFocused={isEditorFocused} page={page} />
                    <div className="mt-5">
                        <DynamicNotoEditor
                            autoFocus={isEditorFocused}
                            setIsEditorFocused={setIsEditorFocused}
                            initialContent={page.content}
                            setDocuments={setDocuments}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
