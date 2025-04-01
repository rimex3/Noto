import { BlockType } from "@/components/noto-editor";
import { create } from "zustand";

interface UseDocumentsProps {
    title: string,
    documents: BlockType[]
    setDocuments: (documents: BlockType[]) => void
    setTitle: (title: string) => void
}


export const useDocuments = create<UseDocumentsProps>((set) => ({
    title: "",
    documents: [],
    setDocuments: (documents) => set(() => ({ documents })),
    setTitle: (title) => set(() => ({ title }))
}))