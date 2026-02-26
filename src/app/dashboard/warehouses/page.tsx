import DataTable from "@/components/DataTable";
import WarehouseForm from "@/components/WarehouseForm";

const rows = [
  { id: "W-01", name: "Central Depot", location: "Lagos", manager: "A. Yusuf" },
  { id: "W-02", name: "Relief Hub", location: "Abuja", manager: "H. Sule" },
  { id: "W-03", name: "Clinic East", location: "Kano", manager: "N. Abdullahi" },
];

const columns = [
  { key: "name", header: "Warehouse" },
  { key: "location", header: "Location" },
  { key: "manager", header: "Manager" },
];

export default function WarehousesPage() {
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
