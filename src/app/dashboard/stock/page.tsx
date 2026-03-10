import DataTable from "@/components/DataTable";
import { getStockSummary } from "@/lib/db";
import T from "@/components/T";

export default async function StockPage() {
  const rows = await getStockSummary();
  const totalValue = rows.reduce((sum, row) => sum + Number(row.value || 0), 0);

  const columns = [
    { key: "name", header: "Product" },
    { key: "sku", header: "SKU" },
    { key: "stock", header: "Stock" },
    { key: "avg_cost", header: "Avg cost" },
    { key: "value", header: "Value" },
  ];

  return (
    <main>
      <section className="page-section">
        <h1 className="page-title">
          <T k="stock" />
        </h1>
        <p className="subtle">
          <T k="trackStockValue" />
        </p>
      </section>

      <section className="kpi-grid">
        <div className="kpi">
          <div className="subtle" style={{ fontSize: 12 }}>
            <T k="remainingValue" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>
            {totalValue}
          </div>
        </div>
      </section>

      <section className="page-section">
        <DataTable columns={columns} rows={rows} />
      </section>
    </main>
  );
}
