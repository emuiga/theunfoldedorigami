"use client";

import { usePathname } from "next/navigation";
import { MusicPlayer } from "./MusicPlayer";

export function MusicPlayerConditional() {
  const pathname = usePathname();
  const show = pathname === "/home" || (!!pathname && pathname.startsWith("/essays/"));
  if (!show) return null;
  return <MusicPlayer />;
}
