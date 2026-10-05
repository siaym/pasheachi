const fs = require('fs');

const file = 'src/app/admin/client.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. SUPER ADMIN: Stop tables from rendering on 'overview'
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

// 2. FINANCE: Make verification queue show on overview as well
content = content.replace(
  /\{\(navTab === "verification_queue"\) && \(/g,
  `{(navTab === "overview" || navTab === "verification_queue") && (`
);
// Wait, Finance doesn't have an explicit verification_queue check, it might just be a fallback or it's wrapped in something else. 
// Let's check how the table is rendered for finance first.
