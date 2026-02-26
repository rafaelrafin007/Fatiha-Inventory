import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

type PageProps = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: PageProps) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("products")
    .select("id, name, sku, category, reorder_level")
    .eq("id", params.id)
    .single();

  return (
    <main>
      <section className="page-section">
        <Link href="/dashboard/products" className="subtle">
          {"<-"} Back to products
        </Link>
        <h1 className="page-title" style={{ marginTop: 12 }}>
          {data?.name ?? "Product details"}
        </h1>
        <p className="subtle">
          {data ? `SKU: ${data.sku}` : "Detailed stock history and movement log."}
        </p>
      </section>

      <section className="card">
        <div className="kpi-grid">
          <div className="kpi">
            <div className="subtle">Category</div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{data?.category ?? "-"}</div>
          </div>
          <div className="kpi">
            <div className="subtle">Reorder level</div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{data?.reorder_level ?? 0}</div>
          </div>
          <div className="kpi">
            <div className="subtle">Product ID</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{data?.id ?? "-"}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
