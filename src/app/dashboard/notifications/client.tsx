"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { Bell, Heart, Wallet, CheckCircle2, Megaphone, AlertCircle } from "lucide-react";
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

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-6">
        <div>
          <h2 className="font-editorial text-4xl text-[#1D2927] mb-1">Activity Feed</h2>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Stay updated on your campaigns {unreadCount > 0 && `• ${unreadCount} unread`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllRead}
              disabled={isPending}
              className="h-10 px-4 border border-[#D9D3C7] bg-[#FAF8F3] text-[#1D2927] font-bold text-[10px] uppercase tracking-widest hover:border-[#1D2927] transition-colors disabled:opacity-50"
            >
              Mark all as read
            </button>
          )}
          <button 
            onClick={handleClearAll}
            disabled={notifications.length === 0 || isPending}
            className="h-10 px-4 border border-[#1D2927] text-[#1D2927] font-bold text-[10px] uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            Clear all
          </button>
        </div>
      </FadeIn>


      <FadeIn delay={0.1}>
        <div className="max-w-3xl space-y-4">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-[#53605C] font-mono text-xs">
              No new notifications.
            </div>
          ) : (
            notifications.map((notif, index) => {
              const Icon = getIconForType(notif.type);
              const colors = getColorForType(notif.type);
              
              return (
                <div 
                  key={notif.id} 
                  className="relative cursor-pointer"
                  onClick={() => !notif.isRead && handleMarkRead(notif.id)}
                >
                  {/* Connector line for the timeline effect */}
                  {index !== notifications.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-[-1rem] w-px bg-[#D9D3C7] z-0" />
                  )}
                  
                  <PaperLift 
                    className={cn(
                      "relative z-10 flex gap-4 p-6 border transition-colors",
                      colors.bgColor,
                      colors.borderColor,
                      !notif.isRead ? "shadow-sm" : "shadow-none opacity-70"
                    )}
                  >
                    <div className="shrink-0 mt-1">
                      <div className={cn("w-12 h-12 rounded-full border-2 bg-[#F7F4ED] flex items-center justify-center", colors.borderColor)}>
                        <Icon className={cn("h-5 w-5", colors.iconColor)} />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className={cn("font-bold text-lg", !notif.isRead ? "text-[#1D2927]" : "text-[#53605C]")}>
                          {notif.type.charAt(0).toUpperCase() + notif.type.slice(1)}
                        </h3>
                        <span className="shrink-0 font-mono text-[9px] uppercase tracking-widest text-[#8C7A5B]">
                          {new Date(notif.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className={cn("text-sm leading-relaxed", !notif.isRead ? "text-[#1D2927]" : "text-[#53605C]")}>
                        {notif.message}
                      </p>
                      
                      {!notif.isRead && (
                        <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[#A84D2A]" />
                      )}
                    </div>
                  </PaperLift>
                </div>
              )
            })
          )}
        </div>
      </FadeIn>
    </div>
  );
}
