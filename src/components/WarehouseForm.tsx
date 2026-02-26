export default function WarehouseForm() {
  return (
    <form className="card" style={{ display: "grid", gap: 14 }}>
      <div className="form-grid">
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Warehouse name
          </div>
          <input className="input" placeholder="Central Depot" />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Location
          </div>
          <input className="input" placeholder="Lagos" />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Manager
          </div>
          <input className="input" placeholder="A. Yusuf" />
        </label>
      </div>
      <button className="button" type="button">
        Save warehouse
      </button>
    </form>
  );
}
