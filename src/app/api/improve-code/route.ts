import { NextRequest, NextResponse } from 'next/server'
import { improveCode } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    if (!body.code || !body.improvement) {
      return NextResponse.json(
        { success: false, error: 'Código e melhoria são obrigatórios' },
        { status: 400 }
      )
    }

    // Improve code using OpenAI
    const result = await improveCode(body.code, body.improvement)

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
    console.error('Erro na API de melhoria de código:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
