"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "origami", href: "/origami", label: "origami" },
  { name: "truth", href: "/truth", label: "truth" },
  { name: "coding", href: "/coding", label: "coding" },
  { name: "random", href: "/random", label: "random" },
  { name: "thoughts", href: "/thoughts", label: "thoughts" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-6 z-50">
      <ul className="flex flex-col gap-2">
        {categories.map((category) => {
          const isActive =
            pathname === category.href ||
            (category.href !== "/" && pathname?.startsWith(category.href));
          return (
            <li key={category.name}>
              <Link
                href={category.href}
                className={`
                  text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] 
                  transition-colors text-sm uppercase tracking-wide
                  ${isActive ? "font-semibold" : "font-normal"}
                `}
              >
                {category.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

