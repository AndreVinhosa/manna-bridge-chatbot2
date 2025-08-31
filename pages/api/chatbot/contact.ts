import { NextApiRequest, NextApiResponse } from 'next'

interface ContactForm {
  name: string
  email: string
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, message }: ContactForm = req.body
    
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Nome e email são obrigatórios' 
      })
    }

    // Validação de email básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email inválido' 
      })
    }

    // Em produção, aqui você salvaria no banco de dados ou enviaria por email
    // Por enquanto, apenas simulamos o salvamento
    console.log('Novo contato recebido:', { name, email, message, timestamp: new Date().toISOString() })
    
    // Resposta personalizada baseada no conteúdo
    let responseMessage = '🙏 Obrigado por entrar em contato, ' + name + '! '
    
    if (message.toLowerCase().includes('missionário') || message.toLowerCase().includes('missão')) {
      responseMessage += 'Nossa equipe de apoio a missionários entrará em contato em até 24 horas para te orientar sobre como podemos apoiar sua missão. '
    } else if (message.toLowerCase().includes('apoiar') || message.toLowerCase().includes('contribuir')) {
      responseMessage += 'Nossa equipe de relacionamento com mantenedores entrará em contato em até 24 horas para te mostrar como você pode fazer parte da obra missionária. '
    } else {
      responseMessage += 'Nossa equipe entrará em contato em até 24 horas para te ajudar da melhor forma possível. '
    }
    
    responseMessage += '\n\n"Porque onde estiver o vosso tesouro, aí estará também o vosso coração." - Mateus 6:21\n\n💝 Que Deus abençoe você!'

    res.status(200).json({
      success: true,
      message: responseMessage
    })
  } catch (error) {
    console.error('Contact API error:', error)
    res.status(500).json({ 
      success: false, 
      error: 'Erro ao salvar contato. Tente novamente.' 
    })
  }
}
