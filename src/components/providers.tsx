'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { ChatMessage, GenerationStatus } from '@/types'

interface AppContextType {
  messages: ChatMessage[]
  setMessages: (messages: ChatMessage[]) => void
  addMessage: (message: ChatMessage) => void
  generationStatus: GenerationStatus
  setGenerationStatus: (status: GenerationStatus) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a Providers')
  }
  return context
}

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>({
    isGenerating: false,
  })

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message])
  }

  return (
    <AppContext.Provider
      value={{
        messages,
        setMessages,
        addMessage,
        generationStatus,
        setGenerationStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
