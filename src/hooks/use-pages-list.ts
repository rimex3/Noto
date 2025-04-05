import { PageType } from "@/types";
import { create } from "zustand";

type PagesListStoreProps = {
    pagesList: PageType[]
    setPagesList: (pagesList: PageType[]) => void
};

export const usePagesList = create<PagesListStoreProps>((set) => ({
    pagesList: [],
    setPagesList: (pagesList) => set({ pagesList })
}));
