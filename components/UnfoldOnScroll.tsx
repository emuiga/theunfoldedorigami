"use client";

import { ReactNode, useEffect, useState } from "react";

interface UnfoldOnScrollProps {
  children: ReactNode;
}

export function UnfoldOnScroll({ children }: UnfoldOnScrollProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = Math.min(
        scrollTop / (documentHeight - windowHeight),
        1
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate spacing and opacity based on scroll progress
  // Line height gradually increases as you scroll, creating an "unfolding" effect
  const lineHeight = 1.7 + scrollProgress * 0.4; // Increases from 1.7 to 2.1
  // Crease lines fade out as content unfolds
  const creaseOpacity = Math.max(0, 0.08 - scrollProgress * 0.08);

  return (
    <div
      style={{
        lineHeight: `${lineHeight}`,
        backgroundImage: creaseOpacity > 0
          ? `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 24px,
              rgba(139, 115, 85, ${creaseOpacity}) 24px,
              rgba(139, 115, 85, ${creaseOpacity}) 25px
            )`
          : "none",
        transition: "line-height 0.5s ease-out, background-image 0.5s ease-out",
      }}
    >
      {children}
    </div>
  );
}

