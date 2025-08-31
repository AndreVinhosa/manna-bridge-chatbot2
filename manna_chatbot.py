#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Manna Bridge Chatbot - Agente de Atendimento Cristocêntrico
Conectando corações para a missão de Deus
"""

import re
import json
import datetime
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass


@dataclass
class ChatResponse:
    """Estrutura de resposta do chatbot"""
    message: str
    options: List[str] = None
    action: str = None  # 'collect_contact', 'redirect', etc.


class MannaBridgeChatbot:
    """
    Chatbot da Manna Bridge - Agente acolhedor com cosmovisão cristã
    """
    
    def __init__(self):
        self.user_sessions = {}
        self.contact_database = []
        
        # Respostas principais do chatbot
        self.responses = {
            'boas_vindas': {
                'message': """🌟 Paz do Senhor! Seja muito bem-vindo(a) à Manna Bridge! 

Sou seu assistente virtual e estou aqui para te acolher com todo carinho. Nossa missão é conectar corações generosos a missionários dedicados, criando uma ponte de apoio, transparência e comunidade no Reino de Deus.

✨ Como posso te abençoar hoje?""",
                'options': ['sou_missionario', 'quero_apoiar', 'conhecer_mais']
            },
            
            'missionario': {
                'message': """🙏 Que alegria saber que você é um(a) servo(a) do Senhor no campo missionário!

Sabemos dos desafios que vocês enfrentam e estamos aqui para apoiá-lo(a) integralmente:

💰 **Provisão Financeira**: Conectamos você a mantenedores fiéis
❤️ **Cuidado Pastoral**: Rede de apoio emocional e espiritual  
🤝 **Comunhão**: Conexão com outros missionários e mentores
📊 **Transparência**: Prestação de contas clara e bíblica

**Seu próximo passo:**
1. Cadastre-se em nossa plataforma
2. Compartilhe sua visão e chamado
3. Conecte-se com mantenedores alinhados
4. Receba apoio integral para sua missão

Sobre qual aspecto gostaria de saber mais?""",
                'options': ['como_cadastrar', 'apoio_financeiro', 'comunidade_apoio', 'falar_pessoa']
            },
            
            'mantenedor': {
                'message': """💝 Que coração generoso o Senhor te deu! É uma bênção saber que você deseja investir no Reino!

Como mantenedor na Manna Bridge, você pode:

🎯 **Apoio Direcionado**: Escolha missionários segundo o coração de Deus
💰 **Contribuição Fiel**: Apoio regular com total transparência
🙏 **Intercessão**: Oração constante pelos seus missionários
📱 **Acompanhamento**: Veja o fruto do seu investimento no Reino

**Formas de abençoar:**
• Apoio financeiro mensal
• Contribuições para projetos específicos
• Mentoria e capacitação
• Oração e encorajamento espiritual

Qual forma de apoio mais toca seu coração?""",
                'options': ['apoio_financeiro', 'apoio_oracao', 'transparencia', 'falar_pessoa']
            }
        }
    
    def detectar_perfil(self, mensagem: str) -> str:
        """Detecta o perfil do usuário baseado na mensagem"""
        msg_lower = mensagem.lower()
        
        # Palavras-chave para missionários
        palavras_missionario = [
            'missionário', 'missionaria', 'missão', 'campo', 'evangelizar',
            'pregar', 'plantar igreja', 'discipular', 'obra missionária'
        ]
        
        # Palavras-chave para mantenedores
        palavras_mantenedor = [
            'apoiar', 'contribuir', 'doar', 'ajudar', 'mantenedor',
            'sustentar', 'investir', 'abençoar', 'dizimo', 'oferta'
        ]
        
        # Palavras-chave para interessados
        palavras_interesse = [
            'informação', 'conhecer', 'saber mais', 'como funciona',
            'entender', 'explicar', 'curiosidade'
        ]
        
        if any(palavra in msg_lower for palavra in palavras_missionario):
            return 'missionario'
        elif any(palavra in msg_lower for palavra in palavras_mantenedor):
            return 'mantenedor'
        elif any(palavra in msg_lower for palavra in palavras_interesse):
            return 'interessado'
        
        return 'indefinido'
    
    def processar_mensagem(self, mensagem: str, user_id: str = "user") -> ChatResponse:
        """Processa a mensagem do usuário e retorna resposta apropriada"""
        
        # Primeira interação
        if user_id not in self.user_sessions:
            self.user_sessions[user_id] = {
                'perfil': None,
                'historico': [],
                'inicio': datetime.datetime.now()
            }
            return ChatResponse(**self.responses['boas_vindas'])
        
        # Adiciona mensagem ao histórico
        self.user_sessions[user_id]['historico'].append({
            'mensagem': mensagem,
            'timestamp': datetime.datetime.now()
        })
        
        # Detecta perfil se ainda não definido
        if not self.user_sessions[user_id]['perfil']:
            perfil = self.detectar_perfil(mensagem)
            self.user_sessions[user_id]['perfil'] = perfil
            
            if perfil == 'missionario':
                return ChatResponse(**self.responses['missionario'])
            elif perfil == 'mantenedor':
                return ChatResponse(**self.responses['mantenedor'])
        
        # Respostas contextuais baseadas em palavras-chave
        return self._gerar_resposta_contextual(mensagem, user_id)
    
    def _gerar_resposta_contextual(self, mensagem: str, user_id: str) -> ChatResponse:
        """Gera resposta contextual baseada na mensagem"""
        msg_lower = mensagem.lower()
        perfil = self.user_sessions[user_id]['perfil']
        
        # Respostas sobre cadastro
        if any(palavra in msg_lower for palavra in ['cadastro', 'cadastrar', 'registrar']):
            return ChatResponse(
                message="""📝 **Processo de Cadastro - Simples e Seguro:**

