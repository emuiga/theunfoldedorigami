"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PaperContainerProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function PaperContainer({
  children,
  className = "",
  hover = true,
}: PaperContainerProps) {
  return (
    <motion.div
      className={`
        transition-all duration-300
        ${className}
      `}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

