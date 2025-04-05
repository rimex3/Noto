
'use server'

import { BlockType } from "@/components/noto-editor";
import { db } from "@/db"
import { pagesTable } from "@/db/schema"
import { type PageType } from "@/types"
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export const createPage = async ({ title, content, type, auth_id, id, currentPageId }: PageType & { currentPageId?: string }) => {
    try {
        const data = await db
            .insert(pagesTable)
            .values({ id: id!, auth_id: auth_id!, title: title!, content, type })
            .returning({ id: pagesTable.id });

        revalidatePath("/pages");
        if (currentPageId) revalidatePath(`/pages/${currentPageId}`);
        return { id: data[0].id };
    } catch (err: any) {
        throw new Error(err);
    }
};

export const updatePage = async ({ id, title, content, currentPageId, coverUrl, icon, isArchived }: {
    id: string,
    title?: string,
    content?: BlockType[],
    currentPageId?: string,
    coverUrl?: string,
    icon?: string
    isArchived?: boolean
}) => {
    try {
        const data = await db
            .update(pagesTable)
            .set({
                title,
                content,
                updated_at: new Date(),
                coverUrl,
                icon,
                isArchived
            })
            .where(eq(pagesTable.id, id))
            .returning({ id: pagesTable.id });

        revalidatePath("/pages");
        if (currentPageId) revalidatePath(`/pages/${currentPageId}`);

        return { id: data[0].id };
    } catch (err: any) {
        throw new Error(err);
    }
};

export const deletePage = async ({ id }: { id: string }) => {
    try {
        await db
            .delete(pagesTable)
            .where(eq(pagesTable.id, id));

        revalidatePath("/pages");
        revalidatePath(`/pages/${id}`);

        return { success: true, id };
    } catch (err: any) {
        throw new Error(err);
    }
};


export const moveToPage = async ({ id, pageId }: { id: string, pageId: string }) => {
    try {
        const data = await db
            .update(pagesTable)
            .set({ parent_id: pageId })
            .where(eq(pagesTable.id, id))
            .returning({ id: pagesTable.id });

        revalidatePath("/pages");
        
        return { id: data[0].id };
    } catch (err: any) {
        throw new Error(err);
    }
};

export const createPageInside = async ({ parentId, auth_id }: { parentId: string, auth_id: string }) => {
    try {
        await db
            .insert(pagesTable)
            .values({
                auth_id,
                title: "New Page",
                parent_id: parentId,
            })
            .returning({ id: pagesTable.id });

        revalidatePath("/pages");
        revalidatePath(`/pages/${parentId}`);
    } catch (err: any) {
        throw new Error(err);
    }
};
