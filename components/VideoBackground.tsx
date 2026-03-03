"use client";

import { useRef, useEffect } from "react";

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.7; // Slow down the video slightly
      video.play().catch((error) => {
        // Autoplay might be blocked, handle gracefully
        console.log("Video autoplay blocked:", error);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "brightness(0.3) contrast(1.1)",
        }}
      >
        <source src="/Background_Video.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-[#0e1a14]/50" />
    </div>
  );
}

