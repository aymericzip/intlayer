---
createdAt: 2025-06-07
updatedAt: 2026-03-03
title: Documentazione del Server MCP
description: Esplora le funzionalità e la configurazione del Server MCP per ottimizzare la gestione e le operazioni del tuo server.
keywords:
  - Server MCP
  - Gestione Server
  - Ottimizzazione
  - Intlayer
  - Documentazione
  - Configurazione
  - Funzionalità
slugs:
  - doc
  - mcp-server
history:
  - version: 5.5.12
    date: 2025-07-11
    changes: "Aggiunta configurazione di ChatGPT"
  - version: 5.5.12
    date: 2025-07-10
    changes: "Aggiunta configurazione di Claude Desktop"
  - version: 5.5.12
    date: 2025-07-10
    changes: "Aggiunto trasporto Streamable HTTP e server remoto"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizializzazione della cronologia"
author: aymericzip
---

# Server MCP di Intlayer

Il **Server MCP (Model Context Protocol) di Intlayer** fornisce assistenza IDE potenziata dall'IA, su misura per l'ecosistema Intlayer.

## Dove posso usarlo?

- Su ambienti di sviluppo moderni come **Cursor**, **VS Code** e qualsiasi IDE che supporti il protocollo MCP.
- Sul tuo assistente AI preferito come **Claude Desktop**, **Gemini**, **ChatGPT**, ecc.

## Perché usare il Server MCP di Intlayer?

Abilitando il Server MCP di Intlayer nel tuo IDE, sblocchi:

- **Documentazione Contestuale**
  Il server MCP carica ed espone la documentazione di Intlayer. Per velocizzare la tua configurazione, le tue migrazioni, ecc.
  Questo garantisce che i suggerimenti di codice, le opzioni dei comandi e le spiegazioni siano sempre aggiornati e pertinenti.

- **Integrazione Intelligente della CLI**
  Accedi ed esegui i comandi CLI di Intlayer direttamente dall'interfaccia del tuo IDE. Utilizzando il server MCP, puoi permettere al tuo assistente AI di eseguire comandi come `intlayer dictionaries build` per aggiornare i tuoi dizionari, o `intlayer dictionaries fill` per completare le traduzioni mancanti.

  > Visualizza l'elenco completo dei comandi e delle opzioni nella [documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

## Server locale (stdio) vs Server remoto (Streamable HTTP)

Il server MCP può essere utilizzato in due modi:

- Server locale (stdio)
- Server remoto (Streamable HTTP)

### Server locale (stdio) (consigliato)

Intlayer fornisce un pacchetto NPM che può essere installato localmente sulla tua macchina. Può essere installato nel tuo IDE preferito, come VS Code, Cursor, così come nella tua applicazione assistente locale, come ChatGPT, Claude Desktop, ecc.

Questo server è il modo consigliato per utilizzare il server MCP, in quanto integra tutte le funzionalità del server MCP, inclusi gli strumenti CLI.

### Server remoto (Streamable HTTP)

Il server MCP può essere utilizzato anche da remoto, utilizzando il metodo di trasporto SSE. Questo server è ospitato da Intlayer ed è disponibile all'indirizzo https://mcp.intlayer.org. Questo server è accessibile pubblicamente, senza alcuna autenticazione, ed è gratuito.

Nota che il server remoto non integra strumenti CLI, completamento automatico AI, ecc. Il server remoto è solo per l'interazione con la documentazione per aiutare il tuo assistente AI con l'ecosistema Intlayer.

> A causa dei costi di hosting del server, la disponibilità del server remoto non può essere garantita. Limitiamo il numero di connessioni simultanee. Raccomandiamo di utilizzare il metodo di trasporto del server locale (stdio) per un'esperienza più affidabile.

---

## Configurazione tramite la CLI di Intlayer (consigliata)

Intlayer fornisce un comando CLI per configurare automaticamente il server MCP nel tuo progetto.

```bash packageManager="npm"
npx intlayer init mcp
```

```bash packageManager="yarn"
yarn intlayer init mcp
```

```bash packageManager="pnpm"
pnpm intlayer init mcp
```

```bash packageManager="bun"
bun x intlayer init mcp
```

