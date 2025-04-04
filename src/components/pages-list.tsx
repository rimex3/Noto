import NotoPage from "./noto-page";
import { auth } from "@clerk/nextjs/server";
import { getPages } from "@/lib/get-pages";


export default async function PagesList() {
    const user = await auth()
    const pages = await getPages(user.userId!)


    return (
        <div className="flex flex-col space-y-1">
            {pages.map((page) => <NotoPage key={page.id} {...page as any} />)}
        </div>
    )
}
