import { ReactNode } from "react";
import type { Metadata } from "next";
import { Quantico } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const quantico = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Layoffield",
  description:
    "Discover the fearless developers rising heroically against the battle of the layoff war",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quantico.className} antialiased`}>
        <div className="fixed inset-0 h-screen w-full">
          <Image
            src="/background.png"
            alt="Background"
            className="object-cover"
            quality={100}
            priority
            fill
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 md:px-8">
          {children}
        </main>
        <footer className="absolute bottom-6 w-full text-center text-sm text-gray-400">
          <a
            href="https://f9ine.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 transition-colors duration-200 hover:text-gray-300"
          >
            <Image
              alt="F9ine.com"
              src="/f9ine.svg"
              loading="lazy"
              decoding="async"
              width={32}
              height={32}
              className="rounded-md"
            />
            © 2025 Layoffield. All rights reserved.
          </a>
        </footer>
      </body>
    </html>
  );
}
