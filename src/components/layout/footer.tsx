"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <Container variant="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              PasheAchi is a platform where anyone can receive financial support.
              Support creators, students, emergency treatments, community projects, and personal dreams.
            </p>
            <p className="text-xs font-semibold text-[#10B981]">
              "পাশে আছি" — I'm Beside You.
            </p>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/discover" className="hover:text-white transition-colors">Discover Campaigns</Link></li>
              <li><Link href="/#categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/create" className="hover:text-white transition-colors">Create Campaign</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/trust" className="hover:text-white transition-colors">Trust & Safety</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">Stay Connected</h4>
            <p className="text-xs text-slate-400">
              Subscribe for story updates and community impact reports.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full h-10 rounded-xl bg-slate-900 border border-slate-800 px-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#10B981]"
              />
              <Button size="sm" className="w-full font-bold">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 PasheAchi. Made with ♥ in Bangladesh.</p>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-slate-300">🇧🇩 বাংলা</span>
            <span>•</span>
            <span className="cursor-pointer font-bold text-[#10B981]">🇬🇧 English</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
