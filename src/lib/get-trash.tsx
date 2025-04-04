import { db } from "@/db"
import { cache } from "react"

export const getTrash = cache(async (userId: string) => {
    return await db.query.pagesTable.findMany({
        where: (pages, { eq, and }) => and(
            eq(pages.auth_id, userId),
            eq(pages.isArchived, true)
        )
    })
})
