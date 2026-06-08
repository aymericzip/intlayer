---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: "Documentazione dell'hook useRewriteURL"
description: "Hook specifico per Next.js per gestire la riscrittura degli URL localizzati in Intlayer."
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Il hook `useRewriteURL` per Next.js è un hook lato client che gestisce automaticamente le riscritture degli URL localizzati. Garantisce che l'URL nel browser rifletta sempre il percorso localizzato "più leggibile" definito nel tuo `intlayer.config.ts`, anche se l'utente digita manualmente un percorso canonico con un prefisso di locale.

Questo hook opera silenziosamente usando `window.history.replaceState`, evitando navigazioni ridondanti tramite il router di Next.js o il ricaricamento della pagina.

## Utilizzo

Richiama semplicemente l'hook in un Client Component che fa parte del tuo layout.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // Corregge automaticamente /fr/privacy-notice in /fr/politique-de-confidentialite nella barra degli indirizzi
  useRewriteURL();

  return null;
};
```

## Come funziona

1. **Monitoraggio del percorso**: L'hook ascolta i cambiamenti della `locale` dell'utente.
2. **Rilevamento delle riscritture**: Controlla l'attuale `window.location.pathname` rispetto alle regole di rewrite nella tua configurazione.
3. **Correzione dell'URL**: Se viene trovato un alias localizzato più leggibile per il percorso corrente, l'hook invoca `window.history.replaceState` per aggiornare la barra degli indirizzi mantenendo l'utente sulla stessa pagina interna.

## Perché usarlo in Next.js?

Mentre il `intlayerMiddleware` gestisce le riscritture lato server e i reindirizzamenti iniziali, l'hook `useRewriteURL` garantisce che l'URL del browser rimanga coerente con la struttura SEO preferita anche dopo le transizioni lato client.

- **URL puliti**: Fa rispettare l'uso di segmenti localizzati come `/fr/essais` invece di `/fr/tests`.
- **Prestazioni**: Aggiorna la barra degli indirizzi senza scatenare un ciclo completo del router o riottenere i dati.
- **Allineamento SEO**: Previene problemi di contenuto duplicato assicurando che sia visibile una sola versione dell'URL all'utente e ai bot dei motori di ricerca.
