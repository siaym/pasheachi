"use client";

import { useState } from "react";
import { User, Eye, X, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ImpersonationModal({ isOpen, onClose, users = [] }: { isOpen: boolean; onClose: () => void; users?: any[] }) {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1D2927]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F3] border-2 border-[#1D2927] shadow-paper max-w-lg w-full p-6 space-y-6">
        <div className="flex justify-between items-start border-b border-[#D9D3C7] pb-4">
          <div className="flex items-center gap-2 text-[#A84D2A]">
            <ShieldAlert className="h-5 w-5" />
            <h3 className="font-editorial text-2xl text-[#1D2927]">User Impersonation Mode</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#EAE5DB]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="font-mono text-xs text-[#53605C]">
          Super Admin Feature: Inspect the exact dashboard or donor profile view as any user without requiring their password.
        </p>

        <div className="space-y-3 font-mono text-xs max-h-60 overflow-y-auto">
          {users.length === 0 ? (
            <div className="p-4 text-center text-[#8C7A5B]">No registered users available.</div>
          ) : (
            users.map((u) => (
              <div
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className={`p-3 border flex items-center justify-between cursor-pointer transition-colors ${selectedUser?.id === u.id ? 'bg-[#1D2927] text-[#FAF8F3] border-[#1D2927]' : 'bg-[#F7F4ED] border-[#D9D3C7] hover:border-[#1D2927]'}`}
              >
                <div>
                  <div className="font-bold">{u.name} (@{u.username})</div>
                  <div className="text-[10px] text-[#8C7A5B] uppercase">{u.email || "No Email"}</div>
                </div>
                <Eye className="h-4 w-4" />
              </div>
            ))
          )}
        </div>

        {selectedUser && (
          <div className="p-4 bg-[#E5EEE8] border border-[#355C52] space-y-3 font-mono text-xs text-[#355C52]">
            <div>Impersonating <strong>{selectedUser.name}</strong> (@{selectedUser.username})</div>
            <div className="flex gap-2">
              <Link
                href={`/${selectedUser.username}`}
                target="_blank"
                className="px-3 py-1.5 bg-[#1D2927] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"
              >
                <Eye className="h-3.5 w-3.5 text-[#A84D2A]" /> View Public Profile <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
