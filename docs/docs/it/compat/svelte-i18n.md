---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrare da Svelte I18n a Intlayer"
description: "Scopri come migrare la tua applicazione Svelte da svelte-i18n a Intlayer utilizzando l'adapter di compatibilità."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrare da Svelte I18n a Intlayer

Migrare la tua applicazione Svelte da `svelte-i18n` a Intlayer richiede solo un momento utilizzando l'adapter di compatibilità.

## Cosa fare

Esegui semplicemente il comando di inizializzazione nel tuo progetto:

```bash
npx intlayer init
```

Questo genera `intlayer.config.ts`. Assicurati che i tuoi plugin SvelteKit / Vite siano avvolti con il plugin alias di Intlayer per mappare senza problemi `svelte-i18n` a `@intlayer/svelte-i18n`.

## Cosa fa sotto il cofano

Svelte-i18n si basa su store (`$_`, `$t`, `$format`, ecc.) ampiamente utilizzati e su ICU MessageFormat.

Sotto il cofano:

- **Store:** Intlayer proxies i store `svelte-i18n`. `$_` diventa uno store derivato della locale corrente che restituisce un resolver Intlayer.
- **Chiavi:** Le tue chiavi flat (ad es. `$_('home.title')`) vengono valutate in modo che il primo segmento del percorso rappresenti il dizionario Intlayer.
- **Sintassi ICU:** Completamente gestita dal resolver ICU condiviso (analisi equivalente di `intl-messageformat`).
- **Formatter:** Le chiamate `$date`, `$time`, `$number` reindirizzano in sicurezza ai formatter core nativi di Intlayer.
- **Analisi Babel/SWC:** L'analizzatore Intlayer legge i chiamanti dello store Svelte (`$_`) all'interno dei tuoi file sorgente `.svelte` prima della compilazione per costruire automaticamente i chunk di dizionario rilevanti.
