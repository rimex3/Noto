'use client'

import { useCallback, useEffect, useState } from "react";
import { DynamicNotoEditor } from "./dynamic-noto-editor";
import NotoPageTitleEditor from "./noto-page-title-editor";
import { useKey } from "@/hooks/use-key";
import { useDocuments } from "@/hooks/use-documents";

export default function NotoPageContent() {
    const [isEnabled, setIsEnabled] = useState(true)
    const [isEditorFocused, setIsEditorFocused] = useState(false)
    const documents = useDocuments(state => state.documents)
    const setTitle = useDocuments(state => state.setTitle)
    const title = useDocuments(state => state.title)

    const handleEditorFocus = useCallback(() => {
        if (!isEnabled) return;
        setIsEditorFocused(true);
    }, []);

    useKey({ keys: "Enter", handler: handleEditorFocus })

    console.log(title)
    console.log(documents)

    return (
        <div className="pb-[30vh] w-[600px]">
            <div>
                <NotoPageTitleEditor setTitle={setTitle} setIsEnabled={setIsEnabled} isEditorFocused={isEditorFocused} />
                <div className="mt-5">
                    <DynamicNotoEditor autoFocus={isEditorFocused} setIsEditorFocused={setIsEditorFocused} />
                </div>
            </div>
        </div>
    )
}
