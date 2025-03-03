import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import QueryProviderWrapper from "@/components/query-client-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InterviewPrep | Ace Your Next Interview",
  description: "Practice for interviews with timed multiple-choice questions tailored to your needs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={inter.className}>

      <QueryProviderWrapper>



        {children}
        </QueryProviderWrapper>

        </body>
    </html>
  )
}

