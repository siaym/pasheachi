"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { Search, Mail, Trash2, CheckCircle2 } from "lucide-react";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { markMessageReadAction, deleteMessageAction } from "./actions";

export function MessagesClient({ initialMessages }: { initialMessages: any[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(messages[0]?.id || null);
  const [isPending, startTransition] = useTransition();

  const activeMessage = messages.find(m => m.id === activeMessageId);

  const handleMarkRead = (id: string) => {
    startTransition(async () => {
      await markMessageReadAction(id);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteMessageAction(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      if (activeMessageId === id) setActiveMessageId(null);
    });
  };

  return (
    <div className="space-y-6 pb-24 h-[calc(100vh-10rem)] flex flex-col">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-6 shrink-0">
        <div>
          <h2 className="font-editorial text-4xl text-[#1D2927] mb-1">Supporter Inbox</h2>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Direct messages from your donors
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1} className="flex-1 min-h-0">
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] shadow-sm h-full flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Side: Message List */}
          <div className="w-full md:w-80 border-r border-[#D9D3C7] flex flex-col shrink-0 bg-[#F7F4ED]">
            <div className="p-4 border-b border-[#D9D3C7]">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8C7A5B]" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="h-9 w-full bg-transparent border-b border-[#D9D3C7] pl-9 pr-3 text-sm font-editorial italic text-[#1D2927] focus:outline-none focus:border-[#1D2927] placeholder:text-[#8C7A5B]"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto divide-y divide-[#D9D3C7]">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-[#53605C] font-mono text-xs">
                  No messages yet.
                </div>
              ) : (
                messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => {
                      setActiveMessageId(msg.id);
                      if (!msg.isRead) handleMarkRead(msg.id);
                    }}
                    className={cn(
                      "w-full text-left p-4 hover:bg-[#EAE5DB] transition-colors relative",
                      activeMessageId === msg.id ? "bg-[#EAE5DB]" : ""
                    )}
                  >
                    {!msg.isRead && (
                      <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#A84D2A]" />
                    )}
                    <div className="flex justify-between items-start mb-1 pr-4">
                      <span className={cn("font-bold text-sm text-[#1D2927]", !msg.isRead && "text-[#A84D2A]")}>
                        {msg.senderName}
                      </span>
                      <span className="font-mono text-[9px] text-[#53605C] uppercase">
                        {new Date(msg.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-[#8C7A5B] mb-2 truncate">
                      {msg.email || "No Email Provided"}
                    </div>
                    <div className={cn("text-xs truncate", !msg.isRead ? "font-bold text-[#1D2927]" : "text-[#53605C]")}>
                      {msg.content}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right Side: Message Detail View */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#FAF8F3]">
            {activeMessage ? (
              <>
                {/* Detail Header */}
                <div className="p-6 border-b border-[#D9D3C7] bg-[#EAE5DB] flex justify-between items-center shrink-0">
                  <div>
                    <h3 className="font-bold text-xl text-[#1D2927] mb-1">{activeMessage.senderName}</h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
                      {activeMessage.email || "No email provided"} • {new Date(activeMessage.date).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(activeMessage.id)}
                    className="p-2 border border-[#A84D2A] text-[#A84D2A] hover:bg-[#A84D2A] hover:text-[#F7F4ED] transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                  <div className="max-w-2xl text-[#1D2927] leading-relaxed whitespace-pre-wrap">
                    {activeMessage.content}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[#8C7A5B]">
                <Mail className="h-12 w-12 mb-4 opacity-50" />
                <p className="font-mono text-xs uppercase tracking-widest">Select a message to read</p>
              </div>
            )}
          </div>
        </PaperLift>
      </FadeIn>
    </div>
  );
}
