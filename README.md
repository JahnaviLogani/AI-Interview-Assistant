# AI-Powered Interview Assistant (Crisp)

This project is an AI-powered interview assistant built to streamline the initial technical screening process. It provides a seamless, interactive experience for candidates and a comprehensive dashboard for interviewers, all powered by the Google Gemini API.

## ✨ Features

### 🧑‍💻 Interviewee View (Chat Interface)

-   **📄 Resume Upload**: Candidates can upload their resumes in PDF or DOCX format.
-   **🤖 Smart Info Extraction**: Automatically extracts the candidate's Name, Email, and Phone Number from the resume.
-   **💬 Interactive Pre-screening**: If any information is missing, a chatbot prompts the candidate to provide it before the interview begins.
-   **🧠 AI-Generated Questions**: The AI dynamically generates a series of 6 questions tailored for a full-stack (React/Node) role, increasing in difficulty (2 Easy, 2 Medium, 2 Hard).
-   **⏱️ Timed Responses**: Each question is timed to simulate a real-world interview environment:
    -   **Easy**: 20 seconds
    -   **Medium**: 60 seconds
    -   **Hard**: 120 seconds
-   **✅ Automatic Progression**: The interview automatically moves to the next question when the timer runs out.
-   **📈 Real-time Progress**: A visual indicator keeps the candidate informed of their progress through the interview.

### 🤵 Interviewer View (Dashboard)

-   **📊 Centralized Dashboard**: A comprehensive list of all candidates, ordered by their final score.
-   **🔍 Detailed Candidate View**: Clicking on a candidate reveals:
    -   Their profile information (Name, Email, Phone).
    -   A complete chat history of the interview.
    -   A final, AI-generated summary of their performance.
    -   A question-by-question breakdown of their answers and the AI's scores.
-   **🔄 Real-time Sync**: The dashboard stays perfectly in sync with the interviewee's progress.
-   **🔎 Search & Sort**: Easily find and organize candidates based on name, score, or other criteria.

### ⚙️ Core Technical Features

-   **💾 Local Persistence**: All application state, including timers, answers, and progress, is saved to local storage.
-   **👋 Session Restoration**: If the browser is closed or refreshed, a "Welcome Back" modal appears, allowing the user to seamlessly resume their session.
-   **📱 Responsive Design**: A clean, modern, and fully responsive UI that works flawlessly on all devices.
-   **⚠️ Friendly Error Handling**: Graceful error handling for invalid file uploads, missing fields, or API issues.

## 💻 Tech Stack

-   **Frontend**: React
-   **State Management**: Redux Toolkit (with `redux-persist` for local storage persistence)
-   **AI**: Google Gemini API (`@google/genai`)
-   **UI Library**: Ant Design (or a similar modern component library)
-   **Styling**: CSS Modules / Styled-Components
-   **Resume Parsing**: `pdf-lib` (for PDFs), `mammoth.js` (for DOCX)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/ai-interview-assistant.git
    cd ai-interview-assistant
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Google Gemini API key:
    ```
    API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server:**
    ```sh
    npm start
    # or
    yarn start
    ```

    The application should now be running on `http://localhost:3000`.
