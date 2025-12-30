import { GoogleGenerativeAI } from "@google/generative-ai";

const GENERATION_CONFIG = {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 8192,
};

export const generateProjectGuide = async (projectName, projectIdea) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("API Key is missing. Please configure VITE_GEMINI_API_KEY.");
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });

        const prompt = `
      You are an expert senior software engineer and mentor.
      A user wants to build the following project:
      
      **Project Name:** ${projectName}
      **Project Idea:** "${projectIdea}"

      Please provide a comprehensive, step-by-step guide to build this application.
      The guide should be structured as follows:

      # Project: ${projectName}
      
      ## 1. Overview & Tech Stack
      - Brief description based on the idea.
      - Recommended technologies (Frontend, Backend, Database, etc.) and why.

      ## 2. Prerequisites
      - What needs to be installed.

      ## 3. Project Structure
      - A tree view of the recommended folder structure.

      ## 4. Step-by-Step Implementation
      - Break down the development into logical steps.
      - For each step, provide:
          - Explanation of what we are doing.
          - **Code Snippets**: Provide the essential code blocks.

      ## 5. Next Steps
      - How to run the project.
      - Future feature ideas.

      Format the response in clean Markdown. Use code blocks for all code.
      `;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: GENERATION_CONFIG,
        });

        const response = result.response;
        return response.text();

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};

export const debugLogModels = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Note: listModels is not directly exposed on the client SDK easily in some versions,
        // but verifying the key works for any request is helpful.
        // We will try to fetch a simple model info if possible, or just log that we are trying.
        console.log("Attempting to initialize Gemini with Key: ", apiKey.substring(0, 10) + "...");
    } catch (e) {
        console.error("Debug Error:", e);
    }
}
