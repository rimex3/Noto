
import { db } from "@/db";
import { cache } from "react";
import { unstable_cacheTag as cacheTag } from "next/cache"

export const getPageById = cache(async (pageId: string, userId: string) => {
    return await db.query.pagesTable.findFirst({
        where: (pages, { eq, and }) => and(
            eq(pages.id, pageId),
            eq(pages.auth_id, userId)
        ),
    });
})



export const getPublicPageById = cache(async (pageId: string) => {
    return await db.query.pagesTable.findFirst({
        where: (pages, { eq, and }) => and(
            eq(pages.id, pageId),
            eq(pages.isPublished, true)
        ),
    });
})
