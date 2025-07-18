# Portfolio Setup Guide

This guide will help you set up and customize your portfolio website from start to finish.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (version 8 or higher) or **yarn**
- **Git** for version control
- A **text editor** (VS Code recommended)

## Step 1: Initial Setup

### 1.1 Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Copy environment example
cp .env.example .env
```

### 1.2 Verify Installation

```bash
# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the default portfolio.

## Step 2: Personal Configuration

### 2.1 Basic Information

Edit your `.env` file with your personal details:

```env
# Replace with your actual information
VITE_FULL_NAME=John Doe
VITE_EMAIL=john.doe@example.com
VITE_PHONE=+1-555-123-4567
VITE_LOCATION=San Francisco, CA
VITE_TAGLINE=Full-Stack Developer | React Specialist
VITE_BIO=Passionate developer with 5+ years of experience building scalable web applications and leading development teams.
```

### 2.2 Social Links

Add your social media and professional profiles:

```env
VITE_GITHUB_URL=https://github.com/johndoe
VITE_LINKEDIN_URL=https://linkedin.com/in/johndoe
VITE_TWITTER_URL=https://twitter.com/johndoe
VITE_WEBSITE_URL=https://johndoe.dev
```

### 2.3 Resume Setup

Upload your resume to Google Drive and get the sharing links:

1. Upload your resume PDF to Google Drive
2. Right-click and select "Get link"
3. Change permissions to "Anyone with the link can view"
4. Copy the file ID from the URL

```env
# Replace FILE_ID with your actual Google Drive file ID
VITE_RESUME_URL=https://drive.google.com/file/d/FILE_ID/view
VITE_RESUME_DOWNLOAD_URL=https://drive.google.com/uc?export=download&id=FILE_ID
```

## Step 3: Content Customization

### 3.1 Skills Configuration

Edit `src/config/portfolio.ts` to update your skills:

```typescript
skills: [
  // Frontend
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'JavaScript', level: 95, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 90, category: 'backend' },
  { name: 'Python', level: 85, category: 'backend' },
  
  // Database
  { name: 'PostgreSQL', level: 85, category: 'database' },
  { name: 'MongoDB', level: 80, category: 'database' },
  
  // DevOps
  { name: 'Docker', level: 80, category: 'devops' },
  { name: 'AWS', level: 75, category: 'devops' },
  
  // Tools
  { name: 'Git', level: 95, category: 'tools' },
  { name: 'VS Code', level: 95, category: 'tools' },
]
```

### 3.2 Projects Setup

Configure your featured projects:

```typescript
projects: [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React and Node.js',
    longDescription: 'Detailed description of the project, its challenges, and solutions...',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    imageUrl: '/projects/ecommerce.jpg', // Add your project images
    projectUrl: 'https://myecommerce.com',
    githubUrl: 'https://github.com/johndoe/ecommerce',
    featured: true,
    category: 'web',
  },
  // Add more projects...
]
```

### 3.3 Experience Timeline

Update your work experience:

```typescript
experience: [
  {
    id: 'current-job',
    company: 'Tech Startup Inc.',
    position: 'Senior Full-Stack Developer',
    duration: '2022 - Present',
    location: 'San Francisco, CA',
    description: [
      'Led a team of 5 developers in building scalable web applications',
      'Reduced application load time by 40% through optimization',
      'Implemented CI/CD pipelines improving deployment efficiency by 60%',
      'Mentored junior developers and conducted code reviews',
    ],
    technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker'],
    current: true,
  },
  // Add more experiences...
]
```

### 3.4 Education Information

Add your educational background:

```typescript
education: [
  {
    id: 'university',
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    duration: '2016 - 2020',
    location: 'Berkeley, CA',
    gpa: '3.8/4.0',
    description: 'Focused on software engineering, algorithms, and data structures.',
  },
]
```

## Step 4: Visual Customization

### 4.1 Adding Your Photo

1. Add your professional photo to `public/` directory
2. Update the About component in `src/components/About.tsx`:

```typescript
// Replace the placeholder with your image
<img 
  src="/your-photo.jpg" 
  alt={personalInfo.fullName}
  className="w-full h-full object-cover rounded-2xl"
/>
```

### 4.2 Project Images

1. Create a `public/projects/` directory
2. Add project screenshots/images
3. Update image URLs in your project configuration

### 4.3 Color Scheme

Customize colors in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#your-color-50',
    100: '#your-color-100',
    // ... continue with your color palette
    900: '#your-color-900',
    950: '#your-color-950',
  }
}
```

## Step 5: Advanced Configuration

### 5.1 Analytics Setup

1. Create a Google Analytics account
2. Get your Measurement ID
3. Add to your `.env` file:

```env
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### 5.2 Contact Form Backend

The contact form is currently frontend-only. To make it functional:

1. Set up a backend service (Netlify Forms, Formspree, etc.)
2. Update the form submission logic in `src/components/Contact.tsx`

### 5.3 SEO Optimization

Update meta tags in `index.html`:

```html
<title>John Doe - Full-Stack Developer</title>
<meta name="description" content="Your custom description" />
<meta property="og:title" content="John Doe - Portfolio" />
<meta property="og:description" content="Your custom description" />
```

## Step 6: Testing and Optimization

### 6.1 Run Quality Checks

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Code formatting
npm run format
```

### 6.2 Build and Preview

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### 6.3 Performance Testing

1. Test on different devices and screen sizes
2. Check loading times
3. Verify all links and functionality
4. Test theme switching
5. Verify resume download functionality

## Step 7: Deployment

### 7.1 Vercel Deployment

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy and test

### 7.2 Custom Domain

1. Purchase a domain
2. Configure DNS settings
3. Add custom domain in hosting platform
4. Enable HTTPS

## Step 8: Maintenance

### 8.1 Regular Updates

- Update dependencies regularly
- Monitor performance metrics
- Update content as you grow professionally
- Add new projects and experiences

### 8.2 Backup Strategy

- Keep your code in version control
- Backup environment variables securely
- Maintain multiple deployment environments

## Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Use a different port
npm run dev -- --port 3001
```

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Environment variables not loading:**
- Ensure variables start with `VITE_`
- Restart development server after changes
- Check for typos in variable names

### Getting Help

1. Check the main README.md
2. Review error messages carefully
3. Search for similar issues online
4. Create an issue in the repository

## Next Steps

Once your portfolio is set up:

1. Share it with friends and colleagues for feedback
2. Submit it to job applications
3. Share on social media
4. Consider contributing improvements back to the template
5. Star the repository if you found it helpful

## Customization Ideas

- Add a blog section
- Include testimonials
- Add a services/consulting section
- Implement multi-language support
- Add interactive demos of your projects
- Include a timeline of your learning journey

Remember: Your portfolio is a living document. Keep it updated as you grow and learn new technologies! 