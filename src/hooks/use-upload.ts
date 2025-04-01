import { useEdgeStore } from "@/lib/edgestore";


interface UseUploadProps {
    onProgressChange?: (progress: number) => void;
}

interface UseUploadReturn {
    handleUpload: (file: File) => Promise<UploadResponse | undefined>;
}

export interface UploadResponse {
    url: string;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: Record<string, never>;
    pathOrder: string[];
}

export function useUpload({ onProgressChange }: UseUploadProps): UseUploadReturn {
    const { edgestore } = useEdgeStore()

    const handleUpload = async (file: File): Promise<UploadResponse | undefined> => {
        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange
            })

            return res
        }
    }

    return { handleUpload }
}