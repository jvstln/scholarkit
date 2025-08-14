import { drizzle } from "drizzle-orm/node-postgres";
import * as aiSchema from "./schema/ai.db-schema";
import * as authSchema from "./schema/auth.db-schema";

export const db = drizzle({
  connection: process.env.DATABASE_URL || "",
  casing: "snake_case",
  schema: { ...aiSchema, ...authSchema },
});
