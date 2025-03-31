import Image from "next/image";
import { type Medal } from "@/utils/medals";
import Carousel from "./Carousel";

type DesktopCarouselProps = {
  medals: Medal[];
};

export default function DesktopCarousel({ medals }: DesktopCarouselProps) {
  const totalSlides = Math.ceil(medals.length / 6);

  return (
    <Carousel totalSlides={totalSlides}>
      {Array.from({ length: totalSlides }).map((_, slideIndex) => (
        <div key={slideIndex} className="carousel__slide">
          <div className="grid grid-cols-3 gap-4 p-28">
            {medals
              .slice(slideIndex * 6, (slideIndex + 1) * 6)
              .map(({ name, description, image, shadow, status }) => (
                <div
                  key={name}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={status ? image : shadow}
                      alt={name}
                      width={100}
                      height={100}
                    />
                    <span className="text-md mt-4 text-center text-gray-200">
                      {name}
                    </span>
                    <span className="flex min-h-[40px] items-start text-center text-sm text-gray-400">
                      {description}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </Carousel>
  );
}
