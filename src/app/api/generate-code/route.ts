import { NextRequest, NextResponse } from 'next/server'
import { generateCode } from '@/lib/openai'
import { CodeGenerationRequest } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    if (!body.prompt || typeof body.prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Prompt é obrigatório' },
        { status: 400 }
      )
    }

    const codeRequest: CodeGenerationRequest = {
      prompt: body.prompt,
      context: body.context || 'Criar um site moderno e responsivo',
      previousCode: body.previousCode,
      requirements: body.requirements || []
    }

    // Generate code using OpenAI
    const result = await generateCode(codeRequest)

    if (result.error) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        code: result.code,
        explanation: result.explanation,
        suggestions: result.suggestions
      }
    })

  } catch (error) {
    console.error('Erro na API de geração de código:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { success: true, message: 'API de geração de código funcionando' },
    { status: 200 }
  )
}
