
import NotFound from "@/components/not-found";
import NotoPageContent from "@/components/noto-page-content";
import NotoPageCover from "@/components/noto-page-cover";
import NotoPageHeader from "@/components/noto-page-header";
import NotoPageIcon from "@/components/noto-page-icon";
import { cn } from "@/lib/cn";
import { getPageById } from "@/lib/get-pageById";
import { currentUser } from "@clerk/nextjs/server";




export default async function page({ params }: { params: Promise<{ pageId: string }> }) {
    const { pageId } = await params
    const page = await getPageById(pageId)
    const user = await currentUser()

    if (!page) return <NotFound />

    return (
        <div className="w-full ml-[18.7rem]">
            <div>
                <NotoPageHeader page={page as any} />
                {
                    page?.coverUrl && <NotoPageCover page={page as any} />
                }

                <div className={cn("relative w-fit mx-auto flex items-start justify-center ", page?.coverUrl ? "mt-5" : "mt-28")}>
                    <NotoPageIcon page={page as any} />
                    <NotoPageContent pageId={pageId} page={page as any} userId={user?.id!} />
                </div>
            </div>
        </div>
    )
}