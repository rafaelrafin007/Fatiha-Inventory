import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar />
        <div className="dashboard-main">{children}</div>
      </div>
    </div>
  );
}
