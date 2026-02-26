import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function LoginPage() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/dashboard");
  }

  return (
    <main className="container" style={{ padding: "72px 0" }}>
      <div className="card" style={{ maxWidth: 480, margin: "0 auto" }}>
        <span className="badge">Fatiha Inventory</span>
        <h1 className="hero-title">Welcome back</h1>
        <p className="subtle">
          Sign in to manage products, warehouses, and stock movements.
        </p>
        <LoginForm />
        <p className="subtle" style={{ marginTop: 18 }}>
          Demo mode: connect Supabase auth to enable real sign-in.
        </p>
      </div>
    </main>
  );
}
