import OpenAI from 'openai'
import { CodeGenerationRequest, CodeGenerationResponse } from '@/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateCode(request: CodeGenerationRequest): Promise<CodeGenerationResponse> {
  try {
    const systemPrompt = `Você é um especialista em desenvolvimento web que cria sites modernos e responsivos usando HTML, CSS e JavaScript.

INSTRUÇÕES IMPORTANTES:
1. SEMPRE retorne apenas o código HTML completo e funcional
2. Use HTML5 semântico e moderno
3. Inclua CSS inline ou em <style> tags
4. Use JavaScript vanilla quando necessário
5. Torne o design responsivo e moderno
6. Use cores e tipografia atuais
7. Inclua animações sutis quando apropriado
8. SEMPRE feche todas as tags HTML
9. NÃO inclua explicações no código, apenas o HTML puro

CONTEXTO: ${request.context || 'Criar um site moderno'}

CÓDIGO ANTERIOR: ${request.previousCode || 'Nenhum'}

REQUISITOS: ${request.requirements?.join(', ') || 'Nenhum específico'}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: request.prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    })

    const generatedCode = completion.choices[0]?.message?.content || ''
    
    // Clean up the response to ensure it's valid HTML
    const cleanCode = generatedCode
      .replace(/```html\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    return {
      code: cleanCode,
      explanation: 'Código gerado com sucesso!',
      suggestions: [
        'Adicione mais seções ao site',
        'Personalize as cores e fontes',
        'Inclua animações interativas',
        'Otimize para dispositivos móveis'
      ]
    }
  } catch (error) {
    console.error('Erro ao gerar código:', error)
    return {
      code: '',
      explanation: '',
      error: 'Erro ao gerar código. Tente novamente.'
    }
  }
}

export async function improveCode(code: string, improvement: string): Promise<CodeGenerationResponse> {
  try {
    const systemPrompt = `Você é um especialista em desenvolvimento web. Melhore o código HTML fornecido baseado na solicitação do usuário.

INSTRUÇÕES:
1. Mantenha a estrutura existente quando possível
2. Aplique as melhorias solicitadas
3. Retorne o código HTML completo e funcional
4. Use HTML5 semântico e CSS moderno
5. Torne responsivo se necessário
6. SEMPRE feche todas as tags HTML`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `Código atual:\n\`\`\`html\n${code}\n\`\`\`\n\nMelhoria solicitada: ${improvement}`
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    })

    const improvedCode = completion.choices[0]?.message?.content || ''
    
    const cleanCode = improvedCode
      .replace(/```html\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    return {
      code: cleanCode,
      explanation: 'Código melhorado com sucesso!',
      suggestions: [
        'Teste em diferentes dispositivos',
        'Adicione mais interatividade',
        'Otimize a performance',
        'Melhore a acessibilidade'
      ]
    }
  } catch (error) {
    console.error('Erro ao melhorar código:', error)
    return {
      code: code, // Return original code if improvement fails
      explanation: '',
      error: 'Erro ao melhorar código. Mantendo versão original.'
    }
  }
}
