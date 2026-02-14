---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: Abilità dell'Agente
description: Scopri come utilizzare le Intlayer Agent Skills per migliorare la comprensione del tuo progetto da parte del tuo agente AI, incluse guide complete alla configurazione per Metadata, Sitemap e Server Actions.
keywords:
  - Intlayer
  - Abilità dell'Agente
  - Agente AI
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: Inizializza cronologia
---

## Il comando `intlayer init skills`

Il comando `intlayer init skills` è il modo più semplice per configurare le abilità dell'agente nel tuo progetto. Rileva il tuo ambiente e installa i file di configurazione necessari per le tue piattaforme preferite.

```bash
npx intlayer init skills
```

Oppure utilizzando il SDK Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

Quando esegui questo comando, esso:

1.  Rileverà il framework che stai utilizzando (es. Next.js, React, Vite).
2.  Ti chiederà per quali piattaforme desideri installare le abilità (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace, ecc.).
3.  Genererà i file di configurazione richiesti (es. `.cursor/skills/intlayer_next_js/SKILL.md`, `.windsurf/skills/intlayer_next_js/SKILL.md`, `.opencode/skills/intlayer_next_js/SKILL.md`, `.vscode/mcp.json`, ecc.).

## Piattaforme Supportate

Intlayer fornisce documentazione specifica per il framework (Configurazione, Utilizzo, Metadati, Sitemap, Azioni del server, ecc.) per aiutare l'agente AI a capire come lavorare con Intlayer nel tuo progetto specifico. Queste abilità sono progettate per guidare l'agente attraverso le complessità dell'internazionalizzazione, assicurando che segua i modelli e le migliori pratiche corrette.

Intlayer supporta l'integrazione con le seguenti piattaforme:

### 1. Cursor

Cursor supporta i server MCP (Model Context Protocol) e le abilità personalizzate. L'esecuzione di `intlayer init skills`:

- Creerà un file `.cursor/mcp.json` per comunicare con il server MCP di Intlayer.
- Installerà le abilità specifiche del framework nella directory `.cursor/skills`.

### 2. Windsurf

Windsurf è un IDE potenziato dall'IA. L'esecuzione di `intlayer init skills` installerà le abilità specifiche del framework nella directory `.windsurf/skills`.

### 3. VS Code

Per gli utenti di VS Code, in particolare quelli che utilizzano GitHub Copilot o altre estensioni compatibili con MCP, il comando:

- Crea una configurazione `.vscode/mcp.json`.
- Installa le abilità specifiche del framework nella directory `skills/` alla radice del tuo progetto.

### 4. OpenCode

OpenCode è un agente CLI interattivo progettato per compiti di ingegneria del software. Intlayer fornisce abilità specifiche per aiutare OpenCode ad assisterti nei tuoi compiti di internazionalizzazione. Queste sono installate nella directory `.opencode/skills`.

### 5. Claude Code

Claude Code può essere configurato per utilizzare le abilità di Intlayer. Il comando installa le abilità specifiche del framework nella directory `.claude/skills`.

### 6. GitHub Copilot Workspace

GitHub Copilot Workspace ti consente di definire abilità personalizzate. Il comando installa le abilità specifiche del framework nella directory `.github/skills`.
