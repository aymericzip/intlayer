---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-native-intlayer Paket Dokümantasyonu
description: Intlayer için React Native desteği, provider'lar ve polyfill'ler sağlar.
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
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleştirilmiş dokümantasyon
---

# react-native-intlayer Paketi

`react-native-intlayer` paketi, Intlayer'ı React Native uygulamalarına entegre etmek için gerekli araçları sağlar. Bir provider ve locale desteği için polyfill'ler içerir.

## Kurulum

```bash
npm install react-native-intlayer
```

## Dışa Aktarılanlar

### Provider (Sağlayıcı)

| Bileşen            | Açıklama                                                             |
| ------------------ | -------------------------------------------------------------------- |
| `IntlayerProvider` | Uygulamanızı saran ve Intlayer bağlamını sağlayan provider bileşeni. |

İçe Aktarma:

```tsx
import "react-native-intlayer";
```

### Polyfill

| Fonksiyon          | Açıklama                                                                                |
| ------------------ | --------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | React Native'ın Intlayer'ı desteklemesi için gerekli polyfill'leri uygulayan fonksiyon. |

İçe Aktarma:

```tsx
import "react-native-intlayer";
```

### Metro Yapılandırması

react-native-intlayer paketi, Intlayer'ın React Native ile doğru şekilde çalışmasını sağlamak için Metro yapılandırma yardımcıları sağlar.

| Fonksiyon                 | Açıklama                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Intlayer'ı hazırlayan ve Metro yapılandırmasını birleştiren asenkron fonksiyon.                         |
| `configMetroIntlayerSync` | Intlayer kaynaklarını hazırlamadan Metro yapılandırmasını birleştiren senkron fonksiyon.                |
| `exclusionList`           | bundle'dan içerik dosyalarını hariç tutmak için Metro'nun blockList'i için bir RegExp deseni oluşturur. |

İçe Aktarım:

```tsx
import "react-native-intlayer/metro";
import "react-native-intlayer/metro";
```
