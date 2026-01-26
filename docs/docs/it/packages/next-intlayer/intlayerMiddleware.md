---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione intlayerMiddleware | next-intlayer
description: Scopri come utilizzare la funzione intlayerMiddleware per il package next-intlayer
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Doc iniziale
---

# Documentazione intlayerMiddleware

La funzione `intlayerMiddleware` è un middleware di Next.js che gestisce il routing basato sulla localizzazione e i reindirizzamenti. Rileva automaticamente la localizzazione preferita dell'utente e lo reindirizza al percorso localizzato appropriato, se necessario.

## Utilizzo

```ts
// middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## Descrizione

Il middleware esegue le seguenti operazioni:

1. **Rilevamento del locale**: Controlla il percorso URL, i cookie e l'header `Accept-Language` per determinare il locale dell'utente.
2. **Reindirizzamento**: Se l'URL non contiene un prefisso di locale e la configurazione ne richiede uno (o in base alle preferenze dell'utente), effettua il reindirizzamento all'URL localizzato.
3. **Gestione dei cookie**: Può memorizzare il locale rilevato in un cookie per le richieste future.

## Parametri

La funzione accetta il parametro standard Next.js `NextRequest` quando viene utilizzata direttamente, oppure può essere esportata come mostrato sopra.
