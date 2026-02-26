import { supabaseServer } from "@/lib/supabaseServer";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string | null;
  reorder_level: number;
};

export type Warehouse = {
  id: string;
  name: string;
  location: string | null;
  manager: string | null;
};

export type Movement = {
  id: string;
  product: string;
  warehouse: string;
  type: "Inbound" | "Outbound" | "Transfer";
  quantity: number;
  created_at: string;
};

export async function listProducts(): Promise<Product[]> {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("products")
    .select("id, name, sku, category, reorder_level")
    .order("created_at", { ascending: false });

  return (data ?? []) as Product[];
}

export async function listWarehouses(): Promise<Warehouse[]> {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("warehouses")
    .select("id, name, location, manager")
    .order("created_at", { ascending: false });

  return (data ?? []) as Warehouse[];
}

export async function listMovements(): Promise<Movement[]> {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("movements")
    .select(
      "id, type, quantity, created_at, product:products(name), warehouse:warehouses(name)"
    )
    .order("created_at", { ascending: false });

  if (!data) return [];

  return data.map((row: any) => ({
    id: row.id,
    type: row.type,
    quantity: row.quantity,
    created_at: row.created_at,
    product: row.product?.name ?? "",
    warehouse: row.warehouse?.name ?? "",
  }));
}
