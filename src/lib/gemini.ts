import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const bustJargon = async (term: string) => {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    return `Placeholder: ${term} is a complex election rule. Please verify at voters.eci.gov.in.`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Explain the election term "${term}" to a 5th grader. Keep it under 2 sentences. Be simple and clear.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return "I'm having trouble simplifying this term right now.";
  }
};

export const mockGeminiChat = async (message: string) => {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    return "Gemini API Key is missing. This is a placeholder response.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return "Error connecting to Gemini API.";
  }
};
