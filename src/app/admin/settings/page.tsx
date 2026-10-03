export const dynamic = "force-dynamic";

export default function SettingsAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Platform Settings</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Configure feature flags, maintenance mode, and security policies.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Settings dashboard coming soon</h3>
        <p className="text-sm text-slate-500 mt-2">The configuration center is being migrated.</p>
      </div>
    </div>
  );
}
