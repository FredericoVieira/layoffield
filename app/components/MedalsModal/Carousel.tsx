"use client";

import { useCallback, useEffect, useState, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/utils/cn";

type CarouselProps = {
  children: ReactNode;
  totalSlides: number;
};

export default function Carousel({ children, totalSlides }: CarouselProps) {
  const [ref, carousel] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => carousel && carousel.scrollPrev(),
    [carousel],
  );
  const scrollNext = useCallback(
    () => carousel && carousel.scrollNext(),
    [carousel],
  );

  useEffect(() => {
    if (!carousel) return;

    carousel.on("select", () => {
      setSelectedIndex(carousel.selectedScrollSnap());
    });
  }, [carousel]);

  return (
    <div className="carousel relative" ref={ref}>
      <div className="carousel__container">{children}</div>
      <button
        className={cn(
          selectedIndex === 0 ? "hidden" : "block",
          "absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:cursor-pointer hover:bg-black/70",
        )}
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className={cn(
          selectedIndex === totalSlides - 1 ? "hidden" : "block",
          "absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:cursor-pointer hover:bg-black/70",
        )}
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors hover:cursor-pointer ${
              index === selectedIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => carousel?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
