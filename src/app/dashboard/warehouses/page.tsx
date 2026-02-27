import DataTable from "@/components/DataTable";
import WarehouseForm from "@/components/WarehouseForm";
import { listWarehouses } from "@/lib/db";
import T from "@/components/T";

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
        <h1 className="page-title">
          <T k="warehouses" />
        </h1>
        <p className="subtle">
          <T k="trackWarehouses" />
        </p>
      </section>

      <section className="page-section">
        <DataTable columns={columns} rows={rows} />
      </section>

      <section className="page-section">
        <h2 style={{ marginTop: 0 }}>
          <T k="addWarehouse" />
        </h2>
        <WarehouseForm />
      </section>
    </main>
  );
}
