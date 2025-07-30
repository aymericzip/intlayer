---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Kann ich den URL-Pfad übersetzen?
description: Erfahren Sie, wie Sie den URL-Pfad übersetzen können.
keywords:
  - array
  - inhalt
  - deklaration
  - intlayer
  - middleware
  - proxy
  - umschreiben
  - prefix
  - locale
  - url
slugs:
  - doc
  - faq
  - translated-path-url
---

# Ist es möglich, URLs wie folgt zu übersetzen:

```bash
en -> /product (kein Präfix) oder /en/product (mit Präfix)
fr -> /fr/produit
es -> /es/producto
```

Intlayer erlaubt es leider nicht, die URLs wie angegeben zu übersetzen. Um dies zu erreichen, sollten Sie Ihre eigene Middleware oder einen Proxy verwenden, um die URLs umzuschreiben.

Sie können jedoch die Funktion `getMultilingualUrl` verwenden, um das Präfix für eine bestimmte Locale in die URL einzufügen.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (kein Präfix) oder /en/product (mit Präfix)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

Oder `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
