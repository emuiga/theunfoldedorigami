"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function PageHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50">
      <div className="max-w-full mx-auto px-6 py-8 flex items-center justify-between relative">
        {/* Left: Random Essay, Words, and Tech - Desktop only */}
        <div className="hidden md:flex gap-12 items-start">
          <Link
            href="/random"
            className={`text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase relative group ${
              pathname === "/random" || pathname?.startsWith("/random") ? "font-bold" : ""
            }`}
            title="random essay"
          >
            ???????
            <span className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-xs text-[var(--color-accent-1)] bg-black/90 px-2 py-1 rounded z-50">
              random essay
            </span>
          </Link>
          <Link
            href="/words"
            className={`text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase relative group ${
              pathname === "/words" || pathname?.startsWith("/words") ? "font-bold" : ""
            }`}
            title="all essays"
          >
            words
            <span className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-xs text-[var(--color-accent-1)] bg-black/90 px-2 py-1 rounded z-50">
              all essays
            </span>
          </Link>
          <Link
            href="/tech"
            className={`text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase relative group ${
              pathname === "/tech" || pathname?.startsWith("/tech") ? "font-bold" : ""
            }`}
            title="tech essays"
          >
            tech
            <span className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-xs text-[var(--color-accent-1)] bg-black/90 px-2 py-1 rounded z-50">
              tech essays
            </span>
          </Link>
        </div>

        {/* Mobile: Site Title - Left side, one line */}
        <Link
          href="/"
          className="md:hidden text-lg font-medium tracking-wide text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] uppercase transition-colors whitespace-nowrap"
        >
          The Unfolded Origami
        </Link>

        {/* Center: Site Title - Desktop only */}
        <Link
          href="/"
          className="hidden md:block text-xl font-medium tracking-wide text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] uppercase transition-colors absolute left-1/2 transform -translate-x-1/2"
        >
          The Unfolded Origami
        </Link>

        {/* Right: Stay in the fold - Desktop only */}
        <Link
          href="/stay-in-the-fold"
          className="hidden md:block text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase"
        >
          stay in the fold
        </Link>

        {/* Mobile Hamburger Button - Right side */}
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

        {/* Mobile Menu - Contained dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-[#333] z-50">
            <nav className="flex flex-col gap-6 px-6 py-6">
              <Link
                href="/random"
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase ${
                  pathname === "/random" || pathname?.startsWith("/random") ? "font-bold" : ""
                }`}
                title="random essay"
              >
                ???????
              </Link>
              <Link
                href="/words"
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase ${
                  pathname === "/words" || pathname?.startsWith("/words") ? "font-bold" : ""
                }`}
                title="all essays"
              >
                words
              </Link>
              <Link
                href="/tech"
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase ${
                  pathname === "/tech" || pathname?.startsWith("/tech") ? "font-bold" : ""
                }`}
                title="tech essays"
              >
                tech
              </Link>
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
      </div>
    </header>
  );
}
