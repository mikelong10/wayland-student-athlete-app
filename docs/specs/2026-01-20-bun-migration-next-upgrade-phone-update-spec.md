# Spec: Bun Migration, Next.js Upgrade, and Footer Phone Update

**Date:** 2026-01-20
**Status:** Draft

## Overview

Three changes to the Wayland Student-Athlete App:

1. Migrate from pnpm to Bun as the package manager
2. Upgrade Next.js from 14.1.0 to latest 14.2.x for security fixes
3. Update footer phone number from (781) 266-8116 to (781) 778-8457

## Requirements

### 1. Bun Migration

- Use Bun as package manager only (not as runtime)
- Keep Node.js runtime for `next dev`, `next build`, etc.
- Delete `pnpm-lock.yaml` after generating `bun.lockb`
- Update Husky pre-commit hooks to use Bun (currently uses `npx lint-staged` which is already agnostic)

### 2. Next.js Upgrade

- Upgrade to latest Next.js 14.2.x patch version
- Also upgrade `eslint-config-next` to match
- Ensure build passes after upgrade

### 3. Footer Phone Number

- Change display from `(781) 266-8116` to `(781) 778-8457`
- Change `tel:` href from `+1781-266-8116` to `+1781-778-8457`
- Only one location to update: `src/components/footer/Footer.tsx`

## Files to Modify

1. `package.json` - Update Next.js version
2. `pnpm-lock.yaml` - Delete
3. `bun.lockb` - Generate (new file)
4. `.husky/pre-commit` - Update to use `bunx` instead of `npx`
5. `src/components/footer/Footer.tsx` - Update phone number

## Verification

1. Run `bun install` successfully
2. Run `bun run build` to verify Next.js upgrade works
3. Run `bun run dev` and check footer displays new phone number
4. Test pre-commit hook by staging a file and committing
