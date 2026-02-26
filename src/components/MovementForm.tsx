export default function MovementForm() {
  return (
    <form className="card" style={{ display: "grid", gap: 14 }}>
      <div className="form-grid">
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Product
          </div>
          <input className="input" placeholder="Medical Kit" />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Warehouse
          </div>
          <input className="input" placeholder="Main Depot" />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Movement type
          </div>
          <select className="select">
            <option>Inbound</option>
            <option>Outbound</option>
            <option>Transfer</option>
          </select>
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Quantity
          </div>
          <input className="input" placeholder="50" type="number" />
        </label>
      </div>
      <label>
        <div className="subtle" style={{ marginBottom: 6 }}>
          Notes
        </div>
        <textarea className="textarea" placeholder="Reason for movement" rows={3} />
      </label>
      <button className="button" type="button">
        Record movement
      </button>
    </form>
  );
}
