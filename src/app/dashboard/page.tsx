"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MOCK_CAMPAIGNS, MOCK_USERS } from "@/data/mock";
import { formatCurrency, calculateProgress } from "@/lib/utils";
import {
  Wallet,
  Rocket,
  Users,
  PlusCircle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Eye,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  const user = MOCK_USERS.siyam;
  const myCampaigns = MOCK_CAMPAIGNS.filter(
    (c) => c.creator.username === user.username
  );

  return (
    <div className="page-shell py-8 sm:py-12">
      <Container variant="wide">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1D2927] sm:text-5xl">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage your campaigns, track donations, and request withdrawals
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/create">
              <Button size="md" className="font-bold gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>New Campaign</span>
              </Button>
            </Link>
            <Link href={`/${user.username}`}>
              <Button size="md" variant="secondary" className="font-bold gap-2">
                <span>View Profile</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Raised
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-[#10B981]">
                <Wallet className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              ৳32,500
            </div>
            <p className="mt-1 text-xs text-[#10B981] font-semibold flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> +৳12,500 this week
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Campaigns
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]">
                <Rocket className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {myCampaigns.length}
            </div>
            <p className="mt-1 text-xs text-slate-500">All campaigns active</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Supporters
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B]">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              128
            </div>
            <p className="mt-1 text-xs text-slate-500">From 12 Bangladesh cities</p>
          </div>
        </div>

        {/* Main Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Campaigns Table (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                My Campaigns
              </h2>
              <Link href="/create" className="text-xs font-bold text-[#10B981] hover:underline">
                + Create New
              </Link>
            </div>

            <div className="space-y-4">
              {myCampaigns.map((cmp) => {
                const progress = calculateProgress(cmp.raisedAmount, cmp.goalAmount);
                return (
                  <div
                    key={cmp.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-center gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cmp.imageUrl}
                        alt={cmp.title}
                        className="h-16 w-20 rounded-xl object-cover"
                      />
                      <div>
                        <Link
                          href={`/${user.username}/${cmp.slug}`}
                          className="font-bold text-slate-900 hover:text-[#10B981] dark:text-white line-clamp-1"
                        >
                          {cmp.title}
                        </Link>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                          <Badge variant="active" className="px-1.5 py-0 text-[10px]">
                            {cmp.status.toUpperCase()}
                          </Badge>
                          <span>{cmp.daysLeft} days left</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-48 space-y-1 text-right">
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {formatCurrency(cmp.raisedAmount)} / {formatCurrency(cmp.goalAmount)}
                      </div>
                      <Progress value={progress} size="sm" />
                      <span className="text-[10px] text-slate-400 font-semibold">{progress}% funded</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Feed & Withdrawals (Right 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Recent Activity
            </h2>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <div className="flex items-start gap-3 text-xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-[#10B981] shrink-0 mt-0.5">
                  <Wallet className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">৳500 from Arif Ahmed</p>
                  <p className="text-slate-500">for Open Source Bengali Next.js • 2m ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5] shrink-0 mt-0.5">
                  <Eye className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">45 views today</p>
                  <p className="text-slate-500">on Laptop Fund for AI Dev</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-[#10B981] shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Campaign Approved</p>
                  <p className="text-slate-500">"Laptop Fund" is now live</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
