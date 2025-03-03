"use client"

import dataProvider from "@/dataProvider"
import { useMutation } from "@tanstack/react-query"

let fetcher = dataProvider("userInstance")

const getMCQQuestions = async (data : {topic: string}) => {
  const response = fetcher.post(`mcq`, data)
  return response
}

export const useAssessment = () => {
  const getKey = () => ["get-mcqs"]

  const getMCQS = useMutation({
    mutationKey: getKey(),
    mutationFn:  async (data: { topic: string }) => getMCQQuestions(data),
  })

  return { getMCQS }
}


