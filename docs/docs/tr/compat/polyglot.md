---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Polyglot.js'den Intlayer'a Geçiş Yapın"
description: "Uyumluluk adaptörünü kullanarak Polyglot.js'den Intlayer'a nasıl geçiş yapacağınızı öğrenin."
keywords:
  - polyglot
  - airbnb
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Polyglot.js'den Intlayer'a Geçiş Yapın

Airbnb'nin Polyglot.js'sini kullanıyorsanız, uyumluluk katmanını kullanarak Intlayer'a geçiş son derece basittir.

## Ne yapmalı

Projede başlatma komutunu çalıştırın:

```bash
npx intlayer init
```

Bu `intlayer.config.ts` oluşturur. Daha sonra bundler plugin takma adını Polyglot importlarını `@intlayer/polyglot`'ye saydam şekilde yönlendirmek için kullanabilirsiniz.

## Arka Planda Neler Olur

Polyglot.js sözdizimi tipik olarak `polyglot.t('key', {name})` ile `%{name}` interpolasyonları ve `smart_count` çoğulları `"singular |||| plural"` ile ayrılmış.

Arka Planda:

- **Interpolasyon:** Uyumluluk katmanı `%{var}` yer tutuşlarını doğal olarak işler.
- **Çoğullar:** String `||||` üzerinde bölünür ve etkin locale'ye göre yerel `Intl.PluralRules` aracılığıyla değerlendirilir, Polyglot'un locale başına kendi bucket sırasını yansıtmaktadır.
- **Sözlükler:** `new Polyglot()` için büyük JSON konfigürasyonları sağlama ihtiyacını atlatır – Intlayer sözlükleri dinamik olarak işler ve otomatik olarak budamaktadır.
