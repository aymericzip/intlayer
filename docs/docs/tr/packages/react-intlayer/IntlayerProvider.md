---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider Bileşen Dokümantasyonu | react-intlayer
description: react-intlayer paketi için IntlayerProvider bileşeninin nasıl kullanılacağını gösterir
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Dokümantasyon başlatıldı
---

# IntlayerProvider Bileşen Dokümantasyonu

`IntlayerProvider` bileşeni, React uygulamalarında Intlayer için ana provider'dır. Tüm çocuklarına Intlayer bağlamını sağlar.

## Kullanım

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Özellikler

| Prop              | Tür                               | Açıklama                                                                            |
| ----------------- | --------------------------------- | ----------------------------------------------------------------------------------- |
| `locale`          | `LocalesValues`                   | Kullanılacak başlangıç locale'ı.                                                    |
| `defaultLocale`   | `LocalesValues`                   | Yedek (fallback) olarak kullanılacak varsayılan locale.                             |
| `setLocale`       | `(locale: LocalesValues) => void` | Locale'i ayarlamak için özel fonksiyon.                                             |
| `disableEditor`   | `boolean`                         | Editörü devre dışı bırakıp bırakmayacağını belirtir.                                |
| `isCookieEnabled` | `boolean`                         | Locale'ı saklamak için çerezlerin etkinleştirilip etkinleştirilmeyeceğini belirtir. |
