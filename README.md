# Diagnyx UI - Marketing Website

[![Feature Branch CI](https://github.com/diagnyxai/diagnyx-ui/actions/workflows/feature.yml/badge.svg)](https://github.com/diagnyxai/diagnyx-ui/actions/workflows/feature.yml)
[![Develop CI/CD](https://github.com/diagnyxai/diagnyx-ui/actions/workflows/develop.yml/badge.svg)](https://github.com/diagnyxai/diagnyx-ui/actions/workflows/develop.yml)
[![Main CI/CD](https://github.com/diagnyxai/diagnyx-ui/actions/workflows/main.yml/badge.svg)](https://github.com/diagnyxai/diagnyx-ui/actions/workflows/main.yml)

Modern, high-performance marketing website for the Diagnyx LLM Observability Platform, built with Next.js 14 and optimized for conversion.

## 🚀 Features

### Marketing Pages
- **Landing Page**: Hero section, feature grid, testimonials, CTAs
- **Product Features**: Detailed feature explanations with visuals
- **Pricing**: Interactive pricing calculator and plan comparison
- **Case Studies**: Customer success stories and ROI metrics
- **Blog**: Technical articles and product updates
- **Documentation**: Comprehensive docs with search

### Technical Features
- **Performance**: 100/100 Lighthouse score
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG 2.1 AA compliant
- **Analytics**: Integrated tracking and conversion optimization
- **Internationalization**: Multi-language support ready

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Components**: Radix UI
- **Content**: MDX for blog and docs
- **Analytics**: Vercel Analytics, PostHog
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn

## 🚀 Quick Start

### Local Development

1. **Clone and install**:
```bash
git clone https://github.com/diagnyx/diagnyx-ui.git
cd diagnyx-ui
npm install
```

2. **Configure environment**:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

3. **Run development server**:
```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://diagnyx.ai
NEXT_PUBLIC_SITE_NAME=Diagnyx

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=...

# Forms
NEXT_PUBLIC_FORMSPREE_ID=your-form-id
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-key

# API
NEXT_PUBLIC_API_URL=https://api.diagnyx.ai
NEXT_PUBLIC_DASHBOARD_URL=https://app.diagnyx.ai
```

## 📚 Project Structure

```
diagnyx-ui/
├── app/                    # Next.js app directory
│   ├── (marketing)/       # Marketing pages
│   ├── (docs)/           # Documentation
│   ├── (legal)/          # Legal pages
│   └── blog/             # Blog posts
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── landing/         # Landing page sections
│   └── docs/            # Documentation components
├── content/             # MDX content
│   ├── blog/           # Blog posts
│   └── docs/           # Documentation
├── lib/                # Utilities and helpers
├── public/             # Static assets
└── styles/             # Global styles
```

## 🎨 Design System

### Colors
```css
--primary: #3B82F6      /* Blue */
--secondary: #10B981    /* Green */
--accent: #8B5CF6       /* Purple */
--neutral: #6B7280      /* Gray */
```

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Code**: JetBrains Mono

### Components
All components follow Radix UI patterns for accessibility and are styled with Tailwind CSS for consistency.

## 📝 Content Management

### Adding Blog Posts

1. Create MDX file in `content/blog/`:
```mdx
---
title: "Your Post Title"
date: "2024-01-15"
author: "Author Name"
category: "Engineering"
image: "/blog/post-image.jpg"
excerpt: "Brief description"
---

Your content here...
```

2. Images go in `public/blog/`
3. Post automatically appears in blog index

### Adding Documentation

1. Create MDX file in `content/docs/`
2. Update navigation in `lib/docs-nav.ts`
3. Use components for interactive examples

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Run all checks
npm run check-all

# Lighthouse CI
npm run lighthouse
```

## 📦 Building

```bash
# Development build
npm run build:dev

# Production build
npm run build

# Export static site
npm run export

# Analyze bundle
npm run analyze
```

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/diagnyx/diagnyx-ui)

```bash
# Using Vercel CLI
vercel --prod
```

### Docker

```bash
# Build image
docker build -t diagnyx/diagnyx-ui:latest .

# Run container
docker run -p 3002:3002 diagnyx/diagnyx-ui:latest
```

### Static Hosting

```bash
# Generate static files
npm run build
npm run export

# Deploy 'out' directory to any static host
```

## 📊 Performance

### Metrics
- **Lighthouse Score**: 100/100
- **First Contentful Paint**: < 0.8s
- **Time to Interactive**: < 2.0s
- **Core Web Vitals**: All green

### Optimization Techniques
- Static generation for all marketing pages
- Image optimization with next/image
- Font subsetting and preloading
- Critical CSS inlining
- Lazy loading for below-fold content
- CDN distribution with Vercel Edge Network

## 🔍 SEO

### Features
- Dynamic meta tags per page
- Open Graph images
- JSON-LD structured data
- Automatic sitemap generation
- Robots.txt configuration
- Canonical URLs

### Monitoring
- Google Search Console integration
- Bing Webmaster Tools
- SEO health checks in CI/CD

## 📈 Analytics

### Tracked Events
- Page views
- Button clicks
- Form submissions
- Video engagement
- Scroll depth
- Conversion funnels

### Tools
- Google Analytics 4
- PostHog for product analytics
- Vercel Analytics for performance
- Hotjar for heatmaps (optional)

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Clear `.next` directory
   - Delete `node_modules` and reinstall
   - Check for TypeScript errors

2. **Image Issues**
   - Verify image paths and formats
   - Check next.config.js for domains
   - Use proper width/height attributes

3. **Font Loading**
   - Ensure fonts are in public directory
   - Check font-face declarations
   - Verify font file formats

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests
5. Submit a pull request

### Guidelines
- Follow existing code style
- Optimize for performance
- Ensure accessibility
- Test on multiple devices
- Update documentation

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

- Website: [diagnyx.ai](https://diagnyx.ai)
- Documentation: [docs.diagnyx.ai](https://docs.diagnyx.ai)
- Email: hello@diagnyx.ai
- Twitter: [@diagnyx_ai](https://twitter.com/diagnyx_ai)