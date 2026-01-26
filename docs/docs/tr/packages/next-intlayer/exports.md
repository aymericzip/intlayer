---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer Paket Dokümantasyonu
description: Next.js'e özgü Intlayer entegrasyonu; App Router ve Page Router için middleware ve provider'lar sağlar.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleştirilmiş dokümantasyon
---

# next-intlayer Paketi

`next-intlayer` paketi, Intlayer'ı Next.js uygulamalarına entegre etmek için gerekli araçları sağlar. Hem App Router hem de Page Router'ı destekler; locale tabanlı yönlendirme için middleware içerir.

## Kurulum

```bash
npm install next-intlayer
```

## Dışa Aktarımlar

### Ara Katman (Middleware)

İçe aktarma:

```tsx
import "next-intlayer/middleware";
```

| Function             | Açıklama                                                                                                                                                         | İlgili Doküman                                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Next.js middleware, locale tabanlı yönlendirmeleri ve redirect'leri yönetmek için. Başlıklardan/çerezlerden locale'i algılar ve uygun locale yoluna yönlendirir. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/intlayerMiddleware.md) |

### Yapılandırma Yardımcıları

İçe aktar:

```tsx
import "next-intlayer/server";
```

| Fonksiyon          | Açıklama                                                                                                                                                                                           | İlgili Doküman |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `withIntlayer`     | Next.js yapılandırmasını sarmalamak için asenkron yardımcı; Intlayer sözlüklerinin derleme öncesinde hazırlanmasını sağlar. İçerik dosyalarını hazırlar ve webpack/SWC eklentilerini yapılandırır. | -              |
| `withIntlayerSync` | Next.js yapılandırmasını sarmalamak için senkron yardımcı; asenkronun mümkün veya istenmediği konfigürasyonlar için idealdir. Sunucu başlatıldığında sözlükleri hazırlamaz.                        | -              |

### Sağlayıcılar

İçe aktar:

```tsx
import "next-intlayer";
```

veya

```tsx
import "next-intlayer/server";
```

| Bileşen                  | Açıklama                                                                                                            | İlgili Dok. |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | ----------- |
| `IntlayerClientProvider` | Next.js App Router'daki istemci tarafı bileşenler için sağlayıcı. react-intlayer'dan `IntlayerProvider`'ı sarar.    | -           |
| `IntlayerServerProvider` | Next.js (App Router) içindeki sunucu tarafı bileşenler için sağlayıcı. Sunucuda locale bağlamı sağlar.              | -           |
| `IntlayerServer`         | App Router'da Intlayer içeriği için sunucu tarafı sarmalayıcı. Server Components'te doğru locale yönetimini sağlar. | -           |

### Hook'lar (İstemci tarafı)

Import:

```tsx
import "next-intlayer";
```

Re-exports most hooks from `react-intlayer`.

| Hook                   | Açıklama                                                                                                                                                | İlgili Doküman                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | İstemci tarafında, anahtarı ile bir sözlüğü seçip içeriğini döndüren hook. Sağlanmazsa locale'i context'ten alır.                                       | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Bir sözlük nesnesini dönüştüren ve geçerli locale için içeriği döndüren hook. `t()` çevirilerini, enum'ları vb. işler.                                  | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Asenkron sözlükleri yöneten hook. Promise tabanlı bir sözlük haritası kabul eder ve mevcut locale için çözer.                                           | -                                                                                                                       |
| `useDictionaryDynamic` | Anahtara göre yüklenen dinamik sözlükleri yöneten hook. Yükleme durumları için dahili olarak React Suspense kullanır.                                   | -                                                                                                                       |
| `useLocale`            | İstemci tarafı hook; geçerli locale'i alır ve bunu ayarlamak için bir fonksiyon sağlar. Next.js App Router için navigasyon desteğiyle geliştirilmiştir. | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | URL yeniden yazmalarını yönetmek için istemci tarafı hook. Daha uygun bir yerelleştirilmiş yeniden yazma kuralı varsa URL'yi otomatik olarak günceller. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Next.js Page Router'a özgü yerelleştirme yönetimi için hook. Dil değişikliklerinde yönlendirmeleri ve sayfa yeniden yüklemelerini işler.                | -                                                                                                                       |
| `useI18n`              | Anahtar kullanarak iç içe geçmiş içeriğe erişen `t()` çeviri fonksiyonunu sağlayan hook. i18next/next-intl desenini taklit eder.                        | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Locale ile bağlı bir `Intl` nesnesi sağlayan hook. Geçerli locale'i otomatik olarak enjekte eder ve optimize edilmiş önbellekleme kullanır.             | -                                                                                                                       |
| `useLoadDynamic`       | React Suspense kullanarak dinamik sözlükleri yüklemek için hook. Bir key ve promise kabul eder, sonuçları önbelleğe alır.                               | -                                                                                                                       |

### Fonksiyonlar (Sunucu tarafı)

İçe Aktarma:

```tsx
import "next-intlayer/server";
```

| Fonksiyon              | Açıklama                                                                                                                                                                         | İlgili Doküman                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `t`                    | Next.js App Router için sunucu tarafı çeviri fonksiyonunun sürümü. Sunucunun locale'ı için çokdilli içeriğin çevirisini döndürür.                                                | [çeviri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md) |
| `getLocale`            | Next.js başlıklarından (headers) ve çerezlerden (cookies) mevcut locale'ı çıkaran yardımcı fonksiyon. Server Components, Server Actions veya Route Handlers için tasarlanmıştır. | -                                                                                                 |
| `generateStaticParams` | Yapılandırılmış locale'lere göre Next.js'in dinamik rotaları için statik parametreler üretir. Önceden render (pre-render) için locale nesnelerinden oluşan bir dizi döndürür.    | -                                                                                                 |
| `locale`               | Sunucu bağlamında (App Router) locale'i almak veya ayarlamak için bir fonksiyon. Server Component'lerde locale yönetimi sağlar.                                                  | -                                                                                                 |

### Türler

İçe aktarma:

```tsx
import "next-intlayer";
```

| Tür                    | Açıklama                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Intlayer desteği olan Next.js sayfaları için tip. Locale parametresini içeren generic tip.                                      |
| `Next14PageIntlayer`   | Intlayer desteği olan Next.js 14 sayfaları için tip.                                                                            |
| `Next15PageIntlayer`   | Intlayer desteği olan Next.js 15 sayfaları için tip.                                                                            |
| `NextLayoutIntlayer`   | Intlayer desteği olan Next.js layout'ları için tip. Locale parametresini içeren generic tip.                                    |
| `Next14LayoutIntlayer` | Intlayer desteğine sahip Next.js 14 layout'ları için tip.                                                                       |
| `Next15LayoutIntlayer` | Intlayer desteğine sahip Next.js 15 layout'ları için tip.                                                                       |
| `LocalParams`          | Yerelleştirme içeren Next.js rota parametreleri için tip. `locale` özelliğine sahip bir nesne.                                  |
| `LocalPromiseParams`   | Yerelleştirme içeren Next.js rota parametreleri için tip (async sürüm). `locale` özelliğine sahip bir nesneyle çözülen Promise. |
