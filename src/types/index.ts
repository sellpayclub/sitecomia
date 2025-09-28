export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type?: 'text' | 'code' | 'error'
}

export interface CodeGenerationRequest {
  prompt: string
  context?: string
  previousCode?: string
  requirements?: string[]
}

export interface CodeGenerationResponse {
  code: string
  explanation: string
  suggestions?: string[]
  error?: string
}

export interface Project {
  id: string
  name: string
  description?: string
  code: string
  createdAt: Date
  updatedAt: Date
  userId?: string
}

export interface User {
  id: string
  email: string
  name?: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface GenerationStatus {
  isGenerating: boolean
  progress?: number
  currentStep?: string
  error?: string
}
