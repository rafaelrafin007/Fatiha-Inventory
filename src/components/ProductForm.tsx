export default function ProductForm() {
  return (
    <form className="card" style={{ display: "grid", gap: 14 }}>
      <div className="form-grid">
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Product name
          </div>
          <input className="input" placeholder="Wireless Scanner" />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            SKU
          </div>
          <input className="input" placeholder="FT-1029" />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Category
          </div>
          <input className="input" placeholder="Equipment" />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Reorder level
          </div>
          <input className="input" placeholder="25" type="number" />
        </label>
      </div>
      <button className="button" type="button">
        Save product
      </button>
    </form>
  );
}
