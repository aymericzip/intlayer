---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-intlayer Paketi Dokümantasyonu
description: React'a özgü Intlayer uygulaması; React uygulamaları için hook'lar ve sağlayıcılar sunar.
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleşik dokümantasyon
---

# react-intlayer Paketi

`react-intlayer` paketi, Intlayer'ı React uygulamalarına entegre etmek için gerekli araçları sağlar. Çok dilli içeriği işlemek için context sağlayıcıları, hook'lar ve bileşenler içerir.

## Kurulum

```bash
npm install react-intlayer
```

## Dışa Aktarılanlar

### Sağlayıcılar

Import:

```tsx
import "react-intlayer";
```

| Bileşen                   | Açıklama                                                                                                                   | İlgili Doküman                                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | Uygulamanızı saran ve Intlayer bağlamını sağlayan ana provider. Varsayılan olarak editör desteği içerir.                   | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | Editör özellikleri olmadan içeriğe odaklanan bir provider bileşeni. Görsel editöre ihtiyacınız olmadığında bunu kullanın.  | -                                                                                                                             |
| `HTMLProvider`            | HTML ile ilgili uluslararasılaştırma ayarları için provider. HTML etiketleri için bileşen geçersiz kılmalarına izin verir. | -                                                                                                                             |

### Hook'lar

İçe Aktarma:

```tsx
import "react-intlayer";
```

| Hook                   | Açıklama                                                                                                                                  | İlgili Doküman                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Anahtarıyla bir sözlüğü seçen ve içeriğini döndüren istemci tarafı hook'u. Sağlanmazsa bağlamdan locale'i kullanır.                       | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Bir dictionary nesnesini dönüştüren ve geçerli locale için içeriği döndüren hook. `t()` çevirilerini, enum'ları vb. işler.                | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Asenkron dictionary'leri yöneten hook. Promise tabanlı bir dictionary map'i kabul eder ve geçerli locale için çözer.                      | -                                                                                                                       |
| `useDictionaryDynamic` | Anahtara göre yüklenen dinamik sözlükleri işleyen hook. Yükleme durumları için dahili olarak React Suspense kullanır.                     | -                                                                                                                       |
| `useLocale`            | İstemci tarafı hook; geçerli locale'i, varsayılan locale'i, kullanılabilir locale'leri ve locale'i güncellemek için bir fonksiyonu alır.  | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | Context'ten geçerli locale ve ilgili tüm alanları (locale, defaultLocale, availableLocales, setLocale) almak için hook.                   | -                                                                                                                       |
| `useRewriteURL`        | URL yeniden yazmalarını yönetmek için istemci tarafı hook. Geçerli pathname ve locale için bir rewrite kuralı varsa, URL'i günceller.     | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | Anahtara göre iç içe geçmiş içeriğe erişmek için `t()` çeviri fonksiyonunu sağlayan Hook. i18next/next-intl modelini taklit eder.         | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Locale'e bağlı bir `Intl` nesnesi sağlayan Hook. Geçerli locale'i otomatik olarak enjekte eder ve optimize edilmiş önbellekleme kullanır. | -                                                                                                                       |
| `useLocaleStorage`     | Local storage (localStorage) veya çerezlerde (cookies) locale kalıcılığı sağlayan Hook. Getter ve setter fonksiyonları döndürür.          | -                                                                                                                       |
| `useLocaleCookie`      | Kullanımdan kaldırıldı. Bunun yerine `useLocaleStorage` kullanın. Çerezlerde locale kalıcılığını yöneten Hook.                            | -                                                                                                                       |
| `useLoadDynamic`       | React Suspense kullanarak dinamik sözlükleri yüklemek için hook. Bir key ve Promise kabul eder; sonuçları önbelleğe alır.                 | -                                                                                                                       |
| `useIntlayerContext`   | Geçerli Intlayer istemci context değerlerini (locale, setLocale vb.) sağlayan hook.                                                       | -                                                                                                                       |
| `useHTMLContext`       | HTMLProvider bağlamından HTML bileşenlerinin override'larına erişmek için Hook.                                                           | -                                                                                                                       |

### Fonksiyonlar

İçe Aktar:

```tsx
import "react-intlayer";
```

| Fonksiyon            | Açıklama                                                                                                                                                 | İlgili Doküman                                                                                         |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`                  | Sağlanan çok dilli içeriğin çevirisini döndüren istemci tarafı çeviri fonksiyonu. parametre olarak locale verilmezse context locale'i kullanır.          | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md) |
| `getDictionary`      | Dictionary nesnelerini işler ve belirtilen locale için içeriği döndürür. `t()` çevirilerini, enumerasyonları, markdown, HTML vb. işler.                  | -                                                                                                      |
| `getIntlayer`        | Oluşturulan deklarasyondan anahtarıyla bir dictionary alır ve belirtilen locale için içeriğini döndürür. `getDictionary`'nin optimize edilmiş versiyonu. | -                                                                                                      |
| `setLocaleInStorage` | Locale'i depolamada ayarlar (yapılandırmaya bağlı olarak local storage veya cookie).                                                                     | -                                                                                                      |
| `setLocaleCookie`    | Kullanımdan kaldırıldı. Bunun yerine `setLocaleInStorage` kullanın. Locale'i bir cookie'de ayarlar.                                                      | -                                                                                                      |
| `localeInStorage`    | Depolamadan locale alır (localStorage veya çerez).                                                                                                       | -                                                                                                      |
| `localeCookie`       | Kullanımdan kaldırıldı. Bunun yerine `localeInStorage` kullanın. Çerezden locale alır.                                                                   | -                                                                                                      |

### Bileşenler

İçe aktar:

```tsx
import "react-intlayer";
```

veya

```tsx
import "react-intlayer/markdown";
```

| Bileşen            | Açıklama                                                                                                                        | İlgili Doküman                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `MarkdownProvider` | Markdown renderleme bağlamı için sağlayıcı. Markdown öğeleri için özel bileşenlerin geçersiz kılınmasına izin verir.            | -                                                                                                                             |
| `MarkdownRenderer` | Özel bileşenlerle markdown içeriğini render eder. Tüm standart markdown özelliklerini ve Intlayer'a özgü sözdizimini destekler. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/MarkdownRenderer.md) |

### Türler

İçe aktarma:

```tsx
import "react-intlayer";
```

| Tür            | Açıklama                                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| `IntlayerNode` | Intlayer içerik ağacındaki bir düğümü temsil eden tür. Tür güvenli içerik manipülasyonu için kullanılır. |

### Sunucu tarafı (react-intlayer/server)

Import:

```tsx
import "react-intlayer/server";
```

| Dışa Aktarım             | Tür         | Açıklama                                               |
| ------------------------ | ----------- | ------------------------------------------------------ |
| `IntlayerServerProvider` | `Component` | Sunucu tarafı render için sağlayıcı.                   |
| `IntlayerServer`         | `Component` | Intlayer içeriği için sunucu tarafı sarmalayıcı.       |
| `t`                      | `Function`  | Çeviri fonksiyonunun sunucu tarafı versiyonu.          |
| `useLocale`              | `Hook`      | Sunucu tarafında locale'ye erişmek için Hook.          |
| `useIntlayer`            | `Hook`      | `useIntlayer`'in sunucu tarafı sürümü.                 |
| `useDictionary`          | `Hook`      | `useDictionary`'in sunucu tarafı sürümü.               |
| `useI18n`                | `Hook`      | `useI18n`'in sunucu tarafı sürümü.                     |
| `locale`                 | `Function`  | Sunucuda locale'i almak veya ayarlamak için fonksiyon. |
