---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentazione dell'hook useIntlayer | astro-intlayer
description: Scopri come utilizzare l'hook useIntlayer nei componenti Astro e negli script client per accedere a contenuti localizzati.
keywords:
  - useIntlayer
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - internazionalizzazione
  - documentazione
slugs:
  - doc
  - packages
  - astro-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc iniziale"
author: aymericzip
---

# Documentazione dell'hook useIntlayer

L'hook `useIntlayer` ti consente di recuperare contenuti di dizionario localizzati tramite chiave nelle applicazioni Astro.

Può essere chiamato in due contesti distinti utilizzando lo stesso percorso di importazione:

1. **Server / Frontmatter**: All'interno dei file `.astro`, risolve automaticamente il contenuto utilizzando il locale della richiesta memorizzato in `Astro.locals.intlayer`.
2. **Browser / Tag `<script>` client**: Negli script client o nei componenti dei framework UI, risolve all'implementazione dello store lato client (`vanilla-intlayer`).

## Utilizzo

### Nel Frontmatter dei componenti Astro

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### Nei blocchi `<script>` client

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## Parametri

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: La chiave univoca del dizionario (definita nei tuoi file di dichiarazione `.content.ts`).
2. **`localeOrSelector`** (opzionale): Un locale specifico o un oggetto selettore (`{ item }`, `{ variant }`, facoltativamente con `locale`). Se fornito, sovrascrive il locale rilevato dal contesto della richiesta o dallo store client.

## Descrizione

L'hook esegue i seguenti compiti:

1. **Risoluzione del locale**:
   - Sul server, legge il locale attivo da `Astro.locals.intlayer` tramite un ambito `AsyncLocalStorage` inizializzato da `astro-intlayer/middleware`.
   - Nel browser, legge il locale attivo dallo storage/store client.
2. **Recupero del dizionario**: Inietta il contenuto del dizionario corrispondente alla chiave specificata.
3. **Elaborazione della traduzione**: Risolve traduzioni (`t()`), enumerazioni, condizioni e markdown in contenuti pronti per il rendering.

## Documentazione correlata

- [Integrazione `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/intlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useLocale.md)
