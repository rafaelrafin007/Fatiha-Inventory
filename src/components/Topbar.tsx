export default function Topbar() {
  return (
    <header className="topbar">
      <div>
        <div className="subtle" style={{ fontSize: 12, letterSpacing: 1 }}>
          INVENTORY CONTROL
        </div>
        <div className="page-title">Dashboard</div>
      </div>
      <div className="topbar-actions">
        <input className="input" placeholder="Search products or SKU" />
        <div className="topbar-user">
          <div className="topbar-avatar">FA</div>
          <div>
            <div style={{ fontWeight: 600 }}>Fatiha Admin</div>
            <div className="subtle" style={{ fontSize: 12 }}>
              admin@fatiha.org
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
