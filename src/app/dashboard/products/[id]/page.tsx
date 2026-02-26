import Link from "next/link";

type PageProps = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <main>
      <section className="page-section">
        <Link href="/dashboard/products" className="subtle">
          {"<-"} Back to products
        </Link>
        <h1 className="page-title" style={{ marginTop: 12 }}>
          Product {params.id}
        </h1>
        <p className="subtle">Detailed stock history and movement log.</p>
      </section>

      <section className="card">
        <div className="kpi-grid">
          <div className="kpi">
            <div className="subtle">On hand</div>
            <div style={{ fontSize: 24, fontWeight: 600 }}>320</div>
          </div>
          <div className="kpi">
            <div className="subtle">Allocated</div>
            <div style={{ fontSize: 24, fontWeight: 600 }}>48</div>
          </div>
          <div className="kpi">
            <div className="subtle">Reorder level</div>
            <div style={{ fontSize: 24, fontWeight: 600 }}>60</div>
          </div>
        </div>
      </section>
    </main>
  );
}
