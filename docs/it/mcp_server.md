# Server MCP di Intlayer

Il **Server MCP (Model Context Protocol) di Intlayer** fornisce assistenza IDE potenziata dall'AI, progettata per l'ecosistema [Intlayer](https://github.com/aymericzip/intlayer). Progettato per ambienti di sviluppo moderni come **Cursor**, **GitHub Copilot workspace** e qualsiasi IDE che supporti il protocollo MCP, questo server offre supporto contestuale e in tempo reale basato sulla configurazione del tuo progetto.

## Perché utilizzare il Server MCP di Intlayer?

Abilitando il Server MCP di Intlayer nel tuo IDE, sbloccherai:

- **Integrazione CLI Intelligente**  
  Accedi ed esegui i comandi CLI di Intlayer direttamente dall'interfaccia del tuo IDE. Visualizza l'elenco completo dei comandi e delle opzioni nella [documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md).

- **Documentazione Contestuale**  
  Il server MCP carica ed espone la documentazione corrispondente alla versione di Intlayer che stai utilizzando nel tuo progetto. Questo garantisce che i suggerimenti di codice, le opzioni dei comandi e le spiegazioni siano sempre aggiornati e pertinenti.

- **Sviluppo Assistito dall'AI**  
  Con suggerimenti e completamenti automatici consapevoli del progetto, l'assistente AI può spiegare il tuo codice, raccomandare l'uso della CLI o suggerire come utilizzare funzionalità specifiche di Intlayer in base ai tuoi file attuali.

- **Configurazione Leggera e Istantanea**  
  Nessuna manutenzione del server o installazioni pesanti richieste. Basta configurare il tuo file `.cursor/mcp.json` o un equivalente di configurazione MCP e sei pronto.

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

Questo indica al tuo IDE di avviare il server MCP di Intlayer utilizzando `npx`, assicurandosi che utilizzi sempre la versione più recente disponibile, a meno che non venga bloccata.

---

## Configurazione di VS Code

Per utilizzare il Server MCP di Intlayer con VS Code, è necessario configurarlo nelle impostazioni del tuo workspace o utente.

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

### Utilizzo del Server MCP in VS Code

1. **Abilita la Modalità Agente**: Apri la vista Chat (⌃⌘I su Mac, Ctrl+Alt+I su Windows/Linux) e seleziona la modalità **Agente** dal menu a tendina.

2. **Accedi agli Strumenti**: Clicca sul pulsante **Strumenti** per visualizzare gli strumenti disponibili di Intlayer. Puoi selezionare/deselezionare strumenti specifici secondo necessità.

3. **Riferimento Diretto agli Strumenti**: Fai riferimento agli strumenti direttamente nei tuoi prompt digitando `#` seguito dal nome dello strumento.

4. **Conferma degli Strumenti**: Per impostazione predefinita, VS Code chiederà conferma prima di eseguire gli strumenti. Usa le opzioni del pulsante **Continua** per confermare automaticamente gli strumenti per la sessione corrente, il workspace o tutte le invocazioni future.

### Gestione del Server

- Esegui **MCP: List Servers** dal Command Palette per visualizzare i server configurati
- Avvia, arresta o riavvia il server MCP di Intlayer secondo necessità
- Visualizza i log del server per la risoluzione dei problemi selezionando il server e scegliendo **Show Output**

Per informazioni più dettagliate sull'integrazione MCP di VS Code, consulta la [documentazione ufficiale MCP di VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

---

## Utilizzo del Server MCP tramite CLI

Puoi anche eseguire il server MCP di Intlayer direttamente dalla riga di comando per test, debug o integrazione con altri strumenti.

### Installa il Server MCP

Per prima cosa, installa il pacchetto del server MCP globalmente o utilizzalo tramite npx:

```bash
# Installa globalmente
npm install -g @intlayer/mcp

# Oppure usalo direttamente con npx (consigliato)
npx @intlayer/mcp
```

### Avvia il Server

Per avviare il server MCP con l'inspector per il debug e i test:

```bash
# Utilizzando il comando start integrato
npm run start

# Oppure direttamente con npx
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

Questo avvierà il server MCP con un'interfaccia inspector che ti consente di:

- Testare le comunicazioni del protocollo MCP
- Effettuare il debug delle risposte del server
- Validare implementazioni di strumenti e risorse
- Monitorare le prestazioni del server

### Utilizzo per lo Sviluppo

Per scopi di sviluppo e test, puoi eseguire il server in varie modalità:

```bash
# Compila e avvia in modalità sviluppo
npm run dev

# Esegui con configurazione personalizzata
node dist/cjs/index.cjs

# Testa la funzionalità del server
npm test
```

Il server esporrà strumenti e risorse specifici di Intlayer che possono essere utilizzati da qualsiasi client compatibile con MCP, non solo Cursor o altri IDE.

---

## Panoramica delle Funzionalità

| Funzionalità              | Descrizione                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| Supporto CLI              | Esegui comandi `intlayer`, ottieni suggerimenti di utilizzo e argomenti in linea                       |
| Documentazione Versionata | Rileva automaticamente e carica la documentazione corrispondente alla tua versione attuale di Intlayer |
| Autocompletamento         | Suggerimenti intelligenti per comandi e configurazioni mentre digiti                                   |
| Compatibilità Plugin      | Compatibile con IDE e strumenti che supportano lo standard MCP                                         |

---

## Link Utili

- [Documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md)
- [Repository GitHub di Intlayer](https://github.com/aymericzip/intlayer)

---
