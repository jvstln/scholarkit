import { googleAI } from "@genkit-ai/googleai";
import { genkit } from "genkit";
import { genkit as genKitBeta } from "genkit/beta";

// Initialize Genkit with the Google AI plugin
export const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model("gemini-2.5-flash", {
    temperature: 0.8,
  }),
});

export const aiBeta = genKitBeta({
  plugins: [googleAI()],
  model: googleAI.model("gemini-2.5-flash", {
    temperature: 0.8,
  }),
});
