import { z } from "zod";

export const transactionInsertSchema = z.object({
  title: z.string().trim().min(2).max(120),
  category: z.string().trim().min(2).max(60),
  amount: z.coerce.number().positive(),
  type: z.enum(["income", "expense"]),
  occurredAt: z.coerce.date(),
  paymentStatus: z.enum(["paid", "pending"]).default("paid"),
  installmentId: z.string().uuid().nullable().optional()
});

export const transactionFilterSchema = z.object({
  category: z.string().optional(),
  status: z.enum(["paid", "pending"]).optional(),
  from: z.string().optional(),
  to: z.string().optional()
});
