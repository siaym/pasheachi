"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { MOCK_CAMPAIGNS } from "@/data/mock";
import { CATEGORIES } from "@/lib/constants";
import { Search, Filter, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DiscoverPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter campaigns
  const filteredCampaigns = MOCK_CAMPAIGNS.filter((campaign) => {
    const matchesCategory =
      selectedCategory === "all" || campaign.category === selectedCategory;
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <Container variant="wide">
        {/* Header */}
        <SectionHeader
          badge="Discover"
          title="Explore All Causes & Dreams"
          subtitle="Discover and back campaigns created by real people across Bangladesh."
        />

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full flex-1">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, creator, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#10B981] focus:outline-none focus:ring-4 focus:ring-[#10B981]/15 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-slate-700 shadow-sm focus:border-[#10B981] focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  <option value="recent">Most Recent</option>
                  <option value="funded">Most Funded</option>
                  <option value="ending">Ending Soon</option>
                  <option value="supporters">Most Supporters</option>
                </select>
                <Filter className="pointer-events-none absolute right-3.5 top-4 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Category Horizontal Scroll Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all ${
                selectedCategory === "all"
                  ? "bg-[#10B981] text-white shadow-md shadow-[#10B981]/25"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-[#10B981] text-white shadow-md shadow-[#10B981]/25"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {cat.name} ({cat.activeCount})
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Showing {filteredCampaigns.length} campaigns</span>
          {(selectedCategory !== "all" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="flex items-center gap-1 text-[#10B981] hover:underline font-bold"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Campaign Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-[#10B981] mb-4">
              <SlidersHorizontal className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              No campaigns found
            </h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm">
              We couldn't find any campaigns matching your current search or category filters.
            </p>
            <Button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              variant="secondary"
              className="mt-6 font-bold"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
