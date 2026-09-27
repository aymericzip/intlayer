---
createdAt: 2026-02-09
updatedAt: 2026-09-27
priority: 6
title: "Agent Skills Intlayer pour les agents de code IA"
description: "Donnez à votre agent de code IA les skills Intlayer : des guides de mise en place pour le contenu, les métadonnées, les sitemaps et les server actions."
keywords:
  - Intlayer
  - Agent Skills
  - Agent IA
  - Internationalisation
  - Documentation
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: "Init history"
author: aymericzip
---

# Agent Skills

## Configuration

### Utilisation de la CLI

La commande `intlayer init skills` est le moyen le plus simple de configurer les Agent Skills dans votre projet. Elle détecte votre environnement et installe les fichiers de configuration nécessaires pour vos plateformes préférées.

```bash packageManager="npm"
npx intlayer init skills
```

```bash packageManager="yarn"
yarn intlayer init skills
```

```bash packageManager="pnpm"
pnpm intlayer init skills
```

```bash packageManager="bun"
bun x intlayer init skills
```

### Utilisation du SDK Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

### Utilisation de l'extension VS Code

1. Ouvrez la palette de commandes (Ctrl+Maj+P ou Cmd+Maj+P).
2. Tapez `Intlayer: Setup AI Agent Skills`
3. Choisissez la plateforme que vous utilisez (par ex. `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace`, etc.).
4. Choisissez les Agent Skills que vous souhaitez installer (par ex. `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Appuyez sur Entrée.

## Liste des Agent Skills

**intlayer-config**

- Permet à l'agent de comprendre les paramètres i18n spécifiques à votre projet, lui permettant de configurer avec précision les locales, les modèles de routage et les stratégies de repli.

**intlayer-cli**

- Permet à l'agent de gérer de manière autonome votre cycle de vie de traduction, y compris l'audit des traductions manquantes, la création de dictionnaires et la synchronisation du contenu via la ligne de commande.

**intlayer-angular**

- Équipe l'agent d'une expertise spécifique au framework pour implémenter correctement les modèles i18n réactifs et les signaux selon les meilleures pratiques d'Angular.

**intlayer-astro**

- Fournit à l'agent les connaissances nécessaires pour gérer les traductions côté serveur et les modèles de routage localisés uniques à l'écosystème Astro.

**intlayer-content**

- Enseigne à l'agent comment utiliser les nœuds de contenu avancés-tels que la pluralisation, les conditions et le markdown-pour construire des dictionnaires riches, dynamiques et localisés.

**intlayer-next-js**

- Donne à l'agent la profondeur nécessaire pour implémenter i18n dans les composants Serveur et Client de Next.js, assurant l'optimisation SEO et un routage localisé fluide.

**intlayer-react**

- Fournit des connaissances spécialisées à l'agent pour implémenter efficacement des composants et des hooks i18n déclaratifs dans n'importe quel environnement basé sur React.

**intlayer-preact**

- Optimise la capacité de l'agent à implémenter i18n pour Preact, lui permettant d'écrire des composants légers et localisés utilisant des signaux et des modèles réactifs efficaces.

**intlayer-solid**

- Permet à l'agent de tirer parti de la réactivité fine de SolidJS pour une gestion performante du contenu localisé.

**intlayer-svelte**

- Enseigne à l'agent l'utilisation des stores Svelte et une syntaxe idiomatique pour un contenu localisé réactif et typé dans les applications Svelte et SvelteKit.

**intlayer-remote-content**

- Permet à l'agent d'intégrer et de gérer du contenu distant, lui permettant de gérer les flux de travail de synchronisation en direct et de traduction à distance via le CMS Intlayer.

**intlayer-usage**

- Standardise l'approche de l'agent concernant la structure du projet et la déclaration du contenu, s'assurant qu'il suit les flux de travail les plus efficaces pour votre projet i18n.

**intlayer-vue**

- Équipe l'agent avec des modèles spécifiques à Vue-y compris les Composables et le support Nuxt-pour construire des applications web modernes et localisée.

**intlayer-compiler**

- Simplifie le flux de travail de l'agent en permettant l'extraction automatique du contenu, lui permettant d'écrire des chaînes traduisibles directement dans votre code sans fichiers de dictionnaire manuels.

**intlayer-lit**

- Enseigne à l'agent à traduire des web components Lit avec les ReactiveControllers `useIntlayer` et `useLocale`.

**intlayer-vanilla**

- Permet à l'agent de localiser des pages en JavaScript / TypeScript pur avec `vanilla-intlayer`, avec ou sans bundler.

**intlayer-remix**

- Donne à l'agent le middleware de routeur Remix 3 et les hooks `useIntlayer` / `useLocale` liés à la requête.

**intlayer-backend**

- Équipe l'agent pour traduire les réponses serveur dans Express, Fastify, Hono, NestJS, AdonisJS et Elysia grâce à un même modèle middleware + `t` / `getIntlayer`.

**intlayer-dev-tools**

- Permet à l'agent de mettre en place l'outillage Intlayer autour de votre code : règles ESLint pour les chaînes codées en dur, le Language Server, les extensions VS Code et Chrome, le serveur MCP et les vérifications de traduction en CI/CD.

**intlayer-markdown**

- Enseigne à l'agent à déclarer du contenu Markdown (`md()`, fichiers `.content.md`, fichiers externes) et à le rendre avec des composants MDX, un `MarkdownProvider` global, Suspense et le parsing côté serveur.

**intlayer-compat**

- Guide l'agent dans la migration depuis i18next, react-i18next, next-intl, next-i18next, react-intl, vue-i18n ou Lingui grâce à des adaptateurs de compatibilité qui conservent l'API d'origine, sans avoir à réécrire les appels de traduction.
