import DataTable from "@/components/DataTable";
import PurchaseForm from "@/components/PurchaseForm";
import { listProducts, listPurchases, listWarehouses } from "@/lib/db";
import T from "@/components/T";

export default async function PurchasesPage() {
  const [rows, products, warehouses] = await Promise.all([
    listPurchases(),
    listProducts(),
    listWarehouses(),
  ]);

  const columns = [
    { key: "product", header: "Product" },
    { key: "warehouse", header: "Warehouse" },
    { key: "quantity", header: "Qty" },
    { key: "unit_cost", header: "Unit cost" },
    {
      key: "total",
      header: "Total",
      render: (row: (typeof rows)[number]) =>
        Number(row.unit_cost || 0) * Number(row.quantity || 0),
    },
  ];

  return (
    <main>
      <section className="page-section">
        <h1 className="page-title">
          <T k="purchases" />
        </h1>
        <p className="subtle">
          <T k="trackPurchases" />
        </p>
      </section>

      <section className="page-section">
        <DataTable columns={columns} rows={rows} />
      </section>

      <section className="page-section">
        <h2 style={{ marginTop: 0 }}>
          <T k="recordPurchase" />
        </h2>
        <PurchaseForm products={products} warehouses={warehouses} />
      </section>
    </main>
  );
}
