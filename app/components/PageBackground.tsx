import { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

type PageBackgroundProps = {
  children: ReactNode;
  image: string;
  alt: string;
  centralize?: boolean;
};

export default function PageBackground({
  children,
  image,
  alt,
  centralize = false,
}: PageBackgroundProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col",
        centralize && "items-center justify-center",
      )}
    >
      <div className="fixed inset-0 -z-10 w-full">
        <Image
          src={image}
          alt={alt}
          className="object-cover"
          quality={100}
          priority
          fill
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      {children}
    </div>
  );
}
