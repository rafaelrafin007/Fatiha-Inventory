import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { supabaseServer } from "@/lib/supabaseServer";
import T from "@/components/T";

export default async function LoginPage() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/dashboard");
  }

  return (
    <main className="container" style={{ padding: "72px 0" }}>
      <div className="card" style={{ maxWidth: 480, margin: "0 auto" }}>
        <span className="badge">
          <T k="appName" />
        </span>
        <h1 className="hero-title">
          <T k="welcomeBack" />
        </h1>
        <p className="subtle">
          <T k="trackStock" />
        </p>
        <LoginForm />
        <p className="subtle" style={{ marginTop: 18 }}>
          <T k="demoMode" />
        </p>
      </div>
    </main>
  );
}
