---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Gestire la Configurazione
description: Scopri come ottenere e inviare la tua configurazione Intlayer al CMS.
keywords:
  - Configurazione
  - Config
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
---

# Gestire la Configurazione

## Ottenere la Configurazione

Il comando `configuration get` recupera la configurazione corrente di Intlayer, in particolare le impostazioni della locale. Questo è utile per verificare la tua configurazione.

```bash
npx intlayer configuration get
```

## Alias:

- `npx intlayer config get`
- `npx intlayer conf get`

## Argomenti:

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file`**: Fornisci un file ambiente personalizzato da cui caricare le variabili.
- **`--base-dir`**: Specifica la directory base per il progetto.
- **`--verbose`**: Abilita il logging dettagliato per il debug. (impostato di default su true tramite CLI)
- **`--no-cache`**: Disabilita la cache.

## Inviare la Configurazione

Il comando `configuration push` carica la tua configurazione nel CMS e nell'editor di Intlayer. Questo passaggio è necessario per abilitare l'uso di dizionari remoti nell'Intlayer Visual Editor.

```bash
npx intlayer configuration push
```

## Alias:

- `npx intlayer config push`
- `npx intlayer conf push`

## Argomenti:

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file`**: Fornisci un file ambiente personalizzato da cui caricare le variabili.
- **`--base-dir`**: Specifica la directory base per il progetto.
- **`--verbose`**: Abilita il logging dettagliato per il debug. (impostato di default su true tramite CLI)
- **`--no-cache`**: Disabilita la cache.

Spingendo la configurazione, il tuo progetto è completamente integrato con il CMS di Intlayer, permettendo una gestione fluida dei dizionari tra i team.
