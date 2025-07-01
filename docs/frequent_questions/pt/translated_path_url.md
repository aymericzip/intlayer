---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Posso traduzir o caminho da URL?
description: Aprenda como traduzir o caminho da URL.
keywords:
  - array
  - conteúdo
  - declaração
  - intlayer
  - middleware
  - proxy
  - reescrever
  - prefixo
  - localidade
  - url
slugs:
  - doc
  - faq
  - caminho-url-traduzido
---

# É possível traduzir a URL da seguinte forma:

```bash
en -> /product (sem prefixo) ou /en/product (com prefixo)
fr -> /fr/produit
es -> /es/producto
```

Infelizmente, o Intlayer não permite traduzir as URLs conforme especificado. Para isso, você deve usar seu próprio middleware ou proxy para reescrever as URLs.

Mas você pode usar a função `getMultilingualUrl` para inserir o prefixo na URL para uma localidade específica.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (sem prefixo) ou /en/product (com prefixo)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

Ou `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
