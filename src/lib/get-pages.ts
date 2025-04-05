import { db } from "@/db"
import { cache } from "react"

export const getRootPages = cache(async (userId: string) => {
    const pages = await db.query.pagesTable.findMany({
        where: (pages, { eq, and, isNull }) =>
            and(
                eq(pages.auth_id, userId),
                eq(pages.isArchived, false),
                isNull(pages.parent_id)
            ),
    });

    const pagesWithChildren = await Promise.all(
        pages.map(async (page) => {
            const children = await db.query.pagesTable.findMany({
                where: (pages, { eq }) => eq(pages.parent_id, page.id)
            });
            return {
                ...page,
                children,
            };
        })
    );

    return pagesWithChildren;
});



export const getChildPages = cache(async (userId: string) => {
    return await db.query.pagesTable.findMany({
        where: (pages, { eq, and, not, isNull }) =>
            and(
                eq(pages.auth_id, userId),
                eq(pages.isArchived, false),
                not(isNull(pages.parent_id))
            )
    });
});



export const getFirstPage = cache(async (userId: string) => {
    'use cache'
    return await db.query.pagesTable.findFirst({
        where: (pages, { eq, and }) => and(
            eq(pages.auth_id, userId),
            eq(pages.isArchived, false)
        )
    })
})