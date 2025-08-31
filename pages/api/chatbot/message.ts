import { NextApiRequest, NextApiResponse } from 'next'

interface ChatbotResponse {
  message: string
  options?: string[]
}

interface ConversationState {
  stage: string
  profile?: string
}

// Estado da conversa em memória (em produção, usar banco de dados)
const conversationState: { [key: string]: ConversationState } = {}

const responses: { [key: string]: ChatbotResponse } = {
  welcome: {
    message: '🌟 Paz do Senhor! Seja muito bem-vindo(a) à Manna Bridge! \n\nSou seu assistente virtual e estou aqui para te servir com muito amor e dedicação. Nossa missão é conectar corações generosos a missionários dedicados, sendo uma ponte de apoio, transparência e comunidade para que a obra do Reino prospere.\n\n"E o meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus." - Filipenses 4:19\n\n✨ Como posso te ajudar hoje?',
    options: ['missionario', 'mantenedor', 'informacoes']
  },
  missionario: {
    message: '🙏 Que bênção saber que você é um(a) missionário(a)! \n\n"Assim como me enviaste ao mundo, também eu os enviei ao mundo." - João 17:18\n\nSabemos dos desafios que vocês enfrentam e estamos aqui para apoiá-lo(a) de forma integral, como o Corpo de Cristo deve fazer:\n\n💰 **Apoio Financeiro**: Conectamos você a mantenedores comprometidos com sua visão\n❤️ **Cuidado Emocional**: Rede de apoio pastoral e acompanhamento espiritual\n🤝 **Comunidade**: Conexão com outros missionários e mentores experientes\n📊 **Transparência**: Prestação de contas clara que honra a Deus e os doadores\n\n**Como começar sua jornada conosco:**\n1. Cadastre-se em nossa plataforma com oração\n2. Complete seu perfil missionário com transparência\n3. Compartilhe sua visão e chamado divino\n4. Conecte-se com mantenedores que Deus preparou\n\nEm que área posso te orientar primeiro?',
    options: ['cadastro_missionario', 'apoio_financeiro', 'comunidade', 'contato_humano']
  },
  mantenedor: {
    message: '💝 Que coração generoso! É maravilhoso saber que você deseja apoiar a obra missionária!\n\n"Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." - 2 Coríntios 9:7\n\nComo mantenedor na Manna Bridge, você se torna parte essencial da Grande Comissão:\n\n🎯 **Apoio Direcionado**: Escolha missionários que Deus colocar em seu coração\n💰 **Contribuição Financeira**: Apoio mensal ou pontual com transparência cristã\n🙏 **Apoio Espiritual**: Seja um intercessor e encorajador constante\n❤️ **Acompanhamento**: Receba relatórios que mostram o fruto de sua generosidade\n📱 **Transparência Total**: Veja como Deus multiplica sua semente\n\n**Formas de participar da obra:**\n• Apoio financeiro mensal (como Paulo recebia)\n• Contribuições pontuais para projetos específicos\n• Apoio em serviços (mentoria, capacitação, oração)\n• Encorajamento espiritual e comunhão\n\nQual forma de apoio Deus está colocando em seu coração?',
    options: ['apoio_financeiro', 'apoio_servicos', 'transparencia', 'contato_humano']
  },
  informacoes: {
    message: '🌍 A Manna Bridge nasceu de um coração que vê a necessidade real dos missionários!\n\n"Ide, portanto, fazei discípulos de todas as nações..." - Mateus 28:19\n\n**O Problema que Resolvemos:**\nMuitos missionários retornam antes do tempo por falta de:\n• Apoio financeiro consistente\n• Cuidado emocional e espiritual\n• Transparência na prestação de contas\n• Comunidade de apoio\n\n**Nossa Solução Cristã:**\n✅ Plataforma segura e transparente\n✅ Conexão direta entre mantenedores e missionários\n✅ Acompanhamento integral e cuidado pastoral\n✅ Prestação de contas clara e regular\n✅ Comunidade de apoio mútuo\n\n**Nosso Impacto no Reino:**\n• Missionários permanecem mais tempo no campo\n• Mantenedores veem o fruto de sua generosidade\n• Transparência gera confiança e mais apoio\n• Comunidade fortalece a todos\n\nQuer saber mais sobre algum aspecto específico?',
    options: ['como_funciona', 'transparencia', 'seguranca', 'contato_humano']
  },
  contato_humano: {
    message: '👥 **Vamos Conversar Pessoalmente!**\n\n"Melhor é serem dois do que um... se um cair, o outro levanta o seu companheiro." - Eclesiastes 4:9-10\n\nAlgumas conversas são melhores quando temos um toque humano! Nossa equipe está pronta para te atender com todo carinho cristão e atenção pastoral que você merece.\n\n**Nossa Equipe Inclui:**\n🎯 Especialistas em missões com experiência de campo\n💰 Consultores financeiros cristãos\n🙏 Cuidadores pastorais e intercessores\n💻 Suporte técnico dedicado\n📞 Atendimento humanizado\n\n**Formas de Contato:**\n📧 Email: contato@mannabridge.com\n📱 WhatsApp: (11) 99999-9999\n📞 Telefone: (11) 3333-4444\n🕐 Horário: Segunda a Sexta, 9h às 18h\n\n💝 **Estamos ansiosos para conhecer você e fazer parte da sua história no Reino!**',
    options: ['deixar_contato', 'agendar_conversa']
  }
}

