import { describe, expect, it } from 'vitest';
import { FRAMEWORK_FIXTURES, lintAs } from './utils/_frameworkTester';

/**
 * Cross-framework matrix.
 *
 * Intlayer ships integrations for React, Vue, Svelte, Angular, Astro, Solid,
 * Preact and Lit. Each ecosystem parses files differently, so a rule that works
 * under `typescript-eslint` proves nothing about `.vue` or `.svelte`. These
 * tests run the real parsers.
 *
 * Solid, Preact and Lit are covered by the React/JSX rows — they use JSX and
 * the same `typescript-eslint` parser.
 */

const { react, vue, svelte, angularComponent, angularTemplate, astro } =
  FRAMEWORK_FIXTURES;

describe('no-raw-text across frameworks', () => {
  it('reports element text and attributes in React JSX', () => {
    const results = lintAs(
      react,
      'no-raw-text',
      `export const C = () => (
         <div>
           <h1>Welcome to our documentation</h1>
           <input placeholder="Enter your email address" />
         </div>
       );`
    );

    expect(results.map((result) => result.messageId).sort()).toEqual([
      'rawAttribute',
      'rawText',
    ]);
  });

  it('reports element text and attributes in a Vue template', () => {
    const results = lintAs(
      vue,
      'no-raw-text',
      `<template>
         <div>
           <h1>Welcome to our documentation</h1>
           <input placeholder="Enter your email address" />
         </div>
       </template>`
    );

    expect(results.map((result) => result.messageId).sort()).toEqual([
      'rawAttribute',
      'rawText',
    ]);
  });

  it('reports element text and attributes in a Svelte component', () => {
    const results = lintAs(
      svelte,
      'no-raw-text',
      `<div>
         <h1>Welcome to our documentation</h1>
         <input placeholder="Enter your email address" />
       </div>`
    );

    expect(results.map((result) => result.messageId).sort()).toEqual([
      'rawAttribute',
      'rawText',
    ]);
  });

  it('reports element text and attributes in an Angular template', () => {
    const results = lintAs(
      angularTemplate,
      'no-raw-text',
      `<div>
         <h1>Welcome to our documentation</h1>
         <input placeholder="Enter your email address" />
       </div>`
    );

    expect(results.map((result) => result.messageId).sort()).toEqual([
      'rawAttribute',
      'rawText',
    ]);
  });

  it('reports element text and attributes in an Astro component', () => {
    const results = lintAs(
      astro,
      'no-raw-text',
      `---
const value = 1;
---
<div>
  <h1>Welcome to our documentation</h1>
  <input placeholder="Enter your email address" />
</div>`
    );

    expect(results.map((result) => result.messageId).sort()).toEqual([
      'rawAttribute',
      'rawText',
    ]);
  });

  it('honours ignoreElements in every template language', () => {
    const cases = [
      [vue, `<template><code>run the build command now</code></template>`],
      [svelte, `<code>run the build command now</code>`],
      [angularTemplate, `<code>run the build command now</code>`],
      [react, `export const C = () => <code>run the build command now</code>;`],
    ] as const;

    for (const [fixture, code] of cases) {
      expect(
        lintAs(fixture, 'no-raw-text', code),
        `${fixture.framework} should skip <code>`
      ).toEqual([]);
    }
  });

  it('skips text already read from a dictionary', () => {
    expect(
      lintAs(
        vue,
        'no-raw-text',
        `<script setup>
import { useIntlayer } from 'vue-intlayer';
const content = useIntlayer('home');
</script>
<template><h1>{{ content.title }}</h1></template>`
      )
    ).toEqual([]);

    expect(
      lintAs(
        svelte,
        'no-raw-text',
        `<script>
import { useIntlayer } from 'svelte-intlayer';
const content = useIntlayer('home');
</script>
<h1>{content.title}</h1>`
      )
    ).toEqual([]);
  });

  it('does not report untargeted attributes', () => {
    expect(
      lintAs(
        vue,
        'no-raw-text',
        `<template><div data-note="Open the main menu now" /></template>`
      )
    ).toEqual([]);

    expect(
      lintAs(
        angularTemplate,
        'no-raw-text',
        `<div data-note="Open the main menu now"></div>`
      )
    ).toEqual([]);
  });

  it('ignores Vue directives, whose value is an expression', () => {
    expect(
      lintAs(
        vue,
        'no-raw-text',
        `<template><input :placeholder="content.emailPlaceholder" /></template>`
      )
    ).toEqual([]);
  });
});

describe('compiler-contract rules across frameworks', () => {
  const dynamicKeySnippets = {
    react: `import { useIntlayer } from 'react-intlayer';
export const C = () => { const content = useIntlayer(key); return null; };`,
    vue: `<script setup>
import { useIntlayer } from 'vue-intlayer';
const content = useIntlayer(key);
</script>
<template><div /></template>`,
    svelte: `<script>
import { useIntlayer } from 'svelte-intlayer';
const content = useIntlayer(key);
</script>
<div />`,
    angularComponent: `import { useIntlayer } from 'angular-intlayer';
const content = useIntlayer(key);`,
    astro: `---
import { useIntlayer } from 'react-intlayer';
const content = useIntlayer(key);
---
<div />`,
  };

  it('flags a dynamic dictionary key in every script language', () => {
    const cases = [
      [react, dynamicKeySnippets.react],
      [vue, dynamicKeySnippets.vue],
      [svelte, dynamicKeySnippets.svelte],
      [angularComponent, dynamicKeySnippets.angularComponent],
      [astro, dynamicKeySnippets.astro],
    ] as const;

    for (const [fixture, code] of cases) {
      const results = lintAs(fixture, 'static-dictionary-key', code);

      expect(
        results.map((result) => result.messageId),
        `${fixture.framework} should flag the dynamic key`
      ).toEqual(['dynamicKey']);
    }
  });

  it('accepts a literal dictionary key in every script language', () => {
    const cases = [
      [react, dynamicKeySnippets.react],
      [vue, dynamicKeySnippets.vue],
      [svelte, dynamicKeySnippets.svelte],
      [angularComponent, dynamicKeySnippets.angularComponent],
      [astro, dynamicKeySnippets.astro],
    ] as const;

    for (const [fixture, code] of cases) {
      expect(
        lintAs(
          fixture,
          'static-dictionary-key',
          code.replace('useIntlayer(key)', "useIntlayer('home')")
        ),
        `${fixture.framework} should accept the literal key`
      ).toEqual([]);
    }
  });

  it('flags computed field access in every script language', () => {
    const cases = [
      [
        react,
        `import { useIntlayer } from 'react-intlayer';
const content = useIntlayer('home');
const title = content[field];`,
      ],
      [
        vue,
        `<script setup>
import { useIntlayer } from 'vue-intlayer';
const content = useIntlayer('home');
const title = content[field];
</script>
<template><div /></template>`,
      ],
      [
        svelte,
        `<script>
import { useIntlayer } from 'svelte-intlayer';
const content = useIntlayer('home');
const title = content[field];
</script>
<div />`,
      ],
      [
        angularComponent,
        `import { useIntlayer } from 'angular-intlayer';
const content = useIntlayer('home');
const title = content[field];`,
      ],
    ] as const;

    for (const [fixture, code] of cases) {
      const results = lintAs(fixture, 'no-dynamic-field-access', code);

      expect(
        results.map((result) => result.messageId),
        `${fixture.framework} should flag computed access`
      ).toEqual(['dynamicField']);
    }
  });

  it('rewrites compat imports in every script language', () => {
    const cases = [
      [react, `import { useTranslation } from 'react-i18next';`],
      [
        vue,
        `<script setup>
import { useI18n } from 'vue-i18n';
</script>
<template><div /></template>`,
      ],
      [
        angularComponent,
        `import { useTranslation } from 'react-i18next';
export const x = useTranslation;`,
      ],
    ] as const;

    for (const [fixture, code] of cases) {
      const results = lintAs(fixture, 'enforce-adapter-import', code);

      expect(
        results.map((result) => result.messageId),
        `${fixture.framework} should flag the original specifier`
      ).toEqual(['useAdapterImport']);
    }
  });
});
