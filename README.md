# Bias Awareness in AI - Interactive Guide

An interactive educational tool that demonstrates how bias emerges in AI systems and what engineers can do to build more responsible, equitable technology.

## Overview

This project was created to help understand and explain complex concepts around AI bias, algorithmic fairness, and ethical technology development. It turns abstract concepts into tangible, interactive demonstrations.

### What It Covers

1. **Skewed Datasets** - How imbalanced training data leads to biased predictions
2. **Facial Recognition Bias** - Real-world disparities in accuracy across demographic groups
3. **Search Result Bias** - Filter bubbles and confirmation bias in search algorithms
4. **Hiring Algorithm Bias** - How historical discrimination gets encoded into AI hiring tools

## Features

- **Dark glassmorphism UI** - Apple-inspired design with glass effects
- **Interactive demonstrations** - Sliders, toggles, and visualizations
- **Real-world examples** - Based on documented cases of AI bias
- **Plain language explanations** - No jargon, accessible to all audiences
- **Actionable solutions** - What engineers can actually do to address these issues
- **Fully responsive** - Works on desktop, tablet, and mobile

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom glassmorphism styling with CSS variables
- **No external dependencies** - Lightweight and fast

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or download this project
cd bias-awareness-ai

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server will start at `http://localhost:5173`

### Colors

The project uses CSS variables for a consistent dark theme:

- **Background**: Deep black (#0a0a0a) with secondary (#1a1a1a)
- **Glass effects**: Semi-transparent white with backdrop blur
- **Accents**: Blue, purple, green, orange, red (Apple-inspired palette)

### Components

- **Glass cards**: Glassmorphism effect with blur and transparency
- **Interactive controls**: Custom sliders and toggle switches
- **Smooth animations**: Cubic-bezier easing for natural motion

```

## Educational Context

This project emerged from coursework in Ethics in Technology, specifically from challenges understanding how datasets become skewed and how bias manifests in AI systems. By turning confusing terminology into interactive visualizations, these abstract concepts became concrete and understandable.

### Learning Objectives

- Understand how bias enters AI systems
- Recognize real-world impacts of algorithmic bias
- Learn frameworks for ethical decision-making
- Identify interventions engineers can implement
- Think critically about technology's societal effects

## Customization

### Adding New Demos

1. Create a new component in `src/components/`
2. Import and add to `App.tsx`
3. Add navigation entry in the sections array
4. Follow the existing pattern: demo → explanation → solutions

### Changing the Theme

Edit CSS variables in `src/index.css`:

```css
:root {
  --bg-primary: #0a0a0a;
  --accent-blue: #0a84ff;
  /* ... other variables */
}
```

## Performance

- **Build size**: ~230KB JS (gzipped: ~70KB)
- **First Contentful Paint**: < 1s
- **No external API calls**: Everything runs client-side
- **Lighthouse score**: 95+ across all metrics

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is an educational project, but improvements are welcome:

- Add more bias demonstrations
- Improve accessibility (ARIA labels, keyboard nav)
- Add internationalization
- Create quiz/assessment modes
- Add data export features

## License

MIT License - feel free to use this for educational purposes, presentations, or as a portfolio piece.

## Acknowledgments

Inspired by:
- MIT/Stanford Gender Shades research
- ProPublica's "Machine Bias" investigation
- Amazon's AI recruiting tool disclosure
- Research from AI Now Institute, Data & Society, and Algorithmic Justice League

## Contact

Created as part of a journey to understand ethics in technology. If you're struggling with similar concepts, I hope this helps make them clearer.

---

**Built with React + TypeScript + Vite**
**Designed with care for ethical technology education**
