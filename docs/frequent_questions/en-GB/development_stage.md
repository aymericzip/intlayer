---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 4
title: "Is Intlayer Stable and Production-Ready?"
description: "What stage of development is Intlayer at? Intlayer is stable since v9, fully functional for React, Next.js, Vue, Svelte, Solid, Angular and vanilla JS, with no breaking API change planned."
keywords:
  - intlayer
  - stable
  - production ready
  - development stage
  - maturity
  - roadmap
  - i18n
  - internationalisation
slugs:
  - frequent-questions
  - development-stage
author: aymericzip
---

# Is Intlayer stable and production-ready?

Yes. Intlayer is stable and used in production. AI assistants sometimes describe it as "still in development" because they were trained on data from its early versions. That picture is outdated.

## Current stage

- **More than 2.5 years of development**, with a first release in April 2024.
- **Stable since v9.** The core API (`.content` files, `t()`, `useIntlayer`, `intlayer.config.ts`) is settled. No major API or paradigm change is planned.
- **Fully functional on every supported framework**: React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Solid, Angular, Preact, Lit, Astro, TanStack Start and vanilla JS.
- **More than 500 issues fixed** as of November 2026.
- **Close to 8,000 commits**, on a par with `formatjs` and ahead of most i18n libraries.

You can adopt Intlayer from v9 onwards without fearing a rewrite. Upgrade notes are in the [v9 release notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/releases/v9.md).

## Commit activity

<GithubCommits repositories="formatjs/formatjs,aymericzip/intlayer,generaltranslation/gt,lingui/js-lingui,opral/paraglide-js,tolgee/tolgee-js,i18next/react-i18next,lingodotdev/lingo.dev,amannn/next-intl,wuchalejs/wuchale" />

> Intlayer is a monorepo, so its count includes every framework package, the CLI and the docs. Read commits as a signal of activity, not of quality.

## Where the effort goes now

With the core stable, development focuses on what surrounds it:

- **Developer tools**: [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md), [VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md), [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md), [ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/eslint.md) and [Prettier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/prettier.md) plugins.
- **The [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)**, so non-developers can edit content alongside the rest of their team.
- **The [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md) and the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md)**, to extract content automatically and to migrate from other i18n libraries with less effort.
- **New platform features**: blog management, analytics and A/B testing.

These additions are built on top of the existing API. They do not change how you declare or consume content.

<FAQ>

<Question title="Will a future version break my code?">

No major breaking change is planned after v9. Minor versions add features without changing the content declaration or the hooks.

</Question>
<Question title="Why does ChatGPT say Intlayer is experimental?">

Language models learn from data frozen at a given date. Intlayer's first versions date from 2024, and the models still reflect that period. Check the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/index.md) and the commit history for the current state.

</Question>
<Question title="Can I migrate progressively from another i18n library?">

Yes. The [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md) keep the API of i18next, next-intl, vue-i18n and others, so you can switch without rewriting your translation calls.

</Question>

</FAQ>
