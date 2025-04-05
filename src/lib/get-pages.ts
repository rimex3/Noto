import { db } from "@/db"
import { cache } from "react"

export const getPages = cache(async (userId: string) => {
    return await db.query.pagesTable.findMany({
        where: (pages, { eq, and }) => and(
            eq(pages.auth_id, userId),
            eq(pages.isArchived, false)
        )
    })
})

export const getFirstPage = cache(async (userId: string) => {
    'use cache'
    return await db.query.pagesTable.findFirst({
        where: (pages, { eq, and }) => and(
            eq(pages.auth_id, userId),
            eq(pages.isArchived, false)
        )
    })
})