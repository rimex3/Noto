import React, { lazy, memo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { EmojiStyle, Theme } from 'emoji-picker-react';

interface IconPickerProps {
    onOpen?: () => void
    onEmojiChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
    open?: boolean
}


const LazyEmojiPicker = lazy(() => import('emoji-picker-react'));


const IconPicker = memo(({ children, onEmojiChange, asChild, open, onOpen }: IconPickerProps) => {

    return (
        <Popover open={open} onOpenChange={onOpen}>
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

IconPicker.displayName = 'IconPicker';

export default IconPicker;
