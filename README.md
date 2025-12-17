# PokéCollector+ 🎴

A Progressive Web App (PWA) for Pokémon card collectors to track, evaluate, and manage their collection.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://pwa-poke-eval.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## Overview

PokéCollector+ is a modern web application built as a Progressive Web App that allows Pokémon Trading Card Game (TCG) enthusiasts to catalog and evaluate their card collections. The app provides an intuitive interface for managing your cards with offline support capabilities.

## Features

- **Progressive Web App** - Install on your device and use offline
- **Card Tracking** - Keep track of your Pokémon card collection
- **Card Evaluation** - Assess the value and condition of your cards
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Fast Performance** - Built with Vite for lightning-fast load times
- **Modern Stack** - React 18 with TypeScript for type safety and maintainability

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS
- **Package Manager**: pnpm
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TheKings294/PwaPokeEval.git
cd PwaPokeEval
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production application
- `pnpm preview` - Preview the production build locally
- `pnpm lint` - Run ESLint for code quality checks

## Project Structure

```
PwaPokeEval/
├── .github/          # GitHub configuration files
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # React components
│   ├── assets/       # Images, fonts, etc.
│   └── ...
├── index.html        # Entry HTML file
├── package.json      # Project dependencies
├── tsconfig.json     # TypeScript configuration
├── vite.config.ts    # Vite configuration
└── README.md         # This file
```

## Development

This project uses:

- **Vite** for fast development and optimized builds
- **TypeScript** for type-safe code
- **ESLint** for code quality and consistency
- **PWA features** for offline functionality and app-like experience

### Building for Production

To create a production build:

```bash
pnpm build
```

The built files will be in the `dist/` directory, ready for deployment.

## PWA Features

The application includes Progressive Web App capabilities:

- 📱 **Installable** - Add to home screen on mobile devices
- 🔌 **Offline Support** - Access your collection without internet
- ⚡ **Fast Loading** - Optimized for quick startup
- 🔄 **Auto Updates** - Seamless updates when online

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ESLint Configuration

The project uses ESLint for code quality. To enable type-aware linting for production applications, update the ESLint configuration:

```javascript
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      // or tseslint.configs.strictTypeChecked for stricter rules
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Deployed on [Vercel](https://vercel.com/)

## Links

- **Live Demo**: [pwa-poke-eval.vercel.app](https://pwa-poke-eval.vercel.app)
- **Repository**: [github.com/TheKings294/PwaPokeEval](https://github.com/TheKings294/PwaPokeEval)

---

Made with ❤️ by [TheKings294](https://github.com/TheKings294)
