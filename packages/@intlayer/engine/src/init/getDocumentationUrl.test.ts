import { describe, expect, it } from 'vitest';
import {
  DocumentationRouter,
  getDocumentationUrl,
} from './documentationRouter';

describe('DocumentationRouter', () => {
  it('does not contain .md in any URL', () => {
    for (const [key, url] of Object.entries(DocumentationRouter)) {
      expect(url, `${key} contains .md: ${url}`).not.toMatch(/\.md$/);
    }
  });

  it('matches all documentation slugs', () => {
    expect(DocumentationRouter.AdonisJS).toBe(
      'https://intlayer.org/doc/environment/adonisjs'
    );
    expect(DocumentationRouter.Analog).toBe(
      'https://intlayer.org/doc/environment/analog'
    );
    expect(DocumentationRouter.Angular_19).toBe(
      'https://intlayer.org/doc/environment/angular/19'
    );
    expect(DocumentationRouter.Angular).toBe(
      'https://intlayer.org/doc/environment/angular'
    );
    expect(DocumentationRouter.Astro_Lit).toBe(
      'https://intlayer.org/doc/environment/astro/lit'
    );
    expect(DocumentationRouter.Astro_Preact).toBe(
      'https://intlayer.org/doc/environment/astro/preact'
    );
    expect(DocumentationRouter.Astro_React).toBe(
      'https://intlayer.org/doc/environment/astro/react'
    );
    expect(DocumentationRouter.Astro_Solid).toBe(
      'https://intlayer.org/doc/environment/astro/solid'
    );
    expect(DocumentationRouter.Astro_Svelte).toBe(
      'https://intlayer.org/doc/environment/astro/svelte'
    );
    expect(DocumentationRouter.Astro_Vue).toBe(
      'https://intlayer.org/doc/environment/astro/vue'
    );
    expect(DocumentationRouter.Astro).toBe(
      'https://intlayer.org/doc/environment/astro'
    );
    expect(DocumentationRouter.CRA).toBe(
      'https://intlayer.org/doc/environment/create-react-app'
    );
    expect(DocumentationRouter.Elysia).toBe(
      'https://intlayer.org/doc/environment/elysia'
    );
    expect(DocumentationRouter.Express).toBe(
      'https://intlayer.org/doc/environment/express'
    );
    expect(DocumentationRouter.Fastify).toBe(
      'https://intlayer.org/doc/environment/fastify'
    );
    expect(DocumentationRouter.Hono).toBe(
      'https://intlayer.org/doc/environment/hono'
    );
    expect(DocumentationRouter.HTMX).toBe(
      'https://intlayer.org/doc/environment/htmx'
    );
    expect(DocumentationRouter.Lynx).toBe(
      'https://intlayer.org/doc/environment/lynx-and-react'
    );
    expect(DocumentationRouter.NestJS).toBe(
      'https://intlayer.org/doc/environment/nest'
    );
    expect(DocumentationRouter.NextI18Next).toBe(
      'https://intlayer.org/doc/next-i18next'
    );
    expect(DocumentationRouter.NextIntl).toBe(
      'https://intlayer.org/doc/next-intl'
    );
    expect(DocumentationRouter.NextJS_14).toBe(
      'https://intlayer.org/doc/environment/nextjs/14'
    );
    expect(DocumentationRouter.NextJS_15).toBe(
      'https://intlayer.org/doc/environment/nextjs/15'
    );
    expect(DocumentationRouter.NextJS_16).toBe(
      'https://intlayer.org/doc/environment/nextjs'
    );
    expect(DocumentationRouter.NextJS).toBe(
      'https://intlayer.org/doc/environment/nextjs'
    );
    expect(DocumentationRouter.NextJS_PageRouter).toBe(
      'https://intlayer.org/doc/environment/nextjs/next-with-page-router'
    );
    expect(DocumentationRouter.NuxtAndVue).toBe(
      'https://intlayer.org/doc/environment/nuxt-and-vue'
    );
    expect(DocumentationRouter.ReactNativeAndExpo).toBe(
      'https://intlayer.org/doc/environment/react-native-and-expo'
    );
    expect(DocumentationRouter.ViteAndReact_ReactRouterV7).toBe(
      'https://intlayer.org/doc/environment/vite-and-react/react-router-v7'
    );
    expect(DocumentationRouter.Remix).toBe(
      'https://intlayer.org/doc/environment/remix-3'
    );
    expect(DocumentationRouter.SolidStart).toBe(
      'https://intlayer.org/doc/environment/solid-start'
    );
    expect(DocumentationRouter.Storybook).toBe(
      'https://intlayer.org/doc/storybook'
    );
    expect(DocumentationRouter.SvelteKit).toBe(
      'https://intlayer.org/doc/environment/sveltekit'
    );
    expect(DocumentationRouter.TanStackRouter).toBe(
      'https://intlayer.org/doc/environment/tanstack-start'
    );
    expect(DocumentationRouter.TanStackRouterAndSolid).toBe(
      'https://intlayer.org/doc/environment/tanstack-start/solid'
    );
    expect(DocumentationRouter.Vanilla).toBe(
      'https://intlayer.org/doc/environment/vanilla'
    );
    expect(DocumentationRouter.ViteAndLit).toBe(
      'https://intlayer.org/doc/environment/vite-and-lit'
    );
    expect(DocumentationRouter.ViteAndPreact).toBe(
      'https://intlayer.org/doc/environment/vite-and-preact'
    );
    expect(DocumentationRouter.ViteAndReact).toBe(
      'https://intlayer.org/doc/environment/vite-and-react'
    );
    expect(DocumentationRouter.ViteAndSolid).toBe(
      'https://intlayer.org/doc/environment/vite-and-solid'
    );
    expect(DocumentationRouter.ViteAndSvelte).toBe(
      'https://intlayer.org/doc/environment/vite-and-svelte'
    );
    expect(DocumentationRouter.ViteAndVanilla).toBe(
      'https://intlayer.org/doc/environment/vite-and-vanilla'
    );
    expect(DocumentationRouter.ViteAndVue).toBe(
      'https://intlayer.org/doc/environment/vite-and-vue'
    );
  });
});

