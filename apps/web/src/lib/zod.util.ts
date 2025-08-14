import z from "zod";

z.config({
  customError: (iss) => {
    if (iss.origin === "string" && typeof iss.input === "string") {
      if (iss.code === "too_small" && iss.input.length < 1) {
        return `${formatPath(iss.path)} is required`;
      }
      if (iss.code === "too_small") {
        return `${formatPath(iss.path)} must be at least ${
          iss.minimum
        } characters long`;
      }
      if (iss.code === "too_big") {
        return `${formatPath(iss.path)} must be less than ${
          iss.maximum
        } characters long`;
      }
    }
  },
});

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
    "Password must satisfy all the following conditions: 8+ characters, Uppercase, Lowercase, Number, Special character"
  );

export const stripEmptyStrings = <T>(value: T): T => {
  if (value === null || value === undefined || value === "") {
    return undefined as T;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item === null || item === undefined || item === "")
          return undefined;
        if (typeof item === "object" || typeof item !== null)
          return stripEmptyStrings(item);
        return item;
      })
      .filter((item) => item !== undefined) as T;
  }

  // Handle objects
  if (typeof value === "object" && value !== null) {
    const strippedValue: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      if (val === null || val === undefined || val === "") {
        continue;
      }
      const stripped = stripEmptyStrings(val);
      if (stripped !== undefined) {
        strippedValue[key] = stripped;
      }
    }
    return strippedValue as T;
  }

  return value;
};

export const formatPath = (path: PropertyKey[] | undefined) => {
  if (!path) return "Field";

  return path
    .map((p) => {
      return String(p).replace(
        /^.|(?<=_).|(?<=[a-z])[A-Z]/g,
        (match) => ` ${match.toUpperCase()}`
      );
    })
    .join(".");
};
