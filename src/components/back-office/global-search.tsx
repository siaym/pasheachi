"use client";

import { useState, useEffect, useTransition } from "react";
import { Search, Megaphone, Users, Wallet, FileText, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { globalSearchAction } from "@/app/admin/actions";

export function GlobalSearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    campaigns: any[];
    users: any[];
    transactions: any[];
    withdrawals: any[];
  }>({ campaigns: [], users: [], transactions: [], withdrawals: [] });
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ campaigns: [], users: [], transactions: [], withdrawals: [] });
      return;
    }

    startTransition(async () => {
      const data = await globalSearchAction(query);
      setResults(data);
    });
  }, [query]);

  if (!isOpen) return null;

  const totalCount =
    results.campaigns.length +
    results.users.length +
    results.transactions.length +
    results.withdrawals.length;

  return (
    <div className="fixed inset-0 z-50 bg-[#1D2927]/70 backdrop-blur-sm flex items-start justify-center pt-24 p-4">
      <div className="bg-[#FAF8F3] border-2 border-[#1D2927] shadow-paper max-w-2xl w-full overflow-hidden flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-[#D9D3C7] flex items-center gap-3 bg-[#F7F4ED]">
          <Search className="h-5 w-5 text-[#8C7A5B]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search campaigns, users, creators, transactions, withdrawals..."
            className="flex-1 bg-transparent border-none focus:outline-none font-editorial italic text-lg text-[#1D2927] placeholder:text-[#8C7A5B]"
          />
          {isPending && <span className="font-mono text-[10px] text-[#A84D2A]">Searching...</span>}
          <button onClick={onClose} className="p-1 hover:bg-[#EAE5DB] text-[#53605C]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#D9D3C7]">
          {query.trim() && totalCount === 0 && !isPending && (
            <div className="p-8 text-center text-[#8C7A5B] font-mono text-xs">
              No live Back Office records found for "{query}".
            </div>
          )}

          {!query.trim() && (
            <div className="p-8 text-center text-[#8C7A5B] font-mono text-xs">
              Type to search live campaigns, creators, donors, transactions, and withdrawal records...
            </div>
          )}

          {/* Campaigns */}
          {results.campaigns.map((c) => (
            <Link
              key={`c-${c.id}`}
              href={`/admin/campaigns/${c.id}`}
              onClick={onClose}
              className="p-4 flex items-center justify-between hover:bg-[#F7F4ED] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 border border-[#D9D3C7] bg-[#EAE5DB] text-[#1D2927]">
                  <Megaphone className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1D2927]">{c.title}</div>
                  <div className="font-mono text-[10px] uppercase text-[#53605C]">
                    Campaign • Category: {c.category} • Status: {c.status}
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#A84D2A] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}

          {/* Users */}
          {results.users.map((u) => (
            <Link
              key={`u-${u.id}`}
              href={`/admin/users/${u.id}`}
              onClick={onClose}
              className="p-4 flex items-center justify-between hover:bg-[#F7F4ED] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 border border-[#D9D3C7] bg-[#EAE5DB] text-[#355C52]">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1D2927]">{u.name} (@{u.username})</div>
                  <div className="font-mono text-[10px] uppercase text-[#53605C]">
                    User • Role: {u.role} • Status: {u.status || "active"}
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#355C52] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}

          {/* Transactions */}
          {results.transactions.map((t) => (
            <Link
              key={`t-${t.id}`}
              href={`/admin/transactions/${t.id}`}
              onClick={onClose}
              className="p-4 flex items-center justify-between hover:bg-[#F7F4ED] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 border border-[#D9D3C7] bg-[#EAE5DB] text-[#A84D2A]">
                  <Wallet className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1D2927]">
                    ৳{t.amount} ({t.method}) - Donor: {t.donorName}
                  </div>
                  <div className="font-mono text-[10px] uppercase text-[#53605C]">
                    Transaction ID: {t.id} • Status: {t.status}
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#A84D2A] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}

          {/* Withdrawals */}
          {results.withdrawals.map((w) => (
            <Link
              key={`w-${w.id}`}
              href="/admin?workspace=FINANCE"
              onClick={onClose}
              className="p-4 flex items-center justify-between hover:bg-[#F7F4ED] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 border border-[#D9D3C7] bg-[#EAE5DB] text-[#1D2927]">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1D2927]">
                    Withdrawal Request: ৳{w.amount} ({w.method})
                  </div>
                  <div className="font-mono text-[10px] uppercase text-[#53605C]">
                    Details: {w.accountDetails} • Status: {w.status}
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#1D2927] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#EAE5DB] border-t border-[#D9D3C7] flex justify-between items-center text-[10px] font-mono text-[#53605C]">
          <span>Live Database Query Engine</span>
          <span>Press ESC or Ctrl+K to close</span>
        </div>
      </div>
    </div>
  );
}
