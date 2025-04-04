import React, { memo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface IconPickerProps {
    onOpen?: () => void
    onEmojiChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
    open?: boolean
}




const IconPicker = memo(({ children, onEmojiChange, asChild, open, onOpen }: IconPickerProps) => {

    return (
        <Popover open={open} onOpenChange={onOpen}>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full border-none shadow-none translate-x-2">
                <Picker data={data}  theme={"light"} onEmojiSelect={(emoji: any) => onEmojiChange(emoji.native)} />
            </PopoverContent>
        </Popover>
    );
});

IconPicker.displayName = 'IconPicker';

export default IconPicker;
