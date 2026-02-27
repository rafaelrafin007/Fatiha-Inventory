"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import T from "@/components/T";

export default function ProductForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [reorderLevel, setReorderLevel] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = supabaseBrowser();
    const { error: insertError } = await supabase.from("products").insert({
      name,
      sku,
      category: category || null,
      reorder_level: Number(reorderLevel || 0),
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setName("");
    setSku("");
    setCategory("");
    setReorderLevel("0");
    router.refresh();
  };

  return (
    <form className="card" style={{ display: "grid", gap: 14 }} onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            <T k="productName" />
          </div>
          <input
            className="input"
            placeholder="Wireless Scanner"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            <T k="sku" />
          </div>
          <input
            className="input"
            placeholder="FT-1029"
            value={sku}
            onChange={(event) => setSku(event.target.value)}
            required
          />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            <T k="category" />
          </div>
          <input
            className="input"
            placeholder="Equipment"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            <T k="reorderLevel" />
          </div>
          <input
            className="input"
            placeholder="25"
            type="number"
            min={0}
            value={reorderLevel}
            onChange={(event) => setReorderLevel(event.target.value)}
          />
        </label>
      </div>
      {error ? (
        <div className="subtle" style={{ color: "var(--danger)" }}>
          {error}
        </div>
      ) : null}
      <button className="button" type="submit" disabled={loading}>
        {loading ? "Saving..." : <T k="saveProduct" />}
      </button>
    </form>
  );
}
