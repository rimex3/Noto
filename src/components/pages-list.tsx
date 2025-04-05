'use client'

import { useEffect } from "react";
import NotoPage from "./noto-page";
import ModalProvider from "./modal-provider";
import { PageType } from "@/types";
import { usePagesList } from "@/hooks/use-pages-list";

export default function PagesList({ pages }: { pages: PageType[] }) {
    const { pagesList, setPagesList } = usePagesList();

    useEffect(() => {
        setPagesList(pages);
    }, [pages, setPagesList]);

    return (
        <div className="flex flex-col space-y-1">
            {pagesList.map((page) => (
                <NotoPage key={page.id} {...page as any} />
            ))}

            <ModalProvider pages={pagesList as any} />
        </div>
    );
}
