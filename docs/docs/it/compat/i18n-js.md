---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrare da i18n-js a Intlayer"
description: "Scopri come migrare la tua applicazione da i18n-js a Intlayer utilizzando l'adattatore di compatibilità."
keywords:
  - i18n-js
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrare da i18n-js a Intlayer

La transizione dalla libreria `i18n-js` a Intlayer è una migrazione altamente ottimizzata progettata per trasferire grandi configurazioni di traduzioni nel sistema di risoluzione dei file strutturato di Intlayer.

## Cosa fare

Esegui il seguente comando di configurazione nel tuo repository:

```bash
npx intlayer init
```

Con `intlayer.config.ts` preparato, puoi aggiungere l'alias di Intlayer alla configurazione del tuo bundler in modo che qualsiasi importazione di `i18n-js` abbia come destinazione il package di compatibilità `@intlayer/i18n-js`.

## Cosa fa sotto il cofano

`i18n-js` accede ai namespace attraverso espressioni come `i18n.t('scope.key', {name})` insieme ai fallback locale e alle mappature plurali specifiche.

Sotto il cofano:

- **Interpolation:** L'adapter di compatibilità analizza facilmente le mappature `%{name}` nel valore del dizionario runtime di destinazione.
- **Pluralization:** Sostituisce le sottochiavi `one/other` e le mappa rispetto ai potenti meccanismi plurali sottostanti di Intlayer (`Intl.PluralRules`), astraendo le mappature manuali.
- **Locales:** Invece di caricare payload linguistici monolitici al bootstrap, i dizionari vengono serviti in modo ottimale in base alla configurazione del contesto corrente tramite la configurazione nativa di Intlayer.
