---
createdAt: 2025-06-07
updatedAt: 2025-07-11
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

  > Visualizza l'elenco completo dei comandi e delle opzioni nella [documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

## Server locale (stdio) vs Server remoto (SSE)

Il server MCP può essere utilizzato in due modi:

- Server locale (stdio)
- Server remoto (SSE)

### Server locale (stdio) (consigliato)

Intlayer fornisce un pacchetto NPM che può essere installato localmente sulla tua macchina. Può essere installato nel tuo IDE preferito, come VS Code, Cursor, così come nella tua applicazione assistente locale, come ChatGPT, Claude Desktop, ecc.

Questo server è il modo consigliato per utilizzare il server MCP, in quanto integra tutte le funzionalità del server MCP, inclusi gli strumenti CLI.

### Server remoto (SSE)

Il server MCP può essere utilizzato anche da remoto, utilizzando il metodo di trasporto SSE. Questo server è ospitato da Intlayer ed è disponibile all'indirizzo https://mcp.intlayer.org. Questo server è accessibile pubblicamente, senza alcuna autenticazione, ed è gratuito.

Nota che il server remoto non integra strumenti CLI, completamento automatico AI, ecc. Il server remoto è solo per l'interazione con la documentazione per aiutare il tuo assistente AI con l'ecosistema Intlayer.

> A causa dei costi di hosting del server, la disponibilità del server remoto non può essere garantita. Limitiamo il numero di connessioni simultanee. Raccomandiamo di utilizzare il metodo di trasporto del server locale (stdio) per un'esperienza più affidabile.

---

## Configurazione in Cursor

Segui la [documentazione ufficiale](https://docs.cursor.com/context/mcp) per configurare il server MCP in Cursor.

Nella radice del tuo progetto, aggiungi il seguente file di configurazione `.cursor/mcp.json`:

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

Per connettersi a un server MCP Intlayer remoto utilizzando Server-Sent Events (SSE), puoi configurare il tuo client MCP per connettersi al servizio ospitato.

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

Questo indica al tuo IDE di avviare il server MCP Intlayer usando `npx`, assicurandosi che utilizzi sempre l'ultima versione disponibile a meno che non venga bloccata.

---

## Configurazione in VS Code

Segui la [documentazione ufficiale](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) per configurare il server MCP in VS Code.

Per utilizzare il server MCP Intlayer con VS Code, devi configurarlo nelle impostazioni del tuo workspace o utente.

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

Per connettersi a un server MCP Intlayer remoto utilizzando Server-Sent Events (SSE), puoi configurare il tuo client MCP per connettersi al servizio ospitato.

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

1 - Vai al [cruscotto dei prompt](https://platform.openai.com/prompts)  
2 - Clicca su "+ Crea"  
3 - Clicca su "Strumenti (Crea o +)"  
4 - Seleziona "Server MCP"  
5 - Clicca su "Aggiungi nuovo"  
6 - Compila i seguenti campi:

- URL: https://mcp.intlayer.org
- Etichetta: Server MCP Intlayer
- Nome: intlayer-mcp-server
- Autenticazione: Nessuna

7 - Clicca su "Salva"

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

## Utilizzo del Server MCP tramite CLI

Puoi anche eseguire direttamente il server MCP di Intlayer dalla riga di comando per test, debug o integrazione con altri strumenti.

```bash
# Installa globalmente
npm install -g @intlayer/mcp

# Oppure usa direttamente con npx (consigliato)
npx @intlayer/mcp
```

---

## Cronologia del Documento

| Versione | Data       | Modifiche                                 |
| -------- | ---------- | ----------------------------------------- |
| 5.5.12   | 2025-07-11 | Aggiunta configurazione di ChatGPT        |
| 5.5.12   | 2025-07-10 | Aggiunta configurazione di Claude Desktop |
| 5.5.12   | 2025-07-10 | Aggiunto trasporto SSE e server remoto    |
| 5.5.10   | 2025-06-29 | Inizializzazione della cronologia         |
