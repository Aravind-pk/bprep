"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Clock, CheckCircle2, BookOpen, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useAssessment } from "@/query/questions"
import { useAssessmentStore } from "@/store/assesment"

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

export default function HomePage() {
  const [prompt, setPrompt] = useState("")
  const {setTopic} = useAssessmentStore()
  const router = useRouter()

  const suggestions = [
    {title: "System Design Interview", prompt: "I have a system design interview" },
    {title: "World Domination", prompt: "I want to prepare for WORLD DOMINATION" },
    {title: "JavaScript Fundamentals", prompt: "JavaScript interview questions" },
    {title: "First Date", prompt: "I have a first date today" },
    {title: "SQL Database", prompt: "SQL interview questions" },
  ]

  const handleStart = () => {
    setTopic(prompt)
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
          Prepare for anything with AI 🌠
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
            <h3 className="text-sm font-medium text-muted-foreground">Top preps</h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <SuggestionButton
                  key={index}
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
            Start 🏃‍♂️‍➡️
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

