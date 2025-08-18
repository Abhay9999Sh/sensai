import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "aceai",
  name: "Aceai",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
