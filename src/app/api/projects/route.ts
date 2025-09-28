import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Project } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { data: projects, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data: projects
    })

  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar projetos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    if (!body.name || !body.code) {
      return NextResponse.json(
        { success: false, error: 'Nome e código são obrigatórios' },
        { status: 400 }
      )
    }

    const project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
      name: body.name,
      description: body.description || '',
      code: body.code,
      userId: body.userId || null
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([project])
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('Erro ao criar projeto:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar projeto' },
      { status: 500 }
    )
  }
}
