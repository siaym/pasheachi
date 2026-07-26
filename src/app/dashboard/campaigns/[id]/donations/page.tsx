"use client";

import { Container } from "@/components/layout/container";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { MOCK_TRANSACTIONS } from "@/data/mock";
import { Download, Search, CheckCircle2, Clock, Plus, Edit2, Check, X } from "lucide-react";
import { useState } from "react";

export default function CampaignDonationsPage() {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrx, setEditingTrx] = useState<any>(null);
  const [formData, setFormData] = useState({
    donorName: "",
    phone: "",
    amount: "",
    method: "Cash",
    status: "verified"
  });

  const filteredTransactions = transactions.filter((trx) => {
    const matchesSearch = 
      trx.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || trx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = (trx?: any) => {
    if (trx) {
      setEditingTrx(trx);
      setFormData({
        donorName: trx.donorName,
        phone: trx.phone,
        amount: trx.amount.toString(),
        method: trx.method,
        status: trx.status
      });
    } else {
      setEditingTrx(null);
      setFormData({
        donorName: "",
        phone: "",
        amount: "",
        method: "Cash",
        status: "verified"
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingTrx) {
      setTransactions(transactions.map(t => t.id === editingTrx.id ? {
        ...t,
        donorName: formData.donorName || "Anonymous",
        phone: formData.phone,
        amount: Number(formData.amount) || 0,
        method: formData.method,
        status: formData.status
      } : t));
    } else {
      setTransactions([{
        id: "TRX-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        donorName: formData.donorName || "Anonymous",
        phone: formData.phone,
        amount: Number(formData.amount) || 0,
        method: formData.method,
        status: formData.status,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }, ...transactions]);
    }
    setIsModalOpen(false);
  };

  const handleVerify = (id: string) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, status: "verified" } : t));
  };

  return (
    <div className="space-y-8 pb-24 relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl text-[#1D2927] mb-2">Donations Ledger</h2>
          <p className="text-[#53605C]">
            View all transactions, manually verify payments, and log cash donations.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleOpenModal()}
            className="h-10 px-4 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] hover:bg-[#2A3B38] font-mono text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Record
          </button>
          <button className="h-10 px-4 border border-[#1D2927] bg-[#EAE5DB] hover:bg-[#1D2927] hover:text-[#F7F4ED] font-mono text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7A5B]" />
          <input
            type="text"
            placeholder="Search by name, TrxID, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-[#D9D3C7] focus:border-[#1D2927] outline-none font-mono text-sm text-[#1D2927] placeholder:text-[#8C7A5B]"
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">Status:</span>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent border-b border-[#D9D3C7] focus:border-[#1D2927] outline-none font-mono text-sm text-[#1D2927] cursor-pointer"
          >
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </PaperLift>

      {/* Ledger Table */}
      <FadeIn delay={0.2}>
        <div className="bg-[#FAF8F3] border border-[#1D2927] overflow-x-auto shadow-paper">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b-2 border-[#1D2927] bg-[#EAE5DB]">
                <th className="p-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927]">Date & Time</th>
                <th className="p-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927]">Donor Info</th>
                <th className="p-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927]">Transaction Details</th>
                <th className="p-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927] text-right">Amount</th>
                <th className="p-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927] text-center">Status</th>
                <th className="p-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="border-b border-[#D9D3C7] hover:bg-[#EAE5DB]/50 transition-colors group">
                  <td className="p-4 align-top">
                    <div className="font-mono text-sm text-[#1D2927]">{trx.date}</div>
                    <div className="font-mono text-[10px] text-[#53605C]">{trx.time}</div>
                  </td>
                  <td className="p-4 align-top">
                    <div className="font-bold text-sm text-[#1D2927]">{trx.donorName}</div>
                    <div className="font-mono text-[10px] text-[#53605C]">{trx.phone}</div>
                  </td>
                  <td className="p-4 align-top">
                    <div className="font-mono text-xs text-[#1D2927] mb-1">{trx.id}</div>
                    <div className="inline-block px-2 py-0.5 bg-[#EAE5DB] border border-[#D9D3C7] font-mono text-[9px] uppercase tracking-widest text-[#53605C]">
                      {trx.method}
                    </div>
                  </td>
                  <td className="p-4 align-top text-right">
                    <div className="font-mono text-sm font-bold text-[#1D2927]">৳{trx.amount.toLocaleString()}</div>
                  </td>
                  <td className="p-4 align-top text-center">
                    {trx.status === "verified" ? (
                      <div className="inline-flex items-center gap-1 text-[#2E4A3D] font-mono text-[10px] uppercase tracking-widest font-bold">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 text-[#A84D2A] font-mono text-[10px] uppercase tracking-widest font-bold">
                        <Clock className="h-3 w-3" /> Pending
                      </div>
                    )}
                  </td>
                  <td className="p-4 align-top text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {trx.status === "pending" && (
                        <button 
                          onClick={() => handleVerify(trx.id)}
                          className="p-1.5 border border-[#2E4A3D] text-[#2E4A3D] hover:bg-[#2E4A3D] hover:text-[#F7F4ED] transition-colors"
                          title="Mark as Verified"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleOpenModal(trx)}
                        className="p-1.5 border border-[#1D2927] text-[#1D2927] hover:bg-[#EAE5DB] transition-colors"
                        title="Edit Record"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#53605C]">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </FadeIn>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2927]/60 backdrop-blur-sm animate-in fade-in">
          <PaperLift className="relative w-full max-w-md bg-[#FAF8F3] border-2 border-[#1D2927] p-6 shadow-[8px_8px_0_0_#1D2927]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1 hover:bg-[#EAE5DB] transition-colors border border-transparent hover:border-[#D9D3C7]"
            >
              <X className="h-4 w-4 text-[#1D2927]" />
            </button>
            <h3 className="font-editorial text-2xl text-[#1D2927] mb-6">
              {editingTrx ? "Edit Ledger Record" : "Add Ledger Record"}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-1.5">Donor Name</label>
                <input 
                  type="text" 
                  value={formData.donorName}
                  onChange={(e) => setFormData({...formData, donorName: e.target.value})}
                  className="w-full border border-[#D9D3C7] bg-[#F7F4ED] px-3 py-2 font-mono text-sm focus:border-[#1D2927] outline-none"
                  placeholder="Anonymous"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-1.5">Amount (৳)</label>
                  <input 
                    type="number" 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full border border-[#D9D3C7] bg-[#F7F4ED] px-3 py-2 font-mono text-sm focus:border-[#1D2927] outline-none"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-1.5">Phone / Contact</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-[#D9D3C7] bg-[#F7F4ED] px-3 py-2 font-mono text-sm focus:border-[#1D2927] outline-none"
                    placeholder="+880..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-1.5">Payment Method</label>
                  <select 
                    value={formData.method}
                    onChange={(e) => setFormData({...formData, method: e.target.value})}
                    className="w-full border border-[#D9D3C7] bg-[#F7F4ED] px-3 py-2 font-mono text-sm focus:border-[#1D2927] outline-none cursor-pointer"
                  >
                    <option value="Cash">Cash</option>
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-1.5">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full border border-[#D9D3C7] bg-[#F7F4ED] px-3 py-2 font-mono text-sm focus:border-[#1D2927] outline-none cursor-pointer"
                  >
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              
              <button 
                onClick={handleSave}
                disabled={!formData.amount}
                className="w-full mt-4 h-12 bg-[#1D2927] text-[#F7F4ED] font-bold font-mono text-[10px] uppercase tracking-widest hover:bg-[#2A3B38] disabled:opacity-50 transition-colors"
              >
                Save Record
              </button>
            </div>
          </PaperLift>
        </div>
      )}
    </div>
  );
}