function getChatbotResponse(message: string, userId: string): ChatbotResponse {
  const lowerMessage = message.toLowerCase().trim()
  
  // Primeira interação - sempre boas-vindas
  if (!conversationState[userId]) {
    conversationState[userId] = { stage: 'welcome', profile: undefined }
    return responses.welcome
  }
  
  // Detectar intenção baseada em palavras-chave
  if (['missionário', 'missionaria', 'missão', 'campo', 'evangelizar'].some(word => lowerMessage.includes(word))) {
    conversationState[userId].profile = 'missionario'
    return responses.missionario
  }
  
  if (['apoiar', 'contribuir', 'doar', 'mantenedor', 'ajudar financeiro'].some(word => lowerMessage.includes(word))) {
    conversationState[userId].profile = 'mantenedor'
    return responses.mantenedor
  }
  
  if (['informação', 'informações', 'saber mais', 'conhecer', 'como funciona'].some(word => lowerMessage.includes(word))) {
    return responses.informacoes
  }
  
  if (['contato', 'falar', 'conversar', 'humano', 'pessoa'].some(word => lowerMessage.includes(word))) {
    return responses.contato_humano
  }
  
  // Saudações
  if (['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'paz'].some(word => lowerMessage.includes(word))) {
    return {
      message: '🌟 Paz do Senhor! Que alegria ter você aqui! \n\n"A paz vos deixo, a minha paz vos dou; não vo-la dou como o mundo a dá." - João 14:27\n\nEstou aqui para te ajudar com muito carinho. Como posso te servir hoje?',
      options: ['missionario', 'mantenedor', 'informacoes', 'contato_humano']
    }
  }
  
  // Agradecimentos
  if (['obrigado', 'obrigada', 'valeu', 'brigado', 'thanks'].some(word => lowerMessage.includes(word))) {
    return {
      message: '🙏 De nada! É uma alegria poder te ajudar! \n\n"Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco." - 1 Tessalonicenses 5:18\n\nHá mais alguma forma de te servir hoje?',
      options: ['missionario', 'mantenedor', 'informacoes', 'contato_humano']
    }
  }
  
  // Resposta padrão
  return {
    message: '😊 Obrigado por sua mensagem! Estou aqui para te ajudar da melhor forma possível.\n\n"Levai as cargas uns dos outros, e assim cumprireis a lei de Cristo." - Gálatas 6:2\n\nPara que eu possa te orientar melhor, me conte: você é um(a) **missionário(a)** buscando apoio, um **mantenedor** querendo contribuir, ou gostaria de **conhecer mais** sobre nossa plataforma?\n\n✨ Estou aqui para te guiar com todo carinho cristão!',
    options: ['missionario', 'mantenedor', 'informacoes', 'contato_humano']
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message, user_id } = req.body
    
    if (!message || !user_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Mensagem e ID do usuário são obrigatórios' 
      })
    }

    const response = getChatbotResponse(message, user_id)
    
    res.status(200).json({
      success: true,
      response,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Chatbot API error:', error)
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor. Tente novamente.' 
    })
  }
}
