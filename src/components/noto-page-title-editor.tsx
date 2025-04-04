'use client'
import { icons } from "@/constants/icons";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useMutation } from "@tanstack/react-query";
import { updatePage } from "@/actions";
import { useParams } from "next/navigation";
import { useIsSaving } from "@/hooks/use-is-saving";
import { useDocuments } from "@/hooks/use-documents";
import { useCoverImage } from "@/hooks/use-cover-image";
import { PageType } from "@/types";
import IconPicker from "./icon-picker";
import { cn } from "@/lib/utils";

type NotoPageTitleEditorProps = {
  page: PageType;
  setIsEnabled?: Dispatch<SetStateAction<boolean>>;
  isEditorFocused?: boolean;
};

export default function NotoPageTitleEditor({ page }: NotoPageTitleEditorProps) {
  const { mutateAsync } = useMutation({ mutationFn: updatePage });
  
  const coverImage = useCoverImage();
  const setIsSaving = useIsSaving((state) => state.setIsSaving);
  const document = useDocuments();
  
  const [currentTitle, setCurrentTitle] = useState(page.title || "");
  const [currentEmoji, setCurrentEmoji] = useState(page.icon || "");
  
  const debouncedTitleChange = useDebounce((title) => {
    setCurrentTitle(title);
  }, 300);
  
  const pageId = page.id
  
  const handleSave = useCallback(async () => {
    if (!pageId) return;

    setIsSaving(true);
    await mutateAsync({
      id: pageId,
      title: currentTitle,
      icon: currentEmoji,
    });
    setIsSaving(false);
  }, [currentTitle, currentEmoji, mutateAsync, pageId, setIsSaving]);

  useEffect(() => {
    document.setTitle(currentTitle, pageId!);
  }, [currentTitle, pageId]);

  useEffect(() => {
    handleSave();
  }, [currentTitle, currentEmoji]);

  return (
    <div className={cn("group w-fit h-fit", page.icon && page.coverUrl ? "mt-8" : "")}>
      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all">
        {!page.icon && (
          <IconPicker asChild onEmojiChange={setCurrentEmoji}>
            <div className="flex items-center w-fit py-1 px-2 cursor-pointer rounded-[6px] hover:bg-[#f3f3f3] transition-colors">
              <div>{icons.emoji}</div>
              <span className="text-[#9B9A97] text-[14px]">Add icon</span>
            </div>
          </IconPicker>
        )}
        {!page.coverUrl && (
          <div
            onClick={coverImage.onOpen}
            className="flex items-center w-fit py-1 px-2 cursor-pointer rounded-[6px] hover:bg-[#f3f3f3] transition-colors"
          >
            <div>{icons.image}</div>
            <span className="text-[#9B9A97] text-[14px]">Add cover</span>
          </div>
        )}
      </div>

      <Input
        className="border-none shadow-none focus:!outline-none focus:!ring-0 placeholder:text-[#E1E1E0] placeholder:text-[40px] placeholder:font-bold h-[80px] !text-[40px] !text-[#37352F] font-bold p-0 !rounded-none"
        onChange={(e) => {
          const value = e.target.value;
          debouncedTitleChange(value);
          document.setTitle(value, pageId!);
        }}
        value={document.title || ""}
        placeholder="New Page"
      />
    </div>
  );
}
