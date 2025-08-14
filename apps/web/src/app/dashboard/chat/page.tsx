import { Chat } from "@/components/dashboard/chat/chat";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex-1 overflow-hidden">
        <Chat />
      </div>
    </div>
  );
}
