"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, PlusCircle } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass-nav shadow-sm" : "bg-transparent"
      }`}
    >
      <Container variant="wide">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-[#10B981] transition-colors dark:text-slate-200 dark:hover:text-[#10B981]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link href="/create">
              <Button size="md" className="font-bold gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Start Campaign</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 bg-white/95 p-6 backdrop-blur-xl dark:bg-slate-950/95 md:hidden flex flex-col justify-between">
          <div className="space-y-6">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-slate-900 dark:text-white hover:text-[#10B981]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <Link href="/create" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button size="lg" className="w-full font-bold">
                Start Campaign
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
