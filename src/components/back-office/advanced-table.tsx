"use client";

import { useState } from "react";
import { Download, Printer, Search, ChevronLeft, ChevronRight, CheckSquare, Square } from "lucide-react";
import { exportToCSV, printFormattedReport } from "@/lib/report-exporter";
import { PaperLift } from "@/components/ui/motion";

export interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T | ((row: T) => any);
  cell?: (row: T) => React.ReactNode;
}

interface AdvancedTableProps<T> {
  title: string;
  columns: ColumnDef<T>[];
  data: T[];
  bulkActions?: { label: string; action: (selectedRows: T[]) => void; variant?: "danger" | "default" }[];
  searchPlaceholder?: string;
}

export function AdvancedTable<T extends { id?: string | number }>({
  title,
  columns,
  data,
  bulkActions = [],
  searchPlaceholder = "Filter records...",
}: AdvancedTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filter
  const filteredData = data.filter((row) => {
    const rowStr = JSON.stringify(row).toLowerCase();
    return rowStr.includes(searchTerm.toLowerCase());
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Selection
  const handleToggleSelectAll = () => {
    if (selectedIds.size === paginatedData.length) {
      setSelectedIds(new Set());
    } else {
      const allIds = new Set(paginatedData.map((r, i) => r.id ?? i));
      setSelectedIds(allIds);
    }
  };

  const handleToggleRow = (id: string | number) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const selectedRows = data.filter((r, i) => selectedIds.has(r.id ?? i));

  // Export handlers
  const handleCSV = () => {
    const headers = columns.map(c => c.header);
    const rows = filteredData.map(r => 
      columns.map(c => typeof c.accessorKey === 'function' ? String(c.accessorKey(r)) : String(r[c.accessorKey]))
    );
    exportToCSV(`PasheAchi_Export_${title.replace(/\s+/g, "_")}`, headers, rows);
  };

  const handlePrint = () => {
    const headers = columns.map(c => c.header);
    const rows = filteredData.map(r => 
      columns.map(c => typeof c.accessorKey === 'function' ? String(c.accessorKey(r)) : String(r[c.accessorKey]))
    );
    printFormattedReport(`${title} Audit Dossier`, headers, rows);
  };

  return (
    <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] shadow-sm overflow-hidden space-y-0">
      {/* Header Toolbar */}
      <div className="p-4 border-b border-[#D9D3C7] bg-[#F7F4ED] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8C7A5B]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder={searchPlaceholder}
            className="h-9 w-full bg-transparent border-b border-[#D9D3C7] pl-9 pr-3 text-xs font-mono text-[#1D2927] focus:outline-none focus:border-[#1D2927] placeholder:text-[#8C7A5B]"
          />
        </div>

        {/* Bulk Action Buttons & Export */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedRows.length > 0 && bulkActions.map((ba, idx) => (
            <button
              key={idx}
              onClick={() => ba.action(selectedRows)}
              className={`h-8 px-3 text-[10px] font-mono font-bold uppercase tracking-widest border transition-colors ${ba.variant === 'danger' ? 'bg-[#A84D2A] text-[#FAF8F3] border-[#A84D2A]' : 'bg-[#1D2927] text-[#FAF8F3] border-[#1D2927]'}`}
            >
              {ba.label} ({selectedRows.length})
            </button>
          ))}

          <button
            onClick={handleCSV}
            className="h-8 px-3 border border-[#D9D3C7] bg-[#FAF8F3] hover:bg-[#1D2927] hover:text-[#FAF8F3] text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5"
          >
            <Download className="h-3.5 w-3.5" /> CSV
          </button>
          <button
            onClick={handlePrint}
            className="h-8 px-3 border border-[#D9D3C7] bg-[#FAF8F3] hover:bg-[#1D2927] hover:text-[#FAF8F3] text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5"
          >
            <Printer className="h-3.5 w-3.5" /> PDF
          </button>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#EAE5DB] text-[#1D2927] uppercase tracking-widest border-b border-[#1D2927]">
            <tr>
              <th className="p-3 w-10 text-center">
                <button onClick={handleToggleSelectAll}>
                  {selectedIds.size === paginatedData.length && paginatedData.length > 0 ? (
                    <CheckSquare className="h-4 w-4 text-[#A84D2A]" />
                  ) : (
                    <Square className="h-4 w-4 text-[#8C7A5B]" />
                  )}
                </button>
              </th>
              {columns.map((col, idx) => (
                <th key={idx} className="p-3 font-bold">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D9D3C7]">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="p-8 text-center text-[#8C7A5B]">
                  No matching records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => {
                const rowId = row.id ?? rowIdx;
                const isSelected = selectedIds.has(rowId);
                return (
                  <tr key={rowIdx} className={`hover:bg-[#F7F4ED] transition-colors ${isSelected ? 'bg-[#E5EEE8]/50' : ''}`}>
                    <td className="p-3 text-center">
                      <button onClick={() => handleToggleRow(rowId)}>
                        {isSelected ? <CheckSquare className="h-4 w-4 text-[#A84D2A]" /> : <Square className="h-4 w-4 text-[#8C7A5B]" />}
                      </button>
                    </td>
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} className="p-3 text-[#1D2927]">
                        {col.cell ? col.cell(row) : (typeof col.accessorKey === 'function' ? col.accessorKey(row) : String(row[col.accessorKey] ?? ""))}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 bg-[#EAE5DB] border-t border-[#D9D3C7] flex items-center justify-between font-mono text-[10px] text-[#53605C]">
        <span>
          Showing {paginatedData.length} of {filteredData.length} entries
        </span>
        <div className="flex items-center gap-2">
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="p-1 border border-[#D9D3C7] bg-[#FAF8F3] disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            className="p-1 border border-[#D9D3C7] bg-[#FAF8F3] disabled:opacity-40"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </PaperLift>
  );
}
