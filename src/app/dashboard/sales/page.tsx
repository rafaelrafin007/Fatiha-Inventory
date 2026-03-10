import DataTable from "@/components/DataTable";
import SaleForm from "@/components/SaleForm";
import { listProducts, listSales, listWarehouses } from "@/lib/db";
import T from "@/components/T";

export default async function SalesPage() {
  const [rows, products, warehouses] = await Promise.all([
    listSales(),
    listProducts(),
    listWarehouses(),
  ]);

  const totals = rows.reduce(
    (acc, row) => {
      const amount = Number(row.unit_price || 0) * Number(row.quantity || 0);
      if (row.payment_type === "Cash") acc.cash += amount;
      if (row.payment_type === "Credit") acc.credit += amount;
      if (row.sale_channel === "Retail") acc.retail += amount;
      if (row.sale_channel === "Wholesale") acc.wholesale += amount;
      return acc;
    },
    { cash: 0, credit: 0, retail: 0, wholesale: 0 }
  );

  const columns = [
    { key: "product", header: "Product" },
    { key: "warehouse", header: "Warehouse" },
    { key: "sale_channel", header: "Type" },
    { key: "payment_type", header: "Payment" },
    { key: "quantity", header: "Qty" },
    { key: "unit_price", header: "Unit price" },
    {
      key: "total",
      header: "Total",
      render: (row: (typeof rows)[number]) =>
        Number(row.unit_price || 0) * Number(row.quantity || 0),
    },
  ];

  return (
    <main>
      <section className="page-section">
        <h1 className="page-title">
          <T k="sales" />
        </h1>
        <p className="subtle">
          <T k="trackSales" />
        </p>
      </section>

      <section className="kpi-grid">
        <div className="kpi">
          <div className="subtle" style={{ fontSize: 12 }}>
            <T k="cashSales" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>
            {totals.cash}
          </div>
        </div>
        <div className="kpi">
          <div className="subtle" style={{ fontSize: 12 }}>
            <T k="creditSales" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>
            {totals.credit}
          </div>
        </div>
        <div className="kpi">
          <div className="subtle" style={{ fontSize: 12 }}>
            <T k="retailSales" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>
            {totals.retail}
          </div>
        </div>
        <div className="kpi">
          <div className="subtle" style={{ fontSize: 12 }}>
            <T k="wholesaleSales" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>
            {totals.wholesale}
          </div>
        </div>
      </section>

      <section className="page-section">
        <DataTable columns={columns} rows={rows} />
      </section>

      <section className="page-section">
        <h2 style={{ marginTop: 0 }}>
          <T k="recordSale" />
        </h2>
        <SaleForm products={products} warehouses={warehouses} />
      </section>
    </main>
  );
}
