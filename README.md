# React Portfolio

A modern React portfolio built with Vite, TypeScript, and deployed on GitHub Pages.

## Tech Stack

- **React 19** - Latest React with TypeScript
- **Vite** - Lightning-fast frontend build tool
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Modern styling with CSS variables and animations
- **EmailJS** - Contact form backend
- **GitHub Pages** - Deployment

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Runs the app in development mode at http://localhost:5173 (Vite default).
The page will hot-reload when you make changes.

### Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.
TypeScript is checked before building (`tsc && vite build`).

### Preview

```bash
npm run preview
```

Preview the production build locally before deploying.

### Deploy to GitHub Pages

```bash
npm run deploy
```

Automatically builds and deploys to GitHub Pages using the `gh-pages` package.

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

See `.env.example` for reference.

## Project Structure

```
src/
├── components/
│   ├── Navigation/
│   ├── Greetings/
│   ├── About/
│   ├── Projects/
│   ├── Contact/
│   └── Footer/
├── Utils/
│   ├── smoothScroll.ts
│   └── formSecurity.ts
├── App.tsx
├── main.tsx
└── index.css (Global styles & CSS variables)
```

## Styling

The project uses CSS modules with global CSS variables in `src/index.css`:

- **Color System**: Primary, secondary, accent colors via CSS custom properties
- **Spacing Scale**: Standardized spacing values (xs, sm, md, lg, xl, 2xl)
- **Animations**: Global keyframes for smooth transitions
- **Responsive**: Media queries at 1024px (tablet) and 480px (mobile)

### CSS Variables

Access colors, spacing, and layout constants:

```css
color: var(--color-accent-primary);
padding: var(--spacing-lg);
max-width: var(--max-width);
```

## Features

- Smooth scroll navigation with section highlighting
- Responsive design (desktop, tablet, mobile)
- Contact form with validation and rate limiting
- Tech stack showcase with professional icons
- Animated project portfolio
- Modern UI with gradient accents
- Security: EmailJS credentials in environment variables

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source.

## Contact

For inquiries, use the contact form on the portfolio or reach out via GitHub.
