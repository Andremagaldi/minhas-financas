import { z } from "zod";

export const smsWebhookSchema = z.object({
  userId: z.string().uuid(),
  message: z.string().min(5),
  receivedAt: z.string().datetime().optional()
});
