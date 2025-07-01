---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Puis-je traduire le chemin de l'URL ?
description: Apprenez comment traduire le chemin de l'URL.
keywords:
  - tableau
  - contenu
  - déclaration
  - intlayer
  - middleware
  - proxy
  - réécriture
  - préfixe
  - locale
  - url
slugs:
  - doc
  - faq
  - chemin-url-traduit
---

# Est-il possible de traduire l'URL comme suit :

```bash
en -> /product (pas de préfixe) ou /en/product (avec préfixe)
fr -> /fr/produit
es -> /es/producto
```

Intlayer ne permet malheureusement pas de traduire les URLs comme spécifié. Pour cela, vous devez utiliser votre propre middleware ou proxy pour réécrire les URLs.

Mais vous pouvez utiliser la fonction `getMultilingualUrl` pour insérer le préfixe dans l'URL pour une locale donnée.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (pas de préfixe) ou /en/product (avec préfixe)
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
