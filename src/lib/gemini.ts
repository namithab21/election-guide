import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_INSTRUCTION = `
You are the "DeshKaVote Navigator", an expert AI assistant specialized in Indian Election Commission (ECI) guidelines and democratic processes.
Your goal is to help Indian citizens understand how to vote, register, and exercise their rights.

RULES:
1. ALWAYS provide accurate information based on ECI guidelines.
2. If you don't know an answer, direct them to the official 1950 helpline or voters.eci.gov.in.
3. Be helpful, professional, and patriotic in tone.
4. Keep answers concise but informative.
5. Key knowledge areas: Form 6 (New registration), Form 8 (Corrections/Shifting), NOTA, VVPAT, Model Code of Conduct, and Voter Rights.
6. For children in booths: Infants in arms are allowed; independent children are generally discouraged inside the actual voting compartment for secrecy.
7. Mobile phones: Strictly prohibited inside polling stations.
`;

export const mockGeminiChat = async (message: string) => {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    console.warn("Gemini API Key missing. Falling back to local logic.");
    return fallbackLogic(message);
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my brain right now. " + fallbackLogic(message);
  }
};

const fallbackLogic = (message: string) => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('kid') || lowerMsg.includes('child') || lowerMsg.includes('baby')) {
    return "ECI guidelines allow infants in arms into the booth. Older children are discouraged inside the voting compartment to maintain secrecy.";
  }
  if (lowerMsg.includes('phone') || lowerMsg.includes('mobile')) {
    return "Mobile phones are strictly prohibited inside the polling station. Please leave them outside.";
  }
  if (lowerMsg.includes('form 6')) {
    return "Form 6 is for new voter registration. You can apply on voters.eci.gov.in.";
  }
  if (lowerMsg.includes('id') || lowerMsg.includes('document') || lowerMsg.includes('aadhaar')) {
    return "You can use Aadhaar, PAN, Passport, or 12 other approved IDs if your name is in the Electoral Roll.";
  }
  
  return "I am the DeshKaVote assistant. For this specific query, please check voters.eci.gov.in or call 1950 for official confirmation.";
};
