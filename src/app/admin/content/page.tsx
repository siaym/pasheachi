export const dynamic = "force-dynamic";

export default function ContentAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Content & CMS</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Manage featured campaigns, homepage banners, and emails.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">CMS Manager coming soon</h3>
        <p className="text-sm text-slate-500 mt-2">The new isolated CMS environment is being prepared.</p>
      </div>
    </div>
  );
}
