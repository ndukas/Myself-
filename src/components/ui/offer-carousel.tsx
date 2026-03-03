import * as React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes
import { LazyImage } from "./lazy-image";

// Define the type for a single offer item
export interface Offer {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  title: string;
  description: string;
  href: string;
}

// Props for the OfferCard component
interface OfferCardProps {
  offer: Offer;
}

// The individual card component with hover animation
const OfferCard = React.forwardRef<HTMLAnchorElement, OfferCardProps>(({ offer }, ref) => (
  <motion.a
    ref={ref}
    href={offer.href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative flex-shrink-0 w-[280px] h-[320px] rounded-2xl overflow-hidden group snap-start block bg-card"
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ perspective: "1000px" }}
    draggable={false}
  >
    {/* Background Image */}
    <div className="absolute inset-0 w-full h-[70%] overflow-hidden">
      <LazyImage
        src={offer.imageSrc}
        alt={offer.imageAlt}
        className="group-hover:scale-110"
        containerClassName="h-full w-full"
      />
    </div>
    {/* Card Content */}
    <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-slate-900/95 backdrop-blur-md p-3 flex flex-col justify-center items-center text-center border-t border-white/10">
      <div className="space-y-1 w-full">
        {/* Tag */}
        <div className="flex items-center justify-center mb-2">
          <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-medium text-slate-400 uppercase tracking-widest">
            {offer.tag}
          </span>
        </div>
        {/* Title & Description */}
        <h3 className="text-lg font-bold text-white leading-tight tracking-tight line-clamp-1">{offer.title}</h3>
        <p className="text-xs text-slate-300 line-clamp-1 leading-snug">{offer.description}</p>
      </div>
    </div>
  </motion.a>
));
OfferCard.displayName = "OfferCard";

// Props for the OfferCarousel component
export interface OfferCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  offers: Offer[];
}

// The main carousel component with scroll functionality
const OfferCarousel = React.forwardRef<HTMLDivElement, OfferCarouselProps>(
  ({ offers, className, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = current.clientWidth * 0.8; // Scroll by 80% of the container width
        current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    };

    return (
      <div ref={ref} className={cn("relative w-full group", className)} {...props}>
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 -translate-y-1/2 left-0 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white disabled:opacity-0 shadow-lg"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 -translate-y-1/2 right-0 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white disabled:opacity-0 shadow-lg"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  }
);
OfferCarousel.displayName = "OfferCarousel";

export { OfferCarousel, OfferCard };
