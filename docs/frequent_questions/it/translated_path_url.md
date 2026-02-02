---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: Posso tradurre il percorso dell'URL?
description: Scopri come tradurre il percorso dell'URL.
keywords:
  - array
  - contenuto
  - dichiarazione
  - intlayer
  - middleware
  - proxy
  - riscrittura
  - prefisso
  - lingua
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# È possibile tradurre gli URL?

Sì! Intlayer supporta le riscritture URL personalizzate, che consentono di definire percorsi specifici per la lingua. Ad esempio:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

Per implementare questo, puoi configurare la sezione `routing` nel tuo file `intlayer.config.ts`.

Per ulteriori informazioni su come implementare questa funzione, consulta la [documentazione sulle Riscritture URL Personalizzate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md).

Puoi anche utilizzare le funzioni `getMultilingualUrl` e `getLocalizedUrl` per generare questi URL a livello di programmazione, e rispetteranno le tue regole di riscrittura.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (se configurato)
```