describe('getDocumentationUrl', () => {
  it('detects Next.js versions correctly', () => {
    expect(getDocumentationUrl({ dependencies: { next: '^14.2.0' } })).toBe(
      DocumentationRouter.NextJS_14
    );
    expect(getDocumentationUrl({ dependencies: { next: '^15.0.0' } })).toBe(
      DocumentationRouter.NextJS_15
    );
    expect(getDocumentationUrl({ dependencies: { next: '^16.0.0' } })).toBe(
      DocumentationRouter.NextJS
    );
  });

  it('detects Angular versions correctly', () => {
    expect(
      getDocumentationUrl({ dependencies: { '@angular/core': '^19.0.0' } })
    ).toBe(DocumentationRouter.Angular_19);
    expect(
      getDocumentationUrl({ dependencies: { '@angular/core': '^21.0.0' } })
    ).toBe(DocumentationRouter.Angular);
  });

  it('detects Astro integrations correctly', () => {
    expect(
      getDocumentationUrl({
        dependencies: { astro: '^5.0.0', '@astrojs/react': '^4.0.0' },
      })
    ).toBe(DocumentationRouter.Astro_React);
    expect(
      getDocumentationUrl({
        dependencies: { astro: '^5.0.0', '@astrojs/vue': '^4.0.0' },
      })
    ).toBe(DocumentationRouter.Astro_Vue);
    expect(
      getDocumentationUrl({
        dependencies: { astro: '^5.0.0', '@astrojs/svelte': '^4.0.0' },
      })
    ).toBe(DocumentationRouter.Astro_Svelte);
    expect(
      getDocumentationUrl({
        dependencies: { astro: '^5.0.0', '@astrojs/solid-js': '^4.0.0' },
      })
    ).toBe(DocumentationRouter.Astro_Solid);
    expect(
      getDocumentationUrl({
        dependencies: { astro: '^5.0.0', '@astrojs/preact': '^4.0.0' },
      })
    ).toBe(DocumentationRouter.Astro_Preact);
    expect(
      getDocumentationUrl({
        dependencies: { astro: '^5.0.0', '@astrojs/lit': '^4.0.0' },
      })
    ).toBe(DocumentationRouter.Astro_Lit);
    expect(getDocumentationUrl({ dependencies: { astro: '^5.0.0' } })).toBe(
      DocumentationRouter.Astro
    );
  });

  it('detects Vite environments correctly', () => {
    expect(
      getDocumentationUrl({
        dependencies: { vite: '^6.0.0', vue: '^3.5.0' },
      })
    ).toBe(DocumentationRouter.ViteAndVue);
    expect(
      getDocumentationUrl({
        dependencies: { vite: '^6.0.0', 'solid-js': '^1.9.0' },
      })
    ).toBe(DocumentationRouter.ViteAndSolid);
    expect(
      getDocumentationUrl({
        dependencies: { vite: '^6.0.0', svelte: '^5.0.0' },
      })
    ).toBe(DocumentationRouter.ViteAndSvelte);
    expect(
      getDocumentationUrl({
        dependencies: { vite: '^6.0.0', preact: '^10.0.0' },
      })
    ).toBe(DocumentationRouter.ViteAndPreact);
    expect(
      getDocumentationUrl({
        dependencies: { vite: '^6.0.0', lit: '^3.0.0' },
      })
    ).toBe(DocumentationRouter.ViteAndLit);
    expect(
      getDocumentationUrl({
        dependencies: { vite: '^6.0.0', 'vanilla-intlayer': '^9.0.0' },
      })
    ).toBe(DocumentationRouter.ViteAndVanilla);
    expect(
      getDocumentationUrl({
        dependencies: { vite: '^6.0.0', react: '^19.0.0' },
      })
    ).toBe(DocumentationRouter.ViteAndReact);
  });

  it('detects backend frameworks correctly', () => {
    expect(
      getDocumentationUrl({
        dependencies: { '@adonisjs/core': '^6.0.0' },
      })
    ).toBe(DocumentationRouter.AdonisJS);
    expect(
      getDocumentationUrl({
        dependencies: { elysia: '^1.0.0' },
      })
    ).toBe(DocumentationRouter.Elysia);
    expect(
      getDocumentationUrl({
        dependencies: { hono: '^4.0.0' },
      })
    ).toBe(DocumentationRouter.Hono);
    expect(
      getDocumentationUrl({
        dependencies: { express: '^4.0.0' },
      })
    ).toBe(DocumentationRouter.Express);
    expect(
      getDocumentationUrl({
        dependencies: { fastify: '^4.0.0' },
      })
    ).toBe(DocumentationRouter.Fastify);
    expect(
      getDocumentationUrl({
        dependencies: { '@nestjs/core': '^10.0.0', express: '^4.0.0' },
      })
    ).toBe(DocumentationRouter.NestJS);
  });
});
