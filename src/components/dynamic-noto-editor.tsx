"use client";

import dynamic from "next/dynamic";

export const DynamicNotoEditor = dynamic(() => import("./noto-editor"), { ssr: false });