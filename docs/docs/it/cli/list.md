---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Elencare i file di dichiarazione del contenuto
description: Scopri come elencare tutti i file di dichiarazione del contenuto nel tuo progetto.
keywords:
  - Elenco
  - Dichiarazione del contenuto
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
---

# Elencare i file di dichiarazione del contenuto

```bash
npx intlayer content list
```

## Alias:

- `npx intlayer list`

Questo comando mostra tutti i file di dichiarazione del contenuto nel tuo progetto, visualizzando le loro chiavi nel dizionario e i percorsi dei file. È utile per avere una panoramica di tutti i tuoi file di contenuto e verificare che siano correttamente rilevati da Intlayer.

## Esempio:

```bash
npx intlayer content list
```

## Output di esempio:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Totale file di dichiarazione del contenuto: 3
```

Questo comando mostrerà:

- Un elenco formattato di tutti i file di dichiarazione del contenuto con le loro chiavi e i percorsi relativi dei file
- Il conteggio totale dei file di dichiarazione del contenuto trovati

L'output ti aiuta a verificare che tutti i tuoi file di contenuto siano configurati correttamente e rilevabili dal sistema Intlayer.
