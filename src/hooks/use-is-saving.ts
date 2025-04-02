import { create } from "zustand";

interface UseIsSavingProps {
    isSaving: boolean,
    setIsSaving: (isSaving: boolean) => void
}


export const useIsSaving = create<UseIsSavingProps>((set) => ({
    isSaving: false,
    setIsSaving: (isSaving) => set(() => ({ isSaving }))
}))