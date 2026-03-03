---
createdAt: 2026-02-09
updatedAt: 2026-03-03
title: Agent Skills
description: Learn how to use Intlayer Agent Skills to improve your AI agent's understanding of your project, including comprehensive setup guides for Metadata, Sitemaps, and Server Actions.
keywords:
  - Intlayer
  - Agent Skills
  - AI Agent
  - Internationalisation
  - Documentation
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: Init history
---

# Agent Skills

## Setup

### Using CLI

The `intlayer init skills` command is the easiest way to set up agent skills in your project. It detects your environment and installs the necessary configuration files for your preferred platforms.

```bash
npx intlayer init skills
```

### Using Vercel Skill SDK

```bash
npx skills add aymericzip/intlayer-skills
```

### Using VS Code extension

1. Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P).
2. Type `Intlayer: Setup AI Agent Skills`
3. Pick the platform you use (e.g. `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace`, etc.).
4. Pick the Skills you want to install (e.g. `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Press Enter.

## Skills List

**intlayer-config**

- Empowers the agent to understand your project's specific i18n settings, enabling it to accurately configure locales, routing patterns, and fallback strategies.

**intlayer-cli**

- Enables the agent to autonomously manage your translation lifecycle, including auditing missing translations, building dictionaries, and syncing content via the command line.

**intlayer-angular**

- Equips the agent with framework-specific expertise to correctly implement reactive i18n patterns and signals according to Angular best practices.

**intlayer-astro**

- Provides the agent with the knowledge to handle server-side translations and localized routing patterns unique to the Astro ecosystem.

**intlayer-content**

- Teaches the agent how to utilize advanced content nodes—such as pluralization, conditions, and markdown—to construct rich, dynamic, and localized dictionaries.

**intlayer-next-js**

- Gives the agent the depth to implement i18n across Next.js Server and Client components, ensuring SEO optimization and seamless localized routing.

**intlayer-react**

- Provides specialized knowledge for the agent to implement declarative i18n components and hooks efficiently within any React-based environment.

**intlayer-preact**

- Optimizes the agent's ability to implement i18n for Preact, allowing it to write lightweight, localized components using signals and efficient reactive patterns.

**intlayer-solid**

- Enables the agent to leverage SolidJS's fine-grained reactivity for high-performance, localized content management.

**intlayer-svelte**

- Teaches the agent to use Svelte stores and idiomatic syntax for reactive and type-safe localized content across Svelte and SvelteKit apps.

**intlayer-cms**

- Allows the agent to integrate and manage remote content, enabling it to handle live-syncing and remote translation workflows via the Intlayer CMS.

**intlayer-usage**

- Standardizes the agent's approach to project structure and content declaration, ensuring it follows the most efficient workflows for your i18n project.

**intlayer-vue**

- Equips the agent with Vue-specific patterns—including Composables and Nuxt support—to build modern, localized web applications.

**intlayer-compiler**

- Simplifies the agent's workflow by enabling automatic content extraction, allowing it to write translatable strings directly in your code without manual dictionary files.
