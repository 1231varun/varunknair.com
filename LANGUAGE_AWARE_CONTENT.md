# 🌐 Language-Aware TypeScript Content System

This portfolio uses a hybrid approach that combines **TypeScript structure** with **automatic language switching** - giving you the best of both worlds!

## 🏗️ Architecture Overview

```
src/config/personal.ts     # Multi-language content in TypeScript
src/hooks/useLanguageAwareData.ts  # Reactive language switching
src/i18n/                  # Language detection & UI translations
```

## ✨ Why This Approach?

### ✅ **Benefits**
- **🔧 TypeScript Structure**: Full intellisense, type safety, and familiar .ts file
- **🌍 Automatic Language Switching**: Content changes based on user's language
- **⚡ Reactive Updates**: Components re-render when language changes  
- **📝 Easy Management**: Add languages by extending data objects
- **🎯 Single Source**: All content in one file instead of multiple JSONs

### 🔄 **How It Works**
1. **Content Storage**: Multi-language data organized by language code in `personal.ts`
2. **Language Detection**: i18next detects user's preferred language
3. **Reactive Hook**: `useLanguageAwareData` provides current language data
4. **Auto-Update**: Components re-render when language changes

## 📁 File Structure

### `src/config/personal.ts`
```typescript
// Multi-language experience data
const experienceData: Record<string, Experience[]> = {
  en: [
    { 
      company: 'Proofpoint',
      position: 'Senior Software Engineer',
      description: ['Enhanced workflow efficiency...'],
      // ... English content
    }
  ],
  es: [
    {
      company: 'Proofpoint', 
      position: 'Ingeniero de Software Senior',
      description: ['Mejoré la eficiencia...'],
      // ... Spanish content
    }
  ]
}

// Language-aware exports
export const getExperience = (): Experience[] => {
  const currentLang = getCurrentLanguage()
  return experienceData[currentLang] || experienceData.en
}
```

### `src/hooks/useLanguageAwareData.ts`
```typescript
export const useLanguageAwareData = () => {
  const { i18n } = useTranslation()
  const [experience, setExperience] = useState(getExperience())

  useEffect(() => {
    const updateData = () => {
      setExperience(getExperience())
    }
    
    i18n.on('languageChanged', updateData)
    return () => i18n.off('languageChanged', updateData)
  }, [i18n])

  return { experience }
}
```

## 🛠️ Adding New Languages

### 1. Add Language Data
In `src/config/personal.ts`, extend the data objects:

```typescript
const experienceData: Record<string, Experience[]> = {
  en: [ /* English data */ ],
  es: [ /* Spanish data */ ],
  fr: [ /* Add French data */ ],
  de: [ /* Add German data */ ],
}
```

### 2. Register Language
In `src/i18n/index.ts`:

```typescript
import frTranslations from './locales/fr.json'

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations }, // Add here
}
```

### 3. Add Language Selector
In `src/components/LanguageSelector.tsx`:

```typescript
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }, // Add here
]
```

## 📝 Content Organization

### **Environment Variables** (Language-Independent)
```typescript
export const personalInfo: PersonalInfo = {
  fullName: import.meta.env.VITE_FULL_NAME,
  email: import.meta.env.VITE_EMAIL,
  // These don't change with language
}
```

### **Professional Content** (Language-Specific)
```typescript
const experienceData: Record<string, Experience[]> = {
  en: [/* English experience descriptions */],
  es: [/* Spanish experience descriptions */],
}

const projectsData: Record<string, Project[]> = {
  en: [/* English project descriptions */],
  es: [/* Spanish project descriptions */],
}
```

## 🎯 Usage in Components

### Using the Hook
```typescript
import { useLanguageAwareData } from '@/hooks/useLanguageAwareData'

const MyComponent = () => {
  const { experience, professionalProjects } = useLanguageAwareData()
  
  // Data automatically updates when language changes
  return (
    <div>
      {experience.map(job => (
        <div key={job.id}>{job.description}</div>
      ))}
    </div>
  )
}
```

### Reactive Updates
- When user switches language → Hook detects change → Components re-render with new content
- No manual refresh needed!

## 🔄 Language Flow

```mermaid
graph TD
    A[User selects language] --> B[i18next updates language]
    B --> C[useLanguageAwareData hook triggered]
    C --> D[getCurrentLanguage() called]
    D --> E[Returns new language data]
    E --> F[Components re-render with new content]
```

## 💡 Pro Tips

### ✅ **Do:**
- Add type definitions for all language variants
- Use descriptive key names for content organization
- Test language switching in development
- Keep fallback to English for missing translations
- Use the same structure across all languages

### ❌ **Don't:**
- Mix languages in the same data object
- Forget to add new languages to the selector
- Leave placeholder content in any language
- Change data structure between languages

## 🚀 Getting Started

1. **Add your content** to the language data objects in `personal.ts`
2. **Extend Spanish translations** or add new languages  
3. **Test language switching** using the language selector
4. **Build and deploy** - everything works automatically!

---

**🎉 Result**: Professional portfolio with seamless language switching, TypeScript benefits, and easy content management! 