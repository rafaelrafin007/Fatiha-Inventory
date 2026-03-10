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
  unit_cost?: number | null;
  unit_price?: number | null;
  sale_channel?: "Retail" | "Wholesale" | null;
  payment_type?: "Cash" | "Credit" | null;
};

export type Expense = {
  id: string;
  amount: number;
  note: string | null;
  created_at: string;
};

export type StockSummary = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  avg_cost: number;
  value: number;
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
      "id, type, quantity, created_at, unit_cost, unit_price, sale_channel, payment_type, product:products(name), warehouse:warehouses(name)"
    )
    .order("created_at", { ascending: false });

  if (!data) return [];

  return data.map((row: any) => ({
    id: row.id,
    type: row.type,
    quantity: row.quantity,
    created_at: row.created_at,
    unit_cost: row.unit_cost,
    unit_price: row.unit_price,
    sale_channel: row.sale_channel,
    payment_type: row.payment_type,
    product: row.product?.name ?? "",
    warehouse: row.warehouse?.name ?? "",
  }));
}

export async function listSales(): Promise<Movement[]> {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("movements")
    .select(
      "id, type, quantity, created_at, unit_price, sale_channel, payment_type, product:products(name), warehouse:warehouses(name)"
    )
    .eq("type", "Outbound")
    .order("created_at", { ascending: false });

  if (!data) return [];

  return data.map((row: any) => ({
    id: row.id,
    type: row.type,
    quantity: row.quantity,
    created_at: row.created_at,
    unit_price: row.unit_price,
    sale_channel: row.sale_channel,
    payment_type: row.payment_type,
    product: row.product?.name ?? "",
    warehouse: row.warehouse?.name ?? "",
  }));
}

export async function listPurchases(): Promise<Movement[]> {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("movements")
    .select(
      "id, type, quantity, created_at, unit_cost, product:products(name), warehouse:warehouses(name)"
    )
    .eq("type", "Inbound")
    .order("created_at", { ascending: false });

  if (!data) return [];

  return data.map((row: any) => ({
    id: row.id,
    type: row.type,
    quantity: row.quantity,
    created_at: row.created_at,
    unit_cost: row.unit_cost,
    product: row.product?.name ?? "",
    warehouse: row.warehouse?.name ?? "",
  }));
}

export async function listExpenses(): Promise<Expense[]> {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("expenses")
    .select("id, amount, note, created_at")
    .order("created_at", { ascending: false });

  return (data ?? []) as Expense[];
}

export async function getStockSummary(): Promise<StockSummary[]> {
  const supabase = await supabaseServer();
  const [{ data: products }, { data: movements }] = await Promise.all([
    supabase.from("products").select("id, name, sku"),
    supabase
      .from("movements")
      .select("product_id, type, quantity, unit_cost"),
  ]);

  const productMap = new Map<string, StockSummary>();
  (products ?? []).forEach((product: any) => {
    productMap.set(product.id, {
      id: product.id,
      name: product.name ?? "",
      sku: product.sku ?? "",
      stock: 0,
      avg_cost: 0,
      value: 0,
    });
  });

  const costTotals = new Map<string, { qty: number; total: number }>();

  (movements ?? []).forEach((movement: any) => {
    const entry = productMap.get(movement.product_id);
    if (!entry) return;
    const qty = Number(movement.quantity || 0);

    if (movement.type === "Inbound") {
      entry.stock += qty;
      const unitCost = Number(movement.unit_cost || 0);
      const running = costTotals.get(movement.product_id) ?? { qty: 0, total: 0 };
      running.qty += qty;
      running.total += qty * unitCost;
      costTotals.set(movement.product_id, running);
    } else if (movement.type === "Outbound") {
      entry.stock -= qty;
    }
  });

  for (const [productId, entry] of productMap.entries()) {
    const cost = costTotals.get(productId);
    const avg = cost && cost.qty > 0 ? cost.total / cost.qty : 0;
    entry.avg_cost = Number.isFinite(avg) ? avg : 0;
    entry.value = entry.stock * entry.avg_cost;
  }

  return Array.from(productMap.values());
}
