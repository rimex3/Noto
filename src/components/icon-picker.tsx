import React, { lazy, memo, Suspense, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { EmojiStyle, Theme } from 'emoji-picker-react';

interface IconPickerProps {
    onEmojiChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
}


const LazyEmojiPicker = lazy(() => import('emoji-picker-react'));


const IconPicker = memo(({ children, onEmojiChange, asChild }: IconPickerProps) => {

    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full border-none shadow-none translate-x-2">
                <LazyEmojiPicker
                    height={350}
                    theme={Theme.LIGHT}
                    emojiStyle={EmojiStyle.TWITTER}
                    onEmojiClick={(selected) => onEmojiChange(selected.emoji)}
                    lazyLoadEmojis
                />
            </PopoverContent>
        </Popover>
    );
});

export default IconPicker;
