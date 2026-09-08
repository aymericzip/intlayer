import { describe, expect, it } from 'vitest';
import { resolveDevScript } from './devScript';

describe('resolveDevScript', () => {
  it('should wrap the dev server of a backend framework', () => {
    expect(
      resolveDevScript({
        devScript: 'node ./src/index.ts',
        allDeps: { 'express-intlayer': '9.0.0' },
        isNextJsProject: false,
      })
    ).toBe("intlayer watch --with 'node ./src/index.ts'");
  });

  it.each([
    'express-intlayer',
    'fastify-intlayer',
    'adonis-intlayer',
    'hono-intlayer',
    'elysia-intlayer',
  ])('should wrap the dev server of a project using %s', (packageName) => {
    expect(
      resolveDevScript({
        devScript: 'bun ./src/index.ts',
        allDeps: { [packageName]: '9.0.0' },
        isNextJsProject: false,
      })
    ).toBe("intlayer watch --with 'bun ./src/index.ts'");
  });

  it('should leave a Next.js project detected by its config file alone', () => {
    expect(
      resolveDevScript({
        devScript: 'next dev',
        allDeps: {},
        isNextJsProject: true,
      })
    ).toBeNull();
  });

  it('should leave a Next.js project with no next.config alone', () => {
    expect(
      resolveDevScript({
        devScript: 'next dev',
        allDeps: { next: '16.3.4' },
        isNextJsProject: false,
      })
    ).toBeNull();
  });

  it('should leave a Next.js app running a backend framework alongside alone', () => {
    // A custom server, or a package.json covering both halves of a monorepo:
    // the bundler plugin still hosts the watcher, so the wrapper is redundant.
    expect(
      resolveDevScript({
        devScript: 'next dev',
        allDeps: { next: '16.3.4', 'express-intlayer': '9.0.0' },
        isNextJsProject: true,
      })
    ).toBeNull();
  });

  it('should leave a project with no supported framework alone', () => {
    expect(
      resolveDevScript({
        devScript: 'vite',
        allDeps: { vite: '7.0.0' },
        isNextJsProject: false,
      })
    ).toBeNull();
  });

  it('should not nest a second wrapper when re-run', () => {
    expect(
      resolveDevScript({
        devScript: "intlayer watch --with 'node ./src/index.ts'",
        allDeps: { 'express-intlayer': '9.0.0' },
        isNextJsProject: false,
      })
    ).toBeNull();
  });

  it('should leave a project with no dev script alone', () => {
    expect(
      resolveDevScript({
        devScript: undefined,
        allDeps: { 'hono-intlayer': '9.0.0' },
        isNextJsProject: false,
      })
    ).toBeNull();
  });
});
