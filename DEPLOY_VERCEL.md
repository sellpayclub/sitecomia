# 🚀 Deploy no Vercel - Webly.ia

## ✅ Repositório GitHub Configurado

O projeto já está no GitHub: [https://github.com/sellpayclub/sitecomia](https://github.com/sellpayclub/sitecomia)

## 🔧 Configuração das Variáveis de Ambiente

### 1. Acesse o Dashboard do Vercel
- Vá para [vercel.com](https://vercel.com)
- Faça login na sua conta
- Clique em "New Project"

### 2. Conecte o Repositório
- Selecione o repositório `sellpayclub/sitecomia`
- Clique em "Import"

### 3. Configure as Variáveis de Ambiente
No dashboard do projeto, vá em **Settings > Environment Variables** e adicione:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://nqqkketgffzqtfudxfcu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcWtrZXRnZmZ6cXRmdWR4ZmN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTA3MzE2OSwiZXhwIjoyMDc0NjQ5MTY5fQ.VIOuUGWLwqhsAn-ZP94_fJ1NCG6wrZQJrurgV_pwGZE

# OpenAI Configuration
OPENAI_API_KEY=sua_chave_da_api_openai_aqui

# App Configuration
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
NODE_ENV=production
```

### 4. Deploy Automático
- Clique em "Deploy"
- O Vercel fará o build e deploy automaticamente
- Aguarde alguns minutos para o processo completar

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

### 4. Obter a Chave Anônima
- Vá em Settings > API
- Copie a `anon public` key
- Cole no Vercel como `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## ✅ Verificação do Deploy

Após o deploy, verifique se:

1. ✅ O site carrega sem erros
2. ✅ O chat funciona corretamente
3. ✅ A geração de código está funcionando
4. ✅ O preview mostra o site gerado
5. ✅ O download do código funciona

## 🔄 Deploy Contínuo

O Vercel está configurado para:
- ✅ Deploy automático a cada push na branch `main`
- ✅ Preview deployments para pull requests
- ✅ Build otimizado para Next.js
- ✅ Edge functions configuradas

## 🎯 URL de Produção

Após o deploy, sua aplicação estará disponível em:
`https://seu-projeto.vercel.app`

## 🆘 Troubleshooting

### Erro de Build
- Verifique se todas as variáveis de ambiente estão configuradas
- Confirme se as chaves da API estão corretas
- Verifique os logs de build no Vercel

### Erro de API
- Confirme se a chave da OpenAI está válida
- Verifique se o Supabase está configurado corretamente
- Teste as APIs individualmente

### Erro de Preview
- Verifique se o iframe está carregando corretamente
- Confirme se o código HTML está sendo gerado
- Teste em diferentes navegadores

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do Vercel
2. Teste localmente primeiro
3. Confirme as configurações do Supabase
4. Verifique as chaves da API

---

**🎉 Parabéns! Seu Webly.ia está pronto para produção!**
