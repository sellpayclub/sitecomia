# Webly.ia - Criador de Sites com IA

Sistema SAAS para criação de sites com inteligência artificial em tempo real, baseado no Lovable.

## 🚀 Características

- **Chat Interativo**: Interface de chat com IA para descrever o site desejado
- **Preview em Tempo Real**: Visualização instantânea do site sendo gerado
- **Editor de Código**: Visualização e edição do código HTML gerado
- **Integração OpenAI**: Geração de código usando GPT-4
- **Banco de Dados Supabase**: Armazenamento de projetos
- **Deploy Vercel**: Otimizado para deploy no Vercel

## 🛠️ Tecnologias

- **Next.js 15+** com App Router
- **TypeScript** para tipagem
- **Tailwind CSS** para estilização
- **OpenAI API** para geração de código
- **Supabase** para banco de dados
- **Radix UI** para componentes
- **Framer Motion** para animações

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase
- Chave da API OpenAI

### Passos

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd webly-ia
   ```

2. **Instale as dependências**
   ```bash
   # Se houver problemas de permissão com npm, use:
   sudo chown -R $(whoami) ~/.npm
   npm install
   
   # Ou use yarn:
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```
   
   Edite o arquivo `.env.local` com suas credenciais:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_do_supabase
   OPENAI_API_KEY=sua_chave_da_api_openai
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🗄️ Configuração do Supabase

### 1. Crie as tabelas necessárias

Execute os seguintes comandos SQL no Supabase:

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

### 2. Configure as políticas RLS (Row Level Security)

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

## 🚀 Deploy no Vercel

### 1. Conecte ao Vercel

```bash
npx vercel login
npx vercel
```

### 2. Configure as variáveis de ambiente

No dashboard do Vercel, adicione as seguintes variáveis:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`

### 3. Deploy

```bash
npx vercel --prod
```

## 📱 Como Usar

1. **Inicie uma conversa**: Digite no chat o que você quer criar
2. **Veja o preview**: O site aparece em tempo real no painel direito
3. **Edite o código**: Use a aba "Código" para fazer ajustes manuais
4. **Baixe o projeto**: Use o botão "Download" para salvar o HTML

## 🎯 Exemplos de Prompts

- "Crie um site de portfólio moderno com seções sobre, projetos e contato"
- "Faça um site de landing page para um produto SaaS"
- "Crie um blog pessoal com design minimalista"
- "Desenvolva um site de restaurante com cardápio e galeria"

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linter
- `npm run type-check` - Verifica tipos TypeScript

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## 📞 Suporte

Para suporte, abra uma issue no GitHub ou entre em contato.
