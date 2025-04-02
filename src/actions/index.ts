
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

export const updatePage = async ({ id, title, content, currentPageId }: { id: string; title?: string; content?: BlockType[]; currentPageId?: string }) => {
    try {
        const data = await db
            .update(pagesTable)
            .set({
                title,
                content,
                updated_at: new Date()
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