"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function OrigamiDuck() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-64 h-64 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.svg
        width="256"
        height="256"
        viewBox="0 0 256 256"
        className="relative z-10"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          y: isHovered ? -5 : 0,
        }}
        transition={{
          duration: 2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {/* Origami Duck - More realistic geometric representation */}
        {/* Body (main triangle/base) */}
        <motion.path
          d="M128 200 L80 140 L176 140 Z"
          fill="#FFD93D"
          stroke="#FFA07A"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Head (unfolding upward) */}
        <motion.g
          initial={{ rotate: -90, scale: 0, transformOrigin: "128px 140px" }}
          animate={{ 
            rotate: 0, 
            scale: 1,
            y: isHovered ? -3 : 0,
          }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <path
            d="M128 140 L100 100 L128 120 L156 100 Z"
            fill="#FF6B9D"
            stroke="#C44569"
            strokeWidth="2"
          />
        </motion.g>

        {/* Beak (unfolding from front) */}
        <motion.g
          initial={{ rotate: 45, scale: 0, x: 128, y: 110 }}
          animate={{ 
            rotate: 0, 
            scale: 1, 
            x: isHovered ? 2 : 0, 
            y: 0,
          }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <path
            d="M128 110 L148 100 L128 105 Z"
            fill="#FFA07A"
            stroke="#FF6B9D"
            strokeWidth="1.5"
          />
        </motion.g>

        {/* Wing (left, unfolding outward) */}
        <motion.g
          initial={{ rotate: 90, scale: 0, x: 80, y: 140 }}
          animate={{ 
            rotate: 0, 
            scale: 1, 
            x: 0, 
            y: 0,
            rotate: isHovered ? -5 : 0,
          }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <path
            d="M80 140 L60 160 L70 150 L80 160 Z"
            fill="#67C090"
            stroke="#822659"
            strokeWidth="2"
          />
        </motion.g>

        {/* Wing (right, unfolding outward) */}
        <motion.g
          initial={{ rotate: -90, scale: 0, x: 176, y: 140 }}
          animate={{ 
            rotate: 0, 
            scale: 1, 
            x: 0, 
            y: 0,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <path
            d="M176 140 L196 160 L186 150 L176 160 Z"
            fill="#67C090"
            stroke="#822659"
            strokeWidth="2"
          />
        </motion.g>

        {/* Tail (unfolding backward) */}
        <motion.g
          initial={{ rotate: 180, scale: 0, x: 128, y: 200 }}
          animate={{ 
            rotate: 0, 
            scale: 1, 
            x: 0, 
            y: 0,
            y: isHovered ? 3 : 0,
          }}
          transition={{ duration: 1, delay: 2 }}
        >
          <path
            d="M128 200 L120 220 L128 215 L136 220 Z"
            fill="#AA96DA"
            stroke="#95E1D3"
            strokeWidth="2"
          />
        </motion.g>

        {/* Eye - appears last */}
        <motion.circle
          cx="120"
          cy="105"
          r="3"
          fill="#000"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2.5 }}
        />

        {/* Fold lines for origami effect */}
        <motion.line
          x1="128"
          y1="140"
          x2="128"
          y2="200"
          stroke="#FFA07A"
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        />
        <motion.line
          x1="80"
          y1="140"
          x2="128"
          y2="200"
          stroke="#FFA07A"
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 2.3 }}
        />
        <motion.line
          x1="176"
          y1="140"
          x2="128"
          y2="200"
          stroke="#FFA07A"
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        />
      </motion.svg>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-[#FFD93D]/20 via-transparent to-transparent rounded-full blur-2xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </div>
  );
}

