import NotoPageContentSkeleton from '@/components/noto-page-content-skeleton'
import { SidebarSkeleton } from '@/components/sidebar-skeleton'
import React from 'react'

export default function loading() {
    return (
        <div className='flex items-center w-full ml-[18.7rem]'>
            <SidebarSkeleton />
            <NotoPageContentSkeleton />
        </div>
    )
}
