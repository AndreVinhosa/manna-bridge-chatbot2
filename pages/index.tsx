import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { NotificationProvider } from '../contexts/NotificationContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import { Chatbot } from '../components/Chatbot'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { SkeletonScreen } from '../components/SkeletonScreen'
import { ThemeToggle } from '../components/ThemeToggle'
import Analytics from '../components/Analytics'
import { trackEngagement, trackPWAEvent, trackChatbotEvent } from '../lib/analytics'
import { Heart, MessageCircle, Users, Shield, Star, ChevronDown } from 'lucide-react'

// Componente de Card Interativo com Feedback
const FeatureCard = ({ icon, title, description, delay = 0 }: {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const { showInfo } = useNotification()
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCardClick()
    }
  }

  const handleCardClick = () => {
    setIsHovered(true)
    setTimeout(() => setIsHovered(false), 200)
    
    // Feedback visual com notificação
    showInfo(
      `${title} Selecionado`,
      `Saiba mais sobre como o Manna Bridge ajuda ${title.toLowerCase()}.`
    )
  }
  
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Saiba mais sobre ${title}: ${description}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      onClick={handleCardClick}
      className={`
        bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-gold-200 shadow-sm 
        hover:shadow-lg focus:shadow-lg focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
        transition-all duration-500 cursor-pointer transform outline-none
        min-h-[180px] sm:min-h-[200px] flex flex-col justify-center
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${isHovered || isFocused ? 'scale-105' : 'scale-100'}
      `}
      style={{ transitionDelay: `${delay * 200}ms` }}
    >
      <div
        className={`
          w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-primary-100 to-primary-200 rounded-2xl 
          flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-transform duration-300
          ${isHovered || isFocused ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}
        `}
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center px-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed px-2">{description}</p>
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
    <section
      role="region"
      aria-labelledby="verse-heading"
      className={`
        mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gold-200 shadow-sm
        transition-all duration-1000 transform
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}
    >
      <blockquote className={`
        text-lg italic text-gray-700 mb-2 transition-opacity duration-700 delay-300
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        "{verse}"
      </blockquote>
      <cite 
        id="verse-heading"
        className={`
          text-sm font-semibold text-primary-600 transition-opacity duration-700 delay-500
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {reference}
      </cite>
    </section>
  )
}

// Componente de Call-to-Action para Chat com Feedback
const ChatCallToAction = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { showSuccess } = useNotification()
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleChatClick = () => {
    showSuccess(
      'Chat Ativado!',
      'Clique no ícone de chat para começar nossa conversa cristã.'
    )
    
    // Simular abertura do chat
    const chatButton = document.querySelector('[data-chat-button]') as HTMLElement
    if (chatButton) {
      chatButton.click()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleChatClick()
    }
  }
  
  return (
    <>
      {isVisible && (
        <section 
          role="banner"
          tabIndex={0}
          aria-label="Convite para conversar com o assistente cristão Manna Bridge"
          onKeyDown={handleKeyDown}
          onClick={handleChatClick}
          className="bg-gradient-to-r from-primary-500 to-gold-500 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl text-white shadow-xl mb-8 sm:mb-12 relative overflow-hidden animate-fade-in-up focus:ring-2 focus:ring-white focus:ring-opacity-50 outline-none cursor-pointer mx-2"
        >
          {/* Efeito de brilho animado */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" aria-hidden="true" />
          
          <div className="animate-gentle-bounce" aria-hidden="true">
            <MessageCircle className="mx-auto mb-3 sm:mb-4 animate-pulse" size={40} />
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Converse Comigo!</h3>
          <p className="text-base sm:text-lg opacity-90 mb-3 sm:mb-4 px-2">
            Clique no botão de chat para começar nossa conversa
          </p>
          
          <div className="flex justify-center" aria-hidden="true">
            <div className="bg-white/20 p-2 sm:p-3 rounded-full animate-bounce">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full animate-ping" />
            </div>
          </div>
        </section>
      )}
    </>
  )
}

// Componente principal com Provider de Notificações
const HomeContent = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const { showSuccess, showInfo } = useNotification()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration)
          showSuccess('App Pronto!', 'Manna Bridge está disponível offline.')
        })
        .catch((error) => {
          console.error('SW registration failed:', error)
        })
    }

    // Listener para prompt de instalação
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [showSuccess])

  const handleInstallApp = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      showSuccess('App Instalado!', 'Manna Bridge foi adicionado à sua tela inicial.')
    } else {
      showInfo('Instalação Cancelada', 'Você pode instalar o app a qualquer momento.')
    }
    
    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  return (
    <>
      <Head>
        <title>Manna Bridge - Assistente Cristão | Conectando Missionários e Mantenedores</title>
        <meta name="description" content="Conecte-se com missionários e mantenedores através do nosso assistente cristão inteligente. Baseado em valores bíblicos para fortalecer o Reino de Deus." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#d97706" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Manna Bridge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Manna Bridge" />
        
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Manna Bridge - Assistente Cristão" />
        <meta property="og:description" content="Conectando missionários e mantenedores no Reino de Deus" />
        <meta property="og:url" content="https://manna-bridge.vercel.app" />
        <meta property="og:image" content="/icons/icon-512x512.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manna Bridge - Assistente Cristão" />
        <meta name="twitter:description" content="Conectando missionários e mantenedores no Reino de Deus" />
        <meta name="twitter:image" content="/icons/icon-512x512.png" />
      </Head>

      <Analytics />

      {/* Install App Prompt */}
      {showInstallPrompt && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-gradient-to-r from-primary-500 to-gold-500 text-white p-4 rounded-lg shadow-lg animate-slide-in-right">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="w-6 h-6 mr-3 animate-glow" />
              <div>
                <h4 className="font-semibold">Instalar Manna Bridge</h4>
                <p className="text-sm opacity-90">Tenha acesso rápido ao assistente cristão</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleInstallApp}
                className="bg-white/90 backdrop-blur-sm text-primary-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-white hover:scale-105 transition-all duration-200"
              >
                Instalar
              </button>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="text-white/80 hover:text-white p-2 hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-heaven dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-500">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-yellow-50/30 dark:from-gray-800/30 dark:via-gray-700/20 dark:to-gray-800/30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-gold-200/20 to-primary-200/20 dark:from-gold-400/10 dark:to-primary-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-secondary-200/20 to-accent-200/20 dark:from-secondary-400/10 dark:to-accent-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-gold-300/10 to-primary-300/10 dark:from-gold-500/5 dark:to-primary-500/5 rounded-full blur-2xl animate-glow"></div>
      {/* Skip to main content link */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 focus:ring-2 focus:ring-white"
      >
        Pular para o conteúdo principal
      </a>

        {/* Header Responsivo */}
        <header
          role="banner"
          className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gold-200/50 dark:border-gray-700/50 sticky top-0 z-40 animate-fade-in-down relative"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-gold-50/40 to-white/60 dark:from-gray-900/60 dark:via-gray-800/40 dark:to-gray-900/60"></div>
          <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center shadow-lg animate-gentle-bounce" aria-hidden="true">
                  <Heart className="text-white" size={20} />
                </div>
                <div className="text-center">
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-gold-600 bg-clip-text text-transparent">
                    Manna Bridge
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium" role="doc-subtitle">Assistente Cristão</p>
                </div>
              </div>
              
              {/* Theme Toggle */}
              <div className="flex items-center">
                <ThemeToggle size="md" />
              </div>
            </div>
          </div>
        </header>

        {/* Indicador de Scroll */}
        <div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-fade-in"
          role="status"
          aria-label="Indicador de rolagem - role para baixo para ver mais conteúdo"
        >
          <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border border-gold-200/50 animate-bounce hover:scale-110 transition-transform">
            <ChevronDown className="text-primary-600 animate-wiggle" size={20} aria-hidden="true" />
          </div>
        </div>

      {/* Hero Section Mobile-First */}
      <main id="main-content" role="main" className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-12 sm:mb-16">
          {/* Versículo em Destaque */}
          <VerseCard
            verse="E o meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus."
            reference="Filipenses 4:19"
            delay={0.2}
          />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight animate-fade-in-up px-2">
            <span className="bg-gradient-to-r from-primary-600 via-gold-600 to-secondary-600 bg-clip-text text-transparent animate-glow">
              Paz do Senhor! 🌟
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up px-4" style={{animationDelay: '0.3s'}}>
            Sou seu assistente cristão para conectar{' '}
            <span className="font-semibold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">missionários</span> e{' '}
            <span className="font-semibold bg-gradient-to-r from-gold-600 to-gold-700 bg-clip-text text-transparent">mantenedores</span> no Reino de Deus.
          </p>

          {/* Seção de Features */}
          <section 
            id="features"
            className="py-8 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8"
            role="region"
            aria-labelledby="features-heading"
          >
            <div className="max-w-6xl mx-auto">
              <h2 
                id="features-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-12 animate-fade-in-up"
              >
                Como Podemos Te Ajudar? 🤝
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {isLoading ? (
                  <>
                    <FeatureCardSkeleton />
                    <FeatureCardSkeleton />
                    <div className="sm:col-span-2 lg:col-span-1">
                      <FeatureCardSkeleton />
                    </div>
                  </>
                ) : (
                  <>
                    <FeatureCard
                      icon={<Heart className="text-primary-600" size={24} />}
                      title="Missionários"
                      description="Conecte-se com apoiadores que compartilham sua visão de espalhar o amor de Cristo pelo mundo."
                      delay={0.2}
                    />
                    
                    <FeatureCard
                      icon={<Users className="text-primary-600" size={24} />}
                      title="Mantenedores"
                      description="Apoie missionários dedicados e faça parte da Grande Comissão de forma prática e significativa."
                      delay={0.4}
                    />
                    
                    <div className="sm:col-span-2 lg:col-span-1">
                      <FeatureCard
                        icon={<Shield className="text-primary-600" size={24} />}
                        title="Transparência"
                        description="Acompanhe o impacto do seu apoio com relatórios detalhados e atualizações regulares dos missionários."
                        delay={0.6}
                      />
                    </div>
                  </>
                )}
              </div>
          </section>

          {/* Call to Action Mobile Otimizado */}
          <ChatCallToAction />

          {/* Seção de Confiança Mobile Otimizada */}
          <section 
            aria-labelledby="trust-heading"
            className="text-center bg-white/60 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl border border-gold-200 animate-fade-in-up mx-2"
          >
            <div className="animate-spin-slow" aria-hidden="true">
              <Shield className="mx-auto mb-3 sm:mb-4 text-primary-600" size={32} />
            </div>
            <h3 id="trust-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Transparência e Cuidado</h3>
            <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed px-2">
              Nossa plataforma é baseada em princípios cristãos de transparência, amor e cuidado mútuo. 
              Cada conversa é guiada pela Palavra de Deus e pelo desejo de fortalecer o Corpo de Cristo.
            </p>
          </section>
        </div>

        {/* Grid Responsivo Mobile-First */}
        <section 
          aria-labelledby="features-heading"
          className="mb-12 sm:mb-16"
        >
          <h2 id="features-heading" className="sr-only">
            Funcionalidades principais do Manna Bridge
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2">
            <FeatureCard
              icon={<span className="text-2xl sm:text-3xl" role="img" aria-label="Emoji de oração">🙏</span>}
              title="Missionários"
              description="Orientação sobre apoio financeiro, comunidade e prestação de contas transparente."
              delay={0.2}
            />
            
            <FeatureCard
              icon={<span className="text-2xl sm:text-3xl" role="img" aria-label="Emoji de presente com coração">💝</span>}
              title="Mantenedores"
              description="Como apoiar missionários com transparência e acompanhar o impacto no Reino."
              delay={0.4}
            />
            
            <div className="sm:col-span-2 lg:col-span-1">
              <FeatureCard
                icon={<Users className="text-secondary-600" size={20} aria-label="Ícone de comunidade" />}
                title="Comunidade"
                description="Conecte-se com uma comunidade que se apoia mutuamente em amor cristão."
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Versículo Inspiracional */}
        <VerseCard 
          verse="E tudo quanto fizerdes, fazei-o de todo o coração, como ao Senhor, e não aos homens."
          reference="Colossenses 3:23"
          delay={1.2}
        />
      </main>

      {/* Footer Mobile Responsivo */}
      <footer 
        role="contentinfo"
        className="bg-white/80 backdrop-blur-sm border-t border-gold-200 py-6 sm:py-8 animate-fade-in"
      >
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <blockquote className="text-sm sm:text-base text-gray-600 mb-2 animate-fade-in-up animation-delay-200 px-4">
            "Levai as cargas uns dos outros, e assim cumprireis a lei de Cristo."
          </blockquote>
          <cite className="text-xs sm:text-sm text-primary-600 font-semibold animate-fade-in-up animation-delay-400">
            Gálatas 6:2
          </cite>
        </div>
      </footer>

        {/* Chatbot Component */}
        <div data-chatbot>
          <Chatbot />
        </div>
      </div>
    </>
  )
}

// Wrapper principal com Providers
export default function Home() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <HomeContent />
      </NotificationProvider>
    </ThemeProvider>
  )
}
