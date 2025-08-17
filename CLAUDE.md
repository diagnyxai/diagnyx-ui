# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Service Overview

Diagnyx-UI is the marketing and public-facing website for the Diagnyx LLM Observability Platform. Built with Next.js 14, it showcases product features, pricing, documentation, and provides conversion-optimized landing pages.

## Architecture

### Technology Stack
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Radix UI for accessible components
- MDX for documentation pages
- Vercel Analytics for tracking

### Project Structure
```
diagnyx-ui/
├── app/
│   ├── page.tsx                # Landing page
│   ├── layout.tsx              # Root layout
│   ├── (marketing)/            # Marketing pages
│   │   ├── features/           # Feature pages
│   │   ├── pricing/            # Pricing page
│   │   ├── about/              # About us
│   │   └── blog/               # Blog posts
│   ├── (docs)/                 # Documentation
│   │   ├── docs/               # Doc pages
│   │   └── api-reference/      # API docs
│   └── (legal)/                # Legal pages
│       ├── privacy/            # Privacy policy
│       └── terms/              # Terms of service
├── components/
│   ├── ui/                     # Reusable components
│   ├── landing/                # Landing page sections
│   │   ├── hero.tsx            # Hero section
│   │   ├── features.tsx        # Features grid
│   │   ├── testimonials.tsx    # Customer testimonials
│   │   └── cta.tsx             # Call-to-action
│   └── docs/                   # Documentation components
├── content/                     # MDX content
│   ├── blog/                   # Blog posts
│   └── docs/                   # Documentation
├── lib/                        # Utilities
└── public/                     # Static assets
```

## Build and Run Commands

### Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run on different port
PORT=3002 npm run dev
```

### Production
```bash
# Build for production
npm run build

# Start production server
npm start

# Export static site
npm run export
```

### Testing and Quality
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Run all checks
npm run quality
```

## Key Pages and Routes

### Marketing Pages
- `/` - Landing page with hero, features, testimonials
- `/features` - Detailed feature explanations
- `/pricing` - Pricing tiers and comparison
- `/about` - Company information and team
- `/blog` - Blog posts and updates
- `/customers` - Case studies and success stories

### Documentation
- `/docs` - Documentation home
- `/docs/quickstart` - Getting started guide
- `/docs/api-reference` - API documentation
- `/docs/sdks` - SDK documentation

### Conversion Pages
- `/demo` - Request demo form
- `/contact` - Contact form
- `/newsletter` - Newsletter signup

## Configuration

### Environment Variables
```bash
# Application
NEXT_PUBLIC_SITE_URL=https://diagnyx.ai

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=...

# Forms
NEXT_PUBLIC_FORMSPREE_ID=...
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...

# Blog
NEXT_PUBLIC_BLOG_URL=https://blog.diagnyx.ai

# API
NEXT_PUBLIC_API_URL=https://api.diagnyx.ai
```

## Content Management

### Blog Posts (MDX)
```mdx
---
title: "Post Title"
date: "2024-01-01"
author: "Author Name"
category: "Engineering"
tags: ["llm", "observability"]
---

# Post content in MDX format
```

### Documentation
- MDX files in `content/docs/`
- Automatic sidebar generation
- Code syntax highlighting
- Copy code buttons

## SEO Optimization

### Metadata
```typescript
export const metadata: Metadata = {
  title: 'Diagnyx - LLM Observability Platform',
  description: 'Monitor, optimize, and secure your LLM applications',
  openGraph: {
    images: ['/og-image.png'],
  },
};
```

### Sitemap and Robots
- Auto-generated sitemap.xml
- Optimized robots.txt
- Structured data markup

## Performance Optimization

### Next.js Features
- Static generation for marketing pages
- Image optimization with next/image
- Font optimization with next/font
- Automatic code splitting
- Prefetching on hover

### Loading Strategy
- Progressive enhancement
- Lazy loading for below-fold content
- Optimized critical CSS
- Deferred non-critical scripts

## Animation Guidelines

### Framer Motion
```typescript
// Consistent animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};
```

### Performance
- Use CSS animations for simple effects
- Framer Motion for complex interactions
- Reduce motion for accessibility
- GPU-accelerated transforms

## Common Development Tasks

### Adding New Page
1. Create page in appropriate directory
2. Add metadata export
3. Implement responsive design
4. Add to navigation if needed
5. Test on mobile devices
6. Add analytics tracking

### Creating Blog Post
1. Create MDX file in `content/blog/`
2. Add frontmatter metadata
3. Write content with MDX
4. Add images to `public/blog/`
5. Test rendering
6. Update blog index

### Adding Documentation
1. Create MDX in `content/docs/`
2. Update navigation structure
3. Add code examples
4. Include diagrams if needed
5. Test all links
6. Update search index

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Static Export
```bash
# Generate static files
npm run build
npm run export

# Files in 'out' directory
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm run build
EXPOSE 3002
CMD ["npm", "start"]
```

## Analytics and Tracking

### Events to Track
- Page views
- CTA clicks
- Form submissions
- Video plays
- Download clicks
- Scroll depth

### Conversion Goals
- Demo requests
- Newsletter signups
- Documentation visits
- SDK downloads
- Pricing page views

## A/B Testing

### Test Areas
- Headlines and copy
- CTA button colors/text
- Pricing presentation
- Feature ordering
- Testimonial placement

## Troubleshooting

### Common Issues
- **Build errors**: Clear .next directory and rebuild
- **Image optimization**: Check image formats and sizes
- **Font loading**: Verify font files and configuration
- **Animation jank**: Use transform instead of position
- **SEO issues**: Check metadata and structured data