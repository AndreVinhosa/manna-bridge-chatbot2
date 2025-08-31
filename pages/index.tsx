import React, { useState, useEffect } from 'react'
import Chatbot from '../components/Chatbot'
import { Heart, MessageCircle, Users, Shield, Star, ChevronDown } from 'lucide-react'

// Componente de Card Interativo
const FeatureCard = ({ icon, title, description, delay = 0 }: {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gold-200 shadow-sm 
        hover:shadow-lg transition-all duration-500 cursor-pointer transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${isHovered ? 'scale-105' : 'scale-100'}
      `}
      style={{ transitionDelay: `${delay * 200}ms` }}
    >
      <div
        className={`
          w-14 h-14 bg-gradient-to-r from-primary-100 to-primary-200 rounded-2xl 
          flex items-center justify-center mx-auto mb-4 transition-transform duration-300
          ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}
        `}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  )
}

// Componente de Versículo Animado
const VerseCard = ({ verse, reference, delay = 0 }: {
  verse: string
  reference: string
  delay?: number
}) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])
  
  return (
    <div
      className={`
        mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gold-200 shadow-sm
        transition-all duration-1000 transform
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}
    >
      <p className={`
        text-lg italic text-gray-700 mb-2 transition-opacity duration-700 delay-300
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        "{verse}"
      </p>
      <p className={`
        text-sm font-semibold text-primary-600 transition-opacity duration-700 delay-500
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        {reference}
      </p>
    </div>
  )
}

// Componente de Call-to-Action Interativo
const ChatCallToAction = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <>
      {isVisible && (
        <div className="bg-gradient-to-r from-primary-500 to-gold-500 p-8 rounded-3xl text-white shadow-xl mb-12 relative overflow-hidden animate-fade-in-up">
          {/* Efeito de brilho animado */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          
          <div className="animate-gentle-bounce">
            <MessageCircle className="mx-auto mb-4 animate-pulse" size={48} />
          </div>
          
          <h3 className="text-2xl font-bold mb-3">Converse Comigo!</h3>
          <p className="text-lg opacity-90 mb-4">
            Clique no botão de chat para começar nossa conversa
          </p>
          
          <div className="flex justify-center">
            <div className="bg-white/20 p-3 rounded-full animate-bounce">
              <div className="w-4 h-4 bg-white rounded-full animate-ping" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollIndicator(window.scrollY < 100)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
      {/* Header Animado */}
      <header
        className="bg-white/80 backdrop-blur-sm border-b border-gold-200 sticky top-0 z-40 animate-fade-in-down"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center shadow-lg animate-gentle-bounce">
                <Heart className="text-white" size={24} />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-gold-600 bg-clip-text text-transparent">
                  Manna Bridge
                </h1>
                <p className="text-sm text-gray-600 font-medium">Assistente Cristão</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Indicador de Scroll */}
      {showScrollIndicator && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg animate-bounce">
            <ChevronDown className="text-primary-600" size={20} />
          </div>
        </div>
      )}

      {/* Hero Section Focada no Chatbot */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          {/* Versículo em Destaque */}
          <VerseCard
            verse="E o meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus."
            reference="Filipenses 4:19"
            delay={0.2}
          />

          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
            Paz do Senhor! 🌟
          </h2>
          
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
            Sou seu assistente cristão para conectar{' '}
            <span className="font-semibold text-primary-600">missionários</span> e{' '}
            <span className="font-semibold text-gold-600">mantenedores</span> no Reino de Deus.
          </p>

          {/* Call to Action Interativo */}
          <ChatCallToAction />
        </div>

        {/* Funcionalidades Principais com React */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            icon={<span className="text-3xl">🙏</span>}
            title="Missionários"
            description="Orientação sobre apoio financeiro, comunidade e prestação de contas transparente."
            delay={0.2}
          />
          
          <FeatureCard
            icon={<span className="text-3xl">💝</span>}
            title="Mantenedores"
            description="Como apoiar missionários com transparência e acompanhar o impacto no Reino."
            delay={0.4}
          />
          
          <FeatureCard
            icon={<Users className="text-secondary-600" size={24} />}
            title="Comunidade"
            description="Conecte-se com uma comunidade que se apoia mutuamente em amor cristão."
            delay={0.6}
          />
        </div>

        {/* Seção de Confiança Animada */}
        <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gold-200 animate-fade-in-up">
          <div className="animate-spin-slow">
            <Shield className="mx-auto mb-4 text-primary-600" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Transparência e Cuidado</h3>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Nossa plataforma é baseada em princípios cristãos de transparência, amor e cuidado mútuo. 
            Cada conversa é guiada pela Palavra de Deus e pelo desejo de fortalecer o Corpo de Cristo.
          </p>
        </div>
      </main>

      {/* Footer Animado */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gold-200 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2 animate-fade-in-up animation-delay-200">
            "Levai as cargas uns dos outros, e assim cumprireis a lei de Cristo."
          </p>
          <p className="text-sm text-primary-600 font-semibold animate-fade-in-up animation-delay-400">
            Gálatas 6:2
          </p>
        </div>
      </footer>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  )
}
