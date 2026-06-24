---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Svelte I18n'den Intlayer'a Geçiş Yapın"
description: "Uyumluluk adaptörünü kullanarak Svelte uygulamanızı svelte-i18n'den Intlayer'a nasıl geçireceğinizi öğrenin."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Svelte I18n'den Intlayer'a Geçiş Yapın

Svelte uygulamanızı `svelte-i18n`'den Intlayer'a taşımak uyumluluk adaptörünü kullanarak bir an alır.

## Ne yapmalı

Projede başlatma komutunu çalıştırın:

```bash
npx intlayer init
```

Bu, `intlayer.config.ts` oluşturur. SvelteKit / Vite plugin'lerinizin `svelte-i18n`'i `@intlayer/svelte-i18n`'ye sorunsuzca eşleyen takma ad plugin'iyle sarmalandığından emin olun.

## Arka Planda Neler Olur

Svelte-i18n, yoğun şekilde kullanılan store'lara (`$_`, `$t`, `$format`, vb.) ve ICU MessageFormat'a dayanır.

Arka Planda:

- **Store'lar:** Intlayer `svelte-i18n` store'larını proxy yapılandırır. `$_`, mevcut locale'in döndüğü Intlayer çözümleyicisinin türetilen bir deposu olur.
- **Anahtarlar:** Düz anahtarlarınız (örneğin `$_('home.title')`) değerlendirilir, böylece ilk yol segmenti Intlayer sözlüğü temsil eder.
- **ICU Sözdizimi:** Paylaşılan ICU çözümleyicisi tarafından tamamen işlenir (`intl-messageformat` eşdeğer ayrıştırma).
- **Formatter'lar:** `$date`, `$time`, `$number` çağrıları Intlayer'ın yerel core formatter'larına güvenli şekilde yönlendirilir.
- **Babel/SWC Analizi:** Intlayer analizörü, ilgili sözlük chunk'larını otomatik olarak oluşturmak için compilation öncesi `.svelte` kaynak dosyalarındaki Svelte store çağırıcılarını (`$_`) okur.
