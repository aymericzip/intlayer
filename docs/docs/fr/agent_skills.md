---
createdAt: 2026-02-09
updatedAt: 2026-03-03
title: Compétences de l'agent
description: Apprenez à utiliser les compétences de l'agent Intlayer pour améliorer la compréhension de votre projet par votre agent IA, y compris des guides complets pour les métadonnées, les sitemaps et les actions serveur.
keywords:
  - Intlayer
  - Compétences de l'agent
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
---

# Compétences de l'agent

## Configuration

### Utilisation de la CLI

La commande `intlayer init skills` est le moyen le plus simple de configurer les compétences de l'agent dans votre projet. Elle détecte votre environnement et installe les fichiers de configuration nécessaires pour vos plateformes préférées.

```bash
npx intlayer init skills
```

### Utilisation du SDK Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

### Utilisation de l'extension VS Code

1. Ouvrez la palette de commandes (Ctrl+Maj+P ou Cmd+Maj+P).
2. Tapez `Intlayer: Setup AI Agent Skills`
3. Choisissez la plateforme que vous utilisez (par ex. `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace`, etc.).
4. Choisissez les compétences que vous souhaitez installer (par ex. `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Appuyez sur Entrée.

## Liste des compétences

**intlayer-config**

- Permet à l'agent de comprendre les paramètres i18n spécifiques à votre projet, lui permettant de configurer avec précision les locales, les modèles de routage et les stratégies de repli.

**intlayer-cli**

- Permet à l'agent de gérer de manière autonome votre cycle de vie de traduction, y compris l'audit des traductions manquantes, la création de dictionnaires et la synchronisation du contenu via la ligne de commande.

**intlayer-angular**

- Équipe l'agent d'une expertise spécifique au framework pour implémenter correctement les modèles i18n réactifs et les signaux selon les meilleures pratiques d'Angular.

**intlayer-astro**

- Fournit à l'agent les connaissances nécessaires pour gérer les traductions côté serveur et les modèles de routage localisés uniques à l'écosystème Astro.

**intlayer-content**

- Enseigne à l'agent comment utiliser les nœuds de contenu avancés—tels que la pluralisation, les conditions et le markdown—pour construire des dictionnaires riches, dynamiques et localisés.

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

**intlayer-cms**

- Permet à l'agent d'intégrer et de gérer du contenu distant, lui permettant de gérer les flux de travail de synchronisation en direct et de traduction à distance via le CMS Intlayer.

**intlayer-usage**

- Standardise l'approche de l'agent concernant la structure du projet et la déclaration du contenu, s'assurant qu'il suit les flux de travail les plus efficaces pour votre projet i18n.

**intlayer-vue**

- Équipe l'agent avec des modèles spécifiques à Vue—y compris les Composables et le support Nuxt—pour construire des applications web modernes et localisée.

**intlayer-compiler**

- Simplifie le flux de travail de l'agent en permettant l'extraction automatique du contenu, lui permettant d'écrire des chaînes traduisibles directement dans votre code sans fichiers de dictionnaire manuels.
