import { cn } from '@/lib/utils'
import React from 'react'

export default function SidebarItem({ className, children }: Readonly<{ className?: string, children: React.ReactNode }>) {
  return (
    <div className={cn("hover:bg-[#F0F0EF] transition-colors cursor-pointer rounded-[6px] flex items-center justify-between mx-[6px] w- h-[32px]   space-x-3 p-[2px] pl-[10px]", className)}>
      {children}
    </div>
  )
}
