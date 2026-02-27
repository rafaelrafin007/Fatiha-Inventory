import T from "@/components/T";

const reports = [
  { title: "Low stock report", description: "Items below reorder threshold" },
  { title: "Movement summary", description: "Monthly inbound/outbound totals" },
  { title: "Warehouse utilization", description: "Capacity vs. usage" },
];

export default function ReportsPage() {
  return (
    <main>
      <section className="page-section">
        <h1 className="page-title">
          <T k="reports" />
        </h1>
        <p className="subtle">
          <T k="reportsSubtext" />
        </p>
      </section>

      <section className="page-section" style={{ display: "grid", gap: 12 }}>
        {reports.map((report) => (
          <div key={report.title} className="card">
            <h3 style={{ marginTop: 0 }}>{report.title}</h3>
            <p className="subtle">{report.description}</p>
            <button className="button" type="button">
              Generate report
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
