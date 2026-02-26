import DataTable from "@/components/DataTable";
import ProductForm from "@/components/ProductForm";

const rows = [
  {
    id: "P-100",
    name: "Medical Kit",
    sku: "MED-100",
    category: "Relief",
    stock: 420,
  },
  {
    id: "P-101",
    name: "Water Filter",
    sku: "WAT-244",
    category: "Hygiene",
    stock: 88,
  },
  {
    id: "P-102",
    name: "Blanket",
    sku: "BLK-013",
    category: "Shelter",
    stock: 1200,
  },
];

const columns = [
  { key: "name", header: "Product" },
  { key: "sku", header: "SKU" },
  { key: "category", header: "Category" },
  { key: "stock", header: "Stock" },
];

export default function ProductsPage() {
  return (
    <main>
      <section className="page-section">
        <h1 className="page-title">Products</h1>
        <p className="subtle">Track stock levels and reorder thresholds.</p>
      </section>

      <section className="page-section">
        <DataTable columns={columns} rows={rows} />
      </section>

      <section className="page-section">
        <h2 style={{ marginTop: 0 }}>Add product</h2>
        <ProductForm />
      </section>
    </main>
  );
}
