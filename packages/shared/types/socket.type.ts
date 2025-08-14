export type SocketAcknowledgment =
  | { success: true; data: unknown }
  | { success: false; error: string };
