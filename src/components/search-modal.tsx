'use client'

import { useSearch } from "@/hooks/use-search";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"


import { PageType } from "@/types";
import { icons } from "@/constants/icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SearchModal({ pages }: { pages: PageType[] }) {
    const search = useSearch()
    const router = useRouter()

    const onOpen = useSearch(store => store.onOpen)

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpen();
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [onOpen]);

    const onSelect = (id: string) => {
        router.push(`/pages/${id}`)
        search.onClose()
    }


    return (
        <CommandDialog open={search.isOpen} onOpenChange={search.onClose}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Pages">
                    {
                        pages.map((page) =>
                            <CommandItem
                                key={page.id}
                                value={`${page.id}-${page.title}`}
                                onSelect={() => onSelect(page.id!)}
                            >
                                {!page.icon ? icons.pageEmpty : page.icon}
                                <span className="w-[200px] truncate">{page.title}</span>
                            </CommandItem>)
                    }
                </CommandGroup>
                <CommandSeparator />

            </CommandList>
        </CommandDialog>
    )
}
