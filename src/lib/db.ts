export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
};

export type Warehouse = {
  id: string;
  name: string;
  location: string;
  manager: string;
};

export type Movement = {
  id: string;
  product: string;
  type: "Inbound" | "Outbound" | "Transfer";
  qty: number;
  warehouse: string;
};

export async function listProducts(): Promise<Product[]> {
  return [
    {
      id: "P-100",
      name: "Medical Kit",
      sku: "MED-100",
      category: "Relief",
      stock: 420,
    },
  ];
}

export async function listWarehouses(): Promise<Warehouse[]> {
  return [
    {
      id: "W-01",
      name: "Central Depot",
      location: "Lagos",
      manager: "A. Yusuf",
    },
  ];
}

export async function listMovements(): Promise<Movement[]> {
  return [
    {
      id: "M-900",
      product: "Medical Kit",
      type: "Inbound",
      qty: 120,
      warehouse: "Central Depot",
    },
  ];
}
