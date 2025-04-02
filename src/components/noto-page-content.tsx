'use client'

import { useCallback, useEffect, useState } from "react";
import { DynamicNotoEditor } from "./dynamic-noto-editor";
import NotoPageTitleEditor from "./noto-page-title-editor";
import { useKey } from "@/hooks/use-key";
import { useDocuments } from "@/hooks/use-documents";
import { updatePage } from "@/actions";
import { useIsSaving } from "@/hooks/use-is-saving";
import { useMutation } from "@tanstack/react-query";
import { PageType } from "@/types";

export default function NotoPageContent({ pageId, page }: { pageId: string, page: PageType, userId: string }) {
    const [isEnabled, setIsEnabled] = useState(true)
    const [isEditorFocused, setIsEditorFocused] = useState(false)
    const documents = useDocuments(state => state.documents)
    const { mutateAsync } = useMutation({
        mutationFn: updatePage,
    })
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
        });
        setIsSaving(false);
    }, [pageId, documents, mutateAsync, setIsSaving]);

    useEffect(() => {
        if (documents.length > 0) {
            handleMutate()
        }
    }, [documents])
    return (
        <div className="pb-[30vh] w-[600px]">
            <div>
                <NotoPageTitleEditor setIsEnabled={setIsEnabled} isEditorFocused={isEditorFocused} title={page.title!} />
                <div className="mt-5">
                    <DynamicNotoEditor autoFocus={isEditorFocused} setIsEditorFocused={setIsEditorFocused} initialContent={page.content} />
                </div>
            </div>
        </div>
    )
}
