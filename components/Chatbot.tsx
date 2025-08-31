'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Heart, Mail, Phone } from 'lucide-react'
import { useNotification } from '../contexts/NotificationContext'
import LoadingSpinner from './LoadingSpinner'
import { MessageSkeleton } from './SkeletonScreen'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  options?: string[]
}

interface ChatbotResponse {
  message: string
  options?: string[]
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailForm, setEmailForm] = useState({ name: '', email: '', message: '' })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const userId = useRef(Math.random().toString(36).substr(2, 9))
  const { showSuccess, showError, showInfo } = useNotification()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Enviar mensagem de boas-vindas
      sendMessage('Olá!')
    }
  }, [isOpen])

  const sendMessage = async (text: string, isUserMessage = true) => {
    if (isUserMessage) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text,
        isBot: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, userMessage])
      setInputValue('')
    }

    setIsTyping(true)

    try {
      const response = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          user_id: userId.current
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setTimeout(() => {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.response.message,
            isBot: true,
            timestamp: new Date(),
            options: data.response.options
          }
          setMessages(prev => [...prev, botMessage])
          setIsTyping(false)
        }, 1000)
      } else {
        showError('Erro na Conversa', 'Não foi possível processar sua mensagem. Tente novamente.')
        setIsTyping(false)
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      showError('Conexão Perdida', 'Verifique sua conexão com a internet e tente novamente.')
      setIsTyping(false)
    }
  }

  const handleOptionClick = (option: string) => {
    const optionTexts: { [key: string]: string } = {
      'missionario': 'Sou missionário',
      'mantenedor': 'Quero apoiar',
      'informacoes': 'Mais informações',
      'cadastro_missionario': 'Como me cadastrar?',
      'apoio_financeiro': 'Apoio financeiro',
      'comunidade': 'Comunidade',
      'transparencia': 'Transparência',
      'seguranca': 'Segurança',
      'como_funciona': 'Como funciona?',
      'contato_humano': 'Falar com uma pessoa',
      'deixar_contato': 'Deixar meu contato',
      'agendar_conversa': 'Agendar conversa'
    }

    if (option === 'deixar_contato' || option === 'agendar_conversa') {
      setShowEmailModal(true)
    } else {
      sendMessage(optionTexts[option] || option)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      sendMessage(inputValue.trim())
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/chatbot/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailForm)
      })

      const data = await response.json()
      
      if (data.success) {
        setShowEmailModal(false)
        setEmailForm({ name: '', email: '', message: '' })
        
        showSuccess('Contato Enviado!', 'Recebemos sua mensagem e entraremos em contato em breve.')
        
        const confirmMessage: Message = {
          id: Date.now().toString(),
          text: data.message,
          isBot: true,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, confirmMessage])
      } else {
        showError('Erro no Envio', 'Não foi possível enviar sua mensagem. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao enviar contato:', error)
      showError('Falha na Conexão', 'Verifique sua internet e tente enviar novamente.')
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={24} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isOpen && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              <Heart size={12} />
            </div>
          )}
          
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Precisa de ajuda? Fale conosco! 😊
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>
        </motion.button>
      </motion.div>

      {/* Interface do Chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="text-white" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Assistente Manna Bridge</h3>
                <p className="text-sm opacity-90">Aqui para ajudar você! 😊</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-white text-gray-800 shadow-sm border border-gray-200'
                          : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    </div>
                    
                    {message.options && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option, index) => (
                          <motion.button
                            key={option}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleOptionClick(option)}
                            className="block w-full text-left px-3 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg text-sm transition-colors duration-200 border border-primary-200 hover:border-primary-300"
                          >
                            {option === 'missionario' && '🙏 Sou Missionário'}
                            {option === 'mantenedor' && '💝 Quero Apoiar'}
                            {option === 'informacoes' && '📖 Mais Informações'}
                            {option === 'cadastro_missionario' && '📝 Como me cadastrar?'}
                            {option === 'apoio_financeiro' && '💰 Apoio Financeiro'}
                            {option === 'comunidade' && '🤝 Comunidade'}
                            {option === 'transparencia' && '📊 Transparência'}
                            {option === 'seguranca' && '🔒 Segurança'}
                            {option === 'como_funciona' && '⚙️ Como Funciona?'}
                            {option === 'contato_humano' && '👥 Falar com Pessoa'}
                            {option === 'deixar_contato' && '📧 Deixar Contato'}
                            {option === 'agendar_conversa' && '📅 Agendar Conversa'}
                          </motion.button>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-2">
                      {message.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  
                  {message.isBot && (
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center order-1 mr-2 flex-shrink-0">
                      <Heart className="text-white" size={16} />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isTyping && <MessageSkeleton />}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  maxLength={500}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white p-2 rounded-full transition-colors duration-200 disabled:opacity-50 flex items-center justify-center min-w-[40px] min-h-[40px]"
                  disabled={!inputValue.trim() || isTyping}
                >
                  {isTyping ? (
                    <LoadingSpinner size="sm" color="white" />
                  ) : (
                    <Send size={20} />
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de E-mail */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowEmailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Mail className="mr-2 text-primary-500" size={24} />
                  Vamos conversar! 💬
                </h3>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">
                Para que possamos te ajudar melhor, deixe seus dados e entraremos em contato em breve:
              </p>
              
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={emailForm.name}
                  onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                
                <textarea
                  placeholder="Conte-nos mais sobre como podemos ajudar..."
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Enviar Mensagem 💝
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
