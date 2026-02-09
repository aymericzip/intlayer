---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: Abilità dell'Agente
description: Scopri come utilizzare le Intlayer Agent Skills per migliorare la comprensione del tuo progetto da parte del tuo agente AI.
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
  - version: 8.0.4
    date: 2026-02-09
    changes: Inizializza cronologia
---

## Il comando `intlayer init skills`

Il comando `intlayer init skills` è il modo più semplice per configurare le abilità dell'agente nel tuo progetto. Rileva il tuo ambiente e installa i file di configurazione necessari per le tue piattaforme preferite.

```bash
npx intlayer init skills
```

Quando esegui questo comando, esso:

1.  Rileverà il framework che stai utilizzando (es. Next.js, React, Vite).
2.  Ti chiederà per quali piattaforme desideri installare le abilità (Cursor, VS Code, OpenCode, Claude Code, ecc.).
3.  Genererà i file di configurazione richiesti (come `.cursor/mcp.json`, `.vscode/mcp.json` o `.intlayer/skills/*.md`).

## Piattaforme Supportate

Intlayer supporta l'integrazione con le seguenti piattaforme:

### 1. Cursor

Cursor supporta i server MCP (Model Context Protocol). L'esecuzione di `intlayer init skills` creerà un file `.cursor/mcp.json` che consente a Cursor di comunicare con il server MCP di Intlayer.

### 2. VS Code

Per gli utenti di VS Code, in particolare quelli che utilizzano GitHub Copilot o altre estensioni compatibili con MCP, il comando crea una configurazione `.vscode/mcp.json`.

### 3. OpenCode

OpenCode è un agente CLI interattivo progettato per compiti di ingegneria del software. Intlayer fornisce abilità specifiche per aiutare OpenCode ad assisterti nei compiti di internazionalizzazione.

### 4. Claude Code

Claude Code può essere configurato per utilizzare le abilità di Intlayer aggiungendo le configurazioni generate alle sue impostazioni desktop o CLI.
