import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/SidebarProvider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="dashboard-shell">
        <Sidebar />
        <div className="dashboard-content">
          <Topbar />
          <div className="dashboard-main">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
