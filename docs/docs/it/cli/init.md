---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Inizializzare Intlayer
description: Scopri come inizializzare Intlayer nel tuo progetto.
keywords:
  - Inizializzare
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Aggiunta del comando init
---

# Inizializzare Intlayer

```bash
npx intlayer init
```

Il comando `init` configura automaticamente Intlayer nel tuo progetto impostando i file e le configurazioni necessari. È il modo consigliato per iniziare con Intlayer.

## Alias:

- `npx intlayer init`

## Argomenti:

- `--project-root [projectRoot]` - Opzionale. Specifica la directory root del progetto. Se non fornito, il comando cercherà la root del progetto partendo dalla directory di lavoro corrente.

## Cosa fa:

Il comando `init` esegue le seguenti operazioni di configurazione:

1. **Valida la struttura del progetto** - Verifica che tu sia in una directory di progetto valida con un file `package.json`
2. **Aggiorna `.gitignore`** - Aggiunge `.intlayer` al tuo file `.gitignore` per escludere i file generati dal controllo versione
3. **Configura TypeScript** - Aggiorna tutti i file `tsconfig.json` per includere le definizioni di tipo di Intlayer (`.intlayer/**/*.ts`)
4. **Crea il file di configurazione** - Genera un `intlayer.config.ts` (per progetti TypeScript) o `intlayer.config.mjs` (per progetti JavaScript) con impostazioni predefinite
5. **Aggiorna la configurazione di Vite** - Se viene rilevato un file di configurazione Vite, aggiunge l'import del plugin `vite-intlayer`

Il comando `init` esegue le seguenti attività di configurazione:

1. **Valida la struttura del progetto** - Verifica che ti trovi in una directory di progetto valida contenente un file `package.json`
2. **Aggiorna `.gitignore`** - Aggiunge `.intlayer` al tuo file `.gitignore` per escludere i file generati dal controllo versione
3. **Configura TypeScript** - Aggiorna tutti i file `tsconfig.json` per includere le definizioni di tipo di Intlayer (`.intlayer/**/*.ts`)
4. **Crea il file di configurazione** - Genera un `intlayer.config.ts` (per progetti TypeScript) o `intlayer.config.mjs` (per progetti JavaScript) con impostazioni predefinite
5. **Aggiorna la configurazione di Vite** - Se viene rilevato un file di configurazione di Vite, aggiunge l'import del plugin `vite-intlayer`
6. **Aggiorna la configurazione di Next.js** - Se viene rilevato un file di configurazione di Next.js, aggiunge l'import del plugin `next-intlayer`

## Esempi:

### Inizializzazione base:

```bash
npx intlayer init
```

Questo inizializzerà Intlayer nella directory corrente, rilevando automaticamente la root del progetto.

### Inizializza con root di progetto personalizzata:

```bash
npx intlayer init --project-root ./my-project
```

Questo inizializzerà Intlayer nella directory specificata.

## Output di esempio:

```bash
npx intlayer init
Verifica della configurazione di Intlayer...
✓ Aggiunta di .intlayer a .gitignore
✓ Aggiornato tsconfig.json per includere i tipi di Intlayer
Creato intlayer.config.ts
✓ Import inserito in vite.config.ts
✓ Configurazione init di Intlayer completata.
```

## Note:

- Il comando è idempotente: puoi eseguirlo più volte in sicurezza. Salterà i passaggi già configurati.
- Se un file di configurazione esiste già, non verrà sovrascritto.
- I file di configurazione TypeScript senza un `include` array (ad es., configurazioni in stile solution con references) vengono ignorati.
- Il comando terminerà con un errore se non viene trovato alcun `package.json` nella root del progetto.

- Il comando è idempotente - puoi eseguirlo più volte in sicurezza. Salterà i passaggi già configurati.
- Se esiste già un file di configurazione, non verrà sovrascritto.
- I file di configurazione TypeScript senza un array `include` (ad es., config in stile solution con references) vengono saltati.
- Il comando terminerà con un errore se non viene trovato alcun `package.json` nella root del progetto.
