from typing import List
from fastapi import FastAPI
from pydantic import BaseModel, Field
from agno.agent import Agent, RunResponse
from agno.models.openrouter.openrouter import OpenRouter

app = FastAPI()

# Define the MCQ model for a single question
class MCQ(BaseModel):
    question_text: str = Field(..., description="The question to be asked, make the questions progressively harder")
    options: List[str] = Field(..., description="List of options for the question, excluding the correct answer")
    answer: str = Field(..., description="The correct answer from the options")

# Define the MCQList model for a list of questions
class MCQList(BaseModel):
    questions: List[MCQ] = Field(..., description="A list of multiple-choice questions")

# Define the request model for the POST endpoint
class MCQRequest(BaseModel):
    topic: str = Field(..., description="Topic or context for generating MCQs")
    num_questions: int = Field(10, description="Number of questions to generate")

# Configure the agent with the appropriate model and description
json_mode_agent = Agent(
    model=OpenRouter(id="google/gemini-2.0-flash-lite-preview-02-05:free"),
    description="You are an MCQ generator that generates multiple-choice questions (industry level) based on a given topic or context that helps students practice for job exams.",
    response_model=MCQList,
)

@app.post("/mcq", response_model=MCQList)
def generate_mcq(request: MCQRequest):
    """
    Endpoint to generate a list of MCQs based on a provided topic and number of questions.
    """
    prompt = (
        f"Generate a list of {request.num_questions} multiple-choice questions based on the topic: {request.topic}. "
    )
    response: RunResponse = json_mode_agent.run(prompt)
    return response.content

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
