import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { COURSES } from '../constants';

const API_KEY = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (API_KEY && !ai) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
};

const SYSTEM_INSTRUCTION = `
You are "Nexus", the AI Admission Advisor for Future Architects Academy.
We teach kids and teens modern skills: Finance (Crypto/DeFi), Cloud Computing, and AI/LLMs.
Our philosophy: "Traditional schools teach history; we teach the future."
We use a "Learn by Building" methodology.

Here is our course catalog summary:
${JSON.stringify(COURSES.map(c => ({ title: c.title, subtitle: c.subtitle, type: c.type, price: `€${c.price}` })))}

Your goal is to answer questions about the curriculum, philosophy, and logistics.
Be futuristic, encouraging, and professional but accessible to parents and teens.
Keep answers concise (under 100 words) unless asked for details.
If asked about prices, quote the specific prices listed.
`;

export const sendMessageToAdvisor = async (userMessage: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[]): Promise<string> => {
  if (!ai) initializeGemini();
  if (!ai) return "I'm currently offline (API Key missing). Please check back later.";

  try {
    const model = 'gemini-2.5-flash';
    
    // Transform history to match SDK expectation if needed, or use chat session
    // For simplicity in this one-shot function, we will use generateContent with system instruction
    // In a real app, use ai.chats.create for sustained history.
    
    const chat = ai.chats.create({
        model,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history,
    });

    const result: GenerateContentResponse = await chat.sendMessage({
        message: userMessage
    });

    return result.text || "I processed that, but couldn't generate a text response.";

  } catch (error) {
    console.error("Gemini Error:", error);
    return "I seem to be having trouble connecting to the neural network. Please try again.";
  }
};