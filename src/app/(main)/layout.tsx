import {
    ClerkProvider,
} from '@clerk/nextjs'
import { EdgeStoreProvider } from "@/lib/edgestore";
import MainLayout from "@/components/main-layout";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}
