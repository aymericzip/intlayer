---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Costruire Dizionari
description: Impara come costruire i tuoi dizionari Intlayer dai file di dichiarazione dei contenuti.
keywords:
  - Costruire
  - Dizionari
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
---

# Costruire Dizionari

Per costruire i tuoi dizionari, puoi eseguire i comandi:

```bash
npx intlayer build
```

oppure in modalità watch

```bash
npx intlayer build --watch
```

Questo comando troverà i tuoi file di dichiarazione dei contenuti di default in `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E costruirà i dizionari nella directory `.intlayer`.

## Alias:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## Argomenti:

- **`--base-dir`**: Specifica la directory base per il progetto. Per recuperare la configurazione di intlayer, il comando cercherà il file `intlayer.config.{ts,js,json,cjs,mjs}` nella directory base.

  > Esempio: `npx intlayer build --base-dir ./src`

- **`--env`**: Specifica l'ambiente (ad esempio, `development`, `production`). Utile nel caso in cui si utilizzino variabili d'ambiente nel file di configurazione di intlayer.

  > Esempio: `npx intlayer build --env production`

- **`--env-file`**: Fornisce un file di ambiente personalizzato da cui caricare le variabili. Utile nel caso in cui si utilizzino variabili d'ambiente nel file di configurazione di intlayer.

  > Esempio: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Avvia un comando in parallelo con la build.

  > Esempio: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Salta il passaggio di preparazione.

  > Esempio: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Disabilita la cache.

  > Esempio: `npx intlayer build --no-cache`
