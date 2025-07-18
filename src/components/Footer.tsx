import { motion } from 'framer-motion'
import { Heart, ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PersonalInfo, SocialLinks } from '@/types'

interface FooterProps {
  personalInfo: PersonalInfo
  socialLinks: SocialLinks
}

const Footer = ({ personalInfo, socialLinks }: FooterProps) => {
  const { t } = useTranslation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerSections = [
    {
      title: t('footer.navigation'),
      links: [
        { name: t('navigation.about'), href: '#about' },
        { name: t('navigation.skills'), href: '#skills' },
        { name: t('navigation.experience'), href: '#experience' },
        { name: t('navigation.projects'), href: '#projects' },
        { name: t('navigation.contact'), href: '#contact' },
      ],
    },
    {
      title: t('footer.connect'),
      links: [
        { name: 'GitHub', href: socialLinks.github },
        { name: 'LinkedIn', href: socialLinks.linkedin },
        { name: 'Twitter', href: socialLinks.twitter },
        { name: 'Website', href: socialLinks.website },
      ].filter(link => link.href).map(link => ({ ...link, href: link.href! })),
    },
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container-max-width section-padding">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gradient mb-4">
                  {personalInfo.fullName}
                </h3>
                <p className="text-gray-300 mb-6 max-w-md">
                  {personalInfo.tagline}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('footer.description')}
                </p>
              </motion.div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              className="flex items-center gap-2 text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
                              <span>{t('footer.copyright', { year: new Date().getFullYear(), name: personalInfo.fullName })}</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>{t('footer.builtWith')}</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-gray-400 text-sm">
                {t('footer.builtWith')}
              </span>
              
              <motion.button
                onClick={scrollToTop}
                className="p-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl" />
      </div>
    </footer>
  )
}

export default Footer 