import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselProps {
  images: string[];
  autoAdvance?: boolean;
  interval?: number;
  showControls?: boolean;
  containerClassName?: string;
  peekMode?: boolean;
}

export function Carousel({ 
  images, 
  autoAdvance = false, 
  interval = 3000,
  showControls = false,
  containerClassName,
  peekMode = false
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!autoAdvance) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoAdvance, interval, nextSlide]);

  if (peekMode) {
    // Build the three visible entries, always rendering active LAST so it sits on top via DOM order
    const peekSlides: { idx: number; offset: number }[] = [];
    for (let idx = 0; idx < images.length; idx++) {
      let offset = idx - currentIndex;
      if (offset < -1 && currentIndex === images.length - 1 && idx === 0) offset = 1;
      if (offset > 1 && currentIndex === 0 && idx === images.length - 1) offset = -1;
      if (Math.abs(offset) <= 1) peekSlides.push({ idx, offset });
    }
    // Sort: adjacent slides first, active last → active always on top without z-index tricks
    peekSlides.sort((a, b) => Math.abs(b.offset) - Math.abs(a.offset));

    return (
      <div
        className={containerClassName ?? "relative w-full overflow-hidden aspect-video sm:aspect-[16/9] md:aspect-[21/9] group"}
        style={{ background: "transparent" }}
      >
        {peekSlides.map(({ img: _img, idx, offset }) => {
          const img = images[idx];
          const isActive = offset === 0;
          return (
            <div
              key={idx}
              className="absolute"
              style={{
                width: "78%",
                height: "90%",
                top: "5%",
                left: "11%",
                transform: `translateX(${offset * 87}%) scale(${isActive ? 1 : 0.92})`,
                opacity: isActive ? 1 : 0.65,
                filter: isActive ? "none" : "blur(3px)",
                transition: "transform 0.7s ease-in-out, opacity 0.7s ease-in-out, filter 0.7s ease-in-out",
              }}
            >
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover rounded-xl shadow-xl"
              />
            </div>
          );
        })}

        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-black/20 bg-black/10 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-black/20 bg-black/10 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next slide"
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className={containerClassName ?? "relative w-full overflow-hidden bg-primary/10 aspect-video sm:aspect-[16/9] md:aspect-[21/9] flex items-center justify-center group"}>
      <div className="absolute inset-0 flex items-center justify-center">
        {images.map((img, idx) => {
          let offset = idx - currentIndex;
          if (offset < -1 && currentIndex === images.length - 1 && idx === 0) offset = 1;
          if (offset > 1 && currentIndex === 0 && idx === images.length - 1) offset = -1;

          const isActive = offset === 0;
          const isAdjacent = Math.abs(offset) === 1;

          if (!isActive && !isAdjacent) return null;

          return (
            <div
              key={idx}
              className="absolute top-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out"
              style={{
                transform: `translateX(${offset * 83}%) scale(${isActive ? 1 : 0.82})`,
                opacity: isActive ? 1 : 0.5,
                zIndex: isActive ? 10 : 1,
                filter: isActive ? 'blur(0px)' : 'blur(5px)',
              }}
            >
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover md:object-contain"
              />
            </div>
          );
        })}
      </div>

      {showControls && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            data-testid="carousel-prev"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-black/20 bg-black/10 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            data-testid="carousel-next"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-black/20 bg-black/10 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </>
      )}
    </div>
  );
}
