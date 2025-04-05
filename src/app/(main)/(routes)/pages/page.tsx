import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { getFirstPage } from "@/lib/get-pages"
import { PageType } from "@/types"
import { currentUser } from "@clerk/nextjs/server"
import { GetStaticProps } from "next"
import { redirect } from "next/navigation"



export default async function page() {
    const user = await currentUser()
    await db.insert(usersTable).values({
        auth_id: user?.id!,
        email: user?.primaryEmailAddress?.emailAddress || "",
        name: user?.fullName || `${user?.firstName || "User-"}${user?.lastName || user?.id}`,
        avatar_url: user?.hasImage ? user?.imageUrl : ""
    }).onConflictDoNothing()
    
    const firstPage = await getFirstPage(user?.id!)


    return redirect(`/pages/${firstPage?.id}`)
}