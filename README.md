# 🛍️ BK Backend - E-commerce API

Uma API RESTful completa para e-commerce desenvolvida em **Node.js** com **TypeScript**, **Express** e **Prisma ORM**. O projeto implementa um sistema de loja online com funcionalidades de produtos, categorias, carrinho de compras, usuários, pedidos e integração com **Stripe** para pagamentos.

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Modelos de Dados](#-modelos-de-dados)
- [Integração Stripe](#-integração-stripe)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Contribuição](#-contribuição)

## ✨ Características

- 🏪 **Sistema de E-commerce Completo**: Produtos, categorias, carrinho e pedidos
- 👤 **Autenticação de Usuários**: Registro, login e gerenciamento de perfis
- 🏠 **Gerenciamento de Endereços**: Múltiplos endereços por usuário
- 💳 **Pagamentos com Stripe**: Checkout seguro e webhooks automáticos
- 📦 **Sistema de Frete**: Cálculo automático de frete por CEP
- 🏷️ **Metadados de Produtos**: Sistema flexível de filtros e categorização
- 📊 **Analytics de Produtos**: Contagem de visualizações e vendas
- 🔒 **Middleware de Autenticação**: Proteção de rotas sensíveis
- 🎨 **Upload de Imagens**: Sistema de banners e imagens de produtos
- 📱 **API RESTful**: Endpoints bem estruturados e documentados

## 🛠️ Tecnologias

### Backend

- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express.js** - Framework web
- **Prisma ORM** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **bcryptjs** - Hash de senhas
- **Stripe** - Processamento de pagamentos
- **Zod** - Validação de schemas
- **CORS** - Cross-origin resource sharing

### Ferramentas de Desenvolvimento

- **tsx** - Execução de TypeScript
- **Prisma Client** - Geração automática de cliente
- **UUID** - Geração de identificadores únicos

## 📁 Estrutura do Projeto

```
bk-backend/
├── src/
│   ├── controllers/          # Controladores das rotas
│   │   ├── banner.ts        # Gerenciamento de banners
│   │   ├── cart.ts          # Carrinho de compras
│   │   ├── category.ts      # Categorias e metadados
│   │   ├── order.ts         # Pedidos
│   │   ├── product.ts       # Produtos
│   │   ├── user.ts          # Usuários e autenticação
│   │   └── webhook.ts       # Webhooks do Stripe
│   ├── middleware/          # Middlewares
│   │   └── auth.ts          # Autenticação JWT
│   ├── routes/              # Definição de rotas
│   │   └── main.ts          # Rotas principais
│   ├── services/            # Lógica de negócio
│   │   ├── banner.ts        # Serviços de banner
│   │   ├── category.ts      # Serviços de categoria
│   │   ├── order.ts         # Serviços de pedido
│   │   ├── payment.ts       # Serviços de pagamento
│   │   ├── product.ts       # Serviços de produto
│   │   └── user.ts          # Serviços de usuário
│   ├── schemas/             # Schemas de validação
│   ├── types/               # Definições de tipos
│   ├── utils/               # Utilitários
│   ├── generated/           # Código gerado pelo Prisma
│   └── server.ts            # Arquivo principal do servidor
├── prisma/
│   ├── schema.prisma        # Schema do banco de dados
│   └── seed.ts              # Dados iniciais
├── public/                  # Arquivos estáticos
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

### Passos

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd bk-backend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure o banco de dados**

```bash
# Crie um banco PostgreSQL e configure a URL de conexão
# Exemplo: postgresql://usuario:senha@localhost:5432/bk_backend
```

4. **Execute as migrações do Prisma**

```bash
npx prisma migrate dev
```

5. **Popule o banco com dados iniciais**

```bash
npm run db:seed
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/bk_backend"

# Servidor
PORT=4000

# Stripe (para pagamentos)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# JWT (opcional, se implementado)
JWT_SECRET=sua_chave_secreta_jwt
```

### Configuração do Stripe

1. Crie uma conta no [Stripe](https://stripe.com)
2. Obtenha suas chaves de API (test/live)
3. Configure o webhook no dashboard do Stripe:
   - URL: `https://seu-dominio.com/webhook/stripe`
   - Eventos: `checkout.session.completed`, `checkout.session.expired`, `payment_intent.payment_failed`

## 🎯 Uso

### Desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:4000`

### Produção

```bash
# Compile o TypeScript
npx tsc

# Execute o servidor
node dist/server.js
```

## 📡 API Endpoints

### 🏥 Health Check

- `GET /ping` - Verificação de saúde da API

### 🎨 Banners

- `GET /banners` - Lista todos os banners

### 🛍️ Produtos

- `GET /products` - Lista produtos (com filtros opcionais)
- `GET /product/:id` - Detalhes de um produto
- `GET /product/:id/related` - Produtos relacionados

### 📂 Categorias

- `GET /category/:slug/metadata` - Metadados de uma categoria

### 🛒 Carrinho

- `POST /cart/mount` - Monta carrinho com produtos
- `GET /cart/shipping` - Calcula frete por CEP
- `POST /cart/finish` - Finaliza compra (requer autenticação)

### 👤 Usuários

- `POST /user/register` - Registro de usuário
- `POST /user/login` - Login de usuário
- `GET /user/addresses` - Lista endereços (requer autenticação)
- `POST /user/addresses` - Adiciona endereço (requer autenticação)

### 📦 Pedidos

- `GET /orders` - Lista pedidos do usuário (requer autenticação)
- `GET /orders/:id` - Detalhes de um pedido (requer autenticação)
- `GET /orders/session` - Busca pedido por session ID do Stripe

### 🔗 Webhooks

- `POST /webhook/stripe` - Webhook do Stripe para atualizar status de pedidos

## 🗄️ Modelos de Dados

### Principais Entidades

- **User**: Usuários do sistema
- **UserAddress**: Endereços dos usuários
- **Product**: Produtos da loja
- **ProductImage**: Imagens dos produtos
- **ProductMetadata**: Metadados/filtros dos produtos
- **Category**: Categorias de produtos
- **CategoryMetadata**: Metadados das categorias
- **MetadataValue**: Valores possíveis para metadados
- **Order**: Pedidos dos usuários
- **OrderProduct**: Itens dos pedidos
- **Banner**: Banners promocionais

### Relacionamentos

- Usuário → Múltiplos endereços
- Usuário → Múltiplos pedidos
- Categoria → Múltiplos produtos
- Produto → Múltiplas imagens
- Produto → Múltiplos metadados
- Pedido → Múltiplos itens de produto

## 💳 Integração Stripe

### Funcionalidades

- **Checkout Session**: Criação de sessões de pagamento
- **Webhooks**: Atualização automática de status de pedidos
- **Eventos Suportados**:
  - `checkout.session.completed` → Status: `paid`
  - `checkout.session.expired` → Status: `expired`
  - `payment_intent.payment_failed` → Status: `failed`

### Fluxo de Pagamento

1. Cliente finaliza carrinho
2. API cria sessão no Stripe
3. Cliente é redirecionado para checkout
4. Stripe processa pagamento
5. Webhook atualiza status do pedido

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor em modo desenvolvimento

# Banco de Dados
npm run db:seed      # Popula banco com dados iniciais
npx prisma studio    # Interface visual do banco
npx prisma migrate dev  # Executa migrações
npx prisma generate  # Gera cliente Prisma
```

## 🔒 Autenticação

O sistema utiliza autenticação baseada em tokens. Endpoints protegidos requerem o header:

```
Authorization: Bearer <token>
```

## 📊 Dados Iniciais

O seed do banco inclui:

- 1 categoria: "Camisas"
- 4 produtos de exemplo (React, React Native, Python, PHP)
- 2 banners promocionais
- Metadados de tecnologia para filtros
- Imagens de exemplo para produtos

## 🚀 Deploy

### Variáveis de Ambiente para Produção

```env
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
PORT=4000
NODE_ENV=production
```

### Comandos de Deploy

```bash
# Instalar dependências
npm ci

# Executar migrações
npx prisma migrate deploy

# Popular banco (se necessário)
npm run db:seed

# Iniciar aplicação
npm start
```

## 🧪 Testes

Para implementar testes, considere:

- **Jest** para testes unitários
- **Supertest** para testes de API
- **Prisma Test Environment** para testes de banco

## 📈 Monitoramento

Recomendações para produção:

- **Logs estruturados** (Winston/Pino)
- **Métricas de performance** (Prometheus)
- **Health checks** avançados
- **Rate limiting** (express-rate-limit)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

**Desenvolvido com ❤️ usando Node.js, TypeScript e Prisma**
