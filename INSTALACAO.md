# 🚀 Instruções de Instalação - Webly.ia

## ⚠️ Problema de Permissões do NPM

Se você encontrar erros de permissão ao instalar as dependências, execute os seguintes comandos:

### Solução 1: Corrigir permissões do NPM
```bash
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
```

### Solução 2: Usar Yarn (Recomendado)
```bash
# Instalar Yarn globalmente
npm install -g yarn

# Instalar dependências com Yarn
yarn install
```

### Solução 3: Usar NPM com cache diferente
```bash
npm install --cache /tmp/.npm
```

## 📋 Passos de Instalação

### 1. Instalar Dependências
```bash
cd webly-ia
yarn install
# ou
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://nqqkketgffzqtfudxfcu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcWtrZXRnZmZ6cXRmdWR4ZmN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTA3MzE2OSwiZXhwIjoyMDc0NjQ5MTY5fQ.VIOuUGWLwqhsAn-ZP94_fJ1NCG6wrZQJrurgV_pwGZE

# OpenAI Configuration
OPENAI_API_KEY=sua_chave_da_api_openai_aqui

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Executar o Projeto
```bash
yarn dev
# ou
npm run dev
```

### 4. Acessar a Aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🗄️ Configuração do Supabase

### 1. Acesse o Supabase
- Vá para [supabase.com](https://supabase.com)
- Faça login na sua conta
- Acesse o projeto: `nqqkketgffzqtfudxfcu`

### 2. Execute o SQL
No editor SQL do Supabase, execute:

```sql
-- Tabela de usuários
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de projetos
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE
);

-- Índices para performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
```

### 3. Configure RLS (Row Level Security)
```sql
-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Políticas para usuários
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para projetos
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);
```

### 4. Obter as Chaves
- Vá em Settings > API
- Copie a `anon public` key
- Cole no arquivo `.env.local`

## 🚀 Deploy no Vercel

### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2. Fazer Login
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

### 4. Configurar Variáveis de Ambiente
No dashboard do Vercel, adicione as variáveis do `.env.local`

### 5. Deploy de Produção
```bash
vercel --prod
```

## ✅ Verificação

Após a instalação, você deve conseguir:

1. ✅ Acessar http://localhost:3000
2. ✅ Ver a interface do chat
3. ✅ Digitar uma mensagem no chat
4. ✅ Ver o preview do site sendo gerado
5. ✅ Visualizar o código HTML gerado

## 🆘 Problemas Comuns

### Erro de Permissão NPM
```bash
sudo chown -R $(whoami) ~/.npm
```

### Erro de Dependências
```bash
rm -rf node_modules package-lock.json
yarn install
```

### Erro de Variáveis de Ambiente
Verifique se o arquivo `.env.local` está na raiz do projeto e contém todas as variáveis necessárias.

### Erro de Build
```bash
yarn build
# ou
npm run build
```

## 📞 Suporte

Se encontrar problemas, verifique:
1. Versão do Node.js (18+)
2. Variáveis de ambiente configuradas
3. Dependências instaladas corretamente
4. Supabase configurado
