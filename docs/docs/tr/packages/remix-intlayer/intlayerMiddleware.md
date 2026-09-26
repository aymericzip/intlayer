---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: intlayer Ara Yazılım Dokümantasyonu | remix-intlayer
description: Remix 3'te yerel ayarları algılamak, yönlendirmeleri yönetmek ve Intlayer durumunu istek bağlamına eklemek için intlayer ara yazılımını nasıl kullanacağınızı öğrenin.
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - uluslararasılaştırma
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "intlayer ara yazılımı başlangıç dokümantasyonu"
author: aymericzip
---

# intlayer Ara Yazılımı

`intlayer` ara yazılım fonksiyonu, Remix 3 uygulamalarında istek başına uluslararasılaştırmayı yapılandırır. Gelen her isteğin yerel ayarını algılar, URL yönlendirme kurallarını uygular ve yerel ayar durumunu istek bağlamında saklar.

## Kullanım

Ara yazılımı Remix yönlendiricinize kaydedin:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

## Nasıl Çalışır

Ara yazılım, gelen her istek için aşağıdaki görevleri gerçekleştirir:

1. **Yerel Ayar Algılama**: Intlayer yapılandırmanıza göre URL yolu önekinden (ör. `/tr/about`), çerezlerden veya `Accept-Language` başlığından yerel ayarı ayıklar.
2. **URL Yönlendirmesi**: İstenen yolda yerel ayar öneki yoksa ve yapılandırma önekli yönlendirme gerektiriyorsa, ara yazılım önekli uygun URL'ye bir yönlendirme yanıtı (302/307/308) döndürür.
3. **İstek Bağlamını Doldurma**: Geçerli çözümlenmiş yerel ayarı `Intlayer` anahtarını kullanarak Remix istek bağlamına kaydeder, böylece hook'lar (`useLocale`, `useIntlayer`, `useDictionary`) bunu şeffaf bir şekilde kullanabilir.
4. **Çerez Yönetimi**: Kullanıcının tercih ettiği yerel ayarın kalıcı hale getirilmesi gerektiğinde `Set-Cookie` başlığını ayarlar.

## İlgili Dokümantasyon

- [`Intlayer` İstek Bağlamı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/Intlayer.md)
- [`useLocale` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useLocale.md)
- [`useIntlayer` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useIntlayer.md)
