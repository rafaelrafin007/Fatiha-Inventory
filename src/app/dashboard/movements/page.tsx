import Link from "next/link";
import DataTable from "@/components/DataTable";
import { listMovements } from "@/lib/db";
import T from "@/components/T";

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
          <h1 className="page-title">
            <T k="movements" />
          </h1>
          <p className="subtle">
            <T k="trackMovements" />
          </p>
        </div>
        <Link href="/dashboard/movements/new" className="button">
          <T k="newMovement" />
        </Link>
      </section>

      <section className="page-section">
        <DataTable columns={columns} rows={rows} />
      </section>
    </main>
  );
}
