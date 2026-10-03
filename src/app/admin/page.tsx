import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, Users, Wallet, Megaphone, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Cache for 1 min to prevent heavy DB hits on overview

export default async function AdminOverviewPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Fetch only aggregate stats for the dashboard
  const [
    totalTransactions,
    pendingTransactions,
    verifiedTransactions,
    transactionSum,
    todayTransactionSum,
    totalCampaigns,
    activeCampaigns,
    rejectedCampaigns,
    totalUsers,
  ] = await Promise.all([
    prisma.transaction.count(),
    prisma.transaction.count({ where: { status: "pending" } }),
    prisma.transaction.count({ where: { status: "verified" } }),
    prisma.transaction.aggregate({ _sum: { amount: true } }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } }
    }),
    prisma.campaign.count(),
    prisma.campaign.count({ where: { status: "active" } }),
    prisma.campaign.count({ where: { status: "rejected" } }),
    prisma.user.count(),
  ]);

  const stats = {
    totalTransactions,
    pendingTransactions,
    verifiedTransactions,
    totalDonationVolume: transactionSum._sum.amount || 0,
    todayDonationVolume: todayTransactionSum._sum.amount || 0,
    verificationRate: totalTransactions > 0 ? Math.round((verifiedTransactions / totalTransactions) * 100) : 0,
    totalCampaigns,
    activeCampaigns,
    pendingCampaigns: totalCampaigns - activeCampaigns - rejectedCampaigns,
    totalUsers,
  };

  const pendingActionItems = stats.pendingTransactions + stats.pendingCampaigns;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Executive Dashboard</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Welcome back, {user.name}. Here is what's happening on PasheAchi today.
        </p>
      </div>

      {pendingActionItems > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
            <h3 className="font-semibold text-xl text-slate-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-blue-600" /> Needs Attention
            </h3>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {pendingActionItems} Action Items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Pending Verifications</div>
              <div className="text-3xl font-bold text-slate-900">{stats.pendingTransactions}</div>
              <Link href="/admin/finance" className="text-xs font-medium text-blue-600 mt-2 inline-block hover:underline">Verify now &rarr;</Link>
            </div>
            
            <div className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Campaign Reviews</div>
              <div className="text-3xl font-bold text-slate-900">{stats.pendingCampaigns}</div>
              <Link href="/admin/campaigns" className="text-xs font-medium text-blue-600 mt-2 inline-block hover:underline">Review now &rarr;</Link>
            </div>
            
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">Verification Rate</div>
              <div className="text-3xl font-bold text-emerald-900">{stats.verificationRate}%</div>
              <div className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1"><ShieldCheck className="h-3 w-3"/> System Healthy</div>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Today's Volume</div>
              <div className="text-3xl font-bold text-slate-900">{formatCurrency(stats.todayDonationVolume)}</div>
              <div className="text-xs font-medium text-slate-500 mt-2 flex items-center gap-1"><TrendingUp className="h-3 w-3"/> 24h trailing</div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold text-xl text-slate-900 mb-4">Platform Snapshot</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Wallet className="h-5 w-5" /></div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</div>
              <div className="text-xl font-bold text-slate-900">{formatCurrency(stats.totalDonationVolume)}</div>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-600 rounded-lg"><Users className="h-5 w-5" /></div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Users</div>
              <div className="text-xl font-bold text-slate-900">{stats.totalUsers}</div>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><Megaphone className="h-5 w-5" /></div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Campaigns</div>
              <div className="text-xl font-bold text-slate-900">{stats.activeCampaigns}</div>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-600 rounded-lg"><ShieldCheck className="h-5 w-5" /></div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Transactions</div>
              <div className="text-xl font-bold text-slate-900">{stats.totalTransactions}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
