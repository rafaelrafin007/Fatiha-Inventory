import Link from "next/link";
import DataTable from "@/components/DataTable";
import { listMovements } from "@/lib/db";

export default async function MovementsPage() {
  const rows = await listMovements();

  const columns = [
    { key: "product", header: "Product" },
    { key: "warehouse", header: "Warehouse" },
    { key: "type", header: "Type" },
    { key: "quantity", header: "Qty" },
  ];

  return (
    <main>
      <section
        className="page-section"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <div>
          <h1 className="page-title">Movements</h1>
          <p className="subtle">Track inbound, outbound, and transfer logs.</p>
        </div>
        <Link href="/dashboard/movements/new" className="button">
          New movement
        </Link>
      </section>

      <section className="page-section">
        <DataTable columns={columns} rows={rows} />
      </section>
    </main>
  );
}
