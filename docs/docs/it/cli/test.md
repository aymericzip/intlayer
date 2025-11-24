---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Test delle traduzioni mancanti
description: Scopri come testare e identificare le traduzioni mancanti nei tuoi dizionari.
keywords:
  - Test
  - Traduzioni Mancanti
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# Test delle traduzioni mancanti

```bash
npx intlayer content test
```

## Alias:

- `npx intlayer test`

Questo comando analizza i tuoi file di dichiarazione dei contenuti per identificare le traduzioni mancanti in tutte le localizzazioni configurate. Fornisce un report completo che mostra quali chiavi di traduzione mancano per quali localizzazioni, aiutandoti a mantenere la coerenza nei tuoi contenuti multilingue.

## Esempio di output:

```bash
pnpm intlayer content test
Traduzioni mancanti:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locali: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Locali richieste: en
Locali mancanti: pl, tr, es
Locali richieste mancanti: -
Totale locali mancanti: 3
Totale locali richieste mancanti: 0
```

## Argomenti:

**Opzioni di configurazione:**

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file [envFile]`**: Fornisce un file ambiente personalizzato da cui caricare le variabili.
- **`--base-dir`**: Specifica la directory base per il progetto.

  > Esempio: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Disabilita la cache.

  > Esempio: `npx intlayer build --no-cache`

**Opzioni di preparazione:**

- **`--build`**: Costruisce i dizionari prima del push per assicurarsi che il contenuto sia aggiornato. True forza la build, false la salta, undefined permette di usare la cache della build.

**Opzioni di log:**

- **`--verbose`**: Abilita il logging dettagliato per il debug. (default a true usando la CLI)

  > Esempio: `npx intlayer content test --verbose`

## Esempio:

```bash
npx intlayer content test --verbose
```

L'output ti aiuta a identificare rapidamente quali traduzioni devono essere completate per garantire che la tua applicazione funzioni correttamente in tutte le localizzazioni configurate.
