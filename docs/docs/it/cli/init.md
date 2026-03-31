---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Inizializza Intlayer
description: Scopri come inizializzare Intlayer nel tuo progetto.
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Aggiunta opzione --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Aggiunto comando init"
---

# Inizializza Intlayer

```bash
npx intlayer init
```

Il comando `init` configura automaticamente Intlayer nel tuo progetto impostando i file e le impostazioni necessari. È il modo consigliato per iniziare con Intlayer.

## Alias:

- `npx intlayer init`

## Argomenti:

- `--project-root [projectRoot]` - Opzionale. Specifica la directory principale del progetto. Se non fornita, il comando cercherà la radice del progetto a partire dalla directory di lavoro corrente.
- `--no-gitignore` - Opzionale. Salta l'aggiornamento automatico del file `.gitignore`. Se questo flag è impostato, `.intlayer` non verrà aggiunto a `.gitignore`.

## Cosa fa:

Il comando `init` esegue le seguenti attività di configurazione:

1. **Valida la struttura del progetto** - Si assicura che tu sia in una directory di progetto valida con un file `package.json`.
2. **Aggiorna `.gitignore`** - Aggiunge `.intlayer` al tuo file `.gitignore` per escludere i file generati dal controllo di versione (può essere saltato con `--no-gitignore`).
3. **Configura TypeScript** - Aggiorna tutti i file `tsconfig.json` per includere le definizioni dei tipi Intlayer (`.intlayer/**/*.ts`).
4. **Crea il file di configurazione** - Genera un `intlayer.config.ts` (per progetti TypeScript) o `intlayer.config.mjs` (per progetti JavaScript) con le impostazioni predefinite.
5. **Aggiorna la config di Vite** - Se viene rilevato un file di configurazione di Vite, aggiunge l'importazione del plugin `vite-intlayer`.
6. **Aggiorna la config di Next.js** - Se viene rilevato un file di configurazione di Next.js, aggiunge l'importazione del plugin `next-intlayer`.

## Esempi:

### Inizializzazione di base:

```bash
npx intlayer init
```

Questo inizializzerà Intlayer nella directory corrente, rilevando automaticamente la radice del progetto.

### Inizializzazione con radice del progetto personalizzata:

```bash
npx intlayer init --project-root ./mio-progetto
```

Questo inizializzerà Intlayer nella directory specificata.

### Inizializzazione senza aggiornare .gitignore:

```bash
npx intlayer init --no-gitignore
```

Questo configurerà tutti i file di configurazione ma non modificherà il tuo `.gitignore`.

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
