"use client";

import { useState } from "react";
import Image from "next/image";

const AUDIO_SRC = "/Ask%20Me%20Why%20-%20Mother's%20Thoughts%20%20(OST).mp3";

// Module-level singleton — survives React remounts and Next.js navigation
let _audio: HTMLAudioElement | null = null;
function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!_audio) {
    _audio = new Audio(AUDIO_SRC);
    _audio.loop = true;
  }
  return _audio;
}

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = getAudio();
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying((p) => !p);
  };

  // Orange glow — brighter + faster when playing
  const glowColor = playing
    ? "rgba(255,103,25,0.90)"
    : "rgba(255,103,25,0.50)";
  const spinDuration = playing ? "1.8s" : "3.2s";

  return (
    <>
      <style>{`
        @keyframes spin-pill {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      {/* Outer fixed wrapper — no overflow so backdrop-filter works freely */}
      <div className="fixed top-[68px] right-5 z-[60]">

        {/* Snake glow ring — clipped to pill shape, sits behind the pill */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "-1px",
            borderRadius: "9999px",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {/* The spinning conic-gradient dot */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "400px",
              height: "400px",
              background: `conic-gradient(from 0deg, transparent 0%, ${glowColor} 6%, transparent 14%)`,
              animation: `spin-pill ${spinDuration} linear infinite`,
            }}
          />
        </div>

        {/* Pill — sits on top; its dark bg covers the ring interior */}
        <div
          style={{
            position: "relative",
            backdropFilter: "blur(10px)",
            background: "rgba(4,47,46,0.88)",
            borderRadius: "9999px",
            padding: "7px 14px 7px 10px",
          }}
        >
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {/* Musical note icon */}
            <Image
              src="/musical-note.png"
              alt=""
              width={12}
              height={12}
              style={{
                filter: playing
                  ? "invert(55%) sepia(80%) saturate(600%) hue-rotate(340deg) brightness(110%)"
                  : "invert(1)",
                opacity: playing ? 1 : 0.55,
                transition: "opacity 0.2s, filter 0.2s",
                flexShrink: 0,
              }}
            />

            {/* Label */}
            <span
              style={{
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: playing ? "rgb(255,103,25)" : "rgba(227,237,237,0.70)",
                transition: "color 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {playing ? "now playing" : "play this track as you read"}
            </span>

            {/* Play / pause button */}
            <span
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                border: `1px solid ${playing ? "rgba(255,103,25,0.7)" : "rgba(227,237,237,0.25)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.4rem",
                color: playing ? "rgb(255,103,25)" : "rgba(227,237,237,0.55)",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              {playing ? "⏸" : "▶"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
