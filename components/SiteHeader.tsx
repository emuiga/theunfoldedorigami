"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function SiteHeader() {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <Link
          href="/"
          className="text-xl md:text-2xl font-light tracking-wide text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] uppercase transition-colors"
        >
          The Unfolded Origami
        </Link>
      </motion.div>
    </div>
  );
}

