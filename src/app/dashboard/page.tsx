import { supabaseServer } from "@/lib/supabaseServer";

export default async function DashboardPage() {
  const supabase = await supabaseServer();

  const [{ count: productCount }, { count: warehouseCount }, { count: movementCount }] =
    await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("warehouses").select("id", { count: "exact", head: true }),
      supabase.from("movements").select("id", { count: "exact", head: true }),
    ]);

  const kpis = [
    { label: "Active products", value: productCount ?? 0, trend: "Live" },
    { label: "Warehouses", value: warehouseCount ?? 0, trend: "Live" },
    { label: "Movements", value: movementCount ?? 0, trend: "Live" },
  ];

  return (
    <main>
      <section className="page-section">
        <h1 className="page-title">Inventory Overview</h1>
        <p className="subtle">
          Real-time snapshot of stock health, movement velocity, and warehouse coverage.
        </p>
      </section>

      <section className="kpi-grid">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="kpi">
            <div className="subtle" style={{ fontSize: 12 }}>
              {kpi.label}
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, marginTop: 8 }}>
              {kpi.value}
            </div>
            <div className="badge" style={{ marginTop: 8 }}>
              {kpi.trend}
            </div>
          </div>
        ))}
      </section>

      <section className="page-section">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Next steps</h2>
          <p className="subtle">
            Add products and warehouses, then record movements to start tracking activity.
          </p>
        </div>
      </section>
    </main>
  );
}
