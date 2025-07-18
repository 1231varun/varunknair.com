# Contributing to Portfolio Website

Thank you for your interest in contributing to this portfolio website template! This guide will help you get started with contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## How to Contribute

### Reporting Issues

Before creating an issue, please check if a similar issue already exists. When creating an issue:

1. Use a clear and descriptive title
2. Provide detailed reproduction steps
3. Include your environment details (OS, Node.js version, browser)
4. Add screenshots if applicable
5. Suggest a possible solution if you have one

### Suggesting Features

We welcome feature suggestions! Please:

1. Check if the feature has already been suggested
2. Explain the use case and benefit
3. Consider if it fits the project's scope
4. Be open to discussion and iteration

### Pull Requests

#### Before You Start

1. Fork the repository
2. Create a new branch for your feature/fix
3. Check existing issues and PRs to avoid duplication

#### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

#### Making Changes

1. **Code Style**
   - Follow the existing code style
   - Use TypeScript for all new code
   - Write meaningful commit messages
   - Add comments for complex logic

2. **Testing**
   - Test your changes thoroughly
   - Ensure the build works: `npm run build`
   - Run linting: `npm run lint`
   - Check type safety: `npm run type-check`

3. **Documentation**
   - Update README.md if needed
   - Update SETUP.md for setup-related changes
   - Add JSDoc comments for new functions
   - Update type definitions

#### Submitting Your PR

1. **Prepare your changes**
   ```bash
   # Format code
   npm run format
   
   # Fix linting issues
   npm run lint:fix
   
   # Ensure build works
   npm run build
   ```

2. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   # or
   git commit -m "fix: resolve issue description"
   ```

3. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request**
   - Use a clear title and description
   - Reference any related issues
   - Add screenshots for UI changes
   - Mark as draft if work is in progress

## Commit Message Guidelines

We follow conventional commit format:

```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(components): add dark mode toggle to header
fix(hooks): resolve theme persistence issue
docs(readme): update installation instructions
style(components): improve button hover animations
```

## Development Guidelines

### Code Quality

1. **TypeScript**
   - Use strict TypeScript configuration
   - Define proper interfaces and types
   - Avoid `any` types when possible
   - Use generic types appropriately

2. **React Best Practices**
   - Use functional components with hooks
   - Implement proper error boundaries
   - Optimize performance with memo/useMemo when needed
   - Follow React naming conventions

3. **Styling**
   - Use TailwindCSS utility classes
   - Create reusable component classes in index.css
   - Follow mobile-first responsive design
   - Maintain consistent spacing and colors

4. **Performance**
   - Optimize images and assets
   - Use proper lazy loading
   - Implement efficient caching strategies
   - Monitor bundle size

### Project Structure

When adding new features, follow the existing structure:

```
src/
├── components/          # React components
├── hooks/              # Custom hooks
├── types/              # TypeScript types
├── utils/              # Utility functions
├── config/             # Configuration files
└── data/               # Static data
```

### Component Guidelines

1. **Component Structure**
   ```typescript
   // Import order: React, third-party, local
   import { useState } from 'react'
   import { motion } from 'framer-motion'
   import { useCustomHook } from '@/hooks/useCustomHook'
   
   interface ComponentProps {
     // Define props with proper types
   }
   
   const Component = ({ prop1, prop2 }: ComponentProps) => {
     // Component logic
     
     return (
       // JSX with proper accessibility
     )
   }
   
   export default Component
   ```

2. **Accessibility**
   - Use semantic HTML elements
   - Add proper ARIA labels
   - Ensure keyboard navigation
   - Maintain color contrast ratios
   - Test with screen readers

3. **Animation**
   - Use Framer Motion for animations
   - Respect user's motion preferences
   - Keep animations smooth and purposeful
   - Provide fallbacks for reduced motion

### Testing

Currently, the project doesn't have automated tests, but when contributing:

1. **Manual Testing**
   - Test on different screen sizes
   - Verify theme switching works
   - Check all interactive elements
   - Test with keyboard navigation
   - Verify performance on slower devices

2. **Browser Testing**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

## Areas for Contribution

### High Priority
- Accessibility improvements
- Performance optimizations
- Mobile experience enhancements
- SEO improvements
- Documentation updates

### Medium Priority
- New animation effects
- Additional themes
- Component library expansion
- Build process improvements
- Code quality improvements

### Future Features
- Blog integration
- CMS integration
- Multi-language support
- Advanced analytics
- PWA features

## Release Process

1. Features are merged to `main` branch
2. Version bumps follow semantic versioning
3. Releases include changelog updates
4. Breaking changes are clearly documented

## Getting Help

If you need help while contributing:

1. Check existing documentation
2. Look at similar implementations in the codebase
3. Ask questions in issues or discussions
4. Reach out to maintainers

## Recognition

Contributors will be:
- Listed in the README.md
- Credited in release notes
- Given appropriate GitHub repository permissions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to reach out through:
- GitHub Issues
- GitHub Discussions
- Email (if provided in README)

Thank you for helping make this portfolio template better for everyone! 