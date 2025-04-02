import { BlockType } from "./components/noto-editor"


export type PageType = {
    id?: string
    auth_id: string,
    title?: string,
    content?: BlockType[]
    type?: 'empty' | 'tasks'
    create_at?: Date
    updated_at?: Date
} 