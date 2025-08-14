import { protectedProcedure, publicProcedure } from "./lib/orpc";
import { getChatMessages } from "./modules/ai/ai.handler";

export const appRouter = {
  chat: {
    getChatMessages,
  },
};
