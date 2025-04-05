import { getRootPages } from "@/lib/get-pages";
import NotoPage from "./noto-page";
import { auth } from "@clerk/nextjs/server";


export default async function PagesList() {
    const user = await auth()
    const pages = await getRootPages(user.userId!)

    console.log(pages)

    return (
        <div className="flex flex-col space-y-1">
            {pages.map((page) => <NotoPage key={page.id} {...page as any} />)}
        </div>
    )
}
