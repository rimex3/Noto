import NotoPageContentSkeleton from '@/components/noto-page-content-skeleton'
import React from 'react'

export default function loading() {
    return (
        <div className='flex items-center w-full ml-[18.7rem]'>
            <NotoPageContentSkeleton />
        </div>
    )
}
