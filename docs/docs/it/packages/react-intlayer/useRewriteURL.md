---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentazione dell'hook useRewriteURL
description: Hook specifico per React per gestire le riscritture di URL localizzate in Intlayer.
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

L'hook `useRewriteURL` è progettato per gestire le riscritture di URL localizzate lato client. Rileva automaticamente se l'URL corrente dovrebbe essere corretto in una versione localizzata "più leggibile" in base alla locale dell'utente e alle regole di riscrittura definite in `intlayer.config.ts`.

A differenza della navigazione standard, questo hook utilizza `window.history.replaceState` per aggiornare l'URL nella barra degli indirizzi senza causare un ricaricamento completo della pagina o un ciclo di navigazione del router.

## Utilizzo

Chiamare semplicemente l'hook in un componente client-side.

```tsx
import { useRewriteURL } from "react-intlayer";

const MyComponent = () => {
  // Corregge automaticamente /fr/tests in /fr/essais nella barra degli indirizzi se esiste una regola di rewrite
  useRewriteURL();

  return <div>Il mio componente</div>;
};
```

## Come funziona

1. **Rilevamento**: L'hook monitora l'attuale `window.location.pathname` e la `locale` dell'utente.
2. **Corrispondenza**: Utilizza il motore interno di Intlayer per verificare se l'attuale pathname corrisponde a una route canonica che ha un alias localizzato più gradevole per la locale corrente.
3. **Correzione dell'URL**: Se viene trovato un alias migliore (e diverso dal percorso corrente), l'hook chiama `window.history.replaceState` per aggiornare l'URL del browser preservando lo stesso contenuto canonico e lo stato.

## Perché usarlo?

- **SEO**: Garantisce che gli utenti arrivino sempre sull'unico pretty URL autorevole per una determinata lingua.
- **Coerenza**: Evita incongruenze in cui un utente potrebbe digitare manualmente un percorso canonico (ad es. `/it/privacy-notice`) invece della versione localizzata (`/it/informativa-sulla-privacy`).
- **Prestazioni**: Aggiorna la barra degli indirizzi senza attivare effetti collaterali indesiderati del router o il rimontaggio dei componenti.
