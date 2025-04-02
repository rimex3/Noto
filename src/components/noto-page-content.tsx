'use client'

import { useActionState, useCallback, useEffect, useState } from "react";
import { DynamicNotoEditor } from "./dynamic-noto-editor";
import NotoPageTitleEditor from "./noto-page-title-editor";
import { useKey } from "@/hooks/use-key";
import { useDocuments } from "@/hooks/use-documents";
import { createPage } from "@/actions";
import { useUser } from "@clerk/nextjs";
import { useIsSaving } from "@/hooks/use-is-saving";
import { useMutation } from "@tanstack/react-query";
import { PageType } from "@/types";

export default function NotoPageContent({ pageId, page, userId }: { pageId: string, page: PageType, userId: string }) {
    const [isEnabled, setIsEnabled] = useState(true)
    const [isEditorFocused, setIsEditorFocused] = useState(false)
    const documents = useDocuments(state => state.documents)
    const setTitle = useDocuments(state => state.setTitle)
    const title = useDocuments(state => state.title)
    const { mutateAsync, isPending } = useMutation({
        mutationFn: createPage,
    })
    const setIsSaving = useIsSaving(state => state.setIsSaving)

    const handleEditorFocus = useCallback(() => {
        if (!isEnabled) return;
        setIsEditorFocused(true);
    }, []);

    useKey({ keys: "Enter", handler: handleEditorFocus })

    const handleMutate = useCallback(async () => {
        setIsSaving(true)
        await mutateAsync({
            id: pageId,
            title,
            content: documents,
            type: "empty",
            auth_id: userId
        })
        setIsSaving(false)

    }, [])

    console.log(title)

    useEffect(() => {
        handleMutate()
    }, [title, documents])
    return (
        <div className="pb-[30vh] w-[600px]">
            <div>
                <NotoPageTitleEditor setTitle={setTitle} setIsEnabled={setIsEnabled} isEditorFocused={isEditorFocused} title={page.title!} />
                <div className="mt-5">
                    <DynamicNotoEditor autoFocus={isEditorFocused} setIsEditorFocused={setIsEditorFocused} initialContent={page.content} />
                </div>
            </div>
        </div>
    )
}
