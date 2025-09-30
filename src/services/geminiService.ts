import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

let ai: GoogleGenAI | null = null;

/**
 * Lazily initializes and returns the GoogleGenAI client instance.
 * This prevents the app from crashing on load if the API_KEY is not set.
 * The error will be thrown only when an API call is attempted.
 */
const getAiClient = (): GoogleGenAI => {
  if (ai) {
    return ai;
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in environment variables.");
  }
  
  ai = new GoogleGenAI({ apiKey });
  return ai;
};

/**
 * Extracts candidate information from resume text.
 */
export const extractInfoFromResume = async (resumeText: string): Promise<{ name: string, email: string, phone: string }> => {
  const client = getAiClient();
  const response: GenerateContentResponse = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Extract the full name, email address, and phone number from the following resume text. Return a JSON object with the keys "name", "email", and "phone". If a value is not found, return an empty string for that key. Resume text: ${resumeText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
            name: { type: Type.STRING },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
        }
      }
    }
  });

  try {
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Failed to parse JSON from Gemini response:", error);
    return { name: '', email: '', phone: '' };
  }
};

/**
 * Generates interview questions using a structured schema for reliability.
 */
export const generateQuestions = async () => {
    const client = getAiClient();
    const prompt = `Generate 6 interview questions for a full-stack React/Node.js developer role. Provide 2 easy, 2 medium, and 2 hard questions.`;

    const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: 'A unique identifier for the question' },
                text: { type: Type.STRING, description: 'The interview question text' },
                difficulty: { type: Type.STRING, description: 'Difficulty level: "Easy", "Medium", or "Hard"' },
                timeLimit: { type: Type.NUMBER, description: 'Time limit in seconds: 20 for Easy, 60 for Medium, 120 for Hard' }
              },
              required: ['id', 'text', 'difficulty', 'timeLimit']
            }
          }
        }
    });

    try {
        const jsonText = response.text.trim();
        const questions = JSON.parse(jsonText);
        if (Array.isArray(questions)) {
          return questions;
        }
        console.error("Failed to generate questions: response is not an array.", questions);
        return [];
    } catch(e) {
        console.error("Failed to parse or generate questions:", e);
        return [];
    }
}