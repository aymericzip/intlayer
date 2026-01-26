---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del plugin Vite intlayer | vite-intlayer
description: Scopri come utilizzare il plugin intlayer per il pacchetto vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Inizializzazione della documentazione
---

# Documentazione del plugin Vite intlayer

Il plugin Vite `intlayer` integra la configurazione di Intlayer nel processo di build. Gestisce gli alias dei dizionari, avvia il watcher dei dizionari in modalità sviluppo e prepara i dizionari per la build.

## Utilizzo

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

ts;
export default defineConfig({
  plugins: [intlayer()],
});
```

## Descrizione

Il plugin esegue le seguenti operazioni:

1. **Preparazione dei dizionari**: Compila i dizionari in file ottimizzati all'avvio del processo di build o in dev.
2. **Modalità watch**: In modalità sviluppo, monitora le modifiche ai file dei dizionari e li ricompila automaticamente.
3. **Alias**: Fornisce alias per accedere ai dizionari nella tua applicazione.
4. **Tree-shaking**: Supporta il tree-shaking delle traduzioni non utilizzate tramite il plugin `intlayerPrune`.
