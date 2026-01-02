"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const categories = [
  { name: "origami", href: "/origami", label: "origami" },
  { name: "truth", href: "/truth", label: "truth" },
  { name: "coding", href: "/coding", label: "coding" },
  { name: "random", href: "/random", label: "?????" },
  { name: "thoughts", href: "/thoughts", label: "thoughts" },
];

export function PageHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50">
      <div className="max-w-full mx-auto px-6 py-8 flex items-center justify-between">
        {/* Left: Categories - Desktop: three columns, Mobile: Hamburger */}
        <div className="hidden md:flex gap-12 items-start">
          {/* Column 1: 2 items */}
          <div className="flex flex-col gap-3">
            <Link
              href="/origami"
              className={`text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase ${
                pathname === "/origami" || pathname?.startsWith("/origami") ? "font-bold" : ""
              }`}
            >
              origami
            </Link>
            <Link
              href="/truth"
              className={`text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase ${
                pathname === "/truth" || pathname?.startsWith("/truth") ? "font-bold" : ""
              }`}
            >
              truth
            </Link>
          </div>
          
          {/* Column 2: 2 items */}
          <div className="flex flex-col gap-3">
            <Link
              href="/coding"
              className={`text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase ${
                pathname === "/coding" || pathname?.startsWith("/coding") ? "font-bold" : ""
              }`}
            >
              coding
            </Link>
            <Link
              href="/thoughts"
              className={`text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase ${
                pathname === "/thoughts" || pathname?.startsWith("/thoughts") ? "font-bold" : ""
              }`}
            >
              thoughts
            </Link>
          </div>
          
          {/* Column 3: 1 item */}
          <div className="flex flex-col gap-3">
            <Link
              href="/random"
              className={`text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase ${
                pathname === "/random" || pathname?.startsWith("/random") ? "font-bold" : ""
              }`}
            >
              ???????
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-6 h-6 z-50 relative"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-full h-0.5 bg-[var(--color-accent-1)] transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-full h-0.5 bg-[var(--color-accent-1)] transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-full h-0.5 bg-[var(--color-accent-1)] transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/95 z-40 pt-24 px-6"
            onClick={() => setIsMenuOpen(false)}
          >
            <nav className="flex flex-col gap-6">
              {categories.map((category) => {
                const isActive =
                  pathname === category.href ||
                  (category.href !== "/" && pathname?.startsWith(category.href));
                return (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-xl font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase ${
                      isActive ? "font-bold" : ""
                    }`}
                  >
                    {category.label}
                  </Link>
                );
              })}
              <Link
                href="/stay-in-the-fold"
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase mt-4 pt-4 border-t border-[#333]"
              >
                stay in the fold
              </Link>
            </nav>
          </div>
        )}

        {/* Center: Site Title - Always visible */}
        <Link
          href="/"
          className="text-lg md:text-xl font-medium tracking-wide text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] uppercase transition-colors absolute left-1/2 transform -translate-x-1/2"
        >
          The Unfolded Origami
        </Link>

        {/* Right: Stay in the fold - Desktop only, far right */}
        <Link
          href="/stay-in-the-fold"
          className="hidden md:block text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase"
        >
          stay in the fold
        </Link>

        {/* Mobile: Placeholder to maintain spacing */}
        <div className="md:hidden w-6" />
      </div>
    </header>
  );
}
