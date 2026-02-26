"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function WarehouseForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [manager, setManager] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = supabaseBrowser();
    const { error: insertError } = await supabase.from("warehouses").insert({
      name,
      location: location || null,
      manager: manager || null,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setName("");
    setLocation("");
    setManager("");
    router.refresh();
  };

  return (
    <form className="card" style={{ display: "grid", gap: 14 }} onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Warehouse name
          </div>
          <input
            className="input"
            placeholder="Central Depot"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Location
          </div>
          <input
            className="input"
            placeholder="Lagos"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Manager
          </div>
          <input
            className="input"
            placeholder="A. Yusuf"
            value={manager}
            onChange={(event) => setManager(event.target.value)}
          />
        </label>
      </div>
      {error ? (
        <div className="subtle" style={{ color: "var(--danger)" }}>
          {error}
        </div>
      ) : null}
      <button className="button" type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save warehouse"}
      </button>
    </form>
  );
}
