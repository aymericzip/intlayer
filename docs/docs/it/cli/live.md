---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Comandi Live Sync
description: Scopri come utilizzare Live Sync per riflettere le modifiche dei contenuti CMS in tempo reale.
keywords:
  - Live Sync
  - CMS
  - Runtime
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# Comandi Live Sync

Live Sync consente alla tua app di riflettere le modifiche dei contenuti CMS in tempo reale. Non è necessario ricostruire o ridistribuire. Quando abilitato, gli aggiornamenti vengono trasmessi a un server Live Sync che aggiorna i dizionari letti dalla tua applicazione. Consulta [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) per maggiori dettagli.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## Argomenti:

**Opzioni di configurazione:**

- **`--base-dir`**: Specifica la directory base per il progetto. Per recuperare la configurazione di intlayer, il comando cercherà il file `intlayer.config.{ts,js,json,cjs,mjs}` nella directory base.

- **`--no-cache`**: Disabilita la cache.

  > Esempio: `npx intlayer dictionary push --env-file .env.production.local`

**Opzioni di log:**

- **`--verbose`**: Abilita il logging dettagliato per il debug. (impostazione predefinita a true usando la CLI)
