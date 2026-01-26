---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Paket Dokümantasyonu
description: Intlayer'ın çekirdek paketi; uluslararasılaştırma için temel fonksiyonları ve türleri sağlar.
keywords:
  - intlayer
  - çekirdek
  - uluslararasılaştırma
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleştirilmiş dokümantasyon
---

# intlayer Paketi

`intlayer` paketi, Intlayer ekosisteminin çekirdek kütüphanesidir. JavaScript ve TypeScript uygulamalarında çokdilli içeriğin yönetimi için gerekli temel fonksiyonları, türleri ve yardımcı araçları sağlar.

## Kurulum

```bash
npm install intlayer
```

## Dışa Aktarımlar

### Yapılandırma

İçe Aktarma:

```tsx
import "intlayer";
```

| Değişken           | Tip                    | Açıklama                                                                                       | İlgili Doküman                                                                                                          |
| ------------------ | ---------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | Intlayer yapılandırma nesnesi.                                                                 | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Intlayer yapılandırma nesnesini döner. (**Deprecated**: Bunun yerine `configuration` kullanın) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | Desteklenen tüm locale'lerin listesi.                                                          | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | Gerekli tüm locale'lerin listesi.                                                              | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | Varsayılan locale.                                                                             | -                                                                                                                       |

### Türler

İçe Aktarma:

```tsx
import "intlayer";
```

| Tür                   | Açıklama                                                            |
| --------------------- | ------------------------------------------------------------------- |
| `Dictionary`          | Bir sözlüğün yapısını tanımlamak için kullanılan Dictionary türü.   |
| `DeclarationContent`  | (**Kullanımdan kaldırıldı**) Bunun yerine `Dictionary<T>` kullanın. |
| `IntlayerConfig`      | Intlayer yapılandırmasını tanımlayan tür.                           |
| `ContentNode`         | Sözlük içeriğindeki bir düğüm.                                      |
| `Locale`              | Bir locale'i temsil eden tip.                                       |
| `LocalesValues`       | Bir locale için olası değerler.                                     |
| `StrictModeLocaleMap` | Sıkı tip denetimine sahip locale haritası.                          |

### İçerik Fonksiyonları

İçe aktar:

```tsx
import "intlayer";
```

| Fonksiyon                | Tür        | Açıklama                                                                                                      | İlgili Doküman                                                                                         |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t` / `getTranslation`   | `Function` | Mevcut locale'a göre içeriği seçer.                                                                           | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md) |
| `enu` / `getEnumeration` | `Function` | Bir miktara göre içeriği seçer.                                                                               | [enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | Bir boolean koşula göre içeriği seçer.                                                                        | [condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/condition.md)     |
| `gender`                 | `Function` | Cinsiyete göre içeriği seçer.                                                                                 | [gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender.md)           |
| `insert`                 | `Function` | İçerik dizesine değerler ekler.                                                                               | [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md)     |
| `nest` / `getNesting`    | `Function` | Başka bir sözlüğü iç içe yerleştirir.                                                                         | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/nesting.md)         |
| `md`                     | `Function` | Markdown içeriğini işler.                                                                                     | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/markdown.md)       |
| `html`                   | `Function` | HTML içeriğini işler.                                                                                         | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/html.md)               |
| `file`                   | `Function` | Dosya içeriğini işler.                                                                                        | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/file.md)               |
| `getDictionary`          | `Function` | Anahtar, içerik gibi sözlüklere benzeyen nesneleri işler. `t()` çevirilerini, numaralandırmaları, vb. işler.  | -                                                                                                      |
| `getIntlayer`            | `Function` | `getDictionary`'e dayanır, ancak oluşturulan bildirimden sözlüğün optimize edilmiş bir sürümünü enjekte eder. | -                                                                                                      |

### Yerelleştirme Yardımcıları

İçe Aktar:

```tsx
import "intlayer";
```

| Fonksiyon              | Tür         | Açıklama                                           | İlgili Doküman                                                                                                                  |
| ---------------------- | ----------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Fonksiyon` | Bir dizeden veya yoldan locale'i algılar.          | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function`  | Bir locale'in dil kısmını alır.                    | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function`  | Bir locale'in görüntü adını alır.                  | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function`  | Kanonik bir yolu yerelleştirilmiş bir yola çözer.  | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function`  | Yerelleştirilmiş bir yolu kanonik hale çözer.      | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function`  | Yerelleştirilmiş bir URL oluşturur.                | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function`  | Desteklenen tüm locale'lar için URL'ler oluşturur. | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function`  | Yoldan locale önekini kaldırır.                    | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function`  | Yoldan locale önekini alır.                        | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function`  | Metin yönünü (LTR/RTL) döndürür.                   | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function`  | Yerel önekini doğrular.                            | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/validatePrefix.md)             |

### Tarayıcı Yardımcıları

İçe aktar:

```tsx
import "intlayer";
```

| Function               | Type       | Description                                      |
| ---------------------- | ---------- | ------------------------------------------------ |
| `getBrowserLocale`     | `Function` | Tarayıcının tercih edilen yerel ayarını algılar. |
| `getCookie`            | `Function` | Bir çerez değerini getirir.                      |
| `getLocaleFromStorage` | `Function` | Depolamadan yerel ayarı getirir.                 |
| `setLocaleInStorage`   | `Function` | Yerel ayarı depolamaya kaydeder.                 |

### Formatlayıcılar

İçe aktar:

```tsx
import "intlayer";
```

| Fonksiyon      | Açıklama                                   |
| -------------- | ------------------------------------------ |
| `number`       | Bir sayıyı biçimlendirir.                  |
| `currency`     | Bir para birimi değerini biçimlendirir.    |
| `percentage`   | Yüzde değerini biçimlendirir.              |
| `compact`      | Bir sayıyı kompakt formatta biçimlendirir. |
| `date`         | Bir tarihi biçimlendirir.                  |
| `relativeTime` | Göreli zamanı biçimlendirir.               |
| `units`        | Birimli bir değeri biçimlendirir.          |
| `Intl`         | Standart Intl nesnesi.                     |
