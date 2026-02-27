import Link from "next/link";
import MovementForm from "@/components/MovementForm";
import { listProducts, listWarehouses } from "@/lib/db";
import T from "@/components/T";

export default async function NewMovementPage() {
  const [products, warehouses] = await Promise.all([
    listProducts(),
    listWarehouses(),
  ]);

  return (
    <main>
      <section className="page-section">
        <Link href="/dashboard/movements" className="subtle">
          <T k="backToMovements" />
        </Link>
        <h1 className="page-title" style={{ marginTop: 12 }}>
          <T k="recordMovement" />
        </h1>
        <p className="subtle">
          <T k="trackMovements" />
        </p>
      </section>

      <section className="page-section">
        <MovementForm products={products} warehouses={warehouses} />
      </section>
    </main>
  );
}
