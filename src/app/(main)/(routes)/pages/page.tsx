import NotoPageContent from "@/components/noto-page-content"
import NotoPageHeader from "@/components/noto-page-header"
import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"

export default async function page() {
    const user = await currentUser()
    await db.insert(usersTable).values({
        auth_id: user?.id!,
        email: user?.primaryEmailAddress?.emailAddress || "",
        name: user?.fullName || `${user?.firstName || "User-"}${user?.lastName || user?.id}`,
        avatar_url: user?.hasImage ? user?.imageUrl : ""
    }).onConflictDoNothing()

    return null
}