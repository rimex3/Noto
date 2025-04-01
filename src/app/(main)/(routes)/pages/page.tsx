'use client'
import NotoPageContent from "@/components/noto-page-content"
import NotoPageHeader from "@/components/noto-page-header"

export default function page() {
    return (
        <div className="w-full">
            <div>
                <NotoPageHeader />
                <div className="w-full flex items-start justify-center mt-28">
                    <NotoPageContent />
                </div>
            </div>
        </div>
    )
}