import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Skill } from '@/types'
import { personalInfo } from '@/config/personal'

interface SkillsProps {
  skills: Skill[]
}

const Skills = ({ skills }: SkillsProps) => {
  const { ref, controls } = useScrollAnimation({ threshold: 0.3 })

  const categories = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    devops: 'DevOps',
    tools: 'Tools',
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
        delay: 0.2,
      },
    }),
  }

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="container-max-width section-padding">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              Technologies and tools I use to build amazing digital experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(categories).map(([categoryKey, categoryName]) => {
              const categorySkills = skills.filter(skill => skill.category === categoryKey)
              
              if (categorySkills.length === 0) return null

              return (
                <motion.div
                  key={categoryKey}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 card-hover"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
                    {categoryName}
                  </h3>
                  
                  <div className="space-y-4">
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        variants={skillVariants}
                        initial="hidden"
                        animate={controls}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {skill.level}%
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${
                              categoryKey === 'frontend' ? 'bg-blue-500' :
                              categoryKey === 'backend' ? 'bg-green-500' :
                              categoryKey === 'database' ? 'bg-purple-500' :
                              categoryKey === 'devops' ? 'bg-orange-500' :
                              'bg-gray-500'
                            }`}
                            variants={progressVariants}
                            initial="hidden"
                            animate={controls}
                            custom={skill.level}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Skills Summary */}
          <motion.div
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary-600">{skills.length}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary-600">
                  {Object.keys(categories).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary-600">
                  {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Proficiency</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary-600">
                  {personalInfo.yearsOfExperience ? `${personalInfo.yearsOfExperience}+` : '5+'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills 