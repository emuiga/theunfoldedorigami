"use client";

import { useState, useEffect, useRef } from "react";

function getTime(): string {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

// Array.from handles multi-byte emoji correctly
function charSlice(str: string, end: number) {
  return Array.from(str).slice(0, end).join("");
}

export function TypingCycler() {
  const [display, setDisplay] = useState("");
  const tempRef = useRef(24);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-1.2921&longitude=36.8219&current=temperature_2m"
    )
      .then((r) => r.json())
      .then((d) => { tempRef.current = Math.round(d.current.temperature_2m); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let alive = true;
    const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

    async function loop() {
      // Each sequence: the icon emoji IS the first character(s) to be typed
      while (alive) {
        const sequences = [
          `📍 Nairobi, Kenya  ·  ${getTime()}  ·  ${tempRef.current}°C`,
          `♪  I Need A Dollar — Aloe Black`,
        ];

        for (const text of sequences) {
          if (!alive) return;
          const chars = Array.from(text);

          // Type forward
          for (let j = 1; j <= chars.length && alive; j++) {
            setDisplay(charSlice(text, j));
            await sleep(48);
          }
          await sleep(2600);

          // Delete backward
          for (let j = chars.length - 1; j >= 0 && alive; j--) {
            setDisplay(charSlice(text, j));
            await sleep(28);
          }
          await sleep(380);
        }
      }
    }

    loop();
    return () => { alive = false; };
  }, []);

  return (
    <span
      className="inline-flex items-center"
      style={{
        fontFamily: "var(--font-mulish), Mulish, sans-serif",
        fontSize: "0.82rem",
        letterSpacing: "0.05em",
         color: "rgb(245,245,220)",
        minHeight: "1.2em",
        minWidth: "1px",
      }}
    >
      {display || "\u00A0"}
    </span>
  );
}
