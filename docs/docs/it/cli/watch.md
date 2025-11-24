---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Osservare i Dizionari
description: Scopri come osservare le modifiche nei tuoi file di dichiarazione dei contenuti e costruire automaticamente i dizionari.
keywords:
  - Osservare
  - Dizionari
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
---

# Osservare i Dizionari

```bash
npx intlayer watch
```

Questo comando osserverà le modifiche nei tuoi file di dichiarazione dei contenuti e costruirà i dizionari nella directory `.intlayer`.
Questo comando è l'equivalente di `npx intlayer build --watch --skip-prepare`.

## Alias:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Argomenti:

- **`--with`**: Avvia un comando in parallelo con l'osservazione.

  > Esempio: `npx intlayer watch --with "next dev --turbopack"`

  > Esempio: `npx intlayer watch --with "next dev --turbopack"`
