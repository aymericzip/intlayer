---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrare da Next Translate a Intlayer"
description: "Scopri come migrare la tua applicazione Next.js da next-translate a Intlayer utilizzando l'adapter di compatibilità."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrare da Next Translate a Intlayer

Migrare da `next-translate` a Intlayer è una sostituzione quasi totale che mantiene la tua sintassi e i tuoi tag esistenti.

## Cosa fare

Inizializza Intlayer nel tuo progetto:

```bash
npx intlayer init
```

La CLI scaffolderà la tua configurazione. Puoi quindi applicare il plugin Intlayer nel tuo `next.config.ts`, che inietta alias di sottopercorsi in fase di build mappando `next-translate/useTranslation` a `@intlayer/next-translate`.

## Cosa fa dietro le quinte

`next-translate` fornisce hook come `useTranslation('ns')`, `t('ns:key.path')`, e il componente `<Trans>`.

Dietro le quinte:

- **Interpolazione & Plurali:** Si basa strettamente sul comportamento dell'adapter `react-i18next`. Gestiti dinamicamente sono i placeholder `{{var}}` e la pluralizzazione mappata da suffissi come `key_0`, `key_one`, e `key_other`.
- **Componente `<Trans>`:** Direttamente supportato per il parsing di tag simili a HTML insieme a un prop `components` basato su array.
- **Namespaces:** L'aliasing dei subpath assicura che il tuo `useTranslation` faccia riferimento ai namespace dei dizionari interni corretti senza necessità di modifiche manuali.
