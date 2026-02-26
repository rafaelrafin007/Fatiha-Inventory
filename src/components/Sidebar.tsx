import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/warehouses", label: "Warehouses" },
  { href: "/dashboard/movements", label: "Movements" },
  { href: "/dashboard/reports", label: "Reports" },
  { href: "/dashboard/users", label: "Users" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <div className="sidebar-logo">FI</div>
          <div>
            <div style={{ fontWeight: 600 }}>Fatiha Inventory</div>
            <div className="subtle" style={{ fontSize: 12 }}>
              Ops Console
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="sidebar-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="subtle" style={{ fontSize: 12 }}>
          Status
        </div>
        <div style={{ fontWeight: 600 }}>All systems healthy</div>
      </div>
    </aside>
  );
}
