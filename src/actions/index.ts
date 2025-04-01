'use server'

import { db } from "@/db"
import { pagesTable, usersTable } from "@/db/schema"
import { type PageRequestType } from "@/types"
import { currentUser } from "@clerk/nextjs/server"


export const createUser = async () => {
    const user = await currentUser()
    try {
        await db.insert(usersTable).values({
            id: user?.id,
            email: user?.primaryEmailAddress?.emailAddress || "",
            name: user?.fullName || `${user?.firstName || "User-"}${user?.lastName || user?.id}`,
            avatar_url: user?.hasImage ? user?.imageUrl : ""
        }).onConflictDoNothing()
    } catch (err: any) {
        throw new Error(err)
    }
}

export const createPage = async ({ title, content, type, user_id }: PageRequestType) => {
    try {
        await db.insert(pagesTable).values({
            user_id,
            title,
            content,
            type
        }).onConflictDoNothing({ target: usersTable.id })
    } catch (err: any) {
        throw new Error(err)
    }
}