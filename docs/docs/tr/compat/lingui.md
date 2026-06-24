---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Lingui'den Intlayer'a Geçiş Yapın"
description: "Uyumluluk adaptörünü kullanarak uygulamanızı Lingui'den Intlayer'a nasıl geçireceğinizi öğrenin."
keywords:
  - lingui
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Lingui'den Intlayer'a Geçiş Yapın

Projeniz şu anda Lingui'nin macro tabanlı derlemesine dayanıyorsa, Intlayer'a geçiş güçlü macro workflow'larınızı korurken onları doğal olarak Intlayer'ın JSON compilation stratejisiyle desteklemenize izin verir.

## Ne yapmalı

Başlamak için projede Intlayer'ı başlatın:

```bash
npx intlayer init
```

Bu `intlayer.config.ts` oluşturur. `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin`'yi build adımınızda Intlayer compiler'ından _önce_ çalıştırmak için tutun. Ardından bundler plugin takma adını `@lingui/core` ve `@lingui/react`'i `@intlayer/lingui`'ye yönlendirmek için kullanın.

## Arka Planda Neler Olur

Lingui macro'ları kullanır (`` t`Hello ${name}` `` ve `<Trans>` gibi) `i18n._(id, values)` gibi runtime çağrılarına derlenir.

Arka Planda:

- **Macro'lar:** Kaynak sözdiziminde hiçbir kesinti olmadan tamamen daha önce yaptığı gibi derlenir.
- **Runtime Çeviri:** Takma ad atanan `i18n._()` Intlayer sözlüklerini kullanır. Hem açıkça adlandırılan ID'ler hem de karma hash ID'ler Intlayer'ın `.po` sync plugin'lerini kullanarak anahtarları güvenli şekilde toplamak ve budamak için tamamen eşlenir.
- **ICU Yetenekleri:** Çoğullaştırma, seçim ve ICU varyantları desteği, Intlayer'ın birleştirilmiş ICU ayrıştırıcısı sayesinde güçlü kalır, aynı render çıktılarını sağlar.
