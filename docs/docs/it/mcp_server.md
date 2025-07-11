---
createdAt: 2025-06-07
updatedAt: 2025-07-10
title: Documentazione MCP Server
description: Esplora le funzionalità e la configurazione del MCP Server per ottimizzare la gestione e le operazioni del tuo server.
keywords:
  - MCP Server
  - Gestione Server
  - Ottimizzazione
  - Intlayer
  - Documentazione
  - Configurazione
  - Funzionalità
slugs:
  - doc
  - mcp-server
---

# Intlayer MCP Server

Il **Intlayer MCP (Model Context Protocol) Server** fornisce assistenza IDE potenziata dall'IA, personalizzata per l'ecosistema Intlayer.

## Dove posso usarlo?

- Su ambienti di sviluppo moderni come **Cursor**, **VS Code** e qualsiasi IDE che supporti il protocollo MCP.
- Sul tuo assistente AI preferito come **Claude Desktop**, **Gemini**, **ChatGPT**, ecc.

## Perché usare l'Intlayer MCP Server?

Abilitando l'Intlayer MCP Server nel tuo IDE, sblocchi:

- **Documentazione Contestuale**
  Il server MCP carica ed espone la documentazione di Intlayer. Per velocizzare la tua configurazione, le tue migrazioni, ecc.
  Questo garantisce che i suggerimenti di codice, le opzioni dei comandi e le spiegazioni siano sempre aggiornati e pertinenti.

- **Integrazione Intelligente della CLI**
  Accedi ed esegui i comandi CLI di Intlayer direttamente dall'interfaccia del tuo IDE. Usando il server MCP, puoi permettere al tuo assistente AI di eseguire comandi come `intlayer dictionaries build` per aggiornare i tuoi dizionari, o `intlayer dictionaries fill` per completare le traduzioni mancanti.

  > Visualizza l'elenco completo dei comandi e delle opzioni nella [documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

---

## Configurazione in Cursor

Segui la [documentazione ufficiale](https://docs.cursor.com/context/mcp) per configurare il server MCP in Cursor.

Nella root del tuo progetto, aggiungi il seguente file di configurazione `.cursor/mcp.json`:

### Server locale (stdio) (consigliato)

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Server remoto (SSE)

Per connetterti a un server Intlayer MCP remoto utilizzando Server-Sent Events (SSE), puoi configurare il tuo client MCP per connettersi al servizio ospitato.

> **Nota:** Il server remoto non integra gli strumenti CLI. Il server distante è solo per documentazione e contesto.

> **Nota:** A causa dei costi di hosting del server, la disponibilità del server remoto non può essere garantita. Si consiglia di utilizzare il metodo di trasporto del server locale (stdio) per un'esperienza più affidabile.

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

Questo indica al tuo IDE di avviare il server Intlayer MCP utilizzando `npx`, assicurandosi che venga sempre utilizzata la versione più recente disponibile a meno che non venga bloccata.

---

## Configurazione in VS Code

Segui la [documentazione ufficiale](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) per configurare il server MCP in VS Code.

Per utilizzare il server Intlayer MCP con VS Code, è necessario configurarlo nelle impostazioni del workspace o dell'utente.

### Server locale (stdio) (consigliato)

Crea un file `.vscode/mcp.json` nella radice del tuo progetto:

```json filename=".vscode/mcp.json"
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

### Server remoto (SSE)

Per connettersi a un server Intlayer MCP remoto utilizzando Server-Sent Events (SSE), puoi configurare il tuo client MCP per connettersi al servizio ospitato.

> **Nota:** Il server remoto non integra strumenti CLI. Il server distante è solo per documentazione e contesto.

> **Nota:** A causa dei costi di hosting del server, la disponibilità del server remoto non può essere garantita. Si consiglia di utilizzare il metodo di trasporto del server locale (stdio) per un'esperienza più affidabile.

```json filename=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## Configurazione in ChatGPT

### Server remoto (SSE)

Segui la [documentazione ufficiale](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) per configurare il server MCP in ChatGPT.

1 - Vai alla [dashboard dei prompt](https://platform.openai.com/prompts)  
2 - Clicca su "+ Create"  
3 - Clicca su "Tools (Create or +)"  
4 - Seleziona "MCP Server"  
5 - Clicca su "Add new"  
6 - Compila i seguenti campi:

- URL: https://mcp.intlayer.org
- Label: Intlayer MCP Server
- Name: intlayer-mcp-server
- Authentication: None

7 - Clicca su "Save"

> **Nota:** Il server remoto non integra strumenti CLI. Il server distante è solo per documentazione e contesto.

> **Nota:** A causa dei costi di hosting del server, la disponibilità del server remoto non può essere garantita. Si consiglia di utilizzare il metodo di trasporto del server locale (stdio) per un'esperienza più affidabile.

---

## Configurazione in Claude Desktop

Segui la [documentazione ufficiale](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) per configurare il server MCP in Claude Desktop.

Percorso del file di configurazione:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Server locale (stdio) (consigliato)

```json filename="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

---

## Utilizzo del server MCP tramite CLI

Puoi anche eseguire il server MCP di Intlayer direttamente dalla riga di comando per test, debug o integrazione con altri strumenti.

```bash
# Installa globalmente
npm install -g @intlayer/mcp

# Oppure usa direttamente con npx (consigliato)
npx @intlayer/mcp
```

---

## Cronologia della documentazione

| Versione | Data       | Modifiche                                 |
| -------- | ---------- | ----------------------------------------- |
| 5.5.12   | 2025-07-11 | Aggiunta configurazione di ChatGPT        |
| 5.5.12   | 2025-07-10 | Aggiunta configurazione di Claude Desktop |
| 5.5.12   | 2025-07-10 | Aggiunto trasporto SSE e server remoto    |
| 5.5.10   | 2025-06-29 | Inizializzazione della cronologia         |
