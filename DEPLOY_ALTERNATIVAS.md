# 🚀 Alternativas de Deploy - Webly.ia

## 🎯 **Opções de Deploy (Escolha uma):**

### **1. 🌐 Netlify (Recomendado - Mais Fácil)**
- ✅ Deploy automático do GitHub
- ✅ Build otimizado para Next.js
- ✅ HTTPS gratuito
- ✅ CDN global

**Como fazer:**
1. Acesse [netlify.com](https://netlify.com)
2. Faça login com GitHub
3. Clique em "New site from Git"
4. Selecione `sellpayclub/sitecomia`
5. Configure as variáveis de ambiente
6. Clique em "Deploy site"

**Variáveis de ambiente no Netlify:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://nqqkketgffzqtfudxfcu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_do_supabase
OPENAI_API_KEY=sua_chave_da_api_openai
NODE_ENV=production
```

---

### **2. 🚂 Railway (Muito Fácil)**
- ✅ Deploy automático do GitHub
- ✅ Build automático
- ✅ HTTPS gratuito
- ✅ Banco de dados incluído

**Como fazer:**
1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha `sellpayclub/sitecomia`
6. Configure as variáveis de ambiente
7. Aguarde o deploy

**Variáveis de ambiente no Railway:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://nqqkketgffzqtfudxfcu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_do_supabase
OPENAI_API_KEY=sua_chave_da_api_openai
NODE_ENV=production
```

---

### **3. 🎨 Render (Gratuito)**
- ✅ Deploy automático do GitHub
- ✅ Build automático
- ✅ HTTPS gratuito
- ✅ Serviços de banco de dados

**Como fazer:**
1. Acesse [render.com](https://render.com)
2. Faça login com GitHub
3. Clique em "New +"
4. Selecione "Web Service"
5. Conecte o repositório `sellpayclub/sitecomia`
6. Configure as variáveis de ambiente
7. Clique em "Create Web Service"

**Configurações no Render:**
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Node Version:** 18

**Variáveis de ambiente no Render:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://nqqkketgffzqtfudxfcu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_do_supabase
OPENAI_API_KEY=sua_chave_da_api_openai
NODE_ENV=production
```

---

### **4. 🐳 Deploy Local (Para Teste)**
Se quiser testar localmente primeiro:

```bash
# 1. Instalar dependências
cd webly-ia
npm install

# 2. Configurar variáveis de ambiente
cp env.example .env.local
# Edite o .env.local com suas chaves

# 3. Executar em modo de produção
npm run build
npm start
```

---

### **5. 🌍 Deploy Manual (Qualquer Servidor)**
Se você tem um servidor próprio:

```bash
# 1. Clonar o repositório
git clone https://github.com/sellpayclub/sitecomia.git
cd sitecomia

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp env.example .env.local
# Edite o .env.local

# 4. Build e start
npm run build
npm start
```

---

## 🎯 **Recomendação:**

### **Para começar rapidamente:**
1. **Netlify** - Mais fácil e confiável
2. **Railway** - Muito simples e rápido
3. **Render** - Boa alternativa gratuita

### **Para produção:**
- Use **Netlify** ou **Railway**
- Ambos são gratuitos e confiáveis
- Deploy automático do GitHub

---

## 🔧 **Configuração do Supabase (Obrigatória):**

Execute este SQL no Supabase antes do deploy:

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

-- Índices
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (auth.uid() = user_id);
```

---

## ✅ **Verificação do Deploy:**

Após o deploy, verifique se:
1. ✅ O site carrega sem erros
2. ✅ O chat funciona corretamente
3. ✅ A geração de código está funcionando
4. ✅ O preview mostra o site gerado
5. ✅ O download do código funciona

---

## 🆘 **Troubleshooting:**

### **Erro de Build:**
- Verifique se todas as variáveis de ambiente estão configuradas
- Confirme se as chaves da API estão corretas
- Verifique os logs de build

### **Erro de API:**
- Confirme se a chave da OpenAI está válida
- Verifique se o Supabase está configurado corretamente
- Teste as APIs individualmente

### **Erro de Preview:**
- Verifique se o iframe está carregando corretamente
- Confirme se o código HTML está sendo gerado
- Teste em diferentes navegadores

---

**🎉 Escolha uma opção e seu Webly.ia estará online em minutos!**
