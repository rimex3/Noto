'use client'

import React, { memo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { cn } from '@/lib/cn';
import { useMutation } from '@tanstack/react-query';
import { updatePage } from '@/actions';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useIcon } from '@/hooks/use-icon';

interface IconPickerProps {
    onOpen?: () => void
    onEmojiChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
    open?: boolean;
}




const IconPicker = memo(({ children, onEmojiChange, asChild, open, onOpen }: IconPickerProps) => {
    const { pageId } = useParams()
    const { mutateAsync } = useMutation({
        mutationFn: updatePage
    })
    const { user } = useUser()
    const emoji = useIcon()

    const handleDeleteIcon = async () => {
        emoji.setIcon(" ", pageId?.[0]!)
        onOpen?.()
        await mutateAsync({
            id: pageId?.[0]!,
            icon: "",
            auth_id: user?.id!
        })
    }
    return (
        <Popover open={open} onOpenChange={onOpen}>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className=" w-full shadow-none translate-x-2 relative !z-10">
                <div className=" ">
                    <div className="flex items-center justify-between w-full border-b border-[#F0F0EF]">
                        <div className="flex items-center space-x-1 w-full ">
                            <div className={cn(" border-[#37352F]  border-b-2 ")}>
                                <div className="hover:bg-[#F3F3F3] transition-colors rounded-[6px]  text-[14px] inline-flex items-center cursor-pointer px-[8px] mb-1">
                                    Emoji
                                </div>
                            </div>
                        </div>

                        <div>
                            <div onClick={handleDeleteIcon} className="hover:bg-[#F3F3F3] text-[#37352f80] transition-colors rounded-[6px] h-[28px] text-[14px] inline-flex items-center cursor-pointer px-[8px] mb-1">
                                Remove
                            </div>
                        </div>
                    </div>
                </div>
                <Picker data={data} previewPosition={"none"} theme={"light"} onEmojiSelect={(emoji: any) => {
                    onEmojiChange(emoji.native)
                    onOpen?.()
                }} className={"!h-[100px]"} />
            </PopoverContent>
        </Popover>
    );
});

IconPicker.displayName = 'IconPicker';

export default IconPicker;
