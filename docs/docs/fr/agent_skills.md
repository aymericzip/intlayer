---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: Compétences de l'agent
description: Apprenez à utiliser les compétences de l'agent Intlayer pour améliorer la compréhension de votre projet par votre agent IA.
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
  - version: 8.0.4
    date: 2026-02-09
    changes: Initialiser l'historique
---

## La commande `intlayer init skills`

La commande `intlayer init skills` est le moyen le plus simple de configurer les compétences de l'agent dans votre projet. Elle détecte votre environnement et installe les fichiers de configuration nécessaires pour vos plateformes préférées.

```bash
npx intlayer init skills
```

Lorsque vous exécutez cette commande, elle :

1.  Détecte le framework que vous utilisez (ex: Next.js, React, Vite).
2.  Vous demande pour quelles plateformes vous souhaitez installer des compétences (Cursor, VS Code, OpenCode, Claude Code, etc.).
3.  Génère les fichiers de configuration requis (tels que `.cursor/mcp.json`, `.vscode/mcp.json` ou `.intlayer/skills/*.md`).

## Plateformes supportées

Intlayer supporte l'intégration avec les plateformes suivantes :

### 1. Cursor

Cursor supporte les serveurs MCP (Model Context Protocol). L'exécution de `intlayer init skills` créera un fichier `.cursor/mcp.json` qui permet à Cursor de communiquer avec le serveur MCP d'Intlayer.

### 2. VS Code

Pour les utilisateurs de VS Code, en particulier ceux utilisant GitHub Copilot ou d'autres extensions compatibles MCP, la commande crée une configuration `.vscode/mcp.json`.

### 3. OpenCode

OpenCode est un agent CLI interactif conçu pour les tâches d'ingénierie logicielle. Intlayer fournit des compétences spécifiques pour aider OpenCode à vous assister dans vos tâches d'internationalisation.

### 4. Claude Code

Claude Code peut être configuré pour utiliser les compétences d'Intlayer en ajoutant les configurations générées à ses paramètres de bureau ou CLI.
