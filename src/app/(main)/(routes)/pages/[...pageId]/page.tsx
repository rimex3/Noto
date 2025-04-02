import NotoPageContent from "@/components/noto-page-content";
import NotoPageHeader from "@/components/noto-page-header";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";


export default async function page({ params }: { params: Promise<{ pageId: string }> }) {
    const { pageId } = await params
    const page = await db.query.pagesTable.findFirst({
        where: (pages, { eq }) => eq(pages.id, pageId),
    })

    const user = await currentUser()

    return (
        <div className="w-full">
            <div>
                <NotoPageHeader />
                <div className="w-full flex items-start justify-center mt-28">
                    <NotoPageContent pageId={pageId} page={page as any} userId={user?.id!} />
                </div>
            </div>
        </div>
    )
}