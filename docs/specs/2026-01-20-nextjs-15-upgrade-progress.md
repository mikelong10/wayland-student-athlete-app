# Next.js 16 Upgrade Progress

**Spec:** [2026-01-20-nextjs-15-upgrade-spec.md](./2026-01-20-nextjs-15-upgrade-spec.md)
**Started:** 2026-01-20
**Status:** Not Started

## Phases

### Phase 1: Branch Setup
- [ ] Create feature branch `feat/nextjs-16-upgrade`
- [ ] Document current build time for comparison

### Phase 2: Run Upgrade Codemod
- [ ] Run `npx @next/codemod@canary upgrade latest`
- [ ] Review automated changes

### Phase 3: Core Dependency Updates
- [ ] Update React to ^19.2.0
- [ ] Update React-DOM to ^19.2.0
- [ ] Update @types/react to ^19.0.0
- [ ] Update @types/react-dom to ^19.0.0
- [ ] Update TypeScript to ^5.5.0
- [ ] Update Next.js to ^16.0.0
- [ ] Run `npm install` and resolve peer dependency issues

### Phase 4: Build Script Update
- [ ] Add `--webpack` flag to build script (opt out of Turbopack)

### Phase 5: Async Params Migration
- [ ] Update `src/app/(app)/(public)/who/[slug]/page.tsx`
- [ ] Update `src/app/(app)/(public)/who/[slug]/edit/page.tsx`
- [ ] Update `src/app/(app)/(public)/reviews/[id]/edit/page.tsx`
- [ ] Update `src/app/api/jobs/[jobId]/route.ts`
- [ ] Update `src/app/api/jobs/[jobId]/users/route.ts`
- [ ] Update `src/app/api/jobs/[jobId]/spreadsheet/route.ts`
- [ ] Update `src/app/api/student-athletes/[id]/route.ts`
- [ ] Update `src/app/api/reviews/[id]/route.ts`
- [ ] Update `src/app/api/users/[userId]/route.ts`

### Phase 6: Config Updates
- [ ] Remove `staticPageGenerationTimeout` from `next.config.js`

### Phase 7: Auth.js Upgrade
- [ ] Update next-auth to ^5.0.0 (stable)
- [ ] Update @auth/core to latest
- [ ] Update @auth/drizzle-adapter to ^1.8.0
- [ ] Verify auth configuration still works

### Phase 8: Third-Party Dependencies
- [ ] Update UploadThing packages to v7
- [ ] Update Radix UI packages to latest
- [ ] Update Drizzle ORM to ^0.38.0
- [ ] Update drizzle-kit to latest
- [ ] Update @libsql/client to latest
- [ ] Update react-hook-form to ^7.54.0
- [ ] Update next-themes to ^0.4.0
- [ ] Update sharp to ^0.33.0
- [ ] Update embla-carousel-react to stable ^8.5.0
- [ ] Update cmdk to ^1.0.0

### Phase 9: Build & Test
- [ ] Clean install (`rm -rf node_modules .next && npm install`)
- [ ] Development server starts
- [ ] Production build succeeds (with --webpack flag)
- [ ] Lint passes

### Phase 10: Manual Testing
- [ ] Home page loads
- [ ] Student athlete profiles work
- [ ] Review pages work
- [ ] Google OAuth login works
- [ ] Facebook OAuth login works
- [ ] Email magic link works
- [ ] File uploads work
- [ ] Job operations work
- [ ] Forms submit correctly

### Phase 11: Documentation
- [ ] Update README with project structure

### Phase 12: Deploy
- [ ] Push feature branch
- [ ] Verify preview deployment
- [ ] Create and merge PR

## Notes

_Add implementation notes here as work progresses._
