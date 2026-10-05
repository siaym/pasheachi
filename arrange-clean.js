const fs = require('fs');

const file = 'src/app/admin/client.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. SUPER ADMIN clean up
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
  /<AdvancedTable\s*\n\s*title=\{navTab === "verification_queue"/g,
  `{(navTab === "overview" || navTab === "verification_queue" || navTab === "audit") && (\n            <AdvancedTable\n              title={navTab === "verification_queue"`
);
content = content.replace(
  /searchPlaceholder="Filter transactions by ID or donor name\.\.\."\s*\/>/g,
  `searchPlaceholder="Filter transactions by ID or donor name..."\n            />\n          )}`
);

// 3. MODERATION Campaigns Table
content = content.replace(
  /<AdvancedTable\s*\n\s*title="Campaign Approval Desk"/g,
  `{(navTab === "overview" || navTab === "pending_campaigns" || navTab === "log") && (\n            <AdvancedTable\n              title="Campaign Approval Desk"`
);
content = content.replace(
  /searchPlaceholder="Filter campaigns by title\.\.\."\s*\/>/g,
  `searchPlaceholder="Filter campaigns by title..."\n            />\n          )}`
);

// 4. CONTENT Featured Stories Table
content = content.replace(
  /<AdvancedTable\s*\n\s*title="Featured Stories Board"/g,
  `{(navTab === "overview" || navTab === "homepage") && (\n            <AdvancedTable\n              title="Featured Stories Board"`
);
content = content.replace(
  /searchPlaceholder="Search campaigns to feature\.\.\."\s*\/>/g,
  `searchPlaceholder="Search campaigns to feature..."\n            />\n          )}`
);

// 5. PLATFORM Config Maintenance Block
content = content.replace(
  /\{\(navTab === "overview" \|\| navTab === "maintenance"\) && \(/g,
  `{(navTab === "overview" || navTab === "maintenance") && (`
);

fs.writeFileSync(file, content);
console.log('Fixed exactly!');
