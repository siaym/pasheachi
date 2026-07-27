"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";
import { Download, Search, Printer, FileSpreadsheet, StickyNote } from "lucide-react";
import { useState } from "react";
import { exportToCSV, printFormattedReport } from "@/lib/report-exporter";

export function DonorsClient({ initialDonors, stats }: { initialDonors: any[], stats: { totalSupporters: number, totalRecorded: number } }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "VERIFIED" | "PENDING">("ALL");
  const [activeNotesDonor, setActiveNotesDonor] = useState<any | null>(null);
  const [creatorNote, setCreatorNote] = useState("");
  const [donorNotes, setDonorNotes] = useState<Record<string, string>>({});

  const filteredDonors = initialDonors.filter((donor) => {
    const matchesSearch = 
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (donor.campaignTitle && donor.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === "ALL" ? true :
      statusFilter === "VERIFIED" ? donor.status === "verified" :
      donor.status !== "verified";

    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = ["Transaction ID", "Supporter Name", "Amount (BDT)", "Payment Method", "Date", "Status", "Campaign"];
    const rows = filteredDonors.map(d => [
      d.id,
      d.name,
      d.amount,
      d.method,
      d.date,
      d.status,
      d.campaignTitle
    ]);
    exportToCSV("PasheAchi_Supporters_Report", headers, rows);
  };

  const handlePrintReport = () => {
    const headers = ["Supporter Name", "Amount (BDT)", "Method", "Date", "Status", "Campaign"];
    const rows = filteredDonors.map(d => [
      d.name,
      `৳${d.amount.toLocaleString()}`,
      d.method,
      d.date,
      d.status.toUpperCase(),
      d.campaignTitle
    ]);
    printFormattedReport("Supporter CRM Dossier Report", headers, rows);
  };

  const handleSaveNote = () => {
    if (activeNotesDonor) {
      setDonorNotes(prev => ({ ...prev, [activeNotesDonor.id]: creatorNote }));
      setActiveNotesDonor(null);
    }
  };

  return (
    <div className="space-y-12">
      <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#D9D3C7] pb-6">
        <div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927] mb-2">
            Supporter <span className="italic text-[#8C7A5B]">CRM Ledger</span>
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Total {stats.totalSupporters} supporters • ৳{stats.totalRecorded.toLocaleString()} recorded
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="h-10 px-4 border border-[#1D2927] text-[#1D2927] font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-[#1D2927] hover:text-[#F7F4ED] transition-colors flex items-center gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" /> Export CSV
          </button>
          <button 
            onClick={handlePrintReport}
            className="h-10 px-4 border border-[#1D2927] text-[#1D2927] font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-[#1D2927] hover:text-[#F7F4ED] transition-colors flex items-center gap-2"
          >
            <Printer className="h-4 w-4" /> PDF Report
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] shadow-sm overflow-hidden">
          
          <div className="p-6 border-b border-[#D9D3C7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F7F4ED]">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8C7A5B]" />
              <input
                type="text"
                placeholder="Search supporter or campaign..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full bg-transparent border-b border-[#D9D3C7] pl-9 pr-3 text-sm font-editorial italic text-[#1D2927] focus:outline-none focus:border-[#1D2927] placeholder:text-[#8C7A5B]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase font-bold text-[#8C7A5B]">Filter:</span>
              {(["ALL", "VERIFIED", "PENDING"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 font-mono text-[10px] uppercase font-bold border ${statusFilter === st ? 'bg-[#1D2927] text-[#F7F4ED] border-[#1D2927]' : 'bg-[#FAF8F3] text-[#1D2927] border-[#D9D3C7]'}`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#EAE5DB] text-[#1D2927] uppercase tracking-widest border-b border-[#1D2927]">
                <tr>
                  <th className="p-4">Supporter</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Creator Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D3C7]">
                {filteredDonors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#8C7A5B]">
                      No supporter records match the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredDonors.map((donor) => (
                    <tr key={donor.id} className="hover:bg-[#F7F4ED] transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#1D2927]">{donor.name}</div>
                        <div className="text-[10px] text-[#53605C]">{donor.campaignTitle}</div>
                      </td>
                      <td className="p-4 font-bold text-[#1D2927]">{formatCurrency(donor.amount)}</td>
                      <td className="p-4 text-[#8C7A5B]">{donor.method}</td>
                      <td className="p-4 text-[#53605C]">{donor.date}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-0.5 text-[9px] uppercase font-bold border ${donor.status === 'verified' ? 'bg-[#E5EEE8] text-[#355C52] border-[#355C52]' : 'bg-[#FDF4F0] text-[#A84D2A] border-[#A84D2A]'}`}>
                          {donor.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            setActiveNotesDonor(donor);
                            setCreatorNote(donorNotes[donor.id] || "");
                          }}
                          className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#8C7A5B] hover:text-[#1D2927]"
                        >
                          <StickyNote className="h-3.5 w-3.5" />
                          {donorNotes[donor.id] ? "View Note" : "+ Add Note"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </PaperLift>
      </FadeIn>

      {/* Creator Private Notes Modal */}
      {activeNotesDonor && (
        <div className="fixed inset-0 z-50 bg-[#1D2927]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 max-w-md w-full shadow-paper space-y-4">
            <h3 className="font-editorial text-xl text-[#1D2927]">Creator Private Note</h3>
            <p className="text-xs font-mono text-[#53605C]">Note for supporter {activeNotesDonor.name} (Visible to you only).</p>
            <textarea
              value={creatorNote}
              onChange={(e) => setCreatorNote(e.target.value)}
              placeholder="e.g. Sent thank you email on July 28..."
              className="w-full h-28 p-3 border border-[#D9D3C7] bg-[#F7F4ED] text-sm font-mono focus:outline-none focus:border-[#1D2927] resize-none"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setActiveNotesDonor(null)}
                className="h-8 px-4 border border-[#D9D3C7] font-mono text-[10px] uppercase font-bold"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveNote}
                className="h-8 px-4 bg-[#1D2927] text-[#F7F4ED] font-mono text-[10px] uppercase font-bold"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
