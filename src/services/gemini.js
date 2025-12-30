import { GoogleGenerativeAI } from "@google/generative-ai";

const GENERATION_CONFIG = {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 8192,
};

const MODELS_TO_TRY = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-pro",
];

export const generateProjectGuide = async (projectName, projectIdea) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("API Key is missing. Please configure VITE_GEMINI_API_KEY.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError = null;

    for (const modelName of MODELS_TO_TRY) {
        try {
            console.log(`Attempting to generate with model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });

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
            console.warn(`Model ${modelName} failed:`, error.message);
            lastError = error;
            // Continue to next model
        }
    }

    // If we get here, all models failed
    console.error("All models failed. Last error:", lastError);
    throw new Error(`Failed to generate guide with any available model. Last error: ${lastError?.message || "Unknown error"}`);
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
