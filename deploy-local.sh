#!/bin/bash

echo "🚀 Deploy Local - Webly.ia"
echo "=========================="

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Instale o Node.js 18+ primeiro."
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versão 18+ é necessário. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

# Verificar se o arquivo .env.local existe
if [ ! -f ".env.local" ]; then
    echo "⚠️  Arquivo .env.local não encontrado"
    echo "📝 Criando arquivo .env.local..."
    cp env.example .env.local
    echo "✅ Arquivo .env.local criado"
    echo "🔧 Configure as variáveis de ambiente no arquivo .env.local"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   - SUPABASE_SERVICE_ROLE_KEY"
    echo "   - OPENAI_API_KEY"
    echo ""
    echo "Pressione Enter quando terminar de configurar..."
    read
fi

# Build do projeto
echo "🔨 Fazendo build do projeto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build do projeto"
    exit 1
fi

echo "✅ Build concluído com sucesso!"

# Iniciar o servidor
echo "🚀 Iniciando servidor..."
echo "📱 Acesse: http://localhost:3000"
echo "🛑 Para parar o servidor, pressione Ctrl+C"
echo ""

npm start
