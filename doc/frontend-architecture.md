# Frontend Architecture Documentation

## Overview
This portfolio is a React-based Single Page Application (SPA) designed with a **"Mechanical Arcade"** aesthetic. It bridges the gap between high-precision manufacturing engineering and 80s retro gaming (Pac-Man theme).

## Tech Stack
- **Framework**: [React 18+](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (`motion/react`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: TypeScript

## Core Design Principles

### 1. Retro-Mechanical Aesthetic
The UI uses a "Mechanical" design system characterized by:
- **Thick Borders**: 4px solid borders on cards and buttons to mimic physical components.
- **Hard Shadows**: Offset shadows (`8px 8px`) without blur, creating a layered, "tactile" feel.
- **Primary Colors**: A palette inspired by classic arcade machines and industrial design (Red, Blue, Yellow, Green).

### 2. Typography
- **Headings**: `Press Start 2P`: The iconic 8-bit arcade font used for high-impact titles.
- **Body**: `VT323`: A pixelated monospace font reminiscent of retro computer terminals, used for readability with a theme-consistent look.
- **Technical Data**: `JetBrains Mono`: Used for specific technical specs to maintain a professional engineering feel.

### 3. Interactive Elements
- **Custom Cursor**: A pixelated square cursor that replaces the system default. It reacts to hover states by scaling and rotating, providing immediate feedback.
- **Pac-Man Animations**: CSS-based "dot-eating" animations in the hero section to reinforce the 80s theme.
- **Mechanical Buttons**: Buttons that "press down" physically by removing their shadow and translating on the Y-axis when clicked.

## Project Structure

- `src/pages/`: Main route components:
  - `LandingPage.tsx`: The high-impact home view with the Pac-Man hero section.
  - `ProfilePage.tsx`: A structured resume view with experience and skills.
  - `ProjectsListPage.tsx`: A grid view of engineering projects.
  - `ProjectPage.tsx`: A detailed deep-dive for individual projects, including "Challenge", "Approach", and "Impact" sections.
- `src/components/`: Reusable UI elements like `ProjectCard`, `Navbar`, and the `CustomCursor`.
- `src/resumeData.ts` & `src/projectsData.ts`: Centralized data files for easy content management.

## Theming (Dark/Light Mode)
The application uses CSS variables defined in `src/index.css`. The theme is toggled via a `.dark` class on the root element.
- **Light Mode**: High contrast, clean white/zinc backgrounds with dark borders.
- **Dark Mode**: Deep zinc/black backgrounds with vibrant neon-inspired accents.

## Key CSS Classes
- `.card-mechanical`: Applies the standard bordered card style with hover lift.
- `.btn-mechanical`: Applies the arcade-style button interaction.
- `.lego-[color]`: Utility classes for the primary color blocks (e.g., `.lego-blue`).
- `.section-title`: Standardized styling for page headers with hard text shadows.

## Performance & Optimization
- **Asset Handling**: Images are optimized for web and use `referrerPolicy="no-referrer"` for cross-origin compatibility.
- **Transitions**: Smooth page entrances and micro-interactions are handled by Framer Motion to ensure the "pixel" style doesn't feel clunky.
