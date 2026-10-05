const fs = require('fs');

const file1 = 'src/lib/back-office/workspaces.ts';
let c1 = fs.readFileSync(file1, 'utf8');

c1 = c1.replace(/\s*\|\s*"TRUST_SAFETY"/g, '');
c1 = c1.replace(/\s*\|\s*"SUPPORT"/g, '');
c1 = c1.replace(/\s*\|\s*"ANALYTICS"/g, '');

c1 = c1.replace(/\s*TRUST_SAFETY:\s*\{[\s\S]*?\},(?=\s*SUPPORT)/, '');
c1 = c1.replace(/\s*SUPPORT:\s*\{[\s\S]*?\},(?=\s*ANALYTICS)/, '');
c1 = c1.replace(/\s*ANALYTICS:\s*\{[\s\S]*?\},(?=\s*CONTENT)/, '');

fs.writeFileSync(file1, c1);
console.log('Removed from workspaces.ts');

const file2 = 'src/app/admin/client.tsx';
let c2 = fs.readFileSync(file2, 'utf8');

c2 = c2.replace(/\s*\{\/\*\s*WORKSPACE 4: TRUST & SAFETY\s*\*\/\}[\s\S]*?\{\/\*\s*WORKSPACE 5: SUPPORT\s*\*\/\}/, '\n      {/* WORKSPACE 5: SUPPORT */}');
c2 = c2.replace(/\s*\{\/\*\s*WORKSPACE 5: SUPPORT\s*\*\/\}[\s\S]*?\{\/\*\s*WORKSPACE 6: ANALYTICS\s*\*\/\}/, '\n      {/* WORKSPACE 6: ANALYTICS */}');
c2 = c2.replace(/\s*\{\/\*\s*WORKSPACE 6: ANALYTICS\s*\*\/\}[\s\S]*?\{\/\*\s*WORKSPACE 7: CONTENT\s*\*\/\}/, '\n      {/* WORKSPACE 7: CONTENT */}');

fs.writeFileSync(file2, c2);
console.log('Removed from client.tsx');
