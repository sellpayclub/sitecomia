'use client'

import { useState } from 'react'
import { ChatInterface } from '@/components/chat-interface'
import { PreviewPanel } from '@/components/preview-panel'
import { Header } from '@/components/header'
import { CodeEditor } from '@/components/code-editor'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Play, Code, Eye, Download } from 'lucide-react'

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState('preview')

  const handleCodeGenerated = (code: string) => {
    setGeneratedCode(code)
  }

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'webly-site.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Chat Panel - Left Side */}
        <div className="w-1/3 border-r border-border bg-card">
          <ChatInterface 
            onCodeGenerated={handleCodeGenerated}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        </div>

        {/* Preview Panel - Right Side */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Código
                  </TabsTrigger>
                  <TabsTrigger value="editor" className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Editor
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button 
                onClick={handleDownload}
                disabled={!generatedCode}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} className="h-full">
              <TabsContent value="preview" className="h-full m-0">
                <PreviewPanel 
                  code={generatedCode}
                  isGenerating={isGenerating}
                />
              </TabsContent>
              
              <TabsContent value="code" className="h-full m-0">
                <CodeEditor 
                  code={generatedCode}
                  onChange={setGeneratedCode}
                />
              </TabsContent>
              
              <TabsContent value="editor" className="h-full m-0">
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Editor avançado em desenvolvimento</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
