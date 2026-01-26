---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del plugin Vite intlayerPrune | vite-intlayer
description: Scopri come utilizzare il plugin intlayerPrune per il pacchetto vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione iniziale
---

# Documentazione del plugin Vite intlayerPrune

Il plugin Vite `intlayerPrune` viene utilizzato per eseguire tree-shaking ed eliminare i dizionari non utilizzati dal bundle della tua applicazione. Questo aiuta a ridurre la dimensione finale del bundle includendo solo i contenuti multilingua necessari.

## Utilizzo

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## Descrizione

Il plugin analizza il tuo codice sorgente per identificare quali chiavi del dizionario sono effettivamente utilizzate. Successivamente rimuove qualsiasi contenuto non utilizzato dai file di dizionario inclusi nel bundle. Questo è particolarmente utile per progetti di grandi dimensioni con molti dizionari, dove solo un sottoinsieme viene utilizzato in pagine o componenti specifici.
