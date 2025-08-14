import * as t from "drizzle-orm/pg-core";

export const timestampColumns = {
  createdAt: t.timestamp({ mode: "date" }).notNull().defaultNow(),
  updatedAt: t
    .timestamp({ mode: "date" })
    .notNull()
    .$onUpdate(() => new Date()),
};
