import type { Metadata } from "next";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from "@/lib/edgestore";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


export const metadata: Metadata = {
  title: "Noto",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`antialiased text-[#191918]`}
        >
          <EdgeStoreProvider>
            {children}
          </EdgeStoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
