from typing import List
from fastapi import FastAPI
from pydantic import BaseModel, Field
from agno.agent import Agent, RunResponse
from agno.models.openrouter.openrouter import OpenRouter
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Define the MCQ model for a single question
class MCQ(BaseModel):
    question: str = Field(..., description="The question to be asked")
    options: List[str] = Field(..., description="List of options (including the correct answer)")
    correctAnswer:str = Field(..., description="Index of the correct option")
    explanation: str = Field(..., description="accurate short explanation")


# Define the MCQList model for a list of questions
class MCQList(BaseModel):
    questions: List[MCQ] = Field(..., description="List of multiple-choice questions")

# Define the request model for the POST endpoint
class MCQRequest(BaseModel):
    topic: str = Field(..., description="Topic or context for generating MCQs")
    num_questions: int = Field(10, description="Number of questions to generate")

# Configure the agent with the appropriate model and description
json_mode_agent = Agent(
    model=OpenRouter(id="google/gemini-2.0-flash-lite-preview-02-05:free"),
    description="You are an MCQ generator that industry standard questions based on a given topic to help students practice for job exams.",
    response_model=MCQList,
)


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/mcq", response_model=MCQList)
def generate_mcq(request: MCQRequest):
    """
    Endpoint to generate a list of MCQs based on a provided topic and number of questions.
    """
    prompt = (
        f"Generate {request.num_questions} questions on the topic: {request.topic}. "
    )
    response: RunResponse = json_mode_agent.run(prompt)
    return response.content

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
