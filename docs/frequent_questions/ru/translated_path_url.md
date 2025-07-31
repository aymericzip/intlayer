---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Можно ли перевести путь URL?
description: Узнайте, как перевести путь URL.
keywords:
  - массив
  - контент
  - объявление
  - intlayer
  - промежуточное ПО
  - прокси
  - переписывание
  - префикс
  - локаль
  - url
slugs:
  - doc
  - faq
  - translated-path-url
---

# Можно ли перевести URL следующим образом:

```bash
en -> /product (без префикса) или /en/product (с префиксом)
fr -> /fr/produit
es -> /es/producto
```

К сожалению, Intlayer не позволяет переводить URL, как указано выше. Чтобы добиться этого, вам следует использовать собственное промежуточное ПО или прокси для переписывания URL.

Но вы можете использовать функцию `getMultilingualUrl`, чтобы вставить префикс в URL для заданной локали.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (без префикса) или /en/product (с префиксом)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

Или `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
