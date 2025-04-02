import { db } from "@/db";
import { cache } from "react";

export const getPageById = cache(async (pageId: string) => {
    return await db.query.pagesTable.findFirst({
        where: (pages, { eq }) => eq(pages.id, pageId),
    });
})
