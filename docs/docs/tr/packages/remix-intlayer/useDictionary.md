---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useDictionary Hook Dokümantasyonu | remix-intlayer
description: Remix 3 uygulamalarında geçerli istek yerel ayarı için sözlük nesnelerini çözümlemek üzere useDictionary hook'unun nasıl kullanılacağını görün.
keywords:
  - useDictionary
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - uluslararasılaştırma
  - dokümantasyon
slugs:
  - doc
  - packages
  - remix-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useDictionary hook'u başlangıç dokümantasyonu"
author: aymericzip
---

# useDictionary Hook Dokümantasyonu

`useDictionary` hook'u, içe aktarılmış veya satır içi bir sözlük nesnesini dönüştürür ve Remix 3 uygulamalarında geçerli isteğin yerel ayarı için çözümlenmiş içeriğini döndürür.

Genel sözlük kaydından dize anahtarlarıyla sözlükleri çözümleyen `useIntlayer`ın aksine, `useDictionary` doğrudan bir sözlük nesnesi kabul eder.

## Kullanım

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

`t()` ile tanımlanan satır içi sözlükleri de geçirebilirsiniz:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        tr: "Tüm hakları saklıdır.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
        es: "Todos los derechos reservados.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## Parametreler

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Bir sözlük nesnesi veya nitelikli sözlük grubu.
2. **`localeOrSelector`** (isteğe bağlı): Belirli bir yerel ayar veya seçici nesnesi (`{ item }`, `{ variant }`, isteğe bağlı olarak `locale`). Sağlandığında, istek yerel ayarından önceliklidir.

## Açıklama

Hook aşağıdaki görevleri yerine getirir:

1. **Yerel Ayar Algılama**: `intlayer()` ara yazılımı tarafından oluşturulan `AsyncLocalStorage` deposundan etkin istek yerel ayarını okur.
2. **İçerik Çözümleme**: Çözümlenen yerel ayara göre çevirileri (`t()`), numaralandırmaları, koşulları ve iç içe geçmiş yapıları değerlendirir.
3. **Seçici İşleme**: Bağımsız değişkenlerde belirtilen tüm öğe veya varyant seçicilerini uygular.

## İlgili Dokümantasyon

- [`intlayer` Ara Yazılımı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useLocale.md)
