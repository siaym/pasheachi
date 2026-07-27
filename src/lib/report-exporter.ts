export function exportToCSV(filename: string, headers: string[], rows: (string | number)[][]) {
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printFormattedReport(title: string, headers: string[], rows: (string | number)[][]) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} — PasheAchi Dossier Report</title>
        <style>
          body { font-family: Georgia, serif; padding: 40px; color: #1D2927; background-color: #FAF8F3; }
          h1 { font-size: 24px; margin-bottom: 4px; border-bottom: 2px solid #1D2927; padding-bottom: 8px; }
          p { font-family: monospace; font-size: 11px; text-transform: uppercase; color: #8C7A5B; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-family: monospace; font-size: 12px; }
          th, td { border: 1px solid #D9D3C7; padding: 10px 14px; text-align: left; }
          th { background-color: #EAE5DB; text-transform: uppercase; font-size: 10px; letter-spacing: 1px; }
          tr:nth-child(even) { background-color: #F7F4ED; }
          .footer { margin-top: 40px; font-family: monospace; font-size: 10px; color: #53605C; border-top: 1px dashed #D9D3C7; padding-top: 12px; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <p>PASHEACHI OFFICIAL AUDIT DOSSIER • GENERATED ON ${new Date().toLocaleString()}</p>
        <table>
          <thead>
            <tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
        <div class="footer">PasheAchi Bangladesh — Community Crowdfunding Platform</div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
