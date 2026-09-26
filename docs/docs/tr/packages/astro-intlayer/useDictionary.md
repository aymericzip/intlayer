---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useDictionary Hook Dokümantasyonu | astro-intlayer
description: Sözlük nesnelerini çözümlemek için Astro bileşenlerinde ve komut dosyalarında useDictionary hook'unun nasıl kullanılacağını görün.
keywords:
  - useDictionary
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - uluslararasılaştırma
  - dokümantasyon
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Başlangıç dokümantasyonu"
author: aymericzip
---

# useDictionary Hook Dokümantasyonu

`useDictionary` hook'u, içe aktarılmış veya satır içi bir sözlük nesnesini çözer ve Astro uygulamalarında geçerli yerel ayar için içeriğini döndürür.

Genel sözlük kaydından anahtarla sözlükleri alan `useIntlayer`'ın aksine, `useDictionary` doğrudan bir sözlük nesnesiyle çalışır.

## Kullanım

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

`t()` ile tanımlanan satır içi sözlükleri de geçirebilirsiniz:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
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
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## Parametreler

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Bir sözlük nesnesi veya nitelikli sözlük grubu.
2. **`localeOrSelector`** (isteğe bağlı): Belirli bir yerel ayar veya seçici nesnesi (`{ item }`, `{ variant }`, isteğe bağlı olarak `locale`).

## Açıklama

Hook aşağıdaki görevleri yerine getirir:

1. **Yerel Ayar Algılama**: Sunucuda, yerel ayarı `Astro.locals.intlayer`'dan alır. Tarayıcıda, istemci tarafı depo yerel ayarını kullanır.
2. **İçerik İşleme**: Çözümlenen yerel ayara göre çevirileri (`t()`), numaralandırmaları, koşulları ve iç içe geçmiş yapıları çözümler.
3. **Seçiciler**: Bağımsız değişkenlerde sağlanan tüm öğe veya varyant seçicilerini uygular.

## İlgili Dokümantasyon

- [`intlayer` Entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useLocale.md)
