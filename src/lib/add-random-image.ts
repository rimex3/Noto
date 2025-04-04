import { GALLERY } from "@/constants/gallery"


export function addRandomImage() {
    const images = Object.entries(GALLERY).flatMap(([, images]) => images)

    const randomIndex = Math.floor(Math.random() * images.length)

    return images[randomIndex]
}