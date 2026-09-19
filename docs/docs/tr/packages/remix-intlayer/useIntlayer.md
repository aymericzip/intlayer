---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useIntlayer Hook Dokümantasyonu | remix-intlayer
description: Remix 3 uygulamalarında anahtara göre yerelleştirilmiş içeriğe erişmek için useIntlayer hook'unu nasıl kullanacağınızı görün.
keywords:
  - useIntlayer
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
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useIntlayer hook'u başlangıç dokümantasyonu"
author: aymericzip
---

# useIntlayer Hook Dokümantasyonu

`useIntlayer` hook'u, Remix 3 uygulamalarında bir Intlayer sözlüğünden anahtara göre yerelleştirilmiş içerik almanızı sağlar.

Geçerli istek bağlamından (`AsyncLocalStorage` aracılığıyla) etkin yerel ayarı otomatik olarak okur, böylece rota işleyicileri, görünüm şablonları veya bileşenler arasında yerel ayarı iletmeniz gerekmez.

## Kullanım

### Rota İşleyicilerinde

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### Görünüm Şablonlarında ve Bileşenlerde

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## Parametreler

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Sözlüğün benzersiz anahtarı (`.content.ts` bildirim dosyalarınızda tanımlandığı gibi).
2. **`localeOrSelector`** (isteğe bağlı): Belirli bir yerel ayar veya seçici nesnesi (`{ item }`, `{ variant }`, isteğe bağlı olarak `locale`). Sağlandığında, istek bağlamından algılanan yerel ayarı geçersiz kılar.

## Açıklama

Hook aşağıdaki görevleri yerine getirir:

1. **Bağlam Yerel Ayarı Algılama**: `intlayer()` ara yazılımı tarafından kurulan isteğe bağlı `AsyncLocalStorage` kapsamından geçerli yerel ayarı algılar.
2. **Sözlük Alma**: Sağlanan anahtara karşılık gelen önceden derlenmiş sözlüğü alır.
3. **Çeviri İşleme**: Çözümlenen yerel ayar için çevirileri, numaralandırmaları, markdown ve koşullu içeriği çözümler.
4. **Yedek İşleme (Fallback)**: Etkin bir HTTP istek bağlamı dışında çağrılırsa (örneğin arka plan görevleri veya ara yazılımsız birim testleri), güvenli bir şekilde yapılandırılmış `defaultLocale` değerine döner.

## İlgili Dokümantasyon

- [`intlayer` Ara Yazılımı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/intlayerMiddleware.md)
- [`useDictionary` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useDictionary.md)
- [`useLocale` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useLocale.md)
