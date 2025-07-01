---
createdAt: 2025-06-07
updatedAt: 2025-06-07
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

Il **Server Intlayer MCP (Model Context Protocol)** fornisce assistenza IDE potenziata dall'IA, progettata specificamente per l'ecosistema Intlayer. Ideato per ambienti di sviluppo moderni come **Cursor**, **GitHub Copilot workspace** e qualsiasi IDE che supporti il protocollo MCP, questo server ti offre supporto contestuale e in tempo reale basato sulla configurazione del tuo progetto.

## Perché usare il Server Intlayer MCP?

Abilitando il Server Intlayer MCP nel tuo IDE, potrai usufruire di:

- **Integrazione intelligente della CLI**
  Accedi ed esegui i comandi della CLI Intlayer direttamente dall'interfaccia del tuo IDE. Visualizza l'elenco completo dei comandi e delle opzioni nella [documentazione della CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

- **Documentazione contestuale**
  Il server MCP carica ed espone la documentazione corrispondente alla versione di Intlayer che stai utilizzando nel tuo progetto. Questo garantisce che i suggerimenti di codice, le opzioni dei comandi e le spiegazioni siano sempre aggiornati e pertinenti.

- **Sviluppo assistito dall'IA**
  Con suggerimenti e completamento automatico consapevoli del progetto, l'assistente IA può spiegare il tuo codice, consigliare l'uso della CLI o suggerire come utilizzare funzionalità specifiche di Intlayer basandosi sui file attuali.

- **Leggero e configurazione istantanea**
  Nessuna manutenzione del server o installazione pesante richiesta. Basta configurare il file `.cursor/mcp.json` o un equivalente file di configurazione MCP e sei pronto per partire.

---

## Configurazione di Cursor

Nella radice del tuo progetto, aggiungi il seguente file di configurazione `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

Questo indica al tuo IDE di avviare il server MCP di Intlayer utilizzando `npx`, assicurandosi che venga sempre usata la versione più recente disponibile a meno che tu non la blocchi.

---

## Configurare VS Code

Per utilizzare il server MCP di Intlayer con VS Code, devi configurarlo nelle impostazioni del workspace o dell'utente.

### Configurazione del Workspace

Crea un file `.vscode/mcp.json` nella radice del tuo progetto:

```json
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

### Utilizzo del server MCP in VS Code

1. **Abilita la modalità Agent**: Apri la vista Chat (⌃⌘I su Mac, Ctrl+Alt+I su Windows/Linux) e seleziona la modalità **Agent** dal menu a tendina.

2. **Accedi agli Strumenti**: Clicca sul pulsante **Strumenti** per visualizzare gli strumenti Intlayer disponibili. Puoi selezionare/deselezionare strumenti specifici secondo necessità.

3. **Riferimento Diretto agli Strumenti**: Fai riferimento agli strumenti direttamente nei tuoi prompt digitando `#` seguito dal nome dello strumento.

4. **Conferma degli Strumenti**: Per impostazione predefinita, VS Code chiederà conferma prima di eseguire gli strumenti. Usa le opzioni del pulsante **Continua** per confermare automaticamente gli strumenti per la sessione corrente, il workspace o tutte le invocazioni future.

### Gestione del Server

- Esegui **MCP: Elenca Server** dalla Command Palette per visualizzare i server configurati
- Avvia, ferma o riavvia il server MCP di Intlayer secondo necessità
- Visualizza i log del server per la risoluzione dei problemi selezionando il server e scegliendo **Mostra Output**

Per maggiori informazioni sull'integrazione MCP in VS Code, consulta la [documentazione ufficiale MCP di VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

---

## Utilizzo del Server MCP tramite CLI

Puoi anche eseguire il server MCP di Intlayer direttamente dalla riga di comando per test, debug o integrazione con altri strumenti.

### Installare il Server MCP

Per prima cosa, installa il pacchetto del server MCP globalmente oppure usalo tramite npx:

```bash
# Installa globalmente
npm install -g @intlayer/mcp

# Oppure usa direttamente con npx (consigliato)
npx @intlayer/mcp
```

### Avviare il Server

Per avviare il server MCP con l'inspector per il debug e i test:

```bash
# Usando il comando start integrato
npm run start

# Oppure direttamente con npx
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

Questo avvierà il server MCP con un'interfaccia inspector che ti permette di:

- Testare le comunicazioni del protocollo MCP
- Eseguire il debug delle risposte del server
- Validare le implementazioni di strumenti e risorse
- Monitorare le prestazioni del server

### Uso per lo Sviluppo

Per scopi di sviluppo e test, puoi eseguire il server in diverse modalità:

```bash
# Compila e avvia in modalità sviluppo
npm run dev

# Esegui con configurazione personalizzata
node dist/cjs/index.cjs

# Testa la funzionalità del server
npm test
```

Il server esporrà strumenti e risorse specifici di Intlayer che possono essere utilizzati da qualsiasi client compatibile con MCP, non solo da Cursor o altri IDE.

---

## Panoramica delle Funzionalità

| Feature                   | Description                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| Supporto CLI              | Esegui comandi `intlayer`, ottieni suggerimenti sull'uso e argomenti inline                             |
| Documentazione Versionata | Rileva automaticamente e carica la documentazione corrispondente alla tua versione corrente di Intlayer |
| Completamento Automatico  | Suggerimenti intelligenti per comandi e configurazioni mentre digiti                                    |
| Pronto per Plugin         | Compatibile con IDE e strumenti che supportano lo standard MCP                                          |

---

## Link Utili

- [Documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md)
- [Repository GitHub di Intlayer](https://github.com/aymericzip/intlayer)

---

## Cronologia Documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
