---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "i18n-js'den Intlayer'a Geçiş Yapın"
description: "Uyumluluk adaptörünü kullanarak uygulamanızı i18n-js'den Intlayer'a nasıl geçireceğinizi öğrenin."
keywords:
  - i18n-js
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# i18n-js'den Intlayer'a Geçiş Yapın

`i18n-js` kütüphanesinden Intlayer'a geçiş, büyük çeviri konfigürasyonlarını Intlayer'ın yapılandırılmış dosya çözümleme sistemine aktarmak için tasarlanmış, yüksek derecede optimize edilmiş bir göçtür.

## Ne yapmalı

Deponuzda aşağıdaki kurulum komutunu yürütün:

```bash
npx intlayer init
```

`intlayer.config.ts` hazırlandığında, bundler konfigürasyonunuza Intlayer'ın takma adını ekleyebilirsiniz, böylece `i18n-js` importlarının herhangi biri uyumluluk paketi `@intlayer/i18n-js`'yi hedefleyebilir.

## Arka Planda Neler Olur

`i18n-js`, `i18n.t('scope.key', {name})` gibi ifadelerle ad alanlarına erişir ve yerel geri dönüş mekanizmaları ile belirli çoğul eşlemelerine sahiptir.

Arka Planda:

- **Interpolasyon:** Uyumluluk adaptörü, `%{name}` eşlemelerini hedeflenen runtime sözlük değerine kolayca ayrıştırır.
- **Çoğullaştırma:** `one/other` alt anahtarlarının yerini alır ve Intlayer'ın güçlü alttaki çoğul mekanizmalarına karşı (`Intl.PluralRules`) eşler, manuel eşlemeleri ortadan kaldırır.
- **Yerel Ayarlar:** Monolitik dil yüklerini önyüklemede yüklemek yerine, sözlükler mevcut bağlam kurulumuna dayalı olarak optimize bir şekilde sunulur, yerel Intlayer yapılandırmasıyla birlikte çalışır.
