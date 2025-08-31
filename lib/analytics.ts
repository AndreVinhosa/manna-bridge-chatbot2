// Google Analytics 4 configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// Track custom events
export const event = (action: string, parameters?: {
  event_category?: string
  event_label?: string
  value?: number
  [key: string]: any
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: parameters?.event_category,
      event_label: parameters?.event_label,
      value: parameters?.value,
      ...parameters
    })
  }
}

// Chatbot specific events
export const trackChatbotEvent = (action: 'message_sent' | 'conversation_started' | 'contact_form_submitted', data?: any) => {
  event(action, {
    event_category: 'chatbot',
    event_label: data?.userType || 'unknown',
    custom_parameters: data
  })
}

// PWA events
export const trackPWAEvent = (action: 'install_prompt_shown' | 'app_installed' | 'offline_usage') => {
  event(action, {
    event_category: 'pwa',
    timestamp: new Date().toISOString()
  })
}

// User engagement events
export const trackEngagement = (action: 'feature_card_click' | 'theme_toggle' | 'scroll_indicator_click', label?: string) => {
  event(action, {
    event_category: 'engagement',
    event_label: label
  })
}

// Performance tracking
export const trackPerformance = (metric: string, value: number, unit: string = 'ms') => {
  event('performance_metric', {
    event_category: 'performance',
    event_label: metric,
    value: value,
    custom_parameters: {
      unit,
      timestamp: new Date().toISOString()
    }
  })
}

// Error tracking
export const trackError = (error: string, context?: string) => {
  event('error_occurred', {
    event_category: 'error',
    event_label: context || 'unknown',
    custom_parameters: {
      error_message: error,
      timestamp: new Date().toISOString()
    }
  })
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: any
    ) => void
  }
}
