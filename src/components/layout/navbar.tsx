"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/shared/logo";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const { scrollY } = useScroll();
  
  // Morphing values based on scroll
  // Width shrinks slightly on desktop to become a compact pill
  const navWidth = useTransform(scrollY, [0, 150], ["100%", "90%"]);
  const navMaxWidth = useTransform(scrollY, [0, 150], ["1280px", "900px"]);
  // Margin top gives it the floating effect
  const navY = useTransform(scrollY, [0, 150], [16, 24]);
  // Border radius goes from small/medium to fully rounded pill
  const navRadius = useTransform(scrollY, [0, 150], ["12px", "9999px"]);
  // Background becomes slightly more opaque
  const navBg = useTransform(scrollY, [0, 150], ["rgba(250, 247, 240, 0.7)", "rgba(250, 247, 240, 0.95)"]);
  const navBorderColor = useTransform(scrollY, [0, 150], ["rgba(217, 211, 199, 0.5)", "rgba(29, 41, 39, 1)"]);
  // Shadow deepens
  const navShadow = useTransform(
    scrollY, 
    [0, 150], 
    [
      "0 4px 20px -5px rgba(29, 41, 39, 0.05), 0 2px 5px -2px rgba(29, 41, 39, 0.02)", 
      "0 24px 48px -12px rgba(29, 41, 39, 0.15), 0 8px 16px -6px rgba(29, 41, 39, 0.08)"
    ]
  );
  const navBackdropBlur = useTransform(scrollY, [0, 150], ["blur(8px)", "blur(16px)"]);
  // Padding shrinks
  const navPaddingY = useTransform(scrollY, [0, 150], ["16px", "10px"]);
  const navPaddingX = useTransform(scrollY, [0, 150], ["32px", "20px"]);

  const navLinks = [
    { label: "Explore", href: "/discover" },
    { label: "Categories", href: "/#categories" },
    { label: "Stories", href: "/#featured-stories" },
    { label: "Impact", href: "/#impact" },
    { label: "How It Works", href: "/#how-it-works" },
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      style={{ y: navY }}
    >
      <motion.div
        className="flex flex-col w-full pointer-events-auto origin-top"
        style={{ 
          width: navWidth,
          maxWidth: navMaxWidth,
        }}
      >
        <motion.div
          className="flex items-center justify-between"
          style={{
            paddingTop: navPaddingY,
            paddingBottom: navPaddingY,
            paddingLeft: navPaddingX,
            paddingRight: navPaddingX,
            backgroundColor: navBg,
            borderColor: navBorderColor,
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: navRadius,
            boxShadow: navShadow,
            backdropFilter: navBackdropBlur,
            WebkitBackdropFilter: navBackdropBlur,
          }}
        >
          {/* Brand Logo */}
          <Logo />

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href || (pathname === '/' && link.href.includes('#') && false); // Simplified active state for hash links
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-xs font-bold uppercase tracking-widest transition-colors ${
                    active ? "text-[#A84D2A]" : "text-[#1D2927] hover:text-[#A84D2A]"
                  }`}
                >
                  {/* Subtle paper lift on hover */}
                  <motion.span 
                    className="inline-block relative z-10"
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {link.label}
                  </motion.span>
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#A84D2A] transition-all duration-300 origin-left ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  {/* Hover pseudo element handled by CSS class for link if needed, but we use a distinct line */}
                  <div className="ink-underline absolute inset-0 w-full h-full pointer-events-none"></div>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/search"
              className="group hidden sm:flex items-center justify-center text-[#1D2927]"
              aria-label="Search"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
            </Link>

            <Link href="/login" className="hidden sm:inline-block text-xs font-bold uppercase tracking-widest text-[#1D2927] hover:text-[#A84D2A] transition-colors relative">
              <span className="ink-underline">Sign In</span>
            </Link>

            <Link 
              href="/create"
              className="group relative hidden sm:flex items-center justify-center bg-[#A84D2A] text-[#F7F4ED] h-10 px-5 sm:px-6 rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all hover:bg-[#843B20] hover:shadow-paper-hover active:scale-95"
            >
              <span>Start a Campaign</span>
            </Link>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center text-[#1D2927]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 10, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden rounded-2xl border border-[#1D2927] bg-[#FAF8F3]/85 backdrop-blur-3xl p-6 shadow-paper mt-2"
            >
              <nav className="flex flex-col gap-6 text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-bold uppercase tracking-widest text-[#1D2927] hover:text-[#A84D2A]"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-6 mt-2 border-t border-[#D9D3C7] flex flex-col gap-4">
                  <Link href="/create" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-[#F7F4ED] bg-[#A84D2A] py-3 rounded-full flex items-center justify-center">
                    Start a Campaign
                  </Link>
                  <Link href="/search" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-[#1D2927] flex items-center justify-center gap-2">
                    <Search className="h-4 w-4" /> Search
                  </Link>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-[#1D2927]">
                    Sign In
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

