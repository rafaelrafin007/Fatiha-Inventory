import DataTable from "@/components/DataTable";
import ExpenseForm from "@/components/ExpenseForm";
import { listExpenses } from "@/lib/db";
import T from "@/components/T";

export default async function ExpensesPage() {
  const rows = await listExpenses();

  const columns = [
    { key: "note", header: "Description" },
    { key: "amount", header: "Amount" },
    { key: "created_at", header: "Date" },
  ];

  return (
    <main>
      <section className="page-section">
        <h1 className="page-title">
          <T k="expenses" />
        </h1>
        <p className="subtle">
          <T k="trackExpenses" />
        </p>
      </section>

      <section className="page-section">
        <DataTable columns={columns} rows={rows} />
      </section>

      <section className="page-section">
        <h2 style={{ marginTop: 0 }}>
          <T k="recordExpense" />
        </h2>
        <ExpenseForm />
      </section>
    </main>
  );
}
