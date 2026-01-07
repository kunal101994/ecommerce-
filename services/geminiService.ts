
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIConciergeResponse = async (query: string, products: Product[], chatHistory: any[]) => {
  try {
    const productContext = JSON.stringify(products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description
    })));

    const systemInstruction = `
      You are Lumina's Elite Shopping Concierge. 
      Your goal is to help users find the perfect products from our luxury catalog.
      
      Available Products: ${productContext}
      
      Guidelines:
      1. Be sophisticated, helpful, and concise.
      2. If a user describes a need, suggest the most relevant product(s).
      3. Mention specific features and prices.
      4. If we don't have something, politely offer the closest alternative.
      5. Always maintain a premium, high-end tone.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, but I'm having trouble connecting to my knowledge base. How else can I assist you with our collection today?";
  }
};

export const analyzeProductImage = async (base64Image: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: "Identify the product in this image. Is it a watch, headphones, home appliance, or something else? Describe its style and likely category." }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Visual Search Error:", error);
    return "Unable to analyze image. Please try a clearer photo.";
  }
};
