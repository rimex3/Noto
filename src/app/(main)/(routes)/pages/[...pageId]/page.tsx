'use client'

import { usePathname } from "next/navigation"

export default function page() {
    const pathname = usePathname()
    return (
        <div>{pathname}</div>
    )
}