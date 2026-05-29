import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselProps {
  images: string[];
  autoAdvance?: boolean;
  interval?: number;
  showControls?: boolean;
}

export function Carousel({ 
  images, 
  autoAdvance = false, 
  interval = 3000,
  showControls = false
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

  return (
    <div className="relative w-full overflow-hidden bg-primary/20 rounded-xl aspect-video sm:aspect-[16/9] md:aspect-[21/9] flex items-center justify-center group">
      <div className="absolute inset-0 flex items-center justify-center">
        {images.map((img, idx) => {
          // Calculate relative position (-1, 0, 1) to determine blur and scale
          const isCurrent = idx === currentIndex;
          let offset = idx - currentIndex;
          // Handle wrap-around
          if (offset < -1 && currentIndex === images.length - 1 && idx === 0) offset = 1;
          if (offset > 1 && currentIndex === 0 && idx === images.length - 1) offset = -1;

          const isActive = offset === 0;
          const isAdjacent = Math.abs(offset) === 1;
          
          if (!isActive && !isAdjacent) return null; // hide distant slides to save DOM

          return (
            <div
              key={idx}
              className={`absolute top-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out`}
              style={{
                transform: `translateX(${offset * 100}%) scale(${isActive ? 1 : 0.85})`,
                opacity: isActive ? 1 : 0.4,
                zIndex: isActive ? 10 : 1,
                filter: isActive ? 'blur(0px)' : 'blur(8px)',
              }}
            >
              <img 
                src={img} 
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover md:object-contain rounded-xl shadow-xl"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-black/20 bg-black/10 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
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
