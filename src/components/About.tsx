import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PersonalInfo, SocialLinks } from '@/types'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Avatar from './Avatar'

interface AboutProps {
  personalInfo: PersonalInfo
  socialLinks?: SocialLinks
}

const About = ({ personalInfo, socialLinks }: AboutProps) => {
  const { ref, controls, animationCapability } = useScrollAnimation({ threshold: 0.3 })
  const { t } = useTranslation()



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const socialPlatforms = [
    { 
      name: 'GitHub', 
      url: socialLinks?.github, 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      url: socialLinks?.linkedin, 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      url: socialLinks?.twitter, 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    { 
      name: 'Website', 
      url: socialLinks?.website, 
      icon: <ExternalLink className="w-6 h-6" />
    }
  ]

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, text: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: <Phone className="w-5 h-5" />, text: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: <MapPin className="w-5 h-5" />, text: personalInfo.location, href: null },
  ]

  // Use fallback only if animations aren't supported (reduced motion)
  if (animationCapability === 'none') {
    return (
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50" ref={ref}>
        <div className="container-max-width section-padding">
          <div>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t('about.title')}</h2>
              <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {/* Split personal story into paragraphs for better readability */}
                <div className="space-y-4">
                  {personalInfo.personalStory.split('\n\n').filter(paragraph => paragraph.trim()).map((paragraph, index) => (
                    <p key={index} className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
                        {item.icon}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex gap-6 pt-4">
                  {socialPlatforms.filter(platform => platform.url).map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                      aria-label={`Visit ${platform.name} profile`}
                    >
                      {platform.icon}
                      <span className="text-sm font-medium">{platform.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="lg:order-first">
                <div className="relative flex justify-center">
                  <Avatar
                    name={personalInfo.fullName}
                    size="xl"
                    imageUrl={personalInfo.profileImageUrl}
                    className="w-80 h-80"
                  />
                  
                  {/* Decorative circles */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full opacity-40"></div>
                  <div className="absolute top-1/2 -right-8 w-8 h-8 bg-primary-300 dark:bg-primary-700 rounded-full opacity-80"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50 no-overflow" ref={ref}>
      <div className="container-max-width section-padding mobile-safe">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t('about.title')}</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-6" variants={itemVariants}>
              {/* Split personal story into paragraphs for better readability */}
              <div className="space-y-4">
                {personalInfo.personalStory.split('\n\n').filter(paragraph => paragraph.trim()).map((paragraph, index) => (
                  <motion.p 
                    key={index} 
                    className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                    variants={itemVariants}
                  >
                    {paragraph.trim()}
                  </motion.p>
                ))}
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4"
                    variants={itemVariants}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
                      {item.icon}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{t('contact.info.title')}</h3>
                <div className="flex gap-4">
                  {socialPlatforms.map((social) => (
                    social.url && (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-600 hover:text-white transition-all duration-200"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Connect on ${social.name}`}
                      >
                        {social.icon}
                      </motion.a>
                    )
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:order-first"
              variants={itemVariants}
            >
              <div className="relative flex justify-center">
                <Avatar
                  name={personalInfo.fullName}
                  size="xl"
                  imageUrl={personalInfo.profileImageUrl}
                  className="w-80 h-80"
                />
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 dark:bg-primary-800 rounded-full opacity-50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full opacity-50"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 