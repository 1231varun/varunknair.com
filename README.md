# Portfolio Website

A modern, responsive, and highly customizable portfolio website built with React, TypeScript, and TailwindCSS. This template is designed to be easily forkable and reusable for any developer looking to showcase their work professionally.

## Features

### Core Features
- **Modern Tech Stack**: React 18, TypeScript, TailwindCSS, Framer Motion
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Smooth Animations**: Professional animations powered by Framer Motion
- **SEO Optimized**: Proper meta tags, Open Graph, and Twitter Card support
- **Performance Optimized**: Code splitting, lazy loading, and caching strategies

### Sections
- **Hero Section**: Eye-catching introduction with call-to-action buttons
- **About**: Personal information with social links and contact details
- **Skills**: Categorized skill display with proficiency levels and animations
- **Experience**: Timeline-based work experience with detailed descriptions
- **Projects**: Featured project showcase with technology stacks
- **Contact**: Functional contact form with validation and status feedback

### Technical Features
- **Personal Configuration**: Type-safe personal data management with automatic Git ignore
- **Resume Caching**: Intelligent caching for resume downloads with cache management
- **Analytics Integration**: Privacy-focused analytics with Google Analytics support
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Code Quality**: ESLint, Prettier, and comprehensive error handling
- **Build Optimization**: Vite build system with automatic chunking and optimization

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+ or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up personal configuration**
   ```bash
   cp src/config/personal.example.ts src/config/personal.ts
   ```

4. **Configure your information**
   Edit `src/config/personal.ts` with your personal details (see Configuration section below)

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:3000`

## Configuration

### Hybrid Configuration System

This portfolio uses a hybrid approach that separates sensitive personal data from professional content:

#### Step 1: Environment Variables (Sensitive Data)

1. Create a `.env` file in the root directory:
   ```bash
   # Copy from the template provided in personal.example.ts
   # Add your sensitive information
   ```

2. Add your sensitive information:
   ```env
   VITE_FULL_NAME="Your Full Name"
   VITE_EMAIL="your.email@example.com"
   VITE_PHONE="+1-234-567-8900"
   VITE_GITHUB_URL="https://github.com/yourusername"
   VITE_RESUME_URL="https://drive.google.com/file/d/your-resume-id/view"
   # ... see personal.example.ts for complete list
   ```

3. **Important**: The `.env` file is gitignored and never committed

#### Step 2: Professional Content (Committed)

1. Edit `src/config/personal.ts` with your professional content:
   - Work experience
   - Projects
   - Education
   - Certifications

2. This file IS committed to GitHub so others can see the template structure

#### Why This Hybrid Approach?

- **🔒 Privacy**: Sensitive data (email, phone, resume) stays in .env
- **🚀 Reusability**: Professional content provides a template for others
- **⚡ Simple**: No complex build scripts or external APIs
- **🛡️ Secure**: Contact information never exposed in public repo

### Customizing Content

#### Skills
Edit `src/config/portfolio.ts` to modify the skills array:
```typescript
skills: [
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'Node.js', level: 90, category: 'backend' },
  // Add more skills...
]
```

#### Projects
Update the projects array in the same file:
```typescript
projects: [
  {
    id: 'project-1',
    title: 'Your Project Title',
    description: 'Brief description',
    technologies: ['React', 'TypeScript'],
    featured: true,
    category: 'web',
  },
  // Add more projects...
]
```

#### Experience
Modify the experience section:
```typescript
experience: [
  {
    id: 'exp-1',
    company: 'Company Name',
    position: 'Your Position',
    duration: '2022 - Present',
    location: 'City, Country',
    description: ['Achievement 1', 'Achievement 2'],
    technologies: ['Tech1', 'Tech2'],
    current: true,
  },
  // Add more experiences...
]
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Skills.tsx       # Skills section
│   ├── Experience.tsx   # Experience timeline
│   ├── Projects.tsx     # Projects showcase
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Footer
├── config/              # Configuration files
│   └── portfolio.ts     # Main portfolio config
├── hooks/               # Custom React hooks
│   ├── useTheme.ts      # Theme management
│   └── useScrollAnimation.ts # Scroll animations
├── types/               # TypeScript type definitions
│   └── index.ts         # Main types
├── utils/               # Utility functions
│   ├── cache.ts         # Caching utilities
│   └── analytics.ts     # Analytics tracking
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

### Styling

The project uses TailwindCSS with custom configurations:

- **Custom Colors**: Primary color palette with dark mode variants
- **Typography**: Inter font for text, JetBrains Mono for code
- **Components**: Reusable component classes in `src/index.css`
- **Animations**: Custom keyframes and transitions

### Adding New Sections

1. Create a new component in `src/components/`
2. Add the component to `src/App.tsx`
3. Update navigation in `src/components/Header.tsx`
4. Add any required configuration to `src/config/portfolio.ts`

## Deployment

### Vercel (Recommended)

1. **Connect repository**
   - Import project in Vercel dashboard
   - Connect your GitHub repository

2. **Ensure personal configuration**
   - Your `src/config/personal.ts` file contains your information
   - No environment variables needed (all config is file-based)

3. **Deploy**
   - Vercel will automatically build and deploy
   - Set up custom domain if needed

### Netlify

1. **Build settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

2. **Personal configuration**
   - Ensure your `src/config/personal.ts` file is set up correctly
   - No additional environment variables needed

3. **Deploy**
   - Connect repository and deploy

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload to hosting**
   - Upload `dist/` folder contents to your web server
   - Ensure proper routing for SPA

## Customization

### Theming

#### Colors
Modify `tailwind.config.js` to change the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
      }
    }
  }
}
```

#### Fonts
Update font imports in `index.html` and configure in `tailwind.config.js`

### Animations
- Modify animation variants in components
- Add new animations in `tailwind.config.js`
- Disable animations by setting `VITE_ENABLE_ANIMATIONS=false`

### Layout
- Adjust section padding in `src/index.css`
- Modify component layouts in individual component files
- Change container max-width in Tailwind config

## Performance

### Optimization Features
- **Code Splitting**: Automatic vendor and animation chunks
- **Image Optimization**: Proper image sizing and formats
- **Caching**: Resume and asset caching with cleanup
- **Lazy Loading**: Components loaded on demand
- **Bundle Analysis**: Built-in chunk optimization

### Performance Tips
- Optimize images before adding to project
- Use proper image formats (WebP, AVIF)
- Monitor bundle size with build analysis
- Enable compression on your hosting platform

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this template for your own portfolio.

## Support

If you encounter any issues or have questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Consider contributing improvements back to the project

## Roadmap

- [ ] Blog section integration
- [ ] CMS integration options
- [ ] Multi-language support
- [ ] Advanced animations
- [ ] Performance dashboard
- [ ] Accessibility improvements

## Acknowledgments

- Built with React, TypeScript, and TailwindCSS
- Icons by Lucide React
- Animations by Framer Motion
- Fonts by Google Fonts

---

Made with ❤️ by developers, for developers.
