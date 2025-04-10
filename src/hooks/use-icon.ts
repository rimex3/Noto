import { create } from "zustand";

interface UseIconProps {
    pageId: string,
    icon: string,
    setIcon: (icon: string, pageId: string) => void
}


export const useIcon = create<UseIconProps>((set) => ({
    pageId: "",
    icon: "",
    setIcon: (icon, pageId) => set(() => ({ icon, pageId })),
}))