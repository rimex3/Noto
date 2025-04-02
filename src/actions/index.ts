'use server'

import { db } from "@/db"
import { pagesTable, usersTable } from "@/db/schema"
import { type PageType } from "@/types"
import { revalidatePath } from "next/cache";


// export const createUser = async ({ }) => {
//     const user = await currentUser()
//     try {
//         await db.insert(usersTable).values({
//             id: user?.id,
//             email: user?.primaryEmailAddress?.emailAddress || "",
//             name: user?.fullName || `${user?.firstName || "User-"}${user?.lastName || user?.id}`,
//             avatar_url: user?.hasImage ? user?.imageUrl : ""
//         }).onConflictDoNothing()
//     } catch (err: any) {
//         throw new Error(err)
//     }
// }

export const createPage = async ({ title, content, type, auth_id, id }: PageType) => {
    console.log('serv', auth_id)
    try {
        await db
            .insert(pagesTable)
            .values({ id: id!, auth_id, title: title!, content, type })
            .onConflictDoUpdate({
                target: [pagesTable.id],
                set: { title, content },
            });
        revalidatePath("/pages")
    } catch (err: any) {
        throw new Error(err);
    }
};
