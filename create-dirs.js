const fs = require('fs');
const path = require('path');

const dirs = [
  'src/app/admin/campaigns',
  'src/app/admin/finance',
  'src/app/admin/content',
  'src/app/admin/settings',
  'src/app/admin/users',
  'src/components/admin-redesign'
];

dirs.forEach(d => {
  fs.mkdirSync(path.join(__dirname, d), { recursive: true });
});

console.log('Directories created!');
