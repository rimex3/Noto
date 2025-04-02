import { db } from "@/db";
import NotoPage from "./noto-page";
import { auth } from "@clerk/nextjs/server";

export default async function PagesList() {
    const user = await auth()
    const pages = await db.query.pagesTable.findMany({
        where: (pages, { eq }) => eq(pages.auth_id, user.userId),
    })


    return (
        <div>
            {pages.map((page) => <NotoPage key={page.id} {...page as any} />)}
        </div>
    )
}
