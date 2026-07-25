"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PaymentModal } from "@/components/campaign/payment-modal";
import { MOCK_CAMPAIGNS, MOCK_USERS } from "@/data/mock";
import { PRESET_AMOUNTS } from "@/lib/constants";
import { formatCurrency, calculateProgress } from "@/lib/utils";
import {
  Heart,
  Share2,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  MessageSquare,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { use } from "react";

export default function CampaignDetailPage({
  params,
}: {
  params: Promise<{ username: string; campaign: string }>;
}) {
  const { username, campaign: campaignSlug } = use(params);
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [liked, setLiked] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const campaign =
    MOCK_CAMPAIGNS.find((c) => c.slug === campaignSlug) || MOCK_CAMPAIGNS[0];

  if (!campaign) {
    notFound();
  }

  const progress = calculateProgress(campaign.raisedAmount, campaign.goalAmount);
  const creator = MOCK_USERS[username.toLowerCase()] || campaign.creator;

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <Container variant="wide">
        {/* Back Link */}
        <Link
          href={`/${creator.username}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#10B981] mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to {creator.name}'s profile</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Story Column (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Campaign Hero Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4">
                <Badge variant="primary" className="shadow-md backdrop-blur-md">
                  {campaign.category.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Title & Creator Subheader */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {campaign.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-slate-100 dark:border-slate-800 pb-4 text-xs font-medium">
                <Link
                  href={`/${creator.username}`}
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-[#10B981]"
                >
                  <Avatar src={creator.avatarUrl} name={creator.name} size="sm" />
                  <span className="font-bold">{creator.name}</span>
                  {creator.verified && <Badge variant="verified" className="px-1 text-[9px]">✓</Badge>}
                </Link>

                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="h-4 w-4 text-[#10B981]" />
                  <span>{campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : "Ended"}</span>
                </div>
              </div>
            </div>

            {/* Campaign Story */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Campaign Story
              </h2>
              <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {campaign.story}
              </div>
            </div>

            {/* Milestones Checklist */}
            {campaign.milestones && campaign.milestones.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Milestones & Fund Breakdown
                </h3>
                <div className="space-y-3">
                  {campaign.milestones.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="flex items-center gap-3">
                        {m.completed ? (
                          <CheckCircle className="h-5 w-5 text-[#10B981] shrink-0" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-slate-300 dark:text-slate-700 shrink-0" />
                        )}
                        <span
                          className={`text-sm font-semibold ${
                            m.completed ? "text-slate-900 dark:text-white" : "text-slate-500"
                          }`}
                        >
                          {m.title}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#10B981]">
                        {formatCurrency(m.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Verification Documents
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  <FileText className="h-4 w-4 text-[#10B981]" />
                  <span>Medical Diagnosis Report.pdf</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-[#4F46E5]" />
                  <span>Verified Identity Document</span>
                </div>
              </div>
            </div>

            {/* Comments Thread */}
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#10B981]" />
                  <span>Comments & Prayers</span>
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar name="Arif Ahmed" size="xs" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Arif Ahmed</span>
                    </div>
                    <span className="text-[10px] text-slate-400">2 hours ago</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    "Praying for your mother's successful surgery and speedy recovery. Stay strong!"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Support Card (Right 5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6 rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Raised & Goal */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-[#10B981]">
                    {formatCurrency(campaign.raisedAmount)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    goal {formatCurrency(campaign.goalAmount)}
                  </span>
                </div>

                <div className="my-3 space-y-1">
                  <Progress value={progress} size="lg" />
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>{progress}% Raised</span>
                    <span>{campaign.supportersCount} Supporters</span>
                  </div>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Donation Amount (৳)
                </label>

                {/* Preset Pills */}
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`h-10 rounded-xl text-xs font-bold transition-all ${
                        selectedAmount === amt && !customAmount
                          ? "bg-[#10B981] text-white shadow-md shadow-[#10B981]/25"
                          : "border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
                      }`}
                    >
                      ৳{amt}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <input
                  type="number"
                  placeholder="Or enter custom amount in ৳"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(Number(e.target.value) || 0);
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#10B981] focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              {/* Main CTA */}
              <Button
                size="xl"
                onClick={() => setIsPaymentOpen(true)}
                className="w-full font-bold shadow-lg shadow-[#10B981]/25"
              >
                Support {formatCurrency(selectedAmount || 250)} Now
              </Button>

              {/* Auxiliary Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setLiked(!liked)}
                  className="flex-1 gap-2 text-xs font-semibold"
                >
                  <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                  <span>{liked ? "Liked" : "Like"}</span>
                </Button>
                <Button variant="secondary" size="md" className="flex-1 gap-2 text-xs font-semibold">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>

              {/* Safety Micro-callout */}
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-50/70 p-3 text-xs font-medium text-[#047857] dark:bg-emerald-950/40 dark:text-emerald-300">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#10B981]" />
                <span>Verified Manual Transfer via bKash, Nagad, Rocket or Bank.</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Payment Modal */}
      <PaymentModal
        campaign={campaign}
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
      />
    </div>
  );
}
