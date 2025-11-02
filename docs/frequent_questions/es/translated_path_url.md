---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: ¿Puedo traducir la ruta de la URL?
description: Aprende cómo traducir la ruta de la URL.
keywords:
  - array
  - contenido
  - declaración
  - intlayer
  - middleware
  - proxy
  - reescribir
  - prefijo
  - locale
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# ¿Es posible traducir la URL como sigue?

```bash
en -> /product (sin prefijo) o /en/product (con prefijo)
fr -> /fr/produit
es -> /es/producto
```

Desafortunadamente, Intlayer no permite traducir las URLs como se especifica. Para lograr esto, deberías usar tu propio middleware o proxy para reescribir las URLs.

Pero puedes usar la función `getMultilingualUrl` para insertar el prefijo en la URL para un locale dado.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (sin prefijo) o /en/product (con prefijo)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

O `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
