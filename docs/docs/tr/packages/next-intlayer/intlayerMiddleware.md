---
createdAt: 2026-01-21
updatedAt: 2026-02-25
title: intlayerMiddleware Dokümantasyonu | next-intlayer
description: next-intlayer paketi için intlayerMiddleware fonksiyonunun nasıl kullanılacağını görün
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.1.7
    date: 2026-02-25
    changes: intlayerMiddleware'i intlayerProxy olarak yeniden adlandır
  - version: 8.0.0
    date: 2026-01-21
    changes: Doküman başlatıldı
---

# intlayerProxy (intlayerMiddleware) Dokümantasyonu

`intlayerProxy` fonksiyonu (`nextjs < 16` için `intlayerMiddleware`), locale tabanlı yönlendirmeleri ve redirect'leri yöneten bir Next.js middleware'idir. Kullanıcının tercih ettiği locale'i otomatik olarak algılar ve gerekirse kullanıcıyı uygun yerelleştirilmiş yola yönlendirir.

## Kullanım

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## Açıklama

Middleware aşağıdaki görevleri yerine getirir:

1. **Locale Algılama**: Kullanıcının locale'ini belirlemek için URL yolu, çerezler ve `Accept-Language` başlığını kontrol eder.
2. **Yönlendirme**: URL'de bir locale öneki yoksa ve yapılandırma bir tane gerektiriyorsa (veya kullanıcının tercihleri temel alındığında), kullanıcıyı yerelleştirilmiş URL'ye yönlendirir.
3. **Çerez Yönetimi**: Algılanan locale'i gelecekteki istekler için bir çerezde saklayabilir.

## Parametreler

Fonksiyon, doğrudan kullanıldığında standart Next.js `NextRequest`'i parametre olarak alır veya yukarıda gösterildiği gibi export edilebilir.

## Yapılandırma

Middleware'i yapılandırmak için `intlayer.config.ts` dosyasındaki `routing` seçeneğini ayarlayabilirsiniz. Daha fazla ayrıntı için [yapılandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) sayfasına bakın.
