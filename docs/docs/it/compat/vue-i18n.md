---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrare da Vue I18n a Intlayer"
description: "Scopri come migrare la tua applicazione Vue da vue-i18n a Intlayer utilizzando l'adapter di compatibilità."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrare da Vue I18n a Intlayer

Se la tua applicazione Vue attualmente utilizza `vue-i18n`, puoi migrare a Intlayer senza riscrivere i tuoi componenti o tradurre gli hook. Intlayer fornisce un adattatore di compatibilità che rispecchia perfettamente l'API di `vue-i18n` mentre sfrutta le potenti funzionalità di Intlayer dietro le quinte.

## Cosa fare

Per iniziare, esegui semplicemente il comando di inizializzazione nel tuo progetto:

```bash
npx intlayer init
```

Durante l'inizializzazione, Intlayer configura il file di configurazione (`intlayer.config.ts`) e prepara il tuo progetto per la migrazione. Dovrai solo aggiungere il plugin Intlayer alla tua configurazione Vite per creare automaticamente alias per gli import `vue-i18n`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## Cosa fa sotto il cofano

Il `vueI18nVitePlugin` inietta un alias di modulo nel tuo bundler. Qualsiasi import di `vue-i18n` nel tuo codebase verrà reindirizzato in modo trasparente a `@intlayer/vue-i18n`.

**Sotto il cofano, l'adapter gestisce nativamente la complessa sintassi di `vue-i18n`:**

- **Interpolazione e plurali:** Risolve le interpolazioni `{name}` e di lista `{0}`. I plurali con pipe (`"car | cars"`) vengono convertiti in nodi di enumerazione/plurale di Intlayer basati sulla semantica posizionale.
- **Formati:** Funzioni come `d()` e `n()` avvolgono `Intl` sotto il cofano, rispettando i `datetimeFormats` e `numberFormats` definiti nelle tue opzioni.
- **Stato globale e locale:** `global.locale` è mappato a un `WritableComputedRef` supportato dal client Intlayer, quindi la reattività si comporta esattamente come previsto (ad esempio `locale.value = 'fr'`).
- **Direttive:** La direttiva `v-t` è registrata e funziona normalmente.

La tua applicazione continua a renderizzarsi esattamente come prima, ma il contenuto è alimentato dai tuoi dizionari Intlayer, offrendoti type safety, una migliore ottimizzazione del bundle e un'integrazione CMS senza interruzioni.