Questo comando permetterà di:

1. Chiederti quale piattaforma stai utilizzando (Cursor, VS Code, Claude Desktop, ecc.).
2. Chiederti quale metodo di trasporto vuoi utilizzare (Server locale (stdio) o Server remoto (Streamable HTTP)).
3. Aggiornare automaticamente il tuo file di configurazione (ad esempio, `.cursor/mcp.json`, `.vscode/mcp.json` o la configurazione globale di Claude Desktop).

---

## Setup via Intlayer VS Code extension

1. Apri la tavolozza dei comandi (Ctrl+Shift+P o Cmd+Shift+P).
2. Digita `Intlayer: Setup AI Agent Skills`
3. Scegli la piattaforma che utilizzi (es. `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace`, ecc.).
4. Scegli l'MCP da installare (stdio, Streamable HTTP)
5. Premi Invio.

---

## Configurazione in Cursor

Segui la [documentazione ufficiale](https://docs.cursor.com/context/mcp) per configurare il server MCP in Cursor.

Nella radice del tuo progetto, aggiungi il seguente file di configurazione `.cursor/mcp.json`:

### Server locale (stdio) (consigliato)

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Server remoto (Streamable HTTP)

Per connettersi a un server MCP Intlayer remoto utilizzando Server-Sent Events (Streamable HTTP), puoi configurare il tuo client MCP per connettersi al servizio ospitato.

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer-sse": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://mcp.intlayer.org"]
    }
  }
}
```

Questo indica al tuo IDE di avviare il server MCP Intlayer usando `npx`, assicurandosi che utilizzi sempre l'ultima versione disponibile a meno che non venga bloccata.

---

## Configurazione in VS Code

Segui la [documentazione ufficiale](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) per configurare il server MCP in VS Code.

Per utilizzare il server MCP Intlayer con VS Code, devi configurarlo nelle impostazioni del tuo workspace o utente.

### Server locale (stdio) (consigliato)

Crea un file `.vscode/mcp.json` nella radice del tuo progetto:

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Server remoto (Streamable HTTP)

Per connettersi a un server MCP Intlayer remoto utilizzando Server-Sent Events (Streamable HTTP), puoi configurare il tuo client MCP per connettersi al servizio ospitato.

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer-sse": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://mcp.intlayer.org"]
    }
  }
}
```

---

## Configurazione in ChatGPT

### Server remoto (Streamable HTTP)

Segui la [documentazione ufficiale](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) per configurare il server MCP in ChatGPT.

1. Vai al [promt dashboard](https://platform.openai.com/prompts)
2. Clicca su `+ Create`
3. Clicca su `Tools (Create or +)`
4. Seleziona `MCP Server`
5. Clicca su `Add new`
6. Compila i seguenti campi:
   - URL: `https://mcp.intlayer.org`
   - Label: `Intlayer MCP Server`
   - Name: `intlayer-mcp-server`
   - Authentication: `None`

7. Clicca su `Save`

---

## Configurazione in Claude Desktop

Segui la [documentazione ufficiale](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) per configurare il server MCP in Claude Desktop.

Percorso del file di configurazione:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Server locale (stdio) (consigliato)

```json fileName="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Server remoto (Streamable HTTP)

```json fileName="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer-sse": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://mcp.intlayer.org"]
    }
  }
}
```

---

## Configurazione in Claude Code (CLI)

Segui la [documentazione ufficiale](https://modelcontextprotocol.io/quickstart/user) per configurare il server MCP in Claude Code.

### Server locale (stdio) (consigliato)

Per connettere il server Intlayer MCP a Claude Code utilizzando stdio:

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

### Server remoto (Streamable HTTP)

Per connettere il server MCP di Intlayer a Claude Code utilizzando Streamable HTTP (SSE):

```bash
claude mcp add intlayer https://mcp.intlayer.org -t http
```

---

## Utilizzo del Server MCP tramite CLI

Puoi anche eseguire direttamente il server MCP di Intlayer dalla riga di comando per test, debug o integrazione con altri strumenti.

```bash
# Installa globalmente
npm install -g @intlayer/mcp

# Oppure usa direttamente con npx (consigliato)
npx @intlayer/mcp
```

---
