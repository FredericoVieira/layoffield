import Image from "next/image";
import { type Medal } from "@/utils/medals";
import Carousel from "./Carousel";

type MobileCarouselProps = {
  medals: Medal[];
};

export default function MobileCarousel({ medals }: MobileCarouselProps) {
  return (
    <Carousel totalSlides={medals.length}>
      {medals.map(({ name, description, image, shadow, status }) => (
        <div key={name} className="carousel__slide">
          <div className="flex flex-col items-center justify-center p-12">
            <Image
              src={status ? image : shadow}
              alt={name}
              width={120}
              height={120}
            />
            <span className="mt-4 text-center text-lg text-gray-200">
              {name}
            </span>
            <span className="mt-2 text-center text-sm text-gray-400">
              {description}
            </span>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
