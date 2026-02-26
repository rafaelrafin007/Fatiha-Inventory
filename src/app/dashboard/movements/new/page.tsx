import Link from "next/link";
import MovementForm from "@/components/MovementForm";

export default function NewMovementPage() {
  return (
    <main>
      <section className="page-section">
        <Link href="/dashboard/movements" className="subtle">
          {"<-"} Back to movements
        </Link>
        <h1 className="page-title" style={{ marginTop: 12 }}>
          Record movement
        </h1>
        <p className="subtle">Log stock flow between sites.</p>
      </section>

      <section className="page-section">
        <MovementForm />
      </section>
    </main>
  );
}
