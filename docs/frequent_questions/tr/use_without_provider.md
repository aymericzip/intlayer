---
createdAt: 2026-09-28
updatedAt: 2026-09-28
priority: 4
title: "Intlayer'ı global bir provider olmadan kullanabilir miyim?"
description: "Intlayer içeriğini bir provider eklemeden okuma, locale'in sunucuda ve tarayıcıda nasıl çözümlendiği ve bir provider'a göre performans farkı."
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - locale
  - performans
  - hydration
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# Intlayer'ı global bir provider olmadan kullanabilir miyim?

Evet. `getIntlayer` ve `getDictionary` herhangi bir provider gerektirmeyen basit fonksiyonlardır ve `useIntlayer` da bir provider dışında çalışır.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Locale verilmedi
```

## Hangi locale kullanılır?

Açıkça verilen bir locale her zaman önceliklidir. Aksi halde locale şu sırayla çözümlenir:

1. **Geçerli isteğin locale'i**, sunucuda, isteği bir Intlayer entegrasyonu işlediğinde: `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` ve `astro-intlayer` middleware'leri veya React Server Components içindeki `IntlayerProvider`.
2. **Tarayıcıda saklanan locale** (cookie, `localStorage`, `sessionStorage`), yani dil değiştiricinizin kaydettiği locale.
3. Yapılandırmanızdaki **`defaultLocale`**.

Her istek kendi cookie'lerinden ve header'larından çözümlenir ve isteğe özel bir kapsamda tutulur. Farklı locale'lere sahip eşzamanlı kullanıcılar asla aynı locale'i paylaşmaz.

Aynı çözümleme `getDictionary` için, [build optimizasyonunun](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) yeniden yazdığı çağrılar için ve bir provider dışında render edilen `useIntlayer` ile `useDictionaryDynamic` için de geçerlidir.

- [build optimizasyonunun](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)

### Next.js Server Components

Next.js'te isteğin locale'i yalnızca asenkron olarak, `headers()` ve `cookies()` üzerinden okunabilir. `next-intlayer/server` içindeki `getLocale()` gibi onu bekleyen [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayerAsync.md) fonksiyonunu kullanın:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // İsteğin locale'i

  return { title };
};
```

Header'ları okumak route'u dinamik render'a geçirir. `IntlayerProvider` locale'i zaten sağlıyorsa header'lar okunmaz ve route statik kalır.

## Performans: provider ile veya provider olmadan

İçerik aynıdır. Fark, reaktivite ve render maliyetindedir.

|                           | Provider ile                                                | Provider olmadan                                                                                                              |
| ------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Locale değişikliği        | Bileşenler sayfa yenilenmeden yerinde yeniden render edilir | Hiçbir şey yeniden render edilmez; yeni locale bir sonraki çağrıda görünür (navigasyon, yenileme)                             |
| Bir okumanın maliyeti     | Context okuması ve locale'e abonelik                        | Memoize edilmiş bir fonksiyon çağrısı, aynı `key + locale` için aynı nesne                                                    |
| Bir değişikliğin maliyeti | Her tüketicinin yeniden render edilmesi                     | Yok                                                                                                                           |
| Sunucu render'ı           | Sunucu ve tarayıcı aynı locale'i render eder                | Bir istek entegrasyonu dışında sunucu `defaultLocale`'i, tarayıcı ise saklanan locale'i render eder: olası hydration mismatch |
| Bundle                    | Provider kodu                                               | Saklanan locale'i okumak için yaklaşık 100 bayt (gzip), bir sonraki değişikliğe kadar önbellekte                              |

Locale'i yerinde değiştiren veya sunucuda render eden etkileşimli uygulamalarda provider'ı koruyun. Backend'lerde, script'lerde, locale'i URL'den gelen statik sayfalarda (açıkça verin) veya içeriği bir kez okuyan kodda provider olmadan ilerleyin.

Daha fazla ayrıntı için [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md) sayfasına bakın.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md)
