import { z } from "zod";

export const chatMessageSchema = z.object({
  chatId: z.uuid().optional(),
  message: z.string(),
  dateOfLastMessage: z.date().optional(),
});
