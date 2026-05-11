"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroVideoDialogProps {
  className?: string;
  animationStyle?: "from-center" | "from-top" | "from-bottom" | "from-left" | "from-right";
  videoSrc: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function HeroVideoDialog({
  className,
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  open: controlledOpen,
  onOpenChange,
}: HeroVideoDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : isOpen;
  const setOpen = onOpenChange || setIsOpen;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const getAnimationClass = () => {
    switch (animationStyle) {
      case "from-top":
        return "animate-in slide-in-from-top duration-300";
      case "from-bottom":
        return "animate-in slide-in-from-bottom duration-300";
      case "from-left":
        return "animate-in slide-in-from-left duration-300";
      case "from-right":
        return "animate-in slide-in-from-right duration-300";
      default:
        return "animate-in zoom-in-95 fade-in-0 duration-300";
    }
  };

  return (
    <>
      {thumbnailSrc && (
        <div
          className={cn(
            "relative cursor-pointer overflow-hidden rounded-2xl",
            className
          )}
          onClick={() => setOpen(true)}
        >
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div
            className={cn(
              "relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl",
              getAnimationClass()
            )}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 hover:scale-110"
            >
              <X size={20} />
            </button>

            <div className="relative aspect-video w-full">
              <iframe
                src={videoSrc}
                title="Video player"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}