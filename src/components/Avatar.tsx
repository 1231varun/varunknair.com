import { motion } from 'framer-motion'

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  imageUrl?: string
  className?: string
}

const Avatar = ({ name, size = 'lg', imageUrl, className = '' }: AvatarProps) => {
  // Generate initials from name
  const generateInitials = (fullName: string): string => {
    const names = fullName.trim().split(/\s+/).filter(Boolean)
    
    if (names.length === 0) return 'U'
    
    // Limit to maximum 3 initials to prevent overflow
    const maxInitials = 3
    const initialsToUse = names.slice(0, maxInitials)
    
    return initialsToUse
      .map(name => name.charAt(0).toUpperCase())
      .join('')
  }

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'w-10 h-10',
      text: 'text-sm',
    },
    md: {
      container: 'w-16 h-16',
      text: 'text-lg',
    },
    lg: {
      container: 'w-20 h-20',
      text: 'text-xl',
    },
    xl: {
      container: 'w-32 h-32',
      text: 'text-3xl',
    },
  }

  const config = sizeConfig[size]
  const initials = generateInitials(name)

  // Generate a consistent color based on the name
  const getAvatarColor = (name: string): string => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-pink-500',
      'bg-teal-500',
    ]
    
    // Simple hash function to get consistent color
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    return colors[Math.abs(hash) % colors.length]
  }

  if (imageUrl) {
    return (
      <motion.div
        className={`${config.container} rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-800 shadow-lg ${className}`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={imageUrl}
          alt={`${name}'s avatar`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            // If image fails to load, hide it and show initials
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
        {/* Fallback initials in case image fails */}
        <div className={`w-full h-full ${getAvatarColor(name)} flex items-center justify-center text-white font-bold ${config.text}`}>
          {initials}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`${config.container} ${getAvatarColor(name)} rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-4 ring-white dark:ring-gray-800 ${config.text} ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      title={name}
    >
      {initials}
    </motion.div>
  )
}

export default Avatar 