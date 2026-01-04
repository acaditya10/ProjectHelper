# 🚀 Project Guide AI

> **Your AI-powered mentor for building software projects.**

Project Guide AI is a modern, React-based web application that helps developers turn simple ideas into comprehensive, step-by-step implementation plans using Google's Gemini AI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2)

## ✨ Features

- **Generative Build Guides**: Instantly generates detailed project structures, tech stack recommendations, and code snippets.
- **Premium UI**: Features a "Dark Glassmorphism" aesthetic with `framer-motion` animations and vibrant gradients.
- **Robust AI Integration**: Uses the Google Generative AI SDK with a smart fallback strategy to ensure high availability across model versions (`gemini-1.5-flash`, `gemini-pro`).
- **Markdown Rendering**: Beautifully formatted output with syntax highlighting for code blocks.
- **Privacy Focused**: API keys are handled securely via environment variables (for deployment) or session storage.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Variables, Glassmorphism)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI**: [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)
- **Formatting**: [React Markdown](https://github.com/remarkjs/react-markdown)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- A [Google Gemini API Key](https://aistudio.google.com/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/acaditya10/ProjectHelper.git
    cd ProjectHelper
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root directory:
    ```env
    VITE_GEMINI_API_KEY=your_actual_api_key_here
    ```

4.  **Run Locally**:
    ```bash
    npm run dev
    ```

## 📦 Deployment

### Deploy to Vercel

1.  Push your code to a GitHub repository.
2.  Import the project into [Vercel](https://vercel.com/).
3.  Add your **Environment Variable** in the Vercel Dashboard:
    - Key: `VITE_GEMINI_API_KEY`
    - Value: `Address to your API Key`
4.  Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
