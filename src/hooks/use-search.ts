import { create } from "zustand";

type SearchStoreProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useSearch = create<SearchStoreProps>((set) => ({
    isOpen: false,
    onOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    onClose: () => set({ isOpen: false }),
}));
