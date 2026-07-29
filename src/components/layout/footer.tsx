"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-[#D9D3C7] bg-[#1D2927] text-[#FAF8F3] py-16 dark:border-slate-800">
      <Container variant="wide">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#2F3E3B]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              PasheAchi (পাশে আছি) is a handcrafted crowdfunding platform where people stand beside each other for medical care, education, community projects, and personal dreams.
            </p>
            <div className="text-xs font-semibold text-[#A84D2A]">
              100% Manual MFS Verification • Dhaka, Bangladesh
            </div>
          </div>

          {/* Nav Links Column 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A84D2A]">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/discover" className="hover:text-white transition-colors">Explore Causes</Link></li>
              <li><Link href="/#categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/create" className="hover:text-white transition-colors">Start a Campaign</Link></li>
            </ul>
          </div>

          {/* Nav Links Column 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A84D2A]">Community</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/trust" className="hover:text-white transition-colors">Trust & Security</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/admin/bulk-checker" className="hover:text-white transition-colors">Bulk Checker</Link></li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A84D2A]">Support</h4>
            <p className="text-xs text-slate-300">
              Need assistance launching a campaign or verifying a transaction?
            </p>
            <a href="mailto:support@pasheachi.bro.bd" className="text-xs font-bold text-[#FAF8F3] hover:underline">
              support@pasheachi.bro.bd
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} PasheAchi (পাশে আছি). Handcrafted with care in Bangladesh.
          </div>
          <div className="flex gap-6">
            <Link href="/trust" className="hover:text-white">Privacy Policy</Link>
            <Link href="/trust" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
