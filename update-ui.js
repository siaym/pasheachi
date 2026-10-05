const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/admin/layout.tsx',
  'src/app/admin/client.tsx',
  'src/components/back-office/advanced-table.tsx'
];

const replacements = [
  // Backgrounds
  { search: /bg-\[\#F7F4ED\]/g, replace: 'bg-slate-50' },
  { search: /bg-\[\#FAF8F3\]/g, replace: 'bg-white' },
  { search: /bg-\[\#1D2927\]/g, replace: 'bg-slate-900' },
  { search: /bg-\[\#A84D2A\]/g, replace: 'bg-blue-600' },
  { search: /bg-\[\#355C52\]/g, replace: 'bg-emerald-600' },
  { search: /bg-\[\#FDF4F0\]/g, replace: 'bg-blue-50' },
  { search: /bg-\[\#E5EEE8\]/g, replace: 'bg-emerald-50' },
  { search: /bg-\[\#EAE5DB\]/g, replace: 'bg-slate-100' },
  { search: /bg-\[\#2F3E3B\]/g, replace: 'bg-slate-800' },

  // Text Colors
  { search: /text-\[\#1D2927\]/g, replace: 'text-slate-900' },
  { search: /text-\[\#F7F4ED\]/g, replace: 'text-white' },
  { search: /text-\[\#FAF8F3\]/g, replace: 'text-white' },
  { search: /text-\[\#D9D3C7\]/g, replace: 'text-slate-300' },
  { search: /text-\[\#53605C\]/g, replace: 'text-slate-500' },
  { search: /text-\[\#8C7A5B\]/g, replace: 'text-slate-400' },
  { search: /text-\[\#A84D2A\]/g, replace: 'text-blue-600' },
  { search: /text-\[\#355C52\]/g, replace: 'text-emerald-700' },

  // Borders
  { search: /border-\[\#D9D3C7\]/g, replace: 'border-slate-200' },
  { search: /border-\[\#1D2927\]/g, replace: 'border-slate-900' },
  { search: /border-\[\#A84D2A\]/g, replace: 'border-blue-600' },
  { search: /border-\[\#355C52\]/g, replace: 'border-emerald-600' },
  { search: /border-\[\#53605C\]/g, replace: 'border-slate-600' },
  { search: /border-\[\#EAE5DB\]/g, replace: 'border-slate-200' },
  { search: /divide-\[\#D9D3C7\]/g, replace: 'divide-slate-200' },

  // Hover states
  { search: /hover:bg-\[\#F7F4ED\]/g, replace: 'hover:bg-slate-50' },
  { search: /hover:bg-\[\#FAF8F3\]/g, replace: 'hover:bg-white' },
  { search: /hover:bg-\[\#1D2927\]/g, replace: 'hover:bg-slate-900' },
  { search: /hover:bg-\[\#A84D2A\]/g, replace: 'hover:bg-blue-700' },
  { search: /hover:bg-\[\#355C52\]/g, replace: 'hover:bg-emerald-700' },
  { search: /hover:bg-\[\#FDF4F0\]/g, replace: 'hover:bg-blue-100' },
  { search: /hover:border-\[\#D9D3C7\]/g, replace: 'hover:border-slate-300' },
  { search: /hover:text-\[\#1D2927\]/g, replace: 'hover:text-slate-900' },
  { search: /hover:text-\[\#FAF8F3\]/g, replace: 'hover:text-white' },

  // Typography
  { search: /font-editorial/g, replace: 'font-sans font-semibold tracking-tight' },
  { search: /font-mono text-\[10px\] font-bold uppercase tracking-widest/g, replace: 'text-xs font-semibold uppercase tracking-wider text-slate-500' },
  { search: /font-mono text-\[9px\] font-bold uppercase tracking-widest/g, replace: 'text-[10px] font-semibold uppercase tracking-wider text-slate-500' },
  { search: /font-mono text-\[10px\] uppercase font-bold/g, replace: 'text-xs font-semibold uppercase tracking-wider text-slate-500' },
  { search: /font-mono text-\[9px\] uppercase font-bold/g, replace: 'text-[10px] font-semibold uppercase tracking-wider text-slate-500' },
  { search: /font-mono text-\[10px\] uppercase/g, replace: 'text-xs font-medium uppercase tracking-wider' },
  { search: /font-mono text-\[9px\] uppercase/g, replace: 'text-[10px] font-medium uppercase tracking-wider' },
  { search: /font-mono text-[9px]/g, replace: 'text-xs font-medium' },
  { search: /font-mono text-\[10px\]/g, replace: 'text-sm font-medium' },
  { search: /font-mono text-xs/g, replace: 'text-sm font-medium' },
  { search: /uppercase tracking-widest/g, replace: 'uppercase tracking-wider' },

  // Shapes & borders (removing brutalist hard edges)
  { search: /border-2 border-\[\#1D2927\]/g, replace: 'border border-slate-200 rounded-xl shadow-sm' },
  { search: /border border-slate-900/g, replace: 'border border-slate-200 rounded-lg shadow-sm' },
  
  // Specific fixes
  { search: /bg-slate-900 text-slate-300/g, replace: 'bg-slate-900 text-slate-100' },
  { search: /shadow-paper/g, replace: 'shadow-md rounded-xl' },
  { search: /p-3 bg-blue-50 border border-blue-600/g, replace: 'p-4 bg-white border border-slate-200 rounded-lg shadow-sm' },
  { search: /p-3 bg-slate-50 border border-slate-200/g, replace: 'p-4 bg-white border border-slate-200 rounded-lg shadow-sm' },
  { search: /p-3 bg-emerald-50 border border-emerald-600/g, replace: 'p-4 bg-white border border-slate-200 rounded-lg shadow-sm' }
];

filesToUpdate.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  replacements.forEach(({search, replace}) => {
    content = content.replace(search, replace);
  });
  
  // Add some global rounded corners to buttons
  content = content.replace(/className="(.*?button.*?)"/g, (match, p1) => {
    if (!p1.includes('rounded')) {
      return `className="${p1} rounded-md"`;
    }
    return match;
  });

  // Convert AdvancedTable PaperLifts to normal divs to stop the bouncy brutalist effect
  content = content.replace(/<PaperLift className="(.*?bg-slate-50 border border-slate-200.*?)"/g, '<div className="$1 rounded-xl shadow-sm"');
  content = content.replace(/<\/PaperLift>/g, '</div>');
  content = content.replace(/<PaperLift/g, '<div');
  
  fs.writeFileSync(fullPath, content);
  console.log(`Updated ${file}`);
});
