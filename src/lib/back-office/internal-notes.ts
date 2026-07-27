export interface InternalNote {
  id: string;
  targetType: "Campaign" | "Creator" | "Withdrawal" | "Ticket" | "Transaction";
  targetId: string;
  authorName: string;
  authorRole: string;
  content: string;
  timestamp: string;
}

let MEMORY_INTERNAL_NOTES: InternalNote[] = [
  {
    id: "NTE-501",
    targetType: "Campaign",
    targetId: "CMP-092",
    authorName: "Moderator Rahim",
    authorRole: "Moderator",
    content: "Creator provided valid government NID copy via email. Story text matches hospital receipts.",
    timestamp: "2026-07-27 18:30"
  },
  {
    id: "NTE-502",
    targetType: "Transaction",
    targetId: "TRX-9F2A1B",
    authorName: "Siyam Ahmed",
    authorRole: "FinanceOfficer",
    content: "bKash statement line #9012 confirms ৳5,000 received. Marked verified.",
    timestamp: "2026-07-27 19:10"
  }
];

export function getInternalNotes(targetType: string, targetId: string): InternalNote[] {
  return MEMORY_INTERNAL_NOTES.filter(n => n.targetType === targetType && n.targetId === targetId);
}

export function addInternalNote(note: Omit<InternalNote, "id" | "timestamp">) {
  const newNote: InternalNote = {
    ...note,
    id: `NTE-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };
  MEMORY_INTERNAL_NOTES.unshift(newNote);
  return newNote;
}
