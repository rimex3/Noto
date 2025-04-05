import { getTrash } from "@/lib/get-trash";
import { currentUser } from "@clerk/nextjs/server";
import TrashMenu from "./trash-menu";


interface TrashListProps {
    children?: React.ReactNode
}

export default async function TrashList({ children }: TrashListProps) {
    const user = await currentUser()
    const trash = await getTrash(user?.id!)

    return (
        <TrashMenu trash={trash as any}>
            {children}
        </TrashMenu>
    )
}
