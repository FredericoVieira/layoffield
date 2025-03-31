import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { type Medal } from "@/utils/medals";
import MobileCarousel from "./MobileCarousel";
import DesktopCarousel from "./DesktopCarousel";

type MedalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  medals: Medal[];
};

export default function MedalsModal({
  isOpen,
  onClose,
  medals,
}: MedalModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 p-4">
      <div
        className={`relative h-[450px] w-[300px] overflow-hidden rounded-md p-4 sm:h-[450px] sm:w-[650px] md:h-[600px] md:w-[900px] md:p-6`}
      >
        <Image
          src="/medal-box.png"
          alt="Medal box"
          className="object-fill"
          quality={100}
          priority
          fill
        />
        <div className="relative flex h-full w-full items-center justify-center">
          {isMobile ? (
            <MobileCarousel medals={medals} />
          ) : (
            <DesktopCarousel medals={medals} />
          )}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-200 hover:cursor-pointer hover:text-white sm:top-8 sm:right-8"
        >
          <X />
        </button>
      </div>
    </div>
  );
}
