"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Plus, Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Explore", href: "/discover" },
    { label: "Categories", href: "/#categories" },
    { label: "Stories", href: "/#featured-stories" },
    { label: "Impact", href: "/#impact" },
    { label: "How It Works", href: "/#how-it-works" },
  ];

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6">
      {/* Floating Centered Paper Card Container */}
      <div
        className={`mx-auto max-w-6xl transition-all duration-300 rounded-full border border-[#D9D3C7] bg-[#FAF7F0]/90 backdrop-blur-md px-4 sm:px-6 py-2.5 shadow-lg shadow-[#1D2927]/5 dark:border-slate-800 dark:bg-slate-900/90 ${
          scrolled ? "shadow-xl border-[#9B9488]" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Logo />

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#1D2927] dark:text-[#F7F4ED]">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`ink-underline transition-colors ${
                    active ? "text-[#A84D2A] font-bold" : "hover:text-[#A84D2A]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/search"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#1D2927] hover:bg-[#EAE5DB] transition-colors dark:text-white"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Link>

            <Link href="/login" className="hidden sm:inline-block">
              <Button size="sm" variant="ghost" className="font-semibold text-xs">
                Sign In
              </Button>
            </Link>

            <Link href="/create">
              <Button size="sm" variant="accent" className="font-bold text-xs gap-1.5 shadow-sm">
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Start Campaign</span>
                <span className="sm:hidden">Create</span>
              </Button>
            </Link>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full text-[#1D2927] hover:bg-[#EAE5DB] dark:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#D9D3C7] mt-3 pt-3 pb-2 space-y-2 text-center dark:border-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-[#1D2927] hover:text-[#A84D2A] dark:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex justify-center gap-3">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" variant="secondary" className="w-full font-semibold">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
