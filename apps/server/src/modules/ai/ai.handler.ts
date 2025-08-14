import type { Server, Socket } from "socket.io";
import type { NewChatMessage } from "@scholarkit/shared/types/ai.type";
import { chatMessageSchema } from "@scholarkit/shared/schemas/ai.schema";
import { db } from "@scholarkit/server/db";
import { chats, messages } from "@scholarkit/server/db/schema/ai.db-schema";
import { eq, gte } from "drizzle-orm";
import { protectedProcedure } from "@scholarkit/server/lib/orpc";
import z from "zod";

export const aiSocketHandler = async (io: Server, socket: Socket) => {
  socket.on("aichat message", async (message: Record<string, unknown>, ack) => {
    // Validate user message
    const { data: messagePayload, error } = chatMessageSchema.safeParse({
      chatId: message.chatId,
      message: message.message,
      dateOfLastMessage: message.dateOfLastMessage,
    });
    if (error) return ack({ success: false, error: "Invalid message sent" });
    const userMessage: NewChatMessage = {
      role: "user",
      chatId: messagePayload.chatId ?? "",
      content: messagePayload.message,
      createdAt: new Date(),
    };

    // Check if user is logged in (type guard)
    if (!socket.data.session?.user) {
      return ack({ success: false, error: "User not logged in" });
    }

    // Use AI to generate reply message
    const aiDummyMessage = "AI replied you. You think it is a lie??";

    // Check if chatId exists in database else create new chat
    if (!userMessage.chatId) {
      const [chat] = await db
        .insert(chats)
        .values({
          name: "New Chat " + Date.now(),
          userId: socket.data.session.user.id,
        })
        .returning();
      if (!chat) return ack({ success: false, error: "Failed to create chat" });
      userMessage.chatId = chat.id;
    }

    // Add both user message and reply message to database
    const aiMessage: NewChatMessage = {
      chatId: userMessage.chatId,
      content: aiDummyMessage,
      role: "ai",
    };
    await db.insert(messages).values([aiMessage, userMessage]);

    // Get all messages from database where createdAt is greater than dateOfLastMessage
    let whereCondition;
    if (messagePayload.dateOfLastMessage) {
      whereCondition = gte(
        messages.createdAt,
        messagePayload.dateOfLastMessage
      );
    }
    const fetchedMessages = await db
      .select()
      .from(messages)
      .where(whereCondition)
      .orderBy(messages.createdAt);

    // Send the messages to client
    console.log("message gotten", fetchedMessages);
    ack({ success: true, data: fetchedMessages });
  });
};

export const getChatMessages = protectedProcedure
  .input(z.string())
  .handler(async ({ input: chatId }) => {
    return db.query.messages.findMany({
      where: eq(messages.chatId, chatId),
      orderBy: (messages) => [messages.createdAt],
    });
  });
