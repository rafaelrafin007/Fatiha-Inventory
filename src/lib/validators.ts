import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  category: z.string().min(2),
  reorderLevel: z.number().int().min(0),
});

export const warehouseSchema = z.object({
  name: z.string().min(2),
  location: z.string().min(2),
  manager: z.string().min(2),
});

export const movementSchema = z.object({
  productId: z.string(),
  warehouseId: z.string(),
  type: z.enum(["Inbound", "Outbound", "Transfer"]),
  quantity: z.number().int().positive(),
  notes: z.string().optional(),
});
