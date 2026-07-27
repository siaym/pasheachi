"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/shared/logo";

import { User } from "@/types";
import { User as UserIcon, LayoutDashboard, LogOut } from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions";

export function Navbar({ user }: { user?: User | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const navLinks = [
    { label: "Explore", href: "/discover" },
    { label: "Categories", href: "/#categories" },
    { label: "Stories", href: "/#featured-stories" },
    { label: "Impact", href: "/#impact" },
    { label: "How It Works", href: "/#how-it-works" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300">
      <div 
        className={`flex flex-col w-full pointer-events-auto origin-top transition-all duration-300 ease-out ${
          scrolled ? "mt-4 max-w-5xl" : "mt-4 max-w-7xl"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-4 lg:gap-8 transition-all duration-300 ease-out border backdrop-blur-md ${
            scrolled
              ? "py-2.5 px-6 rounded-full border-[#1D2927] bg-[#FAF7F0]/95 shadow-lg"
              : "py-4 px-8 rounded-xl border-[#D9D3C7]/50 bg-[#FAF7F0]/80 shadow-sm"
          }`}
        >
          {/* Brand Logo */}
          <Logo />

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center lg:gap-4 xl:gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-[10px] xl:text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                    active ? "text-[#A84D2A]" : "text-[#1D2927] hover:text-[#A84D2A]"
                  }`}
                >
                  <span className="inline-block relative z-10 transition-transform hover:-translate-y-0.5">
                    {link.label}
                  </span>
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#A84D2A] transition-all duration-300 origin-left ${active ? 'w-full' : 'w-0 hover:w-full'}`}></span>
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

            {user ? (
              <div className="hidden sm:flex items-center gap-4">
                <Link 
                  href="/dashboard" 
                  className="text-xs font-bold uppercase tracking-widest text-[#1D2927] hover:text-[#A84D2A] transition-colors flex items-center gap-1.5"
                >
                  <LayoutDashboard className="h-3.5 w-3.5 text-[#A84D2A]" />
                  <span>Dashboard</span>
                </Link>

                <Link 
                  href={`/${user.username}`} 
                  className="text-xs font-bold uppercase tracking-widest text-[#355C52] hover:text-[#1D2927] transition-colors flex items-center gap-1 bg-[#E5EEE8] px-2.5 py-1 rounded-full"
                >
                  <UserIcon className="h-3 w-3" />
                  <span>@{user.username}</span>
                </Link>
              </div>


            ) : (
              <Link href="/login" className="hidden sm:inline-block text-xs font-bold uppercase tracking-widest text-[#1D2927] hover:text-[#A84D2A] transition-colors relative">
                <span className="ink-underline">Sign In</span>
              </Link>
            )}

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
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 10, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden rounded-2xl border border-[#1D2927] bg-[#FAF8F3]/95 backdrop-blur-[24px] p-6 shadow-[0_24px_48px_-12px_rgba(29,41,39,0.3)] mt-2"
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
                  {user ? (
                    <>
                      <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-[#A84D2A]">
                        Dashboard
                      </Link>
                      <Link href={`/${user.username}`} onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-[#1D2927]">
                        My Profile (@{user.username})
                      </Link>
                    </>
                  ) : (
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-[#1D2927]">
                      Sign In
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}



