"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Wallet,
  CheckCircle2,
  Trophy,
  MessageSquare,
  Share2,
  CheckCheck,
} from "lucide-react";

interface NotificationItem {
  id: string;
  type: "donation" | "approval" | "goal" | "comment" | "share";
  title: string;
  message: string;
  time: string;
  group: "Today" | "Yesterday" | "Earlier";
  read: boolean;
  link?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    type: "donation",
    title: "Donation Received",
    message: "You received ৳500 from Arif Ahmed for 'Support Next.js Bengali Tooling'",
    time: "2 minutes ago",
    group: "Today",
    read: false,
    link: "/siyam/open-source-bengali-nextjs",
  },
  {
    id: "n-2",
    type: "comment",
    title: "New Comment Added",
    message: 'Karim commented on "Help Rina\'s Mother": "Praying for speedy recovery!"',
    time: "1 hour ago",
    group: "Today",
    read: false,
    link: "/rina/medical-fund-mother",
  },
  {
    id: "n-[#3]",
    type: "approval",
    title: "Campaign Approved",
    message: 'Your campaign "Laptop Fund for AI Dev" has been audited and approved!',
    time: "3 hours ago",
    group: "Today",
    read: true,
    link: "/siyam/laptop-fund-ai-development",
  },
  {
    id: "n-4",
    type: "goal",
    title: "50% Goal Reached! 🎉",
    message: '"Medical Fund" reached 50% of its goal! You have raised ৳25,000 so far.',
    time: "Yesterday, 4:15 PM",
    group: "Yesterday",
    read: true,
  },
  {
    id: "n-5",
    type: "share",
    title: "Campaign Shared",
    message: "Your campaign was shared 12 times on Facebook and WhatsApp today.",
    time: "Yesterday, 2:00 PM",
    group: "Yesterday",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "donation":
        return <Wallet className="h-4 w-4 text-[#10B981]" />;
      case "approval":
        return <CheckCircle2 className="h-4 w-4 text-[#4F46E5]" />;
      case "goal":
        return <Trophy className="h-4 w-4 text-[#F59E0B]" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-sky-500" />;
      case "share":
        return <Share2 className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-slate-50/50 dark:bg-slate-950">
      <Container variant="standard">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#10B981] dark:bg-emerald-950/50">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Notifications
              </h1>
              <p className="text-xs text-slate-500">Activity and campaign alerts</p>
            </div>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={markAllRead}
            className="text-xs font-bold gap-1.5"
          >
            <CheckCheck className="h-4 w-4" />
            <span>Mark all as read</span>
          </Button>
        </div>

        {/* Notifications List Grouped */}
        <div className="max-w-3xl mx-auto space-y-6">
          {(["Today", "Yesterday"] as const).map((group) => {
            const groupItems = notifications.filter((n) => n.group === group);
            if (groupItems.length === 0) return null;

            return (
              <div key={group} className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {group}
                </h3>

                <div className="space-y-2">
                  {groupItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                        !item.read
                          ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/50 dark:bg-emerald-950/20"
                          : "border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900"
                      }`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-slate-800">
                        {getIcon(item.type)}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>{item.title}</span>
                            {!item.read && (
                              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                            )}
                          </h4>
                          <span className="text-[10px] text-slate-400">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
