# Progress: Bun Migration, Next.js Upgrade, and Footer Phone Update

**Date:** 2026-01-20

## Tasks

- [ ] Migrate to Bun package manager
  - [ ] Delete `pnpm-lock.yaml`
  - [ ] Run `bun install` to generate `bun.lockb`
  - [ ] Update `.husky/pre-commit` to use `bunx` instead of `npx`
- [ ] Upgrade Next.js to latest 14.2.x
  - [ ] Update `next` version in package.json
  - [ ] Update `eslint-config-next` to match
  - [ ] Run `bun run build` to verify
- [ ] Update footer phone number
  - [ ] Change display text to (781) 778-8457
  - [ ] Change tel: href to +1781-778-8457
- [ ] Verification
  - [ ] Build passes
  - [ ] Dev server runs
  - [ ] Pre-commit hook works
  - [ ] Footer shows correct phone number
