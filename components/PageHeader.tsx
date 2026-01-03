"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const categories = [
  { name: "origami", href: "/origami", label: "origami", tooltip: "all essays" },
  { name: "faith", href: "/faith", label: "faith", tooltip: "faith & spirituality" },
  { name: "coding", href: "/coding", label: "coding", tooltip: "code & experiments" },
  { name: "random", href: "/random", label: "?????", tooltip: "random essay" },
  { name: "thoughts", href: "/thoughts", label: "thoughts", tooltip: "reflections & musings" },
];

export function PageHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50">
      <div className="max-w-full mx-auto px-6 py-8 flex items-center justify-between relative">
        {/* Left: Categories - Desktop only */}
        <div className="hidden md:flex gap-12 items-start">
          {/* Column 1: 2 items */}
          <div className="flex flex-col gap-3">
            <Link
              href="/origami"
              className={`text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase relative group ${
                pathname === "/origami" || pathname?.startsWith("/origami") ? "font-bold" : ""
              }`}
              title="all essays"
            >
              origami
              <span className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-xs text-[var(--color-accent-1)] bg-black/90 px-2 py-1 rounded z-50">
                all essays
              </span>
            </Link>
            <Link
              href="/faith"
              className={`text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase relative group ${
                pathname === "/faith" || pathname?.startsWith("/faith") ? "font-bold" : ""
              }`}
              title="faith & spirituality"
            >
              faith
              <span className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-xs text-[var(--color-accent-1)] bg-black/90 px-2 py-1 rounded z-50">
                faith & spirituality
              </span>
            </Link>
          </div>
          
          {/* Column 2: 2 items */}
          <div className="flex flex-col gap-3">
            <Link
              href="/coding"
              className={`text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase relative group ${
                pathname === "/coding" || pathname?.startsWith("/coding") ? "font-bold" : ""
              }`}
              title="code & experiments"
            >
              coding
              <span className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-xs text-[var(--color-accent-1)] bg-black/90 px-2 py-1 rounded z-50">
                code & experiments
              </span>
            </Link>
            <Link
              href="/thoughts"
              className={`text-base font-medium text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors lowercase relative group ${
                pathname === "/thoughts" || pathname?.startsWith("/thoughts") ? "font-bold" : ""
              }`}
              title="reflections & musings"
            >
              thoughts
              <span className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-xs text-[var(--color-accent-1)] bg-black/90 px-2 py-1 rounded z-50">
                reflections & musings
              </span>
            </Link>
          </div>
          
          {/* Column 3: 1 item */}
          <div className="flex flex-col gap-3">
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
          </div>
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
                    title={category.tooltip}
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
      </div>
    </header>
  );
}
