"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import PageBackground from "@/components/PageBackground";
import SignInButton from "@/components/SignInButton";

export default function Home() {
  const router = useRouter();

  return (
    <PageBackground image="/home.png" alt="Home background" centralize>
      <div className="w-full max-w-4xl text-center">
        <Image
          src="/logo.png"
          alt="Layoffield logo"
          className="mb-6"
          quality={100}
          width={1000}
          height={1000}
          priority
          style={{ zIndex: 5, position: "relative" }}
        />
        <p className="mb-8 text-gray-200">
          Uncover the brave developers rising above the layoff war! Can you beat
          them?
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <SignInButton />
          <button
            onClick={() => router.push("/about")}
            className="cursor-pointer rounded-lg bg-gray-800/80 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-gray-700/80 sm:text-lg md:text-xl"
          >
            Learn More
          </button>
        </div>
      </div>
    </PageBackground>
  );
}
