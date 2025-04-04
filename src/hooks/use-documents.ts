import { BlockType } from "@/components/noto-editor";
import { create } from "zustand";

interface UseDocumentsProps {
    id: string ,
    title: string,
    documents: BlockType[]
    setDocuments: (documents: BlockType[]) => void
    setTitle: (title: string, id: string) => void
}


export const useDocuments = create<UseDocumentsProps>((set) => ({
    id: "",
    title: "",
    documents: [],
    setDocuments: (documents) => set(() => ({ documents })),
    setTitle: (title, id) => set(() => ({ title, id }))
}))