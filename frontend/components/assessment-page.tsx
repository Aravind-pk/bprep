"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Clock, BarChart, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAssessment } from "@/query/questions";
import LoadingScreen from "./loading";
import { useAssessmentStore } from "@/store/assesment";
import { toast } from "sonner";

export function AssessmentPage() {
  const router = useRouter();
  const { getMCQS } = useAssessment();
  const {
    topic,
    questions,
    currentQuestion,
    selectedAnswer,
    answers,
    timer,
    completed,
    setQuestions,
    setCurrentQuestion,
    setSelectedAnswer,
    setAnswerAt,
    resetTimer,
    decrementTimer,
    setCompleted,
    resetAssessment,
  } = useAssessmentStore();

  // Trigger the API call only once when topic is set and no API call is in progress
  useEffect(() => {
    if (topic) {
      // Only trigger if not already loading, succeeded, or errored
      if (!getMCQS.isLoading && !getMCQS.isSuccess && !getMCQS.isError) {
        getMCQS.mutate({ topic });
      }
    } else {
      router.push("/");
    }
    // We intentionally leave getMCQS out of dependencies if its reference is stable.
  }, [topic, router]);

  // Update questions when the API call is successful
  useEffect(() => {
    if (getMCQS.isSuccess && getMCQS.data) {
      setQuestions(getMCQS.data.data.questions);
    }
  }, [getMCQS.isSuccess, getMCQS.data, setQuestions]);

  // Handle API error: show toast and route to homepage
  useEffect(() => {
    if (getMCQS.isError) {
      toast.error("Failed to generate questions, please try again.");
      router.push("/");
    }
  }, [getMCQS.isError, router]);

  // Timer effect: decrement every second, and when timer runs out, proceed to next question
  useEffect(() => {
    if (completed || questions.length === 0) return;

    const interval = setInterval(() => {
      if (timer <= 1) {
        handleNextQuestion();
      } else {
        decrementTimer();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, decrementTimer, questions.length, completed]);

  // Function to progress to the next question
  const handleNextQuestion = () => {
    // Save the selected answer for the current question
    setAnswerAt(currentQuestion, selectedAnswer);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      resetTimer();
    } else {
      setCompleted(true);
    }
  };

  // Calculate score by comparing stored answers with the correct answers
  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (questions[index] && answer == questions[index].correctAnswer) {
        score++;
      }
    });
    return score;
  };


  // Show the custom loading screen while waiting for questions
  if (questions.length === 0 || getMCQS.isLoading) {
    return (
      <div className="container h-full mx-auto px-4 py-12">
        <LoadingScreen />
      </div>
    );
  }

  // If assessment is completed, show results
  if (completed) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-border/50">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Assessment Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <motion.div
                className="text-center pt-4 pb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="text-6xl font-bold text-primary">
                  {score}/{questions.length}
                </div>
                <p className="text-muted-foreground mt-2">
                  You answered {percentage}% of the questions correctly
                </p>
              </motion.div>
              <div className="space-y-6">
                {questions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    className="border rounded-lg p-5 hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-medium">{q.question}</h3>
                      <div
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                          answers[index] == q.correctAnswer
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {answers[index] == q.correctAnswer ? "Correct" : "Incorrect"}
                      </div>
                    </div>

                    <div className="mt-3 text-sm">
                      <div className="font-medium text-muted-foreground">
                        Your answer:
                      </div>
                      <div
                        className={`mt-1 ${
                          answers[index] ===q.correctAnswer
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {answers[index] !== null
                          ? q.options[answers[index]]
                          : "No answer provided"}
                      </div>
                    </div>

                    <div className="mt-3 text-sm">
                      <div className="font-medium text-muted-foreground">
                        Correct answer:
                      </div>
                      <div className="mt-1 text-green-600 dark:text-green-400">
                        {q.options[q.correctAnswer]}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t text-sm">
                      <div className="font-medium">Explanation:</div>
                      <p className="mt-1 text-muted-foreground">{q.explanation}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                className="w-full"
                onClick={() => router.push("/")}
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  resetAssessment();
                  router.push("/");
                }}
              >
                <BarChart className="mr-2 h-4 w-4" /> Start a New Assessment
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Render the current question
  const question = questions[currentQuestion];
  const progress = (currentQuestion / questions.length) * 100;

  return (
    <div className="container max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <div className="font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div
            className={`flex items-center ${
              timer <= 10 ? "text-red-500 animate-pulse" : "text-muted-foreground"
            }`}
          >
            <Clock className="h-4 w-4 mr-1" />
            <span>{timer} seconds</span>
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedAnswer?.toString()} className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                >
                  <div
                    onClick={() => setSelectedAnswer(index)}
                    className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedAnswer === index
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "hover:bg-muted/50 hover:border-muted-foreground/30"
                    }`}
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                    />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                </motion.div>
              ))}
            </RadioGroup>
          </CardContent>
          <Separator />
          <CardFooter className="pt-6">
            <Button
              className="w-full group"
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                "Finish Assessment"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
