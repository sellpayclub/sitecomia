'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import { ChatMessage } from '@/types'
import { generateId } from '@/lib/utils'

interface ChatInterfaceProps {
  onCodeGenerated: (code: string) => void
  isGenerating: boolean
  setIsGenerating: (generating: boolean) => void
}

export function ChatInterface({ onCodeGenerated, isGenerating, setIsGenerating }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: 'assistant',
      content: 'Olá! Sou sua assistente de IA para criação de sites. Me diga que tipo de site você gostaria de criar e eu vou gerar o código em tempo real!',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [progress, setProgress] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsGenerating(true)
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          context: 'Criar um site moderno e responsivo',
        }),
      })

      const data = await response.json()

      if (data.success && data.data.code) {
        onCodeGenerated(data.data.code)
        
        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: data.data.explanation || 'Código gerado com sucesso! O site está sendo exibido no preview ao lado.',
          timestamp: new Date(),
        }

        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error(data.error || 'Erro ao gerar código')
      }
    } catch (error) {
      console.error('Erro:', error)
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao gerar o código. Tente novamente.',
        timestamp: new Date(),
        type: 'error',
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      clearInterval(progressInterval)
      setProgress(100)
      setTimeout(() => {
        setIsGenerating(false)
        setProgress(0)
      }, 500)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Chat com IA</h2>
        <p className="text-sm text-muted-foreground">
          Descreva o site que você quer criar
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <Card className={`${message.role === 'user' ? 'bg-primary text-primary-foreground' : ''} ${
                message.type === 'error' ? 'border-destructive' : ''
              }`}>
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        
        {isGenerating && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Gerando código...</span>
                  </div>
                  <Progress value={progress} className="w-48" />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Descreva o site que você quer criar... (ex: 'Crie um site de portfólio moderno com seções sobre, projetos e contato')"
            className="min-h-[60px] resize-none"
            disabled={isGenerating}
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isGenerating}
            size="icon"
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
