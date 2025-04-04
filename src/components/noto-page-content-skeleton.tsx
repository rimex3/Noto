import { Skeleton } from "./ui/skeleton";

export default function NotoPageContentSkeleton() {
    return (
        <div className="w-full">
            <div className="h-[44px] pl-[12px] pr-[10px] flex items-center justify-between overflow-hidden">
                <div>
                    <Skeleton className="w-[100px] h-[25px] rounded-[6px]" />
                </div>
                <Skeleton className="" />
            </div>
            <div className="relative w-fit mx-auto flex items-start justify-center mt-28">
                <div className="flex flex-col">
                    <div className="pb-[30vh] w-[600px]">
                        <Skeleton className="h-[80px]" />

                        <div className="mt-10 flex flex-col space-y-3">
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-[20px] w-[20px]" />
                                <Skeleton className="h-[20px] w-full" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-[20px] w-[20px]" />
                                <Skeleton className="h-[20px] w-full" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-[20px] w-[20px]" />
                                <Skeleton className="h-[20px] w-full" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-[20px] w-[20px]" />
                                <Skeleton className="h-[20px] w-full" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
