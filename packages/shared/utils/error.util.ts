import type { ORPCError } from "@orpc/client";

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

type SocketErrorData = {
  code: ConstructorParameters<typeof ORPCError>[0];
};

export class SocketError extends Error {
  code: SocketErrorData["code"];
  data?: Record<string, JSONValue>;

  constructor(code: SocketErrorData["code"], data?: Record<string, JSONValue>) {
    super();
    this.data = data;
    this.code = code;
    this.message = this.toString();
  }

  override toString() {
    return JSON.stringify({
      code: this.code,
      ...this.data,
    });
  }
}

export const socketErrorStringToObject = (
  str: string
): SocketErrorData & Partial<Record<string, JSONValue>> => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return { code: str };
  }
};
