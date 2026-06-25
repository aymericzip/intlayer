---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrare da Lingui a Intlayer"
description: "Scopri come migrare la tua applicazione da Lingui a Intlayer utilizzando l'adattatore di compatibilità."
keywords:
  - lingui
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrazione da Lingui a Intlayer

Se il tuo progetto attualmente si basa sulla compilazione basata su macro di Lingui, il passaggio a Intlayer ti consente di mantenere i tuoi potenti workflow macro supportandoli nativamente con la strategia di compilazione JSON di Intlayer.

## Cosa fare

Per iniziare, inizializza Intlayer nel tuo progetto:

```bash
npx intlayer init
```

Questo crea il tuo `intlayer.config.ts`. Assicurati di mantenere `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` nel tuo build step per eseguire _prima_ del compilatore Intlayer. Quindi, utilizza l'alias del plugin bundler per instradare `@lingui/core` e `@lingui/react` a `@intlayer/lingui`.

## Cosa fa sotto il cofano

Lingui utilizza macro (come `` t`Hello ${name}` `` e `<Trans>`) che vengono compilate in chiamate runtime come `i18n._(id, values)`.

Sotto il cofano:

- **Macro:** Si compilano esattamente come prima, garantendo nessuna interruzione nella sintassi del tuo codice sorgente.
- **Traduzione runtime:** L'alias `i18n._()` utilizza i dizionari di Intlayer. Sia gli ID esplicitamente denominati che gli ID con hash sono completamente mappati utilizzando i plugin di sincronizzazione `.po` di Intlayer per aggregare e rimuovere le chiavi in modo sicuro.
- **Funzionalità ICU:** Il supporto per pluralizzazione, selezione e varianti ICU rimane robusto grazie al parser ICU unificato di Intlayer, garantendo output di rendering identici.
