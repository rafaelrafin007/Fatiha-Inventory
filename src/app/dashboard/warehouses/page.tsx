import DataTable from "@/components/DataTable";
import WarehouseForm from "@/components/WarehouseForm";
import { listWarehouses } from "@/lib/db";

export default async function WarehousesPage() {
  const rows = await listWarehouses();

  const columns = [
    { key: "name", header: "Warehouse" },
    { key: "location", header: "Location" },
    { key: "manager", header: "Manager" },
  ];

  return (
    <main>
      <section className="page-section">
        <h1 className="page-title">Warehouses</h1>
        <p className="subtle">Track storage sites and local managers.</p>
      </section>

      <section className="page-section">
        <DataTable columns={columns} rows={rows} />
      </section>

      <section className="page-section">
        <h2 style={{ marginTop: 0 }}>Add warehouse</h2>
        <WarehouseForm />
      </section>
    </main>
  );
}
