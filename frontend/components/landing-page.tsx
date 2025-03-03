"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Clock, CheckCircle2, BookOpen, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

// Extracted feature card component for cleaner code
const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) => (
  <Card className="p-6 border border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-md">
    <CardContent className="p-0 space-y-2">
      <Icon className="h-10 w-10 text-primary mb-2" />
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
)

// Extracted suggestion button component
const SuggestionButton = ({
  title,
  prompt,
  onClick,
}: {
  title: string
  prompt: string
  onClick: (prompt: string) => void
}) => (
  <Button
    variant="outline"
    onClick={() => onClick(prompt)}
    className="text-sm hover:bg-primary/5 hover:text-primary transition-colors"
  >
    {title}
  </Button>
)

export default function LandingPage() {
  const [prompt, setPrompt] = useState("")
  const router = useRouter()

  const suggestions = [
    { id: 1, title: "System Design Interview", prompt: "I have a system design interview" },
    { id: 2, title: "JavaScript Fundamentals", prompt: "JavaScript interview questions" },
    { id: 3, title: "First Date", prompt: "I have a first date today" },
    { id: 4, title: "World ending", prompt: "I want to prepare for world ending" },
    { id: 6, title: "SQL Database", prompt: "SQL interview questions" },
  ]

  const features = [
    {
      icon: Clock,
      title: "Timed Practice",
      description: "Simulate real interview conditions with timed questions to improve your performance under pressure",
    },
    {
      icon: BookOpen,
      title: "Custom Topics",
      description: "Practice questions specific to your interview needs, from technical skills to behavioral scenarios",
    },
    {
      icon: CheckCircle2,
      title: "Instant Feedback",
      description: "Review your performance with detailed explanations and track your progress over time",
    },
  ]

  const handleStart = () => {

    router.push('/assessment')

    

  
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <motion.div
        className="space-y-6 text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          bprep
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Prepare for anything
        </p>
      </motion.div>


      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-card border rounded-xl p-8 shadow-sm space-y-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-center">What are you preparing for?</h2>
          </div>

          <div className="space-y-3">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., I have a system design interview next week"
              className="text-base px-4 py-6 border-muted-foreground/20 focus-visible:ring-primary/30"
            />
            <div className="text-sm text-muted-foreground">
              Be it exam, interview or date.
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">SUGGESTED TOPICS</h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <SuggestionButton
                  key={suggestion.id}
                  title={suggestion.title}
                  prompt={suggestion.prompt}
                  onClick={setPrompt}
                />
              ))}
            </div>
          </div>

          <Button
            size="lg"
            className="w-full group transition-all duration-300"
            disabled={!prompt.trim()}
            onClick={handleStart}
          >
            Start Assessment
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

