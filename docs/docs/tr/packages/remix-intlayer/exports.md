---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: remix-intlayer Paketi Dokümantasyonu
description: Remix 3 uygulamaları için uluslararasılaştırma (i18n) sağlayan remix-intlayer paketi dışa aktarım dokümantasyonu.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - uluslararasılaştırma
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "remix-intlayer dışa aktarımları başlangıç dokümantasyonu"
author: aymericzip
---

# remix-intlayer Paketi

`remix-intlayer` paketi, Intlayer'ı Remix 3 uygulamalarına entegre etmek için gerekli araçları sağlar. İstek yerel ayarını algılamak için ara yazılım (middleware), istek bağlamı erişimi ve sözlükleri almak ile yerel ayarları yönetmek için hook'lar içerir.

## Kurulum

```bash
npm install remix-intlayer
```

## Paket Dışa Aktarılanları

### Ara Yazılım (Middleware)

| Dışa Aktarım | Tür                    | Açıklama                                                                                                 | İlgili Doküman                                                                                                                       |
| ------------ | ---------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `intlayer`   | Ara Yazılım Fonksiyonu | İstek yerel ayarını algılayan, yönlendirmeleri yöneten ve istek bağlamını dolduran Remix 3 ara yazılımı. | [intlayer Ara Yazılımı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/intlayerMiddleware.md) |

### Bağlam Depolama

| Dışa Aktarım | Tür                            | Açıklama                                                                                                            | İlgili Doküman                                                                                                        |
| ------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `Intlayer`   | RequestContext Anahtarı / Depo | Remix 3 istek bağlamından (`context.get(Intlayer)`) Intlayer durumunu almak için kullanılan istek bağlamı anahtarı. | [Intlayer Bağlamı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/Intlayer.md) |

### Hook'lar

| Dışa Aktarım    | Tür  | Açıklama                                                                                                                             | İlgili Doküman                                                                                                                 |
| --------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`   | Hook | Geçerli istek yerel ayarına göre anahtarla belirtilen sözlük içeriğini alır ve işler.                                                | [useIntlayer Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Hook | Önceden içe aktarılmış bir sözlük nesnesinden geçerli istek yerel ayarına karşılık gelen içeriği döner.                              | [useDictionary Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Hook | Geçerli istek yerel ayarına, varsayılan yerel ayara ve projede yapılandırılmış kullanılabilir yerel ayarlar listesine erişim sağlar. | [useLocale Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useLocale.md)         |

## Hızlı Başlangıç

### Yönlendiricide Ara Yazılımı Yapılandırma

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

### Görünümlerde ve Bileşenlerde İçerik Kullanımı

```ts fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `<h1>${content.title}</h1><p>${content.description}</p>`;
};
```
