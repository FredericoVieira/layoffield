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
    <html lang="en" className="h-full">
      <body
        className={`${quantico.className} flex min-h-full flex-col antialiased`}
      >
        <main className="flex flex-1 px-4 py-8 md:px-8">{children}</main>
        <footer className="mt-auto w-full flex-shrink-0 py-6 text-center text-sm text-gray-400">
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
