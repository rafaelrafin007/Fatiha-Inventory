const kpis = [
  { label: "Active products", value: "214", trend: "+12%" },
  { label: "Low stock alerts", value: "9", trend: "-3%" },
  { label: "Warehouses", value: "5", trend: "Stable" },
  { label: "Movements (30d)", value: "1,482", trend: "+18%" },
];

const movements = [
  { id: 1, product: "Medical Kit", qty: 120, type: "Inbound", site: "Central Depot" },
  { id: 2, product: "Water Filters", qty: 30, type: "Outbound", site: "Clinic East" },
  { id: 3, product: "Blankets", qty: 200, type: "Transfer", site: "Relief Hub" },
];

export default function DashboardPage() {
  return (
    <main>
      <section className="page-section">
        <h1 className="page-title">Inventory Overview</h1>
        <p className="subtle">
          Real-time snapshot of stock health, movement velocity, and warehouse
          coverage.
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
          <h2 style={{ marginTop: 0 }}>Latest movements</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {movements.map((move) => (
              <div
                key={move.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 12,
                  borderRadius: 12,
                  background: "rgba(255, 255, 255, 0.04)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{move.product}</div>
                  <div className="subtle" style={{ fontSize: 12 }}>
                    {move.site}
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{move.qty} units</div>
                  <div className="subtle" style={{ fontSize: 12 }}>
                    {move.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
