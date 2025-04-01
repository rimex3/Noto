import { BlockType } from "./components/noto-editor"


export type PageRequestType = {
    user_id: string,
    title: string,
    content: BlockType[]
    type: 'empty' | 'tasks'
} 