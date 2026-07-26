"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "recent");

  // Update local state if URL changes
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setSort(searchParams.get("sort") || "recent");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    
    router.push(`/discover?${params.toString()}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSort(newSort);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    router.push(`/discover?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-end gap-6 border-b-2 border-[#1D2927] pb-4">
      {/* Search Input */}
      <div className="relative w-full md:flex-1">
        <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B] mb-2">
          Search Query
        </label>
        <form onSubmit={handleSearch} className="relative flex items-center">
          <Search className="absolute left-0 h-5 w-5 text-[#1D2927]" />
          <input
            type="text"
            placeholder="Title, creator, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 w-full bg-transparent pl-8 pr-4 font-editorial text-2xl text-[#1D2927] placeholder:text-[#D9D3C7] focus:outline-none placeholder:font-editorial placeholder:italic"
          />
        </form>
      </div>

      {/* Sort Select */}
      <div className="w-full md:w-64">
        <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B] mb-2">
          Sort Order
        </label>
        <div className="relative">
          <select
            value={sort}
            onChange={handleSortChange}
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
  );
}
