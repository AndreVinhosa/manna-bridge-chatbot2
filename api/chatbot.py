from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Para Vercel serverless
def handler(event, context):
    return app(event, context)

class MannaBridgeChatbot:
    def __init__(self):
        self.conversation_state = {}
        self.responses = {
            'welcome': {
                'message': '🌟 Paz do Senhor! Seja muito bem-vindo(a) à Manna Bridge! \n\nSou seu assistente virtual e estou aqui para te servir com muito amor e dedicação. Nossa missão é conectar corações generosos a missionários dedicados, sendo uma ponte de apoio, transparência e comunidade para que a obra do Reino prospere.\n\n"E o meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus." - Filipenses 4:19\n\n✨ Como posso te ajudar hoje?',
                'options': ['missionario', 'mantenedor', 'informacoes']
            },
            'missionario': {
                'message': '🙏 Que bênção saber que você é um(a) missionário(a)! \n\n"Assim como me enviaste ao mundo, também eu os enviei ao mundo." - João 17:18\n\nSabemos dos desafios que vocês enfrentam e estamos aqui para apoiá-lo(a) de forma integral, como o Corpo de Cristo deve fazer:\n\n💰 **Apoio Financeiro**: Conectamos você a mantenedores comprometidos com sua visão\n❤️ **Cuidado Emocional**: Rede de apoio pastoral e acompanhamento espiritual\n🤝 **Comunidade**: Conexão com outros missionários e mentores experientes\n📊 **Transparência**: Prestação de contas clara que honra a Deus e os doadores\n\n**Como começar sua jornada conosco:**\n1. Cadastre-se em nossa plataforma com oração\n2. Complete seu perfil missionário com transparência\n3. Compartilhe sua visão e chamado divino\n4. Conecte-se com mantenedores que Deus preparou\n\nEm que área posso te orientar primeiro?',
                'options': ['cadastro_missionario', 'apoio_financeiro', 'comunidade', 'contato_humano']
            },
            'mantenedor': {
                'message': '💝 Que coração generoso! É maravilhoso saber que você deseja apoiar a obra missionária!\n\n"Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." - 2 Coríntios 9:7\n\nComo mantenedor na Manna Bridge, você se torna parte essencial da Grande Comissão:\n\n🎯 **Apoio Direcionado**: Escolha missionários que Deus colocar em seu coração\n💰 **Contribuição Financeira**: Apoio mensal ou pontual com transparência cristã\n🙏 **Apoio Espiritual**: Seja um intercessor e encorajador constante\n❤️ **Acompanhamento**: Receba relatórios que mostram o fruto de sua generosidade\n📱 **Transparência Total**: Veja como Deus multiplica sua semente\n\n**Formas de participar da obra:**\n• Apoio financeiro mensal (como Paulo recebia)\n• Contribuições pontuais para projetos específicos\n• Apoio em serviços (mentoria, capacitação, oração)\n• Encorajamento espiritual e comunhão\n\nQual forma de apoio Deus está colocando em seu coração?',
                'options': ['apoio_financeiro', 'apoio_servicos', 'transparencia', 'contato_humano']
            },
            'informacoes': {
                'message': '🌍 A Manna Bridge nasceu de um coração que vê a necessidade real dos missionários!\n\n**O Problema que Resolvemos:**\nMuitos missionários retornam antes do tempo por falta de:\n• Apoio financeiro consistente\n• Cuidado emocional e espiritual\n• Transparência na prestação de contas\n• Comunidade de apoio\n\n**Nossa Solução:**\n✅ Plataforma segura e transparente\n✅ Conexão direta entre mantenedores e missionários\n✅ Acompanhamento integral e cuidado pastoral\n✅ Prestação de contas clara e regular\n✅ Comunidade de apoio mútuo\n\n**Nosso Impacto:**\n• Missionários permanecem mais tempo no campo\n• Mantenedores veem o fruto de sua generosidade\n• Transparência gera confiança e mais apoio\n• Comunidade fortalece a todos\n\nQuer saber mais sobre algum aspecto específico?',
                'options': ['como_funciona', 'transparencia', 'seguranca', 'contato_humano']
            },
            'cadastro_missionario': {
                'message': '📝 **Processo de Cadastro para Missionários:**\n\n**Passo 1:** Preencha o formulário inicial\n• Dados pessoais e contato\n• Informações sobre sua missão\n• Campo de atuação e localização\n\n**Passo 2:** Documentação\n• Carta de recomendação da igreja/organização\n• Plano missionário detalhado\n• Orçamento e necessidades financeiras\n\n**Passo 3:** Verificação\n• Nossa equipe analisa sua documentação\n• Entrevista online (se necessário)\n• Aprovação e ativação do perfil\n\n**Passo 4:** Conexão\n• Seu perfil fica visível para mantenedores\n• Começam as conexões e apoios\n• Acompanhamento contínuo\n\n🚀 **Pronto para começar?** Posso te conectar com nossa equipe para iniciar seu cadastro!',
                'options': ['iniciar_cadastro', 'documentos_necessarios', 'contato_humano']
            },
            'apoio_financeiro': {
                'message': '💰 **Como Funciona o Apoio Financeiro:**\n\n**Para Missionários:**\n• Receba apoio mensal regular\n• Contribuições pontuais para projetos específicos\n• Transparência total no uso dos recursos\n• Relatórios mensais automáticos\n\n**Para Mantenedores:**\n• Escolha o valor e frequência\n• Acompanhe o uso de cada real\n• Receba relatórios detalhados\n• Comunicação direta com o missionário\n\n**Segurança e Transparência:**\n✅ Plataforma segura com criptografia\n✅ Prestação de contas obrigatória\n✅ Auditoria regular dos recursos\n✅ Relatórios financeiros mensais\n\n**Taxas:**\n• Taxa mínima apenas para manutenção da plataforma\n• 95% dos recursos vão direto para a missão\n• Total transparência nas taxas\n\nQuer saber mais sobre segurança ou começar a apoiar?',
                'options': ['seguranca', 'iniciar_apoio', 'transparencia', 'contato_humano']
            },
            'apoio_servicos': {
                'message': '🛠️ **Apoio em Serviços - Seus Talentos para o Reino:**\n\n"Cada um administre aos outros o dom como o recebeu, como bons despenseiros da multiforme graça de Deus." - 1 Pedro 4:10\n\n**Como Você Pode Servir:**\n\n🎓 **Mentoria e Capacitação:**\n• Treinamento em áreas específicas\n• Desenvolvimento de liderança\n• Capacitação técnica e ministerial\n\n💼 **Consultoria Profissional:**\n• Gestão financeira\n• Marketing e comunicação\n• Tecnologia e sistemas\n• Estratégia missionária\n\n🙏 **Apoio Espiritual:**\n• Intercessão regular\n• Aconselhamento pastoral\n• Discipulado à distância\n• Encorajamento constante\n\n📚 **Recursos e Materiais:**\n• Livros e materiais didáticos\n• Equipamentos necessários\n• Recursos digitais\n• Ferramentas ministeriais\n\n💝 **Seu talento pode transformar uma missão!**',
                'options': ['como_servir', 'mentoria', 'contato_humano']
            },
            'iniciar_cadastro': {
                'message': '🚀 **Vamos Começar Sua Jornada Missionária!**\n\n"E disse-lhes: Ide por todo o mundo, pregai o evangelho a toda criatura." - Marcos 16:15\n\n**Próximos Passos:**\n\n1️⃣ **Acesse nosso portal:** www.mannabridge.com/cadastro\n2️⃣ **Prepare os documentos** necessários\n3️⃣ **Ore pela orientação** divina durante o processo\n4️⃣ **Nossa equipe entrará em contato** em até 48h\n\n**O que você precisa ter em mãos:**\n✅ Documento de identidade\n✅ Carta de recomendação pastoral\n✅ Plano missionário detalhado\n✅ Orçamento estimado\n✅ Comprovante de chamado/vocação\n\n**Tempo de Processo:**\n• Análise inicial: 3-5 dias úteis\n• Entrevista online: agendada conforme disponibilidade\n• Aprovação final: até 7 dias úteis\n\n🎯 **Quer que eu agende uma conversa com nossa equipe para te orientar pessoalmente?**',
                'options': ['agendar_conversa', 'documentos_necessarios', 'contato_humano']
            },
            'documentos_necessarios': {
                'message': '📋 **Documentos Necessários para Cadastro:**\n\n"Tudo, porém, seja feito com decência e ordem." - 1 Coríntios 14:40\n\n**Documentos Obrigatórios:**\n\n📄 **Pessoais:**\n• RG ou CNH (frente e verso)\n• CPF\n• Comprovante de residência\n• Foto 3x4 recente\n\n⛪ **Eclesiásticos:**\n• Carta de recomendação pastoral (modelo disponível)\n• Declaração de membresia da igreja\n• Carta de apoio da organização missionária (se aplicável)\n\n📋 **Missionários:**\n• Plano missionário detalhado (visão, estratégia, metas)\n• Orçamento mensal estimado\n• Cronograma de atividades\n• Relatório de preparação missionária\n\n💰 **Financeiros:**\n• Dados bancários para recebimento\n• Declaração de imposto de renda (se aplicável)\n• Comprovantes de outras fontes de renda\n\n📧 **Envio:** Todos os documentos podem ser enviados digitalmente através da plataforma!',
                'options': ['modelo_documentos', 'iniciar_cadastro', 'contato_humano']
            },
            'transparencia': {
                'message': '📊 **Transparência é Nosso Compromisso:**\n\n**Para Missionários:**\n• Relatórios mensais obrigatórios\n• Fotos e vídeos das atividades\n• Prestação de contas financeira detalhada\n• Metas e resultados alcançados\n\n**Para Mantenedores:**\n• Dashboard com todas as informações\n• Relatórios em tempo real\n• Comunicação direta com missionários\n• Histórico completo de contribuições\n\n**Nossos Controles:**\n✅ Verificação de identidade rigorosa\n✅ Validação de documentos\n✅ Acompanhamento pastoral\n✅ Auditoria regular\n✅ Sistema de avaliação mútua\n\n**Tecnologia Segura:**\n• Criptografia de ponta a ponta\n• Servidores seguros\n• Backup automático\n• Conformidade com LGPD\n\n💡 **Resultado:** Confiança mútua e impacto real no Reino!',
                'options': ['seguranca', 'como_funciona', 'contato_humano']
            },
            'comunidade': {
                'message': '🤝 **Comunidade Manna Bridge - Juntos Somos Mais Fortes!**\n\n**Para Missionários:**\n• Grupos de apoio por região/área\n• Mentoria com missionários experientes\n• Encontros virtuais regulares\n• Compartilhamento de experiências\n• Oração mútua e encorajamento\n\n**Para Mantenedores:**\n• Comunidade de doadores engajados\n• Encontros para conhecer missionários\n• Grupos de oração específicos\n• Compartilhamento de testemunhos\n• Eventos de capacitação\n\n**Atividades da Comunidade:**\n📅 Encontros mensais online\n🙏 Correntes de oração\n📚 Capacitações e workshops\n🎉 Celebração de conquistas\n💬 Grupos de WhatsApp por interesse\n\n**Cuidado Pastoral:**\n• Acompanhamento emocional\n• Aconselhamento quando necessário\n• Suporte em crises\n• Celebração de vitórias\n\n❤️ **Ninguém caminha sozinho na Manna Bridge!**',
                'options': ['participar_comunidade', 'cuidado_pastoral', 'contato_humano']
            },
            'como_funciona': {
                'message': '⚙️ **Como a Manna Bridge Funciona:**\n\n**1. Cadastro e Verificação**\n• Missionários e mantenedores se cadastram\n• Verificação rigorosa de identidade\n• Aprovação da equipe Manna Bridge\n\n**2. Perfis e Conexão**\n• Missionários criam perfis detalhados\n• Mantenedores exploram e escolhem\n• Sistema de match baseado em afinidade\n\n**3. Apoio e Acompanhamento**\n• Contribuições seguras pela plataforma\n• Relatórios automáticos mensais\n• Comunicação direta facilitada\n\n**4. Transparência Total**\n• Dashboard com todas as informações\n• Prestação de contas obrigatória\n• Auditoria regular dos processos\n\n**5. Comunidade e Cuidado**\n• Grupos de apoio e oração\n• Mentoria e acompanhamento\n• Eventos e capacitações\n\n🎯 **Resultado:** Missionários bem cuidados, mantenedores confiantes, Reino avançando!',
                'options': ['cadastrar_agora', 'transparencia', 'seguranca', 'contato_humano']
            },
            'seguranca': {
                'message': '🔒 **Segurança é Nossa Prioridade:**\n\n**Segurança Técnica:**\n• Criptografia SSL de 256 bits\n• Servidores em nuvem segura\n• Backup automático diário\n• Conformidade com LGPD\n• Monitoramento 24/7\n\n**Segurança Financeira:**\n• Gateway de pagamento certificado\n• Contas segregadas para cada missionário\n• Auditoria financeira regular\n• Seguro contra fraudes\n• Rastreabilidade total\n\n**Segurança de Dados:**\n• Verificação de identidade rigorosa\n• Validação de documentos\n• Checagem de referências\n• Histórico de atividades\n• Sistema de denúncias\n\n**Proteção Legal:**\n• Termos de uso claros\n• Contratos de transparência\n• Assessoria jurídica especializada\n• Conformidade regulatória\n\n✅ **Sua confiança e segurança são sagradas para nós!**',
                'options': ['como_funciona', 'transparencia', 'contato_humano']
            },
            'contato_humano': {
                'message': '👥 **Vamos Conversar Pessoalmente!**\n\n"Melhor é serem dois do que um... se um cair, o outro levanta o seu companheiro." - Eclesiastes 4:9-10\n\nAlgumas conversas são melhores quando temos um toque humano! Nossa equipe está pronta para te atender com todo carinho cristão e atenção pastoral que você merece.\n\n**Nossa Equipe Inclui:**\n🎯 Especialistas em missões com experiência de campo\n💰 Consultores financeiros cristãos\n🙏 Cuidadores pastorais e intercessores\n💻 Suporte técnico dedicado\n📞 Atendimento humanizado\n\n**Formas de Contato:**\n📧 Email: contato@mannabridge.com\n📱 WhatsApp: (11) 99999-9999\n📞 Telefone: (11) 3333-4444\n🕐 Horário: Segunda a Sexta, 9h às 18h (horário de Brasília)\n💬 Chat ao vivo: disponível no site\n\n**Ou deixe seus dados que entraremos em contato:**\n• Nome completo\n• Email de preferência\n• Telefone (opcional)\n• Como podemos servir você\n\n💝 **Estamos ansiosos para conhecer você e fazer parte da sua história no Reino!**',
                'options': ['deixar_contato', 'agendar_conversa']
            }
        }
    
    def get_response(self, message, user_id, context=None):
        message = message.lower().strip()
        
        # Primeira interação - sempre boas-vindas
        if user_id not in self.conversation_state:
            self.conversation_state[user_id] = {'stage': 'welcome', 'profile': None}
            return self.responses['welcome']
        
        # Detectar intenção baseada em palavras-chave
        if any(word in message for word in ['missionário', 'missionaria', 'missão', 'campo', 'evangelizar']):
            self.conversation_state[user_id]['profile'] = 'missionario'
            return self.responses['missionario']
        
        elif any(word in message for word in ['apoiar', 'contribuir', 'doar', 'mantenedor', 'ajudar financeiro']):
            self.conversation_state[user_id]['profile'] = 'mantenedor'
            return self.responses['mantenedor']
        
        elif any(word in message for word in ['informação', 'informações', 'saber mais', 'conhecer', 'como funciona']):
            return self.responses['informacoes']
        
        elif any(word in message for word in ['cadastro', 'cadastrar', 'registrar', 'inscrever']):
            return self.responses['cadastro_missionario']
        
        elif any(word in message for word in ['financeiro', 'dinheiro', 'contribuição', 'doação']):
            return self.responses['apoio_financeiro']
        
        elif any(word in message for word in ['transparência', 'transparencia', 'prestação', 'contas', 'relatório']):
            return self.responses['transparencia']
        
        elif any(word in message for word in ['comunidade', 'grupo', 'apoio', 'oração', 'juntos']):
            return self.responses['comunidade']
        
        elif any(word in message for word in ['segurança', 'seguranca', 'seguro', 'proteção', 'confiança']):
            return self.responses['seguranca']
        
        elif any(word in message for word in ['contato', 'falar', 'conversar', 'humano', 'pessoa']):
            return self.responses['contato_humano']
        
        # Respostas para saudações e cumprimentos
        elif any(word in message for word in ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'paz']):
            return {
                'message': '🌟 Paz do Senhor! Que alegria ter você aqui! \n\n"A paz vos deixo, a minha paz vos dou; não vo-la dou como o mundo a dá." - João 14:27\n\nEstou aqui para te ajudar com muito carinho. Como posso te servir hoje?',
                'options': ['missionario', 'mantenedor', 'informacoes', 'contato_humano']
            }
        
        # Respostas para agradecimentos
        elif any(word in message for word in ['obrigado', 'obrigada', 'valeu', 'brigado', 'thanks']):
            return {
                'message': '🙏 De nada! É uma alegria poder te ajudar! \n\n"Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco." - 1 Tessalonicenses 5:18\n\nHá mais alguma forma de te servir hoje?',
                'options': ['missionario', 'mantenedor', 'informacoes', 'contato_humano']
            }
        
        # Respostas contextuais baseadas no perfil
        user_profile = self.conversation_state[user_id].get('profile')
        
        if user_profile == 'missionario':
            return {
                'message': '🙏 Entendo sua necessidade! Como missionário(a), você tem acesso a todo nosso suporte. Posso te ajudar com:\n\n• **Processo de cadastro** na plataforma\n• **Conexão com mantenedores** alinhados\n• **Comunidade de apoio** e mentoria\n• **Prestação de contas** simplificada\n\nSobre qual aspecto gostaria de saber mais?',
                'options': ['cadastro_missionario', 'apoio_financeiro', 'comunidade', 'contato_humano']
            }
        
        elif user_profile == 'mantenedor':
            return {
                'message': '💝 Que bênção ter você conosco! Como mantenedor, você pode fazer a diferença na vida de missionários. Posso te mostrar:\n\n• **Como escolher** missionários para apoiar\n• **Formas de contribuição** disponíveis\n• **Acompanhamento** do impacto de sua doação\n• **Comunidade** de mantenedores engajados\n\nO que mais desperta seu interesse?',
                'options': ['apoio_financeiro', 'transparencia', 'comunidade', 'contato_humano']
            }
        
        # Resposta padrão empática com versículo
        return {
            'message': '😊 Obrigado por sua mensagem! Estou aqui para te ajudar da melhor forma possível.\n\n"Levai as cargas uns dos outros, e assim cumprireis a lei de Cristo." - Gálatas 6:2\n\nPara que eu possa te orientar melhor, me conte: você é um(a) **missionário(a)** buscando apoio, um **mantenedor** querendo contribuir, ou gostaria de **conhecer mais** sobre nossa plataforma?\n\n✨ Estou aqui para te guiar com todo carinho cristão!',
            'options': ['missionario', 'mantenedor', 'informacoes', 'contato_humano']
        }

chatbot = MannaBridgeChatbot()

@app.route('/api/chatbot/message', methods=['POST'])
def chat_message():
    try:
        data = request.get_json()
        message = data.get('message', '')
        user_id = data.get('user_id', 'anonymous')
        context = data.get('context', {})
        
        response = chatbot.get_response(message, user_id, context)
        
        return jsonify({
            'success': True,
            'response': response,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/chatbot/contact', methods=['POST'])
def save_contact():
    try:
        data = request.get_json()
        email = data.get('email', '')
        message = data.get('message', '')
        name = data.get('name', '')
        
        # Aqui você salvaria no banco de dados ou enviaria por email
        # Por enquanto, apenas retornamos sucesso
        
        return jsonify({
            'success': True,
            'message': 'Obrigado! Entraremos em contato em breve. 💝'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/chatbot/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'Manna Bridge Chatbot API',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True)