**Para Missionários:**
1. Preencha formulário com sua visão missionária
2. Envie documentação da igreja/organização
3. Nossa equipe faz verificação pastoral
4. Perfil aprovado e ativo para conexões

**Para Mantenedores:**
1. Cadastro básico com seus dados
2. Definição de perfil de apoio desejado
3. Verificação de segurança
4. Acesso à plataforma de missionários

🚀 **Quer começar agora?** Posso te conectar com nossa equipe!""",
                options=['iniciar_cadastro', 'documentos_necessarios', 'falar_pessoa']
            )
        
        # Respostas sobre transparência
        elif any(palavra in msg_lower for palavra in ['transparência', 'prestação', 'contas']):
            return ChatResponse(
                message="""📊 **Transparência - Nosso Compromisso Bíblico:**

"Tudo seja feito com decência e ordem" (1 Co 14:40)

**Para Missionários:**
• Relatórios mensais obrigatórios
• Fotos e testemunhos das atividades
• Prestação de contas financeira detalhada
• Metas e resultados alcançados

**Para Mantenedores:**
• Dashboard com informações em tempo real
• Comunicação direta com missionários
• Histórico completo de contribuições
• Relatórios de impacto do Reino

**Nossos Controles:**
✅ Verificação pastoral rigorosa
✅ Acompanhamento contínuo
✅ Auditoria regular
✅ Conformidade bíblica e legal

💡 **Resultado:** Confiança mútua e fruto abundante no Reino!""",
                options=['como_funciona', 'seguranca', 'falar_pessoa']
            )
        
        # Resposta padrão empática
        return ChatResponse(
            message=f"""😊 Obrigado por compartilhar isso comigo! 

{self._gerar_resposta_empatica(perfil)}

Para que eu possa te orientar melhor, me conte: você gostaria de saber mais sobre **cadastro**, **transparência**, **comunidade** ou prefere **falar com uma pessoa** da nossa equipe?

✨ Estou aqui para te guiar com todo carinho no Senhor!""",
            options=['cadastro', 'transparencia', 'comunidade', 'falar_pessoa']
        )
    
    def _gerar_resposta_empatica(self, perfil: str) -> str:
        """Gera resposta empática baseada no perfil"""
        if perfil == 'missionario':
            return "Como servo(a) do Senhor, sei que sua jornada tem desafios únicos. Estamos aqui para apoiá-lo(a) integralmente."
        elif perfil == 'mantenedor':
            return "Que coração generoso! O Senhor vê sua disposição em investir no Reino e abençoará abundantemente."
        else:
            return "É maravilhoso ver seu interesse em conhecer mais sobre a obra missionária!"
    
    def coletar_contato(self, nome: str, email: str, telefone: str = "", mensagem: str = "") -> bool:
        """Coleta e armazena informações de contato"""
        contato = {
            'nome': nome,
            'email': email,
            'telefone': telefone,
            'mensagem': mensagem,
            'timestamp': datetime.datetime.now().isoformat(),
            'status': 'novo'
        }
        
        self.contact_database.append(contato)
        return True
    
    def obter_estatisticas(self) -> Dict:
        """Retorna estatísticas do chatbot"""
        total_sessoes = len(self.user_sessions)
        perfis = {}
        
        for session in self.user_sessions.values():
            perfil = session.get('perfil', 'indefinido')
            perfis[perfil] = perfis.get(perfil, 0) + 1
        
        return {
            'total_sessoes': total_sessoes,
            'distribuicao_perfis': perfis,
            'total_contatos': len(self.contact_database)
        }


def main():
    """Interface de linha de comando para testar o chatbot"""
    print("🌟 Manna Bridge Chatbot - Teste Interativo")
    print("=" * 50)
    
    chatbot = MannaBridgeChatbot()
    user_id = "teste_usuario"
    
    # Mensagem inicial
    resposta = chatbot.processar_mensagem("", user_id)
    print(f"\n🤖 Chatbot: {resposta.message}")
    
    if resposta.options:
        print("\n📋 Opções rápidas:")
        for i, opcao in enumerate(resposta.options, 1):
            print(f"  {i}. {opcao}")
    
    while True:
        print("\n" + "-" * 50)
        entrada = input("\n👤 Você: ").strip()
        
        if entrada.lower() in ['sair', 'quit', 'exit']:
            print("\n🙏 Que Deus te abençoe! Até logo!")
            break
        
        if not entrada:
            continue
        
        resposta = chatbot.processar_mensagem(entrada, user_id)
        print(f"\n🤖 Chatbot: {resposta.message}")
        
        if resposta.options:
            print("\n📋 Opções rápidas:")
            for i, opcao in enumerate(resposta.options, 1):
                print(f"  {i}. {opcao}")
    
    # Estatísticas finais
    stats = chatbot.obter_estatisticas()
    print(f"\n📊 Estatísticas da sessão:")
    print(f"Total de interações: {len(chatbot.user_sessions[user_id]['historico'])}")
    print(f"Perfil detectado: {chatbot.user_sessions[user_id]['perfil']}")


if __name__ == "__main__":
    main()
