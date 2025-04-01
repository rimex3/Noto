import { useEffect } from "react";

interface UseKeyProps {
    keys: string | string[];
    handler: () => void;
    element?: HTMLElement | Document;
}

export function useKey({ keys, handler, element = document }: UseKeyProps) {
    useEffect(() => {
        const handleKeyDown = (event: Event) => {
            const keyboardEvent = event as KeyboardEvent;
            const targetKeys = Array.isArray(keys) ? keys : [keys];

            if (targetKeys.includes(keyboardEvent.key)) {
                handler();
            }
        };

        element.addEventListener("keydown", handleKeyDown as EventListener);

        return () => {
            element.removeEventListener("keydown", handleKeyDown as EventListener);
        };
    }, [keys, handler, element]);
};
