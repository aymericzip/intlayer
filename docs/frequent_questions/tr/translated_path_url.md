---
createdAt: 2025-09-07
updatedAt: 2026-09-27
priority: 4
title: URL yolunu çevirebilir miyim?
description: "Evet: Intlayer, locale başına yapılandırılan URL yeniden yazma ile /about'u /tr/hakkimizda gibi URL yollarına çevirebilir."
keywords:
  - dizi
  - içerik
  - bildirim
  - intlayer
  - middleware
  - proxy
  - yeniden yazma
  - önek
  - yerel ayar
  - url
slugs:
  - frequent-questions
  - translated-path-url
author: aymericzip
---

# URL'leri çevirmek mümkün mü?

Evet! Intlayer, yerel ayara özgü yollar tanımlamanıza olanak tanıyan özel URL yeniden yazımlarını destekler. Örneğin:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

Bunu uygulamak için `intlayer.config.ts` dosyanızdaki `routing` bölümünü yapılandırabilirsiniz.

Bu özelliğin nasıl uygulanacağı hakkında daha fazla bilgi için [Özel URL Yeniden Yazımları belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/custom_url_rewrites.md) bakın.

Ayrıca, bu URL'leri programatik olarak oluşturmak için `getMultilingualUrl` ve `getLocalizedUrl` fonksiyonlarını kullanabilirsiniz; bunlar yeniden yazma kurallarınıza saygı duyacaktır.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (eğer yapılandırılmışsa)
```
