import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { socketErrorStringToObject } from "@scholarkit/shared/utils/error.util";
import { toast } from "sonner";

export const socket = io("http://localhost:4000", {
  autoConnect: false,
  withCredentials: true,
});

export function useWebSocket() {
  useEffect(() => {
    socket.connect();

    socket.on("connect_error", (error) => {
      const errorData = socketErrorStringToObject(error.message);

      if (errorData.code === "UNAUTHORIZED") {
        const message =
          typeof errorData.message === "string"
            ? errorData.message
            : "User not logged in";
        toast.error(message);
        return window.location.replace("/login");
      }

      if (errorData.message && typeof errorData.message === "string") {
        toast.error(errorData.message);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
}
