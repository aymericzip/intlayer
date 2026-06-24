---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Next Translate'den Intlayer'a Geçiş Yapın"
description: "Uyumluluk adaptörünü kullanarak Next.js uygulamanızı next-translate'den Intlayer'a nasıl geçireceğinizi öğrenin."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Next Translate'den Intlayer'a Geçiş Yapın

`next-translate`'den Intlayer'a geçiş, mevcut sözdizimini ve etiketleri koruyan neredeyse drop-in bir değişikliktir.

## Ne yapmalı

Intlayer'ı projede başlatın:

```bash
npx intlayer init
```

CLI konfigürasyonunuzu oluşturacaktır. Daha sonra Intlayer plugin'ini `next.config.ts` dosyasına uygulayabilirsiniz, bu da `next-translate/useTranslation`'ı `@intlayer/next-translate`'ye eşleyen build zamanı alt yolu takma adlarını enjekte eder.

## Arka Planda Neler Olur

`next-translate`, `useTranslation('ns')`, `t('ns:key.path')` ve `<Trans>` bileşeni gibi hook'lar sağlar.

Arka Planda:

- **Interpolasyon & Çoğullar:** `react-i18next` adaptör davranışına yakından bağlıdır. Dinamik olarak işlenen `{{var}}` yer tutuşları ve `key_0`, `key_one` ve `key_other` gibi sonekleri eşlenen çoğullaştırma.
- **`<Trans>` Bileşeni:** HTML benzeri tag ayrıştırması ve dizi tabanlı `components` prop'u için doğrudan desteklenir.
- **Ad Alanları:** Alt yol takma adlandırması, `useTranslation` referanslarınızın manuel değişiklik olmadan doğru iç sözlük ad alanlarına başvurmasını sağlar.
