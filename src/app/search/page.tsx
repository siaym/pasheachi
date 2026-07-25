"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MOCK_CAMPAIGNS, MOCK_USERS } from "@/data/mock";
import { CATEGORIES } from "@/lib/constants";
import { Search, User, Rocket, Folder, Hash } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const matchingCampaigns = query
    ? MOCK_CAMPAIGNS.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchingUsers = query
    ? Object.values(MOCK_USERS).filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.username.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchingCategories = query
    ? CATEGORIES.filter((cat) =>
        cat.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <Container variant="standard">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto space-y-6 mb-12">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white text-center">
            Search PasheAchi
          </h1>

          <div className="relative w-full">
            <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search campaigns, people, categories, or tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 shadow-md placeholder:text-slate-400 focus:border-[#10B981] focus:outline-none focus:ring-4 focus:ring-[#10B981]/15 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Popular:</span>
            {["#surgery", "#medical", "#education", "#dhaka", "#opensource"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag.replace("#", ""))}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold hover:border-[#10B981] hover:text-[#10B981] dark:border-slate-800 dark:bg-slate-900"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        {query ? (
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Campaigns Section */}
            {matchingCampaigns.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-[#10B981]" />
                  <span>Campaigns ({matchingCampaigns.length})</span>
                </h3>
                <div className="space-y-2">
                  {matchingCampaigns.map((c) => (
                    <Link
                      key={c.id}
                      href={`/${c.creator.username}/${c.slug}`}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-[#10B981] transition-all dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {c.title}
                        </h4>
                        <span className="text-xs text-slate-500">
                          by @{c.creator.username} • {c.category}
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-[#10B981]">
                        {formatCurrency(c.raisedAmount)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* People Section */}
            {matchingUsers.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <User className="h-4 w-4 text-[#4F46E5]" />
                  <span>People ({matchingUsers.length})</span>
                </h3>
                <div className="space-y-2">
                  {matchingUsers.map((u) => (
                    <Link
                      key={u.id}
                      href={`/${u.username}`}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-[#10B981] transition-all dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar src={u.avatarUrl} name={u.name} size="sm" />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{u.name}</span>
                            {u.verified && <Badge variant="verified" className="px-1 text-[9px]">✓</Badge>}
                          </h4>
                          <span className="text-xs text-slate-500">@{u.username} • {u.location}</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#10B981]">View Profile →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Section */}
            {matchingCategories.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Folder className="h-4 w-4 text-[#F59E0B]" />
                  <span>Categories ({matchingCategories.length})</span>
                </h3>
                <div className="space-y-2">
                  {matchingCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/discover?category=${cat.slug}`}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-[#10B981] transition-all dark:border-slate-800 dark:bg-slate-900"
                    >
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {cat.name}
                      </span>
                      <span className="text-xs text-slate-500">{cat.activeCount} active</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {matchingCampaigns.length === 0 &&
              matchingUsers.length === 0 &&
              matchingCategories.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-sm">
                  No results found for "{query}". Try a different search term.
                </div>
              )}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-sm">
            Type above to search campaigns, people, or categories.
          </div>
        )}
      </Container>
    </div>
  );
}
