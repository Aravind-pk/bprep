# bprep ✨
### Prepare for anything ;)

bprep is an AI-powered agent that helps you prepare for anything at the last moment by presenting you with a short 5-question AI-generated quiz. This project leverages a free model from OpenRouter—no need to buy OpenAI credits. Special thanks to Agno for making this project even more fun than expected!

---

https://github.com/user-attachments/assets/a6235e9f-c442-4871-9333-6c560be804a3

---

## Features

- Quick, 5-question AI-generated quiz to help you prepare anything.
- MCQ Agent using Agno.
- Works with free gemini models from Openrouter
---

## Stack

- **Frontend:** NextJS
- **Backend:** FastAPI

---

## Frontend Setup
```
cd frontend
```

1. **Install Dependencies:**

   ```bash
   pnpm install
   ```

2. **Start the Development Server:**

   ```bash
   pnpm dev
   ```

---

## Backend Setup

```
cd backend
```

1. **Create a Python Virtual Environment:**

   ```bash
   python3 -m venv .venv
   ```

2. **Activate the Virtual Environment:**

   On macOS/Linux:

   ```bash
   source .venv/bin/activate
   ```

   On Windows:

   ```bash
   .venv\Scripts\activate
   ```

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set Your OpenRouter API Key:**

   ```bash
   export OPENROUTER_API_KEY="KEY"
   ```

5. **Run the FastAPI Development Server:**

   ```bash
   fastapi dev
   ```

---

## Getting Started

- **Frontend:** After running `pnpm dev`, open your browser and go to `http://localhost:3000` to see the app in action.
- **Backend:** The FastAPI server will run on the configured port (default is typically 8000) and handle all API requests.

---




Happy coding!
