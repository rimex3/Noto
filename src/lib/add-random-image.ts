import { EMOJIS } from "@/constants/emojis"
import { GALLERY } from "@/constants/gallery"


export function addRandomImage() {
    const images = Object.entries(GALLERY).flatMap(([, images]) => images)

    const randomIndex = Math.floor(Math.random() * images.length)

    return images[randomIndex]
}

export function addRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * EMOJIS.length)
    
    return EMOJIS[randomIndex]
}