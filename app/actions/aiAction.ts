"use server"

import { GoogleGenAI } from "@google/genai";  

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

export async function generateText(prompt: string): Promise<string> {
  const response = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input:prompt,
  });
  return response.output_text || "No response generated."
}