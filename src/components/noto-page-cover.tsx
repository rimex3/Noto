import { PageType } from "@/types";
import Image from "next/image";
import { CoverImage } from "./cover-image";

export default function NotoPageCover({ page }: { page: PageType }) {

    return (
        <div className="w-full h-[30vh] overflow-hidden relative group">
            <div className="absolute top-5 right-32">
                <CoverImage>
                    <div className=" w-fit h-fit flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white hover:bg-[#EFEFEE]  text-[#7D7C78] text-[14px] px-2 py-1 rounded-sm cursor-pointer transition-all duration-200 ease-in-out z-10 border border-[#EDEDEC]">
                        Change cover
                    </div>
                </CoverImage>
            </div>
            <Image src={page?.coverUrl!} alt="cover" priority width={1000} height={1000} className="w-full h-full object-cover object-center" />
        </div>
    )
}
