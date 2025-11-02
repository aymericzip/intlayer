---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Posso tradurre il percorso URL?
description: Scopri come tradurre il percorso URL.
keywords:
  - array
  - contenuto
  - dichiarazione
  - intlayer
  - middleware
  - proxy
  - riscrittura
  - prefisso
  - locale
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# È possibile tradurre l'URL come segue:

```bash
en -> /product (nessun prefisso) oppure /en/product (con prefisso)
fr -> /fr/produit
es -> /es/producto
```

Purtroppo Intlayer non consente di tradurre gli URL come specificato. Per ottenere questo risultato, dovresti utilizzare un tuo middleware o proxy per riscrivere gli URL.

Tuttavia, puoi usare la funzione `getMultilingualUrl` per inserire il prefisso nell'URL per un dato locale.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (nessun prefisso) oppure /en/product (con prefisso)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

Oppure `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
