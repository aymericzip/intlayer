---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentazione Hook useRewriteURL
description: Hook specifico per Svelte per gestire la riscrittura di URL localizzati in Intlayer.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Il hook `useRewriteURL` per Svelte è pensato per gestire la riscrittura degli URL localizzati lato client. Corregge automaticamente l'URL del browser alla sua versione localizzata "pretty" basandosi sulla locale corrente e sulla configurazione in `intlayer.config.ts`.

Aggiorna l'URL in modo silenzioso usando `window.history.replaceState`, evitando navigazioni complete di SvelteKit.

## Utilizzo

Chiama il hook all'interno di un componente Svelte.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // Corregge automaticamente /fr/tests in /fr/essais nella barra degli indirizzi se esiste una regola di rewrite
  useRewriteURL();
</script>

<slot />
```

## Come funziona

1. **Aggiornamenti reattivi**: L'hook si iscrive allo store `locale` di Intlayer.
2. **Rilevamento**: Ogni volta che la locale cambia (o al mount), calcola se l'attuale `window.location.pathname` ha una versione localizzata più pulita definita nelle tue regole di rewrite.
3. **Correzione URL**: Se viene trovato un percorso più pulito, l'hook chiama `window.history.replaceState` per aggiornare la barra degli indirizzi senza un reload completo della pagina o senza attivare la logica di navigazione di SvelteKit.

## Perché usarlo?

- **Buone pratiche SEO**: Garantisce che i motori di ricerca indicizzino solo la versione localizzata più pulita dei tuoi URL.
  /// **Migliore UX**: Corregge gli URL inseriti manualmente per riflettere la tua struttura di denominazione preferita.
  /// **Aggiornamenti silenziosi**: Modifica la barra degli indirizzi senza influire sull'albero dei componenti o sulla cronologia di navigazione.
