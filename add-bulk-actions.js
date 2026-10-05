const fs = require('fs');

const file = 'src/app/admin/client.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Bulk Handlers
const bulkHandlers = `
  const handleBulkVerifyTransactions = (selectedRows: any[]) => {
    startTransition(async () => {
      let count = 0;
      for (const row of selectedRows) {
        if (row.status !== "verified") {
          await verifyTransactionAction(row.id, "verified", "Bulk verified");
          setTransactions(prev => prev.map(t => t.id === row.id ? { ...t, status: "verified" } : t));
          count++;
        }
      }
      showToast(\`Bulk verified \${count} transactions!\`);
    });
  };

  const handleBulkApproveCampaigns = (selectedRows: any[]) => {
    startTransition(async () => {
      let count = 0;
      for (const row of selectedRows) {
        if (row.status !== "active") {
          await verifyCampaignAction(row.id, "approved", "Bulk approved");
          setCampaigns(prev => prev.map(c => c.id === row.id ? { ...c, status: "active" } : c));
          count++;
        }
      }
      showToast(\`Bulk approved \${count} campaigns!\`);
    });
  };
`;

content = content.replace(
  /const handleApproveCampaign = \(id: string\) => \{/,
  `${bulkHandlers}\n  const handleApproveCampaign = (id: string) => {`
);

// 2. Add bulkActions prop to Finance Verification Table
content = content.replace(
  /(<AdvancedTable[\s\S]*?title=\{navTab === "verification_queue" \? "Pending Verifications Queue" : "MFS Verification Ledger"\})/,
  `$1\n            bulkActions={navTab === "verification_queue" ? [{ label: "Verify Selected", action: handleBulkVerifyTransactions }] : []}`
);

// 3. Add bulkActions prop to Moderation Approval Table
content = content.replace(
  /(<AdvancedTable[\s\S]*?title="Campaign Approval Desk")/,
  `$1\n            bulkActions={navTab === "pending_campaigns" ? [{ label: "Approve Selected", action: handleBulkApproveCampaigns }] : []}`
);

fs.writeFileSync(file, content);
console.log('Added bulk actions!');
