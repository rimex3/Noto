import Image from "next/image";
import LandingHeader from "./landing-header";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Landing() {
    return (
        <section className="min-h-screen">
            <LandingHeader />
            <div className="max-w-5xl mx-auto w-full min-h-[600px] flex items-center justify-between">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h1 className="text-5xl font-bold">
                            Meet <span className="underline">Noto</span>: Your Happy Place for Work
                        </h1>

                        <p className="text-xl mt-2">
                            Welcome to Noto, your all-in-one platform for managing your notes and documents.
                        </p>

                        <SignedOut>
                            <SignUpButton  mode="modal" fallbackRedirectUrl={"/pages"}>
                                <Button className="cursor-pointer rounded-[5px] mt-5">
                                    Get Noto free
                                </Button>
                            </SignUpButton>
                        </SignedOut>

                        <SignedIn>
                            <Link href="/pages" replace>
                                <Button className="cursor-pointer rounded-[5px] mt-5">
                                    Get Noto free
                                </Button>
                            </Link>
                        </SignedIn>
                    </div>
                    <div>
                        <Image src="/images/landing.webp" alt="landing" loading={undefined} width={1000} height={1000} draggable={false} className="select-none" />
                    </div>
                </div>
            </div>
        </section>

    )
}
