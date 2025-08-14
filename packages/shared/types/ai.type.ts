import { messages } from "@scholarkit/server/db/schema/ai.db-schema";
import { chatMessageSchema } from "../schemas/ai.schema";
import { z } from "zod";

export type ChatMessage = typeof messages.$inferSelect;
export type NewChatMessage = typeof messages.$inferInsert;

export type ChatMessagePayload = z.infer<typeof chatMessageSchema>;
