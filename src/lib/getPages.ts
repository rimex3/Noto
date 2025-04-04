import { db } from "@/db"
import { cache } from "react"

export const getPage = cache(async (userId: string) => {
    return await db.query.pagesTable.findMany({
        where: (pages, { eq }) => eq(pages.auth_id, userId),
    })
})
