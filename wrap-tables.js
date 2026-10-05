const fs = require('fs');

const file = 'src/app/admin/client.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Clean up SUPER ADMIN conditions
content = content.replace(
  /\{\(navTab === "overview" \|\| navTab === "campaigns"\) && \(/g,
  `{(navTab === "campaigns") && (`
);
content = content.replace(
  /\{\(navTab === "overview" \|\| navTab === "creators"\) && \(/g,
  `{(navTab === "creators") && (`
);
content = content.replace(
  /\{\(navTab === "overview" \|\| navTab === "audit_logs"\) && \(/g,
  `{(navTab === "audit_logs") && (`
);
content = content.replace(
  /\{\(navTab === "overview" \|\| navTab === "flags"\) && \(/g,
  `{(navTab === "flags") && (`
);

// 2. FINANCE Verification Table
content = content.replace(
  /(<AdvancedTable[\s\S]*?title=\{navTab === "verification_queue" \? "Pending Verifications Queue" : "MFS Verification Ledger"\}[\s\S]*?searchPlaceholder="Filter transactions by ID or donor name\.\.\."\s*\/>)/,
  `{(navTab === "overview" || navTab === "verification_queue" || navTab === "audit") && ($1)}`
);

// 3. MODERATION Campaigns Table
content = content.replace(
  /(<AdvancedTable[\s\S]*?title="Campaign Approval Desk"[\s\S]*?searchPlaceholder="Filter campaigns by title\.\.\."\s*\/>)/,
  `{(navTab === "overview" || navTab === "pending_campaigns" || navTab === "log") && ($1)}`
);

// 4. CONTENT Featured Stories Table
content = content.replace(
  /(<AdvancedTable[\s\S]*?title="Featured Stories Board"[\s\S]*?searchPlaceholder="Search campaigns to feature\.\.\."\s*\/>)/,
  `{(navTab === "overview" || navTab === "homepage") && ($1)}`
);

// 5. PLATFORM Config Maintenance Block
content = content.replace(
  /\{\(navTab === "overview" \|\| navTab === "maintenance"\) && \(/g,
  `{(navTab === "overview" || navTab === "maintenance") && (`
);

fs.writeFileSync(file, content);
console.log("Successfully wrapped tables!");
