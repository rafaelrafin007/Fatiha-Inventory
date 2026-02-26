export default function LoginPage() {
  return (
    <main className="container" style={{ padding: "72px 0" }}>
      <div className="card" style={{ maxWidth: 480, margin: "0 auto" }}>
        <span className="badge">Fatiha Inventory</span>
        <h1 className="hero-title">Welcome back</h1>
        <p className="subtle">
          Sign in to manage products, warehouses, and stock movements.
        </p>

        <form style={{ marginTop: 24, display: "grid", gap: 12 }}>
          <label>
            <div className="subtle" style={{ marginBottom: 6 }}>
              Email
            </div>
            <input className="input" type="email" placeholder="you@fatiha.org" />
          </label>
          <label>
            <div className="subtle" style={{ marginBottom: 6 }}>
              Password
            </div>
            <input className="input" type="password" placeholder="••••••••" />
          </label>
          <button className="button" type="button">
            Sign in
          </button>
        </form>

        <p className="subtle" style={{ marginTop: 18 }}>
          Demo mode: connect Supabase auth to enable real sign-in.
        </p>
      </div>
    </main>
  );
}
