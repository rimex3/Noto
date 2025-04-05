import { getRootPages } from "@/lib/get-pages";
import NotoPage from "./noto-page";
import { auth } from "@clerk/nextjs/server";
import ModalProvider from "./modal-provider";


export default async function PagesList() {
    const user = await auth()
    const pages = await getRootPages(user.userId!)

    return (
        <div className="flex flex-col space-y-1">
            {pages.map((page) => <NotoPage key={page.id} {...page as any} />)}

            <ModalProvider pages={pages as any} />
        </div>
    )
}
