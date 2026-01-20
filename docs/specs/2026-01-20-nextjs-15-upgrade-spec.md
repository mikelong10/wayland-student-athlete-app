# Next.js 16 Upgrade Specification

**Date:** 2026-01-20
**Status:** Ready for Implementation

## Overview

Upgrade the Wayland Student-Athlete App from Next.js 14.2.35 to Next.js 16 (latest), including React 19.2 and related dependency updates.

## Goals

1. **Stay Current** - Keep dependencies up-to-date to avoid technical debt
2. **Performance Improvements** - Leverage Next.js 16 and Turbopack optimizations
3. **Documentation** - Update README to reflect actual project structure

## Current State

| Dependency | Current Version |
|------------|-----------------|
| Next.js | 14.2.35 |
| React | ^18.2.0 |
| next-auth | ^5.0.0-beta.16 |
| @auth/drizzle-adapter | ^0.8.2 |
| drizzle-orm | ^0.30.5 |
| uploadthing | ^6.3.3 |
| TypeScript | ^5.3.3 |

## Target State

| Dependency | Target Version |
|------------|----------------|
| Next.js | ^16.0.0 (latest) |
| React | ^19.2.0 (latest) |
| next-auth | ^5.0.0 (stable) |
| @auth/drizzle-adapter | ^1.8.0 |
| drizzle-orm | ^0.38.0 |
| uploadthing | ^7.0.0 |
| TypeScript | ^5.5.0 (min 5.1 required) |

## Breaking Changes to Address

### 1. Async Request APIs (Critical)

In Next.js 16, sync access to request APIs is **fully removed**. These must be async:
- `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()`

**Files requiring async params updates:**

Pages (3 files):
- `src/app/(app)/(public)/who/[slug]/page.tsx`
- `src/app/(app)/(public)/who/[slug]/edit/page.tsx`
- `src/app/(app)/(public)/reviews/[id]/edit/page.tsx`

API Routes (6 files):
- `src/app/api/jobs/[jobId]/route.ts`
- `src/app/api/jobs/[jobId]/users/route.ts`
- `src/app/api/jobs/[jobId]/spreadsheet/route.ts`
- `src/app/api/student-athletes/[id]/route.ts`
- `src/app/api/reviews/[id]/route.ts`
- `src/app/api/users/[userId]/route.ts`

### 2. Turbopack is Now Default

Turbopack is the default bundler in Next.js 16. Since user prefers webpack:
- Add `--webpack` flag to build script in package.json

### 3. `next lint` Removed

The `next lint` command is removed. Project already uses Biome, so no impact.

### 4. Node.js Minimum Version

Next.js 16 requires Node.js 20.9.0+. Verify local and deployment environments.

### 5. Image Config Changes

- `minimumCacheTTL` default changed from 60s to 4 hours
- `imageSizes` no longer includes 16
- No action needed unless issues arise

### 6. Config Changes

- Remove `staticPageGenerationTimeout: 240` from `next.config.js`
- Add `--webpack` to build script (user preference over Turbopack)

## Out of Scope

- Form refactoring to use React 19 APIs (useActionState, useFormStatus)
- Enabling Turbopack (sticking with webpack)
- Middleware to Proxy rename (project has no middleware.ts)
- Any new feature development

## Deployment Strategy

**Incremental rollout:**
1. Create feature branch `feat/nextjs-15-upgrade`
2. Make all changes on feature branch
3. Vercel creates preview deployment automatically
4. Test thoroughly on preview URL
5. Merge to main after validation

## Testing Checklist

- [ ] Development server starts (`npm run dev`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Home page loads with Suspense boundaries
- [ ] Student athlete profiles load (`/who/[slug]`)
- [ ] Review edit pages load (`/reviews/[id]/edit`)
- [ ] Authentication works (Google, Facebook, Email)
- [ ] File uploads work (UploadThing)
- [ ] Job CRUD operations work
- [ ] Forms submit correctly
- [ ] Lint passes (`npm run lint:check`)

## Dependencies with Concerns

| Package | Concern | Mitigation |
|---------|---------|------------|
| UploadThing | React 19 compatibility | Update to v7, test uploads |
| Radix UI (16 packages) | React 19 compatibility | Update all to latest, test components |
| Drizzle/Turso | Server-side only | Low risk, update to latest |
| react-hook-form | React 19 compatibility | Update to latest ^7.54.0 |

## Success Criteria

1. Application builds without errors
2. All existing functionality works unchanged
3. Preview deployment passes all testing checklist items
4. README reflects actual project architecture
