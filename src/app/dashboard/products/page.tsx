import Link from "next/link";
import DataTable from "@/components/DataTable";
import ProductForm from "@/components/ProductForm";
import { listProducts } from "@/lib/db";

export default async function ProductsPage() {
  const rows = await listProducts();

  const columns = [
    {
      key: "name",
      header: "Product",
      render: (row: (typeof rows)[number]) => (
        <Link href={`/dashboard/products/${row.id}`}>{row.name}</Link>
      ),
    },
    { key: "sku", header: "SKU" },
    { key: "category", header: "Category" },
    { key: "reorder_level", header: "Reorder" },
  ];

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
