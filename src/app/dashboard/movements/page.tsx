import Link from "next/link";
import DataTable from "@/components/DataTable";

const rows = [
  {
    id: "M-900",
    product: "Medical Kit",
    type: "Inbound",
    qty: 120,
    warehouse: "Central Depot",
  },
  {
    id: "M-901",
    product: "Water Filter",
    type: "Outbound",
    qty: 30,
    warehouse: "Clinic East",
  },
  {
    id: "M-902",
    product: "Blanket",
    type: "Transfer",
    qty: 200,
    warehouse: "Relief Hub",
  },
];

const columns = [
  { key: "product", header: "Product" },
  { key: "type", header: "Type" },
  { key: "qty", header: "Qty" },
  { key: "warehouse", header: "Warehouse" },
];

export default function MovementsPage() {
  return (
    <main>
      <section className="page-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
