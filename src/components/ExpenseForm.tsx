"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import T from "@/components/T";

export default function ExpenseForm() {
  const router = useRouter();
  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = supabaseBrowser();
    const { error: insertError } = await supabase.from("expenses").insert({
      amount: Number(amount || 0),
      note: note || null,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setNote("");
    setAmount("0");
    router.refresh();
  };

  return (
    <form className="card" style={{ display: "grid", gap: 14 }} onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            <T k="amount" />
          </div>
          <input
            className="input"
            placeholder="120"
            type="number"
            min={0}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            <T k="notes" />
          </div>
          <input
            className="input"
            placeholder="Transport, rent, utilities"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </label>
      </div>
      {error ? (
        <div className="subtle" style={{ color: "var(--danger)" }}>
          {error}
        </div>
      ) : null}
      <button className="button" type="submit" disabled={loading}>
        {loading ? "Saving..." : <T k="saveExpense" />}
      </button>
    </form>
  );
}
