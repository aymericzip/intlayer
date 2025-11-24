---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Push Dizionari
description: Scopri come inviare i tuoi dizionari all'editor e CMS di Intlayer.
keywords:
  - Push
  - Dizionari
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# Push Dizionari

```bash
npx intlayer dictionary push
```

Se l'[editor di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) è installato, puoi anche inviare i dizionari all'editor. Questo comando permette di rendere i dizionari disponibili all'[editor](https://intlayer.org/dashboard). In questo modo, puoi condividere i tuoi dizionari con il tuo team e modificare i contenuti senza dover modificare il codice della tua applicazione.

## Alias:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## Argomenti:

**Opzioni del dizionario:**

- **`-d`, `--dictionaries`**: ID dei dizionari da inviare. Se non specificato, verranno inviati tutti i dizionari.

  > Esempio: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: ID dei dizionari da inviare (alias di --dictionaries).

  > Esempio: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Opzioni di configurazione:**

- **`--base-dir`**: Specifica la directory base del progetto. Per recuperare la configurazione di intlayer, il comando cercherà il file `intlayer.config.{ts,js,json,cjs,mjs}` nella directory base.

  > Esempio: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Disabilita la cache.

  > Esempio: `npx intlayer build --no-cache`

**Opzioni per le variabili d'ambiente:**

- **`--env`**: Specifica l'ambiente (es. `development`, `production`). Utile nel caso in cui si utilizzino variabili d'ambiente nel file di configurazione di intlayer.
- **`--env-file`**: Fornisce un file di ambiente personalizzato da cui caricare le variabili. Utile nel caso in cui si utilizzino variabili d'ambiente nel file di configurazione di intlayer.

  > Esempio: `npx intlayer dictionary push --env-file .env.production.local`

  > Esempio: `npx intlayer dictionary push --env production`

**Opzioni di output:**

- **`-r`, `--delete-locale-dictionary`**: Salta la domanda che chiede di eliminare le directory delle localizzazioni una volta che i dizionari sono stati inviati, e le rimuove. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.

  > Esempio: `npx intlayer dictionary push -r`

  > Esempio: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Salta la domanda che chiede di eliminare le directory delle localizzazioni una volta che i dizionari sono stati inviati, e le mantiene. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.

  > Esempio: `npx intlayer dictionary push -k`

  > Esempio: `npx intlayer dictionary push --keep-locale-dictionary`

**Opzioni di preparazione:**

- **`--build`**: Costruisce i dizionari prima di inviarli per assicurarsi che il contenuto sia aggiornato. True forza la build, false la salta, undefined permette di usare la cache della build.

**Opzioni di log:**

- **`--verbose`**: Abilita il logging dettagliato per il debug. (default a true usando la CLI)

**Opzioni Git:**

- **`--git-diff`**: Esegue solo sui dizionari che includono modifiche dalla base (default `origin/main`) al ramo corrente (default: `HEAD`).
- **`--git-diff-base`**: Specifica il riferimento base per il git diff (default `origin/main`).
- **`--git-diff-current`**: Specifica il riferimento corrente per il git diff (default: `HEAD`).
- **`--uncommitted`**: Include le modifiche non committate.
- **`--unpushed`**: Include le modifiche non pushate.
- **`--untracked`**: Include i file non tracciati.

  > Esempio: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Esempio: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
