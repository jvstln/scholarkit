"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizonal } from "lucide-react";
import { useWebSocket } from "@/hooks/use-socket";
import type {
  ChatMessage,
  ChatMessagePayload,
} from "@scholarkit/shared/types/ai.type";
import type { SocketAcknowledgment } from "@scholarkit/shared/types/socket.type";
import { toast } from "sonner";
import { cn } from "@scholarkit/web/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { client, orpc } from "@scholarkit/web/lib/orpc";

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [recentMessage, setRecentMessage] = useState<
    ChatMessage | string | null
  >(null);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const socket = useWebSocket();

  const chat = useQuery(orpc.chat.getChatMessages.queryOptions({ input: "" }));

  const isLoading = !!recentMessage && typeof recentMessage !== "string";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const lastMessage = messages[messages.length - 1];

    const userMessage: ChatMessagePayload = {
      chatId: lastMessage?.chatId,
      message: input.trim(),
      dateOfLastMessage: lastMessage?.createdAt,
    };

    setInput("");

    setRecentMessage({
      id: "pending-message",
      chatId: userMessage.chatId ?? "pending-chat",
      content: userMessage.message,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "user",
    });
    const response: SocketAcknowledgment = await socket.emitWithAck(
      "aichat message",
      userMessage
    );

    if (!response.success) {
      toast.error(response.error);
      return setRecentMessage(response.error);
    }

    setMessages((prev) => [...prev, response.data as ChatMessage]);
    setRecentMessage(null);
  };

  useEffect(() => {
    //  get all chat messages on load
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [input]);

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <h2 className="text-xl font-semibold mb-2">ScholarKit AI</h2>
              <p className="text-center max-w-md">
                Ask me anything about your studies, and I'll help you learn and
                understand better.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          )}
          {recentMessage && typeof recentMessage !== "string" && (
            <Message message={recentMessage} />
          )}
          {isLoading && (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src="/ai-avatar.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="px-4 py-2 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.5s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[60px] max-h-[200px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

const Message = ({ message }: { message: ChatMessage }) => {
  return (
    <div
      className={cn(
        "flex",
        message.role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex items-start gap-3 max-w-3xl",
          message.role === "user" ? "flex-row-reverse" : ""
        )}
      >
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage
            src={
              message.role === "user"
                ? "" // Add user avatar URL if available
                : "/ai-avatar.png" // Add AI avatar
            }
          />
          <AvatarFallback>
            {message.role === "user" ? "U" : "AI"}
          </AvatarFallback>
        </Avatar>
        <div
          className={cn(
            "px-4 py-2 rounded-lg",
            message.role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
};
