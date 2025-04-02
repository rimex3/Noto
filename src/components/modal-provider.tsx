'use client'

import { useEffect, useState } from "react"
import { CoverImageModal } from "./cover-image-modal";

export default function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null;

    return (
        <>
            <CoverImageModal />
        </>
    )
}
