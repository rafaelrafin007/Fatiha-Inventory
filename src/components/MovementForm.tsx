"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import type { Product, Warehouse } from "@/lib/db";

type MovementFormProps = {
  products: Product[];
  warehouses: Warehouse[];
};

export default function MovementForm({ products, warehouses }: MovementFormProps) {
  const router = useRouter();
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [warehouseId, setWarehouseId] = useState(warehouses[0]?.id ?? "");
  const [type, setType] = useState<"Inbound" | "Outbound" | "Transfer">("Inbound");
  const [quantity, setQuantity] = useState("1");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = supabaseBrowser();
    const { error: insertError } = await supabase.from("movements").insert({
      product_id: productId,
      warehouse_id: warehouseId,
      type,
      quantity: Number(quantity || 0),
      notes: notes || null,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setNotes("");
    setQuantity("1");
    router.refresh();
  };

  const hasDependencies = products.length > 0 && warehouses.length > 0;

  return (
    <form className="card" style={{ display: "grid", gap: 14 }} onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Product
          </div>
          <select
            className="select"
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
            disabled={!products.length}
            required
          >
            {products.length ? null : <option>No products yet</option>}
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Warehouse
          </div>
          <select
            className="select"
            value={warehouseId}
            onChange={(event) => setWarehouseId(event.target.value)}
            disabled={!warehouses.length}
            required
          >
            {warehouses.length ? null : <option>No warehouses yet</option>}
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Movement type
          </div>
          <select
            className="select"
            value={type}
            onChange={(event) =>
              setType(event.target.value as "Inbound" | "Outbound" | "Transfer")
            }
          >
            <option>Inbound</option>
            <option>Outbound</option>
            <option>Transfer</option>
          </select>
        </label>
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            Quantity
          </div>
          <input
            className="input"
            placeholder="50"
            type="number"
            min={1}
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
      </div>
      <label>
        <div className="subtle" style={{ marginBottom: 6 }}>
          Notes
        </div>
        <textarea
          className="textarea"
          placeholder="Reason for movement"
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </label>
      {!hasDependencies ? (
        <div className="subtle" style={{ color: "var(--warning)" }}>
          Add at least one product and warehouse first.
        </div>
      ) : null}
      {error ? (
        <div className="subtle" style={{ color: "var(--danger)" }}>
          {error}
        </div>
      ) : null}
      <button className="button" type="submit" disabled={loading || !hasDependencies}>
        {loading ? "Saving..." : "Record movement"}
      </button>
    </form>
  );
}
