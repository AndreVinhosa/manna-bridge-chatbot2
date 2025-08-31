import React, { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  onClose: (id: string) => void
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Animação de entrada
    const showTimer = setTimeout(() => setIsVisible(true), 100)
    
    // Auto-close
    const closeTimer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(closeTimer)
    }
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose(id)
    }, 300)
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />
      default:
        return <Info className="w-5 h-5 text-gray-600" />
    }
  }

  const getStyles = () => {
    const baseStyles = "border-l-4 bg-white shadow-lg rounded-lg"
    
    switch (type) {
      case 'success':
        return `${baseStyles} border-green-500 bg-green-50`
      case 'error':
        return `${baseStyles} border-red-500 bg-red-50`
      case 'warning':
        return `${baseStyles} border-yellow-500 bg-yellow-50`
      case 'info':
        return `${baseStyles} border-blue-500 bg-blue-50`
      default:
        return `${baseStyles} border-gray-500 bg-gray-50`
    }
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        ${getStyles()}
        p-4 mb-3 max-w-sm w-full transform transition-all duration-300 ease-in-out
        ${isVisible && !isExiting 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="ml-3 flex-1">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">
            {title}
          </h4>
          {message && (
            <p className="text-sm text-gray-700 leading-relaxed">
              {message}
            </p>
          )}
        </div>
        
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          aria-label="Fechar notificação"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  )
}

export default Toast
