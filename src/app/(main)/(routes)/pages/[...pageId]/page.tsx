
import NotoPageContent from "@/components/noto-page-content";
import NotoPageHeader from "@/components/noto-page-header";
import { cn } from "@/lib/utils";
import { getPageById } from "@/utils/getPageById";
import { currentUser } from "@clerk/nextjs/server";




export default async function page({ params }: { params: Promise<{ pageId: string }> }) {
    const { pageId } = await params
    const page = await getPageById(pageId)
    const user = await currentUser()

    return (
        <div className="w-full">
            <div>
                <NotoPageHeader page={page as any} />
                {
                    page?.coverUrl && <div className="w-full h-[30vh] overflow-hidden">
                        <img src={page?.coverUrl!} loading="lazy" alt="cover" className="w-full h-full object-cover object-center" />
                    </div>
                }

                <div className={cn("relative w-fit mx-auto flex items-start justify-center ", page?.coverUrl ? "mt-5" : "mt-28")}>
                    <div className="absolute text-[5rem] -left-[165px] -top-[90px] select-none">
                        {page?.icon}
                    </div>
                    <NotoPageContent pageId={pageId} page={page as any} userId={user?.id!} />
                </div>
            </div>
        </div>
    )
}