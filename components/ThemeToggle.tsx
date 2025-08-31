import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const { theme, toggleTheme } = useTheme()

  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5'
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        relative overflow-hidden
        bg-white/80 dark:bg-gray-800/80
        backdrop-blur-md
        border border-gold-200/50 dark:border-gray-600/50
        rounded-full
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-primary-500/50
        group
        ${className}
      `}
      aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      title={`Tema ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-100/50 to-primary-100/50 dark:from-gray-700/50 dark:to-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {theme === 'light' ? (
          <Moon 
            size={iconSizes[size]} 
            className="text-gray-700 dark:text-gray-200 transition-all duration-300 group-hover:text-primary-600 dark:group-hover:text-gold-400 group-hover:rotate-12" 
          />
        ) : (
          <Sun 
            size={iconSizes[size]} 
            className="text-gray-700 dark:text-gray-200 transition-all duration-300 group-hover:text-gold-500 dark:group-hover:text-gold-400 group-hover:rotate-12 group-hover:scale-110" 
          />
        )}
      </div>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400/20 to-gold-400/20 scale-0 group-active:scale-100 transition-transform duration-200" />
    </button>
  )
}
