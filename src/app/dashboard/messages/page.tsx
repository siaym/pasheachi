import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { MessageSquare } from "lucide-react";

export default async function DashboardMessagesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="space-y-8 pb-24">
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-6">
        <div>
          <h1 className="font-editorial text-4xl text-[#1D2927] mb-2">Supporter Messages</h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Direct conversations with your donors and supporters.
          </p>
        </div>
      </FadeIn>

      <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-12 text-center flex flex-col items-center">
        <MessageSquare className="h-12 w-12 text-[#8C7A5B] mb-4" />
        <h3 className="font-editorial text-2xl text-[#1D2927]">No Open Messages</h3>
        <p className="text-xs font-mono text-[#53605C] mt-2">When supporters send you direct messages, they will appear here.</p>
      </PaperLift>
    </div>
  );
}
