"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Github } from "lucide-react";
import { signIn } from "@/actions/server";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full max-w-4xl text-center">
      <Image
        src="/logo.png"
        alt="Layoffield logo"
        className="mb-6"
        quality={100}
        width={1000}
        height={1000}
        priority
      />
      <p className="mb-8 text-lg text-gray-200 md:text-xl">
        Uncover the brave developers rising above the layoff war! Can you beat
        them?
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          onClick={signIn}
          className="flex cursor-pointer gap-2 rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-orange-600"
        >
          <Github />
          Sign in
        </button>
        <button
          onClick={() => router.push("/about")}
          className="cursor-pointer rounded-lg bg-gray-800/80 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-gray-700/80"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
