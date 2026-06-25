---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: react-native-intlayer Paket Dokümantasyonu
description: Intlayer için React Native desteği, provider'lar, hook'lar, polyfill'ler ve Metro yapılandırması sağlar.
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Bir React Native uygulamasının yalnızca react-native-intlayer'a bağımlı olması için tam react-intlayer API'sini (hook'lar, yardımcı programlar, format/html/markdown alt yolları) yeniden dışa aktar"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Tüm dışa aktarımlar için birleştirilmiş dokümantasyon"
author: aymericzip
---

# react-native-intlayer Paketi

`react-native-intlayer` paketi, Intlayer'ı React Native uygulamalarına entegre etmek için gerekli araçları sağlar. React Native'e hazır `IntlayerProvider` ile tam `react-intlayer` API'sini (hook'lar ve yardımcı programlar) yeniden dışa aktarır, ayrıca React Native tarafından gereken polyfill'leri ve Metro yapılandırmasını içerir.

> Bir React Native uygulamasında **her şeyi** `react-native-intlayer`'dan içe aktarın. `react-intlayer`'ı doğrudan yüklemeniz veya içe aktarmanız gerekmez.

## Kurulum

```bash
npm install react-native-intlayer
```

## Dışa Aktarılanlar

### Provider (Sağlayıcı)

| Bileşen            | Açıklama                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Uygulamanızı saran ve Intlayer bağlamını sağlayan provider bileşeni. Gerekli polyfill'leri otomatik olarak uygular. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Hook'lar ve Yardımcı Programlar

Bunlar `react-intlayer`'dan yeniden dışa aktarılmıştır, bu nedenle doğrudan `react-native-intlayer`'dan içe aktarabilirsiniz:

| Dışa Aktarım                                                                                                      | Açıklama                                                  |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `useIntlayer`                                                                                                     | Bir sözlük anahtarı için yerelleştirilmiş içeriğe erişin. |
| `useLocale`                                                                                                       | Geçerli yerel ayarı okuyun ve değiştirin.                 |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | Sözlük içeriğini çeşitli yollarla yükleyin.               |
| `useI18n`                                                                                                         | i18next uyumlu hook.                                      |
| `t`                                                                                                               | Satır içi çeviri yardımcısı.                              |
| `getIntlayer`, `getDictionary`                                                                                    | Zorunlu içerik alıcıları.                                 |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Yerel ayar kalıcılığı yardımcıları.                       |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Polyfill

| Fonksiyon          | Açıklama                                                                                |
| ------------------ | --------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | React Native'ın Intlayer'ı desteklemesi için gerekli polyfill'leri uygulayan fonksiyon. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> Polyfill, `IntlayerProvider`'ı içe aktardığınızda otomatik olarak uygulanır. `intlayerPolyfill`'i yalnızca provider bağlanmadan önce polyfill'lere ihtiyaç duyuyorsanız manuel olarak çağırın.

### Biçimleyiciler

Sayı, tarih ve diğer Intl tabanlı biçimlendirme hook'ları `/format` alt yolundan kullanılabilir:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Markdown ve HTML Oluşturma

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Metro Yapılandırması

`react-native-intlayer` paketi, Intlayer'ın React Native ile doğru şekilde çalışmasını sağlamak için Metro yapılandırma yardımcıları sağlar.

| Fonksiyon                 | Açıklama                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Intlayer'ı hazırlayan ve Metro yapılandırmasını birleştiren asenkron fonksiyon.                         |
| `configMetroIntlayerSync` | Intlayer kaynaklarını hazırlamadan Metro yapılandırmasını birleştiren senkron fonksiyon.                |
| `exclusionList`           | bundle'dan içerik dosyalarını hariç tutmak için Metro'nun blockList'i için bir RegExp deseni oluşturur. |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
