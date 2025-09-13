---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: URL yolunu çevirebilir miyim?
description: URL yolunu nasıl çevireceğinizi öğrenin.
keywords:
  - dizi
  - içerik
  - bildirim
  - intlayer
  - middleware
  - proxy
  - yönlendirme
  - önek
  - locale
  - url
slugs:
  - doc
  - faq
  - translated-path-url
---

# Aşağıdaki gibi url çevirmek mümkün mü:

```bash
en -> /product (önek yok) veya /en/product (önekli)
fr -> /fr/produit
es -> /es/producto
```

Intlayer, URL'leri bu şekilde çevirmeye izin vermez. Bunu başarmak için kendi middleware'inizi veya proxy'nizi kullanarak URL'leri yeniden yazmalısınız.

Ancak, bir locale için url'ye önek eklemek için `getMultilingualUrl` fonksiyonunu kullanabilirsiniz.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (önek yok) veya /en/product (önekli)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

Veya `getLocalizedUrl` fonksiyonunu kullanabilirsiniz:

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
