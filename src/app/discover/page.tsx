"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { MOCK_CAMPAIGNS } from "@/data/mock";
import { CATEGORIES } from "@/lib/constants";
import { FadeIn, RevealText, PaperLift, InkDivider } from "@/components/ui/motion";
import { Search, Filter, FolderOpen, RotateCcw } from "lucide-react";

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
    <div className="min-h-screen pt-32 pb-20 sm:pb-32 relative">
      <Container variant="wide" className="relative z-10">
        
        {/* Editorial Header */}
        <div className="mb-12 md:mb-16 max-w-4xl">
          <FadeIn>
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#53605C] mb-6">
              THE CATALOG <span className="mx-4 text-[#D9D3C7]">/</span> INDEX OF DREAMS
            </div>
          </FadeIn>
          
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-medium leading-[1.1] text-[#1D2927] mb-6">
            <RevealText>Explore All</RevealText>
            <RevealText>Causes & Dreams</RevealText>
          </h1>
          
          <FadeIn delay={0.2}>
            <p className="text-lg text-[#53605C] max-w-2xl leading-relaxed">
              Discover and back campaigns created by real people across Bangladesh. Every file here represents a human story waiting for someone to stand beside it.
            </p>
          </FadeIn>
        </div>

        {/* Search & Filter Bar (Typed Paper Style) */}
        <FadeIn delay={0.3} className="mb-12">
          <div className="flex flex-col md:flex-row items-end gap-6 border-b-2 border-[#1D2927] pb-4">
            
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B] mb-2">
                Search Query
              </label>
              <div className="relative flex items-center">
                <Search className="absolute left-0 h-5 w-5 text-[#1D2927]" />
                <input
                  type="text"
                  placeholder="Title, creator, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full bg-transparent pl-8 pr-4 font-editorial text-2xl text-[#1D2927] placeholder:text-[#D9D3C7] focus:outline-none placeholder:font-editorial placeholder:italic"
                />
              </div>
            </div>

            {/* Sort Select */}
            <div className="w-full md:w-64">
              <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B] mb-2">
                Sort Order
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-10 w-full appearance-none bg-transparent border border-[#D9D3C7] pl-4 pr-10 font-mono text-xs uppercase tracking-widest text-[#1D2927] focus:outline-none focus:border-[#1D2927] hover:border-[#1D2927] transition-colors cursor-pointer"
                >
                  <option value="recent">Most Recent</option>
                  <option value="funded">Most Funded</option>
                  <option value="ending">Ending Soon</option>
                  <option value="supporters">Most Supporters</option>
                </select>
                <Filter className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-[#1D2927]" />
              </div>
            </div>
          </div>

          {/* Category Filters (Ink-stamped Pills) */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#53605C] mr-2">Filters:</span>
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`h-8 px-4 border transition-all font-mono text-[10px] uppercase tracking-widest ${
                selectedCategory === "all"
                  ? "border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] shadow-ink scale-[0.98]"
                  : "border-[#D9D3C7] bg-transparent text-[#1D2927] hover:border-[#1D2927] hover:bg-[#EAE5DB]"
              }`}
            >
              All Files
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`h-8 px-4 border transition-all font-mono text-[10px] uppercase tracking-widest ${
                  selectedCategory === cat.slug
                    ? "border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] shadow-ink scale-[0.98]"
                    : "border-[#D9D3C7] bg-transparent text-[#1D2927] hover:border-[#1D2927] hover:bg-[#EAE5DB]"
                }`}
              >
                {cat.name} ({cat.activeCount})
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Results Counter */}
        <FadeIn delay={0.4} className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
          <span>Showing {filteredCampaigns.length} records</span>
          {(selectedCategory !== "all" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="flex items-center gap-1 text-[#A84D2A] hover:text-[#1D2927] transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="ink-underline">Reset Filters</span>
            </button>
          )}
        </FadeIn>

        {/* Campaign Grid */}
        <FadeIn delay={0.5}>
          {filteredCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="h-full">
                  <CampaignCard campaign={campaign} />
                </div>
              ))}
            </div>
          ) : (
            /* Tactile Empty State */
            <PaperLift className="flex flex-col items-center justify-center py-24 text-center bg-[#FAF8F3] border border-[#D9D3C7] shadow-sm relative">
              {/* Decorative Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#EAE5DB] opacity-70 rotate-[-1deg] z-10"></div>
              
              <div className="flex h-16 w-16 items-center justify-center border-2 border-dashed border-[#D9D3C7] rounded-full text-[#8C7A5B] mb-6">
                <FolderOpen className="h-8 w-8" />
              </div>
              <h3 className="font-editorial text-3xl font-medium text-[#1D2927] mb-2">
                Folder Empty
              </h3>
              <p className="text-[#53605C] max-w-sm mb-8 font-medium">
                We couldn't find any records matching your current criteria.
              </p>
              
              <p className="font-script text-2xl text-[#A84D2A] -rotate-2">
                Try a different search!
              </p>

              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-8 h-12 px-8 border border-[#1D2927] text-[#1D2927] font-bold text-xs uppercase tracking-widest hover:bg-[#1D2927] hover:text-[#F7F4ED] transition-colors shadow-sm"
              >
                Clear All Filters
              </button>
            </PaperLift>
          )}
        </FadeIn>
      </Container>
    </div>
  );
}
