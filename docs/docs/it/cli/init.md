---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: configurare Intlayer nel progetto"
description: "Esegui intlayer init per aggiungere Intlayer a un progetto esistente: rileva il framework, installa i pacchetti e scrive la configurazione."
keywords:
  - Inizializza
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init installa solo i pacchetti e configura il framework; aggiunto un sottocomando per ogni passaggio; --interactive fallisce senza terminale"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Aggiunta del sottocomando init infra"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Aggiunta opzione --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Aggiunto comando init"
author: aymericzip
---

# Inizializza Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Il comando `init` installa i pacchetti Intlayer e configura il tuo framework (file di configurazione, TypeScript, plugin del bundler, middleware/proxy, provider). È il modo consigliato per iniziare con Intlayer.

Tutto il resto (workflow di CI, skill IA, server MCP, strumenti dell'editor, regole di lint, CMS, infrastruttura) è facoltativo: sceglilo dalla checklist di `--interactive` oppure esegui il relativo sottocomando (vedi sotto).

## Alias:

- `npx intlayer init`

## Argomenti:

- `--project-root [projectRoot]` - Opzionale. Specifica la directory principale del progetto. Se non fornita, il comando cercherà la radice del progetto a partire dalla directory di lavoro corrente.
- `--no-gitignore` - Opzionale. Salta l'aggiornamento automatico del file `.gitignore`. Se questo flag è impostato, `.intlayer` non verrà aggiunto a `.gitignore`.
- `--no-framework-setup` - Opzionale. Installa solo i pacchetti, senza modificare i file del progetto.
- `--routing <routing>` - Opzionale. Routing delle lingue: `prefix-no-default` (predefinito), `prefix-all`, `no-prefix`, `search-params` o `none`.
- `-i, --interactive` - Opzionale. Scegli i passaggi da una checklist (pacchetti, CI, skill, MCP, VS Code, LSP, lint, CMS, infrastruttura, …) invece dell'insieme predefinito. Richiede un terminale: senza (agente IA, CI), il comando fallisce ed elenca i sottocomandi da eseguire al suo posto.
- `--no-github-actions` - Opzionale. Con `--interactive`, non crea mai i workflow di GitHub Actions, anche se selezionati.

## Cosa fa:

Il comando `init` esegue le seguenti attività di configurazione:

1. **Valida la struttura del progetto** - Si assicura che tu sia in una directory di progetto valida con un file `package.json`.
2. **Installa i pacchetti** - Installa i pacchetti Intlayer mancanti per il tuo stack (ad es. `react-intlayer`, `vite-intlayer`) e aggiorna quelli obsoleti.
3. **Aggiorna `.gitignore`** - Aggiunge `.intlayer` al tuo file `.gitignore` per escludere i file generati dal controllo di versione (può essere saltato con `--no-gitignore`).
4. **Configura TypeScript** - Aggiorna tutti i file `tsconfig.json` per includere le definizioni dei tipi Intlayer (`.intlayer/**/*.ts`).
5. **Crea il file di configurazione** - Genera un `intlayer.config.ts` (per progetti TypeScript) o `intlayer.config.mjs` (per progetti JavaScript) con le impostazioni predefinite.
6. **Aggiorna la configurazione del bundler / framework** - Aggiunge il plugin Intlayer alla configurazione di Vite, Next.js, Nuxt, Astro, …, e crea middleware/proxy e provider quando il framework lo supporta.

## Configurare un passaggio alla volta

Ogni passaggio della checklist di `--interactive` ha il suo sottocomando. Non fanno domande quando i valori vengono passati come flag, quindi puoi eseguirli da un agente IA o da un job di CI.

| Comando                                                               | Cosa configura                                                                                    |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | Installa i pacchetti Intlayer mancanti e aggiorna quelli obsoleti                                 |
| `intlayer init project [--routing <routing>]`                         | File di configurazione, TypeScript, plugin del bundler, middleware/proxy, provider e `.gitignore` |
| `intlayer init github-actions`                                        | I workflow di GitHub Actions `fill` e `test`                                                      |
| `intlayer init vscode-extension`                                      | Consiglia l'estensione Intlayer in `.vscode/extensions.json`                                      |
| `intlayer init lsp`                                                   | Il language server di Intlayer in `.vscode/settings.json`                                         |
| `intlayer init eslint`                                                | Le regole di lint di Intlayer (ESLint / oxlint), se il progetto usa già un linter                 |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | La documentazione di Intlayer come skill per agenti IA                                            |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | Il server MCP di Intlayer                                                                         |
| `intlayer init extension [--browser <chrome/firefox>]`                | Apre la pagina dello store dell'estensione browser di Intlayer                                    |
| `intlayer init cms`                                                   | Accede al CMS Intlayer tramite il browser e salva le credenziali in `.env`                        |
| `intlayer init infra --mode <desktop/docker/compose>`                 | L'app desktop o uno stack self-hosted                                                             |

### Da un agente IA o da un job di CI

La shell di un agente IA non ha un terminale, quindi una domanda non può ricevere risposta. Usa il comando predefinito, poi i sottocomandi di cui hai bisogno:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Senza terminale:

- `init skills` installa le skill adatte al tuo stack, a meno che non sia impostato `--skills` (ad es. `--skills Usage Content React`).
- `init skills` e `init mcp` usano la piattaforma IA rilevata (Claude Code, Cursor, VS Code, Windsurf, …), a meno che non sia impostato `--platform`, e falliscono con l'elenco delle piattaforme se non ne viene rilevata nessuna.
- `init mcp` usa il trasporto `stdio`, a meno che non sia impostato `--transport`.
- `init infra` richiede `--mode`, e `init extension` mostra solo i link dello store, a meno che non sia impostato `--browser`.

Il server MCP viene sempre configurato all'interno del progetto (per Claude Code, in `.mcp.json`).

## Esempi:

### Inizializzazione di base:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Questo inizializzerà Intlayer nella directory corrente, rilevando automaticamente la radice del progetto.

### Inizializzazione con radice del progetto personalizzata:

```bash packageManager="npm"
npx intlayer init --project-root ./mio-progetto
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./mio-progetto
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./mio-progetto
```

```bash packageManager="bun"
bun x intlayer init --project-root ./mio-progetto
```

Questo inizializzerà Intlayer nella directory specificata.

### Inizializzazione senza aggiornare .gitignore:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

Questo configurerà tutti i file di configurazione ma non modificherà il tuo `.gitignore`.

### Configura l'infrastruttura (applicazione desktop o auto-hosting):

```bash
npx intlayer init infra
```

Scarica ed esegue il programma di installazione ospitato (`https://intlayer.org/install.sh`, o `install.ps1` su Windows), che chiede come desideri eseguire Intlayer:

- **Applicazione desktop** - installa la dashboard nativa sul tuo computer, connessa a Intlayer Cloud.
- **Docker all-in-one** - dashboard + API + MongoDB + Redis + MinIO in un unico contenitore.
- **Docker Compose** - un contenitore per servizio, per un auto-hosting scalabile.

Salta il menu con `--mode`:

```bash
npx intlayer init infra --mode compose
```

Lo stesso passaggio è offerto da `npx intlayer init --interactive`. Consulta il [riferimento `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/infra.md) per le impostazioni del programma di installazione e la [guida all'auto-hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md) per informazioni sulla configurazione di ciascuna modalità.

- [riferimento `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/infra.md)
- [guida all'auto-hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md)

## Esempio di output:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Note:

- Il comando è idempotente: puoi eseguirlo più volte in sicurezza. Salterà i passaggi già configurati.
- Se esiste già un file di configurazione, non verrà sovrascritto.
- I file di configurazione TypeScript senza un array `include` (ad esempio, configurazioni in stile soluzione con riferimenti) vengono saltati.
- Il comando terminerà con un errore se non viene trovato alcun `package.json` nella radice del progetto.
