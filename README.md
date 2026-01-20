# Wayland Student Athlete App

A web application for managing and showcasing student athletes at Wayland Academy.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript 5.5
- **UI:** React 19.2, Tailwind CSS, Radix UI primitives
- **Database:** Turso (libSQL) with Drizzle ORM
- **Authentication:** Auth.js (NextAuth v5)
- **File Uploads:** UploadThing
- **Linting/Formatting:** Biome

## Project Structure

```
src/
├── app/          # Next.js App Router pages and API routes
├── components/   # React components and UI primitives
├── db/           # Database schema and queries (Drizzle ORM)
├── lib/          # Utilities, schemas, and shared logic
└── styles/       # Global CSS and Tailwind configuration
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint and format with Biome (auto-fix)
- `npm run lint:check` - Check linting without fixing
- `npm run format` - Format code with Biome
- `npm run format:check` - Check formatting without fixing

## Deployment

This app is deployed on Vercel. Push to the `main` branch to trigger a production deployment.
