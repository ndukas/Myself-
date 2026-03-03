"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const INITIAL_PHOTOS = [
  {
    id: 1,
    order: 0,
    x: "-80px",
    y: "10px",
    rotation: -2,
    zIndex: 50,
    direction: "left" as Direction,
    src: "/IMG_7626.webp",
  },
  {
    id: 2,
    order: 1,
    x: "-40px",
    y: "25px",
    rotation: -1,
    zIndex: 40,
    direction: "left" as Direction,
    src: "/IMG_1447.webp",
  },
  {
    id: 3,
    order: 2,
    x: "0px",
    y: "5px",
    rotation: 2,
    zIndex: 30,
    direction: "right" as Direction,
    src: "/IMG_2031.webp",
  },
  {
    id: 4,
    order: 3,
    x: "40px",
    y: "15px",
    rotation: 1,
    zIndex: 20,
    direction: "right" as Direction,
    src: "/IMG_7443.webp",
  },
  {
    id: 5,
    order: 4,
    x: "80px",
    y: "35px",
    rotation: -3,
    zIndex: 10,
    direction: "left" as Direction,
    src: "/IMG_2428.webp",
  },
];

export const PhotoGallery = ({
  animationDelay = 0.5,
}: {
  animationDelay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Photo positions - horizontal layout with random y offsets
  const [galleryPhotos, setGalleryPhotos] = useState(INITIAL_PHOTOS);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedPhoto(null);
        setGalleryPhotos(INITIAL_PHOTOS);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // First make the container visible with a fade-in
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    // Then start the photo animations after a short delay
    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (animationDelay + 0.4) * 1000
    ); // Add 0.4s for the opacity transition

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  const [photoSize, setPhotoSize] = useState(180);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setPhotoSize(130);
      } else if (window.innerWidth < 768) {
        setPhotoSize(150);
      } else {
        setPhotoSize(180);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const shufflePhotos = (clickedId: number) => {
    const isMobile = window.innerWidth < 768;
    const rangeX = isMobile ? 80 : 140;
    const rangeY = isMobile ? 30 : 60;

    setGalleryPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id === clickedId) {
          return {
            ...photo,
            x: "0px",
            y: "0px",
            rotation: 0,
          };
        }
        return {
          ...photo,
          x: `${getRandomNumberInRange(-rangeX, rangeX)}px`,
          y: `${getRandomNumberInRange(-rangeY, rangeY)}px`,
          // Keep the same rotation as defined in INITIAL_PHOTOS
          rotation: INITIAL_PHOTOS.find(p => p.id === photo.id)?.rotation ?? photo.rotation,
        };
      })
    );
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Animation variants for each photo
  const photoVariants = {
    hidden: () => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    }),
    visible: (custom: { x: any; y: any; order: number; rotation: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: custom.rotation,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15,
      },
    }),
  };

  return (
    <div className="mt-4 relative rounded-2xl overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 max-md:hidden top-[40px] md:top-[50px] -z-10 h-[120px] md:h-[150px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#a8a29e_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e_1px,transparent_1px)]"></div>
      <h3 className="z-20 mx-auto max-w-2xl justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text py-2 text-center text-xl md:text-2xl text-transparent dark:bg-gradient-to-r dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 dark:bg-clip-text md:text-4xl">
        Welcome to My <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"> Stories</span>
      </h3>
      <div className="relative mb-6 h-[220px] md:h-[280px] w-full items-center justify-center lg:flex">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div
              className="relative"
              style={{ width: photoSize, height: photoSize }}
            >
              {[...galleryPhotos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0"
                  style={{ zIndex: photo.zIndex }}
                  variants={photoVariants}
                  animate={isLoaded ? "visible" : "hidden"}
                  custom={{
                    x: photo.x,
                    y: photo.y,
                    order: photo.order,
                    rotation: photo.rotation,
                  }}
                >
                  <Photo
                    width={photoSize}
                    height={photoSize}
                    src={photo.src}
                    alt="Story photo"
                    direction={photo.direction}
                    rotation={photo.rotation}
                    onClick={() => {
                      setSelectedPhoto(photo.src);
                      shufflePhotos(photo.id);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-transparent p-2 pointer-events-none rounded-2xl overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full flex items-center justify-center p-4 pointer-events-auto"
            >
              <img
                key={selectedPhoto}
                src={selectedPhoto}
                alt="Enlarged story photo"
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10 cursor-zoom-out"
                onClick={() => {
                  setSelectedPhoto(null);
                  setGalleryPhotos(INITIAL_PHOTOS);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function getRandomNumberInRange(min: number, max: number): number {
  if (min >= max) {
    throw new Error("Min value should be less than max value");
  }
  return Math.random() * (max - min) + min;
}

type Direction = "left" | "right";

export const Photo = ({
  src,
  alt,
  className,
  direction,
  width,
  height,
  rotation: propRotation,
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  width: number;
  height: number;
  rotation?: number;
  onClick?: () => void;
}) => {
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  function handleMouse(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const resetMouse = () => {
    x.set(200);
    y.set(200);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{
        scale: 1.1,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 9999,
      }}
      initial={{ rotate: 0 }}
      animate={{ rotate: propRotation ?? 0 }}
      style={{
        width,
        height,
        perspective: 400,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-pointer"
      )}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-sm">
        <motion.img
          className={cn("rounded-2xl md:rounded-3xl object-cover w-full h-full")}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
    </motion.div>
  );
};
