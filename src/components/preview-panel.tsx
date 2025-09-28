'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Monitor, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PreviewPanelProps {
  code: string
  isGenerating: boolean
}

export function PreviewPanel({ code, isGenerating }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current && code) {
      const iframe = iframeRef.current
      const doc = iframe.contentDocument || iframe.contentWindow?.document
      
      if (doc) {
        doc.open()
        doc.write(code)
        doc.close()
      }
    }
  }, [code])

  if (!code && !isGenerating) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <Monitor className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Preview do Site</h3>
            <p className="text-muted-foreground">
              Comece a conversar com a IA para gerar seu site e vê-lo aqui em tempo real!
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">Preview</h3>
            {isGenerating && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Gerando...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm">
              <Monitor className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 bg-muted/20">
        <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
          {isGenerating ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
                <p className="text-muted-foreground">Gerando seu site...</p>
              </div>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              className="w-full h-full preview-iframe"
              title="Site Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
      </div>
    </div>
  )
}
