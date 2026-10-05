const fs = require('fs');

const files = [
  'src/app/admin/layout.tsx',
  'src/app/admin/finance/finance-client.tsx',
  'src/app/admin/campaigns/campaigns-client.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(f, content);
  console.log(`Fixed ${f}`);
});
