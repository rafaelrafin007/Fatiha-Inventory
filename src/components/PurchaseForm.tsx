"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import type { Product, Warehouse } from "@/lib/db";
import T from "@/components/T";

type PurchaseFormProps = {
  products: Product[];
  warehouses: Warehouse[];
};

export default function PurchaseForm({ products, warehouses }: PurchaseFormProps) {
  const router = useRouter();
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [warehouseId, setWarehouseId] = useState(warehouses[0]?.id ?? "");
  const [quantity, setQuantity] = useState("1");
  const [unitCost, setUnitCost] = useState("0");
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
      type: "Inbound",
      quantity: Number(quantity || 0),
      unit_cost: Number(unitCost || 0),
      notes: notes || null,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setNotes("");
    setQuantity("1");
    setUnitCost("0");
    router.refresh();
  };

  const hasDependencies = products.length > 0 && warehouses.length > 0;

  return (
    <form className="card" style={{ display: "grid", gap: 14 }} onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            <T k="products" />
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
            <T k="warehouses" />
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
            <T k="quantity" />
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
        <label>
          <div className="subtle" style={{ marginBottom: 6 }}>
            <T k="unitCost" />
          </div>
          <input
            className="input"
            placeholder="150"
            type="number"
            min={0}
            value={unitCost}
            onChange={(event) => setUnitCost(event.target.value)}
          />
        </label>
      </div>
      <label>
        <div className="subtle" style={{ marginBottom: 6 }}>
          <T k="notes" />
        </div>
        <textarea
          className="textarea"
          placeholder="Vendor or notes"
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </label>
      {!hasDependencies ? (
        <div className="subtle" style={{ color: "var(--warning)" }}>
          <T k="addFirst" />
        </div>
      ) : null}
      {error ? (
        <div className="subtle" style={{ color: "var(--danger)" }}>
          {error}
        </div>
      ) : null}
      <button className="button" type="submit" disabled={loading || !hasDependencies}>
        {loading ? "Saving..." : <T k="savePurchase" />}
      </button>
    </form>
  );
}
