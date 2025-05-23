import { BlockType } from "./components/noto-editor"


export type PageType = {
    id?: string
    auth_id?: string,
    title?: string,
    isArchived?: boolean
    content?: BlockType[]
    type?: 'empty' | 'tasks'
    icon?: string
    coverUrl?: string
    isPublished?: boolean
    parent_id?: string
    created_at?: Date
    updated_at?: Date
    children?: PageType[]
} 