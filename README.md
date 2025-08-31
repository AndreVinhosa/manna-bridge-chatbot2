# 🌟 Manna Bridge - Chatbot Cristocêntrico

Um chatbot amigável e acolhedor para conectar missionários e mantenedores em uma plataforma de apoio integral, transparente e compassiva.

## 🎯 Sobre o Projeto

A Manna Bridge é uma plataforma que resolve um problema real: muitos missionários enfrentam dificuldades por falta de apoio financeiro, emocional e comunitário. Nossa solução conecta corações generosos a servos dedicados ao Reino de Deus.

### ✨ Características do Chatbot

- **Tom Acolhedor**: Comunicação calorosa, inspiradora e confiável
- **Inteligência Contextual**: Respostas personalizadas baseadas no perfil do usuário
- **Guia Intuitivo**: Orienta missionários e mantenedores de forma clara
- **Interface Moderna**: Design responsivo e animações suaves
- **Coleta de Contatos**: Sistema integrado para captura de leads

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Next.js API Routes
- **Deploy**: Vercel
- **Icons**: Lucide React

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos para executar

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd ai-manna
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações
```

4. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse no navegador**
```
http://localhost:3000
```

## 🎨 Funcionalidades do Chatbot

### 🤖 Inteligência Conversacional
- Detecção automática de perfil (missionário/mantenedor/interessado)
- Respostas contextuais baseadas no histórico da conversa
- Opções de resposta rápida para melhor experiência

### 💬 Tipos de Interação
- **Missionários**: Informações sobre cadastro, apoio financeiro, comunidade
- **Mantenedores**: Como apoiar, transparência, acompanhamento
- **Interessados**: Visão geral da plataforma e impacto

### 📧 Coleta de Contatos
- Modal elegante para captura de leads
- Integração preparada para sistemas de email/CRM
- Validação de formulários

## 🎯 Personas Atendidas

### 🙏 Missionários
- Orientação sobre processo de cadastro
- Informações sobre apoio financeiro e emocional
- Acesso à comunidade de apoio
- Transparência na prestação de contas

### 💝 Mantenedores
- Como escolher missionários para apoiar
- Formas de contribuição disponíveis
- Acompanhamento do impacto das doações
- Participação na comunidade

### 📖 Interessados
- Visão geral da missão da Manna Bridge
- Impacto e resultados da plataforma
- Como se envolver

## 🔧 Estrutura do Projeto

```
ai-manna/
├── components/
│   └── Chatbot.tsx          # Componente principal do chatbot
├── pages/
│   ├── api/
│   │   └── chatbot/
│   │       ├── message.ts   # API para mensagens do chatbot
│   │       └── contact.ts   # API para coleta de contatos
│   ├── _app.tsx            # Configuração do Next.js
│   └── index.tsx           # Página principal
├── styles/
│   └── globals.css         # Estilos globais
├── package.json            # Dependências do projeto
├── tailwind.config.js      # Configuração do Tailwind
├── next.config.js          # Configuração do Next.js
├── vercel.json            # Configuração para deploy
└── README.md              # Este arquivo
```

## 🚀 Deploy na Vercel

### Método 1: Deploy Automático
1. Conecte seu repositório GitHub à Vercel
2. A Vercel detectará automaticamente que é um projeto Next.js
3. Configure as variáveis de ambiente se necessário
4. Deploy automático a cada push

### Método 2: Deploy Manual
```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel --prod
```

## 🎨 Personalização

### Cores e Tema
As cores podem ser personalizadas no arquivo `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Cores laranja para elementos principais
  },
  secondary: {
    // Cores azuis para elementos secundários
  }
}
```

### Respostas do Chatbot
As respostas estão centralizadas no arquivo `pages/api/chatbot/message.ts` na classe `MannaBridgeChatbot`.

### Animações
Utilizamos Framer Motion para animações suaves. Personalize no componente `Chatbot.tsx`.

## 📱 Responsividade

O chatbot é totalmente responsivo:
- **Desktop**: Interface completa com todas as funcionalidades
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Interface otimizada para dispositivos móveis

## 🔒 Segurança e Privacidade

- Validação de entrada do usuário
- Sanitização de dados
- Conformidade com LGPD (preparado)
- Criptografia de dados sensíveis (preparado)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte:
- Email: contato@mannabridge.com
- WhatsApp: (11) 99999-9999

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ para conectar corações e fortalecer o Reino de Deus** 🌟
