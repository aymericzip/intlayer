---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Чи можна перекласти шлях URL?
description: Дізнайтеся, як перекласти шлях URL.
keywords:
  - array
  - content
  - declaration
  - intlayer
  - middleware
  - proxy
  - rewrite
  - prefix
  - locale
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# Чи можливо перекласти URL наступним чином:

```bash
en -> /product (без префікса) або /en/product (з префіксом)
fr -> /fr/produit
es -> /es/producto
```

На жаль, Intlayer не дозволяє перекладати URL так, як зазначено вище. Щоб досягти цього, ви повинні використовувати власний middleware або proxy для перезапису (rewrite) URL.

Але ви можете використовувати функцію `getMultilingualUrl`, щоб вставити префікс у URL для заданої локалі.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (без префікса) або /en/product (з префіксом)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

Або `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // виведе: /fr/product
```
