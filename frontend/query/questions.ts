"use client"

import dataProvider from "@/dataProvider"
import { useMutation } from "@tanstack/react-query"

let fetcher = dataProvider("userInstance")

const startMySession = () => {
  return fetcher.get("/journey/startSession")
}


export const useStartSession = () => {
  const getKey = () => ["start-session"]

  const startSession = useMutation({
    mutationKey: getKey(),
    mutationFn: () => startMySession(),
    onSuccess: (data) => {
      console.log("Session started successfully")
    },
    onError: (error) => {
      console.error("Failed to start session:", error)
    },
  })

  return { startSession }
}
