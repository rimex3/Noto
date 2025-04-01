"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDocuments } from "@/hooks/use-documents";
import { useDebounce } from "@/hooks/use-debounce";

export type BlockType = {
    id: string;
    type: string;
    props: {
        textColor: string;
        backgroundColor: string;
        textAlignment: string;
    };
    content: { type: "text"; text: string; styles: {} }[];
    children: BlockType[];
};

type NotoEditorProps = {
    autoFocus?: boolean;
    initialContent?: BlockType[];
} & {
    setIsEditorFocused: Dispatch<SetStateAction<boolean>>;
};

export default function NotoEditor({ autoFocus, setIsEditorFocused, initialContent }: NotoEditorProps) {
    const editor = useCreateBlockNote({
        initialContent: initialContent as any
    });

    const setDocuments = useDocuments(state => state.setDocuments);

    useEffect(() => {
        if (autoFocus && editor) {
            editor.focus();
        }
    }, [autoFocus, editor]);

    const debouncedOnChange = useDebounce((doc) => {
        setDocuments(doc);
    }, 300);

    useEffect(() => {
        if (!editor) return;

        editor.onChange((e) => {
            debouncedOnChange(e.document as any);
        });

    }, [editor, debouncedOnChange]);



    return <BlockNoteView
        editor={editor}
        theme={"light"}
        title="Noto Editor"
        autoFocus={autoFocus}
        onBlur={() => setIsEditorFocused(false)}
        
    />;
}
