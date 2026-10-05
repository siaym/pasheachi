const fs = require('fs');
const file = 'src/app/admin/client.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  '{(navTab === "overview" || navTab === "campaigns") && (',
  '{(navTab === "campaigns") && ('
);

content = content.replace(
  '{(navTab === "overview" || navTab === "creators") && (',
  '{(navTab === "creators") && ('
);

content = content.replace(
  '{(navTab === "overview" || navTab === "audit_logs") && (',
  '{(navTab === "audit_logs") && ('
);

content = content.replace(
  '{(navTab === "overview" || navTab === "flags") && (',
  '{(navTab === "flags") && ('
);

content = content.replace(
  `            <AdvancedTable
              title={navTab === "verification_queue" ? "Pending Verifications Queue" : "MFS Verification Ledger"}`,
  `            {(navTab === "overview" || navTab === "verification_queue" || navTab === "audit") && (
            <AdvancedTable
              title={navTab === "verification_queue" ? "Pending Verifications Queue" : "MFS Verification Ledger"}`
);

content = content.replace(
  `            data={navTab === "verification_queue" ? transactions.filter(t => t.status === "pending" || t.status === "PENDING") : transactions}
            searchPlaceholder="Filter transactions by ID or donor name..."
          />`,
  `            data={navTab === "verification_queue" ? transactions.filter(t => t.status === "pending" || t.status === "PENDING") : transactions}
            searchPlaceholder="Filter transactions by ID or donor name..."
          />
          )}`
);


content = content.replace(
  `            <AdvancedTable
              title="Campaign Approval Desk"`,
  `            {(navTab === "overview" || navTab === "pending_campaigns" || navTab === "log") && (
            <AdvancedTable
              title="Campaign Approval Desk"`
);

content = content.replace(
  `            data={navTab === "pending_campaigns" ? campaigns.filter(c => c.status !== "active" && c.status !== "rejected") : campaigns}
            searchPlaceholder="Filter campaigns by title..."
          />`,
  `            data={navTab === "pending_campaigns" ? campaigns.filter(c => c.status !== "active" && c.status !== "rejected") : campaigns}
            searchPlaceholder="Filter campaigns by title..."
          />
          )}`
);

content = content.replace(
  `            <AdvancedTable
              title="Featured Stories Board"`,
  `            {(navTab === "overview" || navTab === "homepage") && (
            <AdvancedTable
              title="Featured Stories Board"`
);

content = content.replace(
  `            data={campaigns.filter(c => c.isFeatured || c.status === "completed")}
            searchPlaceholder="Search campaigns to feature..."
          />`,
  `            data={campaigns.filter(c => c.isFeatured || c.status === "completed")}
            searchPlaceholder="Search campaigns to feature..."
          />
          )}`
);

content = content.replace(
  '{(navTab === "overview" || navTab === "maintenance") && (',
  '{(navTab === "overview" || navTab === "maintenance") && ('
);


fs.writeFileSync(file, content);
console.log("Replaced perfectly!");
