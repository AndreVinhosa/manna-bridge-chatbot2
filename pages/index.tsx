import React from 'react'
import Chatbot from '../components/Chatbot'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manna Bridge</h1>
                <p className="text-sm text-gray-600">Conectando corações generosos a missionários dedicados</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Bem-vindo à Manna Bridge
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Uma plataforma que conecta mantenedores e missionários, garantindo apoio integral, 
            transparência e comunidade para que a obra missionária prospere.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🙏</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Para Missionários</h3>
              <p className="text-gray-600">
                Receba apoio financeiro, emocional e comunitário para sua missão. 
                Conecte-se com mantenedores alinhados com sua visão.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Para Mantenedores</h3>
              <p className="text-gray-600">
                Apoie missionários de forma transparente e acompanhe o impacto real 
                de sua generosidade no Reino de Deus.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comunidade</h3>
              <p className="text-gray-600">
                Faça parte de uma comunidade que se apoia mutuamente, 
                com transparência total e cuidado integral.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  )
}
