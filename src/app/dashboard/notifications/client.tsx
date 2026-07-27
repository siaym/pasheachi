"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { Bell, Heart, Wallet, CheckCircle2, Megaphone, AlertCircle, CheckCheck, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { markNotificationReadAction, clearAllNotificationsAction, markAllNotificationsReadAction } from "./actions";
import { useTransition, useState } from "react";

const getIconForType = (type: string) => {
  switch (type) {
    case "donation": return Heart;
    case "withdrawal": return Wallet;
    case "milestone": return Megaphone;
    case "verification": return CheckCircle2;
    default: return AlertCircle;
  }
};

const getColorForType = (type: string) => {
  switch (type) {
    case "donation": return { iconColor: "text-[#10B981]", bgColor: "bg-[#F7F4ED]", borderColor: "border-[#10B981]" };
    case "withdrawal": return { iconColor: "text-[#1D2927]", bgColor: "bg-[#EAE5DB]", borderColor: "border-[#1D2927]" };
    case "milestone": return { iconColor: "text-[#A84D2A]", bgColor: "bg-[#FAF8F3]", borderColor: "border-[#D9D3C7]" };
    case "verification": return { iconColor: "text-[#1D2927]", bgColor: "bg-[#FAF8F3]", borderColor: "border-[#D9D3C7]" };
    default: return { iconColor: "text-[#53605C]", bgColor: "bg-[#FAF8F3]", borderColor: "border-[#D9D3C7]" };
  }
};

export function NotificationsClient({ initialNotifications }: { initialNotifications: any[] }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isPending, startTransition] = useTransition();
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");

  const handleMarkRead = (id: string) => {
    startTransition(async () => {
      await markNotificationReadAction(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    });
  };

  const handleMarkAllRead = () => {
    startTransition(async () => {
      await markAllNotificationsReadAction();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    });
  };

  const handleClearAll = () => {
    startTransition(async () => {
      await clearAllNotificationsAction();
      setNotifications([]);
    });
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesCategory = categoryFilter === "ALL" || n.type === categoryFilter.toLowerCase();
    const matchesStatus = statusFilter === "ALL" ? true : statusFilter === "UNREAD" ? !n.isRead : n.isRead;
    return matchesCategory && matchesStatus;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-6">
        <div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1D2927] mb-2">Notifications Hub</h2>
          <p className="text-[#53605C] font-mono text-xs uppercase tracking-widest">
            {unreadCount > 0 ? `${unreadCount} unread alerts` : "All notifications read"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              disabled={isPending}
              className="h-9 px-4 border border-[#1D2927] bg-[#FAF8F3] text-[#1D2927] hover:bg-[#1D2927] hover:text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <CheckCheck className="h-4 w-4" /> Mark All Read
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              disabled={isPending}
              className="h-9 px-4 border border-[#A84D2A] bg-[#FDF4F0] text-[#A84D2A] hover:bg-[#A84D2A] hover:text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </button>
          )}
        </div>
      </FadeIn>

      {/* Category Tabs & Status Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF8F3] border border-[#D9D3C7] p-4">
        <div className="flex flex-wrap gap-2">
          {["ALL", "DONATION", "WITHDRAWAL", "MILESTONE", "VERIFICATION"].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 font-mono text-[10px] uppercase font-bold border transition-colors ${categoryFilter === cat ? 'bg-[#1D2927] text-[#FAF8F3] border-[#1D2927]' : 'bg-[#F7F4ED] text-[#1D2927] border-[#D9D3C7]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold uppercase text-[#8C7A5B]">State:</span>
          {(["ALL", "UNREAD", "READ"] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-0.5 font-mono text-[9px] uppercase font-bold border ${statusFilter === st ? 'bg-[#A84D2A] text-[#FAF8F3] border-[#A84D2A]' : 'bg-[#F7F4ED] text-[#1D2927] border-[#D9D3C7]'}`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <FadeIn>
            <div className="bg-[#FAF8F3] border border-[#D9D3C7] p-12 text-center flex flex-col items-center">
              <Bell className="h-12 w-12 text-[#D9D3C7] mb-4" />
              <h3 className="font-editorial text-2xl text-[#1D2927]">No Notifications</h3>
              <p className="text-[#53605C] mt-2 text-sm font-mono">You're completely up to date.</p>
            </div>
          </FadeIn>
        ) : (
          filteredNotifications.map((n, idx) => {
            const IconComponent = getIconForType(n.type);
            const style = getColorForType(n.type);

            return (
              <FadeIn key={n.id} delay={0.05 * idx}>
                <div onClick={() => !n.isRead && handleMarkRead(n.id)}>
                  <PaperLift 
                    className={cn(
                      "border p-5 transition-all flex items-start gap-4 cursor-pointer relative",
                      n.isRead ? "bg-[#FAF8F3] border-[#D9D3C7] opacity-80" : "bg-[#F7F4ED] border-[#1D2927] shadow-sm"
                    )}
                  >
                    {!n.isRead && (
                      <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#A84D2A]" />
                    )}

                    <div className={cn("p-2.5 rounded border shrink-0", style.bgColor, style.borderColor)}>
                      <IconComponent className={cn("h-5 w-5", style.iconColor)} />
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-[#1D2927]">{n.title}</h4>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C7A5B]">
                          {n.time || "Recently"}
                        </span>
                      </div>
                      <p className="text-xs text-[#53605C] font-mono leading-relaxed">{n.message}</p>
                    </div>
                  </PaperLift>
                </div>
              </FadeIn>

            );
          })
        )}
      </div>
    </div>
  );
}
