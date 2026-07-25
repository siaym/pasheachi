"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { MOCK_USERS, MOCK_CAMPAIGNS } from "@/data/mock";
import {
  MapPin,
  Globe,
  Share2,
  QrCode,
  Trophy,
  Heart,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { use } from "react";

export default function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "achievements" | "about">("active");

  const cleanUsername = username.replace(/^(@|%40)/, "").toLowerCase();
  const user = MOCK_USERS[cleanUsername] || MOCK_USERS.siyam;

  if (!user) {
    notFound();
  }

  // Get user's campaigns
  const userCampaigns = MOCK_CAMPAIGNS.filter(
    (c) => c.creator.username.toLowerCase() === user.username.toLowerCase()
  );
  const activeCampaigns = userCampaigns.filter((c) => c.status === "active");
  const completedCampaigns = userCampaigns.filter((c) => c.status === "completed");
  const pinnedCampaign = userCampaigns.find((c) => c.isPinned);

  return (
    <div className="min-h-screen pb-20">
      {/* Cover Image Banner */}
      <div className="relative h-48 sm:h-72 lg:h-80 w-full overflow-hidden bg-gradient-to-r from-[#059669] via-[#10B981] to-[#4F46E5]">
        {user.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.coverUrl}
            alt={`${user.name} cover`}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <Container variant="wide">
        {/* Profile Header Info */}
        <div className="relative -mt-16 sm:-mt-24 mb-8 flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Avatar */}
            <div className="relative">
              <Avatar
                src={user.avatarUrl}
                name={user.name}
                size="2xl"
                className="ring-4 ring-white dark:ring-slate-900 shadow-xl"
              />
              {user.verified && (
                <div className="absolute bottom-2 right-2">
                  <Badge variant="verified" className="p-1.5 shadow-md">
                    <CheckCircle2 className="h-4 w-4" />
                  </Badge>
                </div>
              )}
            </div>

            {/* Name & Bio */}
            <div className="space-y-1 sm:mb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  {user.name}
                </h1>
                {user.verified && (
                  <Badge variant="verified" className="text-xs">
                    {user.verificationBadgeType || "Verified"} ✓
                  </Badge>
                )}
              </div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                @{user.username} • pasheachi.bro.bd/@{user.username}
              </p>

              <p className="max-w-xl text-sm sm:text-base text-slate-700 dark:text-slate-300 pt-1">
                {user.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#10B981]" />
                  {user.location}
                </span>
                {user.socialLinks?.website && (
                  <a
                    href={user.socialLinks.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#10B981] hover:underline"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    {user.socialLinks.website.replace("https://", "")}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button size="md" className="flex-1 sm:flex-initial font-bold gap-2">
              <Heart className="h-4 w-4 fill-white" />
              <span>Support</span>
            </Button>
            <Button size="md" variant="secondary" className="gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button size="md" variant="secondary" aria-label="QR Code">
              <QrCode className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mb-8 flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-400">
          <div>
            <span className="font-extrabold text-slate-900 dark:text-white">{user.followersCount}</span> Followers
          </div>
          <div>
            <span className="font-extrabold text-slate-900 dark:text-white">{user.followingCount}</span> Following
          </div>
          <div>
            <span className="font-extrabold text-[#10B981]">{userCampaigns.length}</span> Campaigns
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-px">
          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={`pb-3 px-4 text-sm font-bold transition-colors relative ${
              activeTab === "active"
                ? "text-[#10B981] border-b-2 border-[#10B981]"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            Active Campaigns ({activeCampaigns.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("completed")}
            className={`pb-3 px-4 text-sm font-bold transition-colors relative ${
              activeTab === "completed"
                ? "text-[#10B981] border-b-2 border-[#10B981]"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            Completed ({completedCampaigns.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("achievements")}
            className={`pb-3 px-4 text-sm font-bold transition-colors relative ${
              activeTab === "achievements"
                ? "text-[#10B981] border-b-2 border-[#10B981]"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            Achievements
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("about")}
            className={`pb-3 px-4 text-sm font-bold transition-colors relative ${
              activeTab === "about"
                ? "text-[#10B981] border-b-2 border-[#10B981]"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            About
          </button>
        </div>

        {/* Pinned Campaign Banner */}
        {activeTab === "active" && pinnedCampaign && (
          <div className="mb-10">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981]">
              <span>📌 Pinned Campaign</span>
            </div>
            <div className="max-w-2xl">
              <CampaignCard campaign={pinnedCampaign} />
            </div>
          </div>
        )}

        {/* Tab Content: Active */}
        {activeTab === "active" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCampaigns.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
            {activeCampaigns.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500">
                No active campaigns at the moment.
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Completed */}
        {activeTab === "completed" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCampaigns.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
            {completedCampaigns.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500">
                No completed campaigns yet.
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Achievements */}
        {activeTab === "achievements" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B]">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">First Campaign</h4>
                <p className="text-xs text-slate-500">Launched first cause on PasheAchi</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#10B981]">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">100+ Supporters</h4>
                <p className="text-xs text-slate-500">Backed by 100 generous donors</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Verified Creator</h4>
                <p className="text-xs text-slate-500">NID & identity checked</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: About */}
        {activeTab === "about" && (
          <div className="max-w-2xl rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              About {user.name}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {user.bio}
            </p>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500">
              <p>📍 Location: {user.location}</p>
              <p>🏷️ Category: {user.category}</p>
              <p>✓ Account Status: Verified Creator</p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
