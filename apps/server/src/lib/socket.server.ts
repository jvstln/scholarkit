import { Server } from "socket.io";
import { createServer } from "http";
import type { ServerApp } from "..";
import { SocketError } from "@scholarkit/shared/utils/error.util";
import { auth } from "./auth";
import { aiSocketHandler } from "../modules/ai/ai.handler";

export const initializeSocket = (app: ServerApp) => {
  const httpServer = createServer(app.fetch as any);
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Handle Socket.IO events
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    aiSocketHandler(io, socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  httpServer.listen(4000, () => {
    console.log("Websocket server running on port 4000");
  });

  // Middlewares
  io.use(async (socket, next) => {
    // Check for auth
    const session = await auth.api.getSession({
      headers: new Headers(socket.handshake.headers as Bun.HeadersInit),
    });

    if (!session?.user) {
      return next(
        new SocketError("UNAUTHORIZED", { message: "User not logged in" })
      );
    }

    socket.data.session = session;
    next();
  });
};
