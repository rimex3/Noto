import NotoPage from "./noto-page";
import { auth } from "@clerk/nextjs/server";
import { getPage } from "@/utils/getPages";


export default async function PagesList() {
    const user = await auth()
    const pages = await getPage(user.userId!)


    return (
        <div>
            {pages.map((page) => <NotoPage key={page.id} {...page as any} />)}
        </div>
    )
}
