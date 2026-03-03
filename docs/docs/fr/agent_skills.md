---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: Compétences de l'agent
description: Apprenez à utiliser les compétences de l'agent Intlayer pour améliorer la compréhension de votre projet par votre agent IA, y compris des guides de configuration complets pour les métadonnées (Metadata), les plans de site (Sitemaps) et les actions serveur (Server Actions).
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
    changes: Initialiser l'historique
---

# Compétences de lagent

## La commande `intlayer init skills`

La commande `intlayer init skills` est le moyen le plus simple de configurer les compétences de l'agent dans votre projet. Elle détecte votre environnement et installe les fichiers de configuration nécessaires pour vos plateformes préférées.

```bash
npx intlayer init skills
```

Ou en utilisant le SDK Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

Lorsque vous exécutez cette commande, elle :

1.  Détecte le framework que vous utilisez (ex: Next.js, React, Vite).
2.  Vous demande pour quelles plateformes vous souhaitez installer des compétences (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace, etc.).
3.  Génère les fichiers de configuration requis (ex: `.cursor/skills/intlayer-next-js/SKILL.md`, `.windsurf/skills/intlayer-next-js/SKILL.md`, `.opencode/skills/intlayer-next-js/SKILL.md`, `.vscode/mcp.json`, etc.).

## Plateformes supportées

Intlayer fournit une documentation spécifique au framework (Configuration, Utilisation, Métadonnées, Plan du site, Actions serveur, etc.) pour aider l'agent IA à comprendre comment travailler avec Intlayer dans votre projet spécifique. Ces compétences sont conçues pour guider l'agent à travers les complexités de l'internationalisation, en s'assurant qu'il suit les modèles et les meilleures pratiques appropriés.
