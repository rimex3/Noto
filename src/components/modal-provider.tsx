'use client'

import { useEffect, useState } from "react"
import SearchModal from "./search-modal"
import { PageType } from "@/types"

export default function ModalProvider({ pages }: { pages: PageType[] }) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null;

    return (
        <>
            <SearchModal pages={pages} />
        </>
    )
}
