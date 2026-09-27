---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/react-i18next: adattatore di compatibilità per react-i18next"
description: "Mantieni il tuo codice react-i18next e servilo con Intlayer: installa @intlayer/react-i18next, reindirizza gli import e scopri cosa cambia l'adattatore dietro le quinte."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/react-i18next: adattatore di compatibilità per react-i18next

Per un tutorial completo e dettagliato passo dopo passo, consulta la nostra [Guida alla migrazione da react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_react-i18next_to_intlayer.md).

- [Guida alla migrazione da react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_react-i18next_to_intlayer.md)

Utilizzando l'adapter di compatibilità di Intlayer puoi migrare da `react-i18next` senza apportare alcuna modifica agli import del tuo codice sorgente.

## Cosa fare

Per inizializzare il progetto, esegui:

```bash
npx intlayer init --interactive
```

Durante l'inizializzazione, Intlayer installerà `@intlayer/react-i18next` e creerà `intlayer.config.ts`. Nel tuo bundler (come Vite), applica il plugin Intlayer:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## Cosa fa sotto il cofano

Il `reactI18nextVitePlugin` avvolge il plugin core `vite-intlayer` e inietta alias di resolve per `react-i18next` e `i18next`, reindirizzandoli a `@intlayer/react-i18next` e `@intlayer/i18next`.

Sotto il cofano:

- **`useTranslation` & `withTranslation`:** Riscritti per utilizzare gli hook nativi di Intlayer, fornendoti il completamento automatico di TypeScript per le tue chiavi di dizionario. Supporta senza problemi i namespace (ad es. `t('namespace:key')`).
- **Plurali & Contesto:** Gestisce la pluralizzazione basata su suffissi di i18next (`key_one`, `key_other`) utilizzando `Intl.PluralRules` nativo e suffissi di contesto (`key_male`).
- **Componente `<Trans>`:** Re-implementato per supportare il prop `components`, forme oggetto e array, e tag numerati `<1>...</1>` che mappano direttamente ai tuoi nodi React.
- **Istanza `i18n`:** Risolve le chiavi direttamente da Intlayer senza recuperare grandi file JSON, risultando in dimensioni di bundle significativamente inferiori.

> Per capire da dove vengono queste librerie, leggi la storia dell'i18n in JavaScript.

- [La storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md)
