import React, { createContext, useContext, useState, useCallback } from 'react'
import Toast, { ToastType } from '../components/Toast'

interface NotificationContextType {
  showNotification: (type: ToastType, title: string, message?: string, duration?: number) => void
  showSuccess: (title: string, message?: string) => void
  showError: (title: string, message?: string) => void
  showWarning: (title: string, message?: string) => void
  showInfo: (title: string, message?: string) => void
}

interface ToastData {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification deve ser usado dentro de NotificationProvider')
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const showNotification = useCallback((
    type: ToastType,
    title: string,
    message?: string,
    duration?: number
  ) => {
    const id = generateId()
    const newToast: ToastData = {
      id,
      type,
      title,
      message,
      duration
    }

    setToasts(prev => [...prev, newToast])
  }, [])

  const showSuccess = useCallback((title: string, message?: string) => {
    showNotification('success', title, message)
  }, [showNotification])

  const showError = useCallback((title: string, message?: string) => {
    showNotification('error', title, message)
  }, [showNotification])

  const showWarning = useCallback((title: string, message?: string) => {
    showNotification('warning', title, message)
  }, [showNotification])

  const showInfo = useCallback((title: string, message?: string) => {
    showNotification('info', title, message)
  }, [showNotification])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const contextValue: NotificationContextType = {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      
      {/* Container de Toasts */}
      <div 
        className="fixed top-4 right-4 z-50 space-y-2"
        role="region"
        aria-label="Notificações"
      >
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            onClose={removeToast}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
