"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface OrigamiFoldProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  foldAngle?: number;
}

export function OrigamiFold({
  children,
  delay = 0,
  duration = 0.8,
  foldAngle = 15,
}: OrigamiFoldProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        rotateX: -foldAngle,
        transformPerspective: 1000,
      }}
      animate={{
        opacity: 1,
        rotateX: 0,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}

