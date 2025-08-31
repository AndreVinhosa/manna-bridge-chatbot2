import React from 'react'
import Chatbot from '../components/Chatbot'
import { Heart, MessageCircle, Users, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header Minimalista */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gold-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center shadow-lg">
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

      {/* Hero Section Focada no Chatbot */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          {/* Versículo em Destaque */}
          <div className="mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gold-200 shadow-sm">
            <p className="text-lg italic text-gray-700 mb-2">
              "E o meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus."
            </p>
            <p className="text-sm font-semibold text-primary-600">Filipenses 4:19</p>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Paz do Senhor! 🌟
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Sou seu assistente cristão para conectar <span className="font-semibold text-primary-600">missionários</span> e <span className="font-semibold text-gold-600">mantenedores</span> no Reino de Deus.
          </p>

          {/* Call to Action para o Chatbot */}
          <div className="bg-gradient-to-r from-primary-500 to-gold-500 p-8 rounded-3xl text-white shadow-xl mb-12">
            <MessageCircle className="mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-bold mb-3">Converse Comigo!</h3>
            <p className="text-lg opacity-90 mb-4">
              Clique no botão de chat para começar nossa conversa
            </p>
            <div className="flex justify-center">
              <div className="animate-bounce bg-white/20 p-3 rounded-full">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Funcionalidades Principais */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gold-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🙏</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Missionários</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Orientação sobre apoio financeiro, comunidade e prestação de contas transparente.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gold-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Mantenedores</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Como apoiar missionários com transparência e acompanhar o impacto no Reino.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gold-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="text-secondary-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Comunidade</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Conecte-se com uma comunidade que se apoia mutuamente em amor cristão.
            </p>
          </div>
        </div>

        {/* Seção de Confiança */}
        <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gold-200">
          <Shield className="mx-auto mb-4 text-primary-600" size={40} />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Transparência e Cuidado</h3>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Nossa plataforma é baseada em princípios cristãos de transparência, amor e cuidado mútuo. 
            Cada conversa é guiada pela Palavra de Deus e pelo desejo de fortalecer o Corpo de Cristo.
          </p>
        </div>
      </main>

      {/* Footer Simples */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gold-200 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2">
            "Levai as cargas uns dos outros, e assim cumprireis a lei de Cristo."
          </p>
          <p className="text-sm text-primary-600 font-semibold">Gálatas 6:2</p>
        </div>
      </footer>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  )
}
