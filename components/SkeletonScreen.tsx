import React from 'react'

interface SkeletonScreenProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
  lines?: number
  className?: string
}

const SkeletonScreen: React.FC<SkeletonScreenProps> = ({
  variant = 'text',
  width = '100%',
  height,
  lines = 1,
  className = ''
}) => {
  const baseClasses = 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse'
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full'
      case 'rectangular':
        return 'rounded-md'
      case 'card':
        return 'rounded-lg'
      case 'text':
      default:
        return 'rounded'
    }
  }

  const getDefaultHeight = () => {
    if (height) return height
    switch (variant) {
      case 'circular':
        return width
      case 'card':
        return '200px'
      case 'text':
      default:
        return '1rem'
    }
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`} role="status" aria-label="Carregando conteúdo...">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{
              width: index === lines - 1 ? '75%' : width,
              height: getDefaultHeight()
            }}
          />
        ))}
        <span className="sr-only">Carregando conteúdo...</span>
      </div>
    )
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={{ width, height: getDefaultHeight() }}
      role="status"
      aria-label="Carregando conteúdo..."
    >
      <span className="sr-only">Carregando conteúdo...</span>
    </div>
  )
}

// Componente específico para skeleton de mensagem do chatbot
export const MessageSkeleton: React.FC = () => (
  <div className="flex justify-start mb-4" role="status" aria-label="Carregando mensagem...">
    <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse mr-2 flex-shrink-0" />
    <div className="max-w-[80%] space-y-2">
      <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl p-4">
        <SkeletonScreen variant="text" lines={2} />
      </div>
    </div>
    <span className="sr-only">Carregando mensagem...</span>
  </div>
)

// Componente específico para skeleton de card de feature
export const FeatureCardSkeleton: React.FC = () => (
  <div className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[180px] sm:min-h-[200px] flex flex-col justify-center" role="status" aria-label="Carregando recurso...">
    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl animate-pulse mx-auto mb-3 sm:mb-4" />
    <SkeletonScreen variant="text" height="1.25rem" className="mb-2 sm:mb-3" />
    <SkeletonScreen variant="text" lines={2} height="0.875rem" />
    <span className="sr-only">Carregando recurso...</span>
  </div>
)

export default SkeletonScreen
