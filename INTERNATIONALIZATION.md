# 🌐 Internationalization (i18n) Guide

This portfolio supports multiple languages and makes it easy to customize content for different users.

## 📁 File Structure

```
src/i18n/
├── index.ts              # i18n configuration
└── locales/
    ├── en.json          # English translations
    └── es.json          # Spanish translations (example)
```

## 🔧 How It Works

The portfolio uses **react-i18next** for internationalization with:
- **Automatic language detection** from browser/localStorage
- **Fallback to English** if translation missing
- **Easy language switching** with the language selector
- **Clear content organization** for easy customization

## 📝 Content Organization

Each translation file is organized into clear sections:

### 🔒 **GENERIC UI TEXT** (Keep as-is)
These are reusable across all portfolios:
- Navigation labels
- Button text  
- Form labels
- Loading states
- Error messages

**✅ Do:** Keep these unchanged for consistency
**❌ Don't:** Modify these unless you want different UI text

### ✏️ **PERSONAL CONTENT** (Customize Required)
Content specific to the person:
- Personal descriptions
- Contact info descriptions  
- SEO meta templates

**✅ Do:** Replace with your own personality/style
**❌ Don't:** Leave the example text

### 📝 **CONTENT EXAMPLES** (Replace Required)
Professional content that needs to be replaced:
- Work experience descriptions
- Project details
- Company names
- Achievements

**✅ Do:** Replace with your actual experience
**❌ Don't:** Leave example companies/projects

## 🚀 Quick Setup Guide

### 1. **Keep Generic UI Text**
Leave these sections unchanged:
```json
{
  "navigation": { ... },    // ✅ Keep as-is
  "theme": { ... },        // ✅ Keep as-is  
  "accessibility": { ... } // ✅ Keep as-is
}
```

### 2. **Customize Personal Content**
Update these with your style:
```json
{
  "contact": {
    "info": {
      "description": "Your personal communication style here..."
    }
  }
}
```

### 3. **Replace Professional Content**
Replace with your actual experience:
```json
{
  "experience": {
    "jobs": {
      "your-job-1": {
        "company": "Your Actual Company",
        "position": "Your Actual Position",
        "description": [
          "Your actual achievements...",
          "Your actual responsibilities..."
        ]
      }
    }
  }
}
```

## 🌍 Adding New Languages

### 1. Create Translation File
```bash
touch src/i18n/locales/fr.json  # French example
```

### 2. Copy English Structure
Copy `en.json` and translate the values (keep the keys):
```json
{
  "navigation": {
    "about": "À propos",     // ✅ Translate value
    "skills": "Compétences"  // ✅ Keep key, translate value
  }
}
```

### 3. Register Language
Update `src/i18n/index.ts`:
```typescript
import frTranslations from './locales/fr.json'

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations }, // ✅ Add new language
}
```

### 4. Add to Language Selector
Update `src/components/LanguageSelector.tsx`:
```typescript
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }, // ✅ Add here
]
```

## 🎯 Translation Keys Reference

### Common Patterns
```json
{
  "section.subsection.item": "Translation",
  "section.items.itemId.property": "Value"
}
```

### Variable Interpolation
```json
{
  "yearsExperience": "{{years}}+ Years Experience",
  "copyright": "© {{year}} {{name}}. All rights reserved."
}
```

Usage in components:
```typescript
const { t } = useTranslation()
t('yearsExperience', { years: 5 })  // "5+ Years Experience"
```

## 📱 Usage in Components

### Basic Translation
```typescript
import { useTranslation } from 'react-i18next'

const MyComponent = () => {
  const { t } = useTranslation()
  
  return <h1>{t('navigation.about')}</h1>
}
```

### With Variables
```typescript
<p>{t('experience.yearsExperience', { years: personalInfo.yearsOfExperience })}</p>
```

### Language Switching
```typescript
const { i18n } = useTranslation()
i18n.changeLanguage('es')  // Switch to Spanish
```

## 🔍 Best Practices

### ✅ **Do:**
- Keep translation keys consistent across languages
- Use descriptive key names (`contact.form.validation.emailRequired`)
- Test all languages after changes
- Use variables for dynamic content
- Keep UI text generic and reusable

### ❌ **Don't:**
- Hardcode text in components (use translation keys)
- Change key names without updating all languages
- Leave example/placeholder content
- Mix languages in the same file
- Forget to add new keys to all language files

## 🐛 Troubleshooting

### Missing Translation
**Problem:** Text shows as translation key
**Solution:** Add the key to all language files

### Language Not Switching
**Problem:** Language selector doesn't work
**Solution:** Check if language is registered in `i18n/index.ts`

### Fallback Not Working
**Problem:** Shows error instead of fallback
**Solution:** Ensure English translations exist for all keys

## 📚 Additional Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [Language Codes Reference](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

---

**💡 Pro Tip:** Start with English, get the content right, then translate to other languages. This ensures consistency across all versions! 