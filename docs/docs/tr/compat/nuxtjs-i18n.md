---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "NuxtJS I18n'den Intlayer'a Geçiş Yapın"
description: "Uyumluluk adaptörünü kullanarak Nuxt.js uygulamanızı @nuxtjs/i18n'den Intlayer'a nasıl geçireceğinizi öğrenin."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# NuxtJS I18n'den Intlayer'a Geçiş Yapın

Nuxt uygulamanızı `@nuxtjs/i18n`'den Intlayer'a geçirmek Nuxt adapter modülü kullanılarak sorunsuz bir işlemdir.

## Ne yapmalı

Projeyi başlatmak için şunu çalıştırın:

```bash
npx intlayer init
```

Bu `intlayer.config.ts` ayarını yapılandıracaktır. Ardından Intlayer Nuxt modülünü (örneğin `@intlayer/nuxt-i18n`) `nuxt.config.ts` modules dizisine ekleyin. Bu uygulamanız için uyumluluk konfigürasyonunu otomatik olarak uygular.

## Arka Planda Neler Olur

`@nuxtjs/i18n`, `vue-i18n`'i sarmalamakta, Nuxt'a özgü routing composable'ları (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`) sağlamaktadır.

Arka Planda:

- **Çeviriler:** Tüm string çeviri görevleri için doğal olarak `@intlayer/vue-i18n` uyumluluk katmanına bağlıdır (`vue-i18n` biçimlerini, pipe çoğullarını ve reaktiviteyi tam olarak desteklemektedir).
- **Routing:** Intlayer'ın yerelleştirilmiş URL yardımcılarını kullanarak routing composable'larını yansıtır.
- **Konfigürasyon:** `availableLocales` ve varsayılan ayarları doğrudan `intlayer.config.ts` dosyasından okuyarak Nuxt sayfalarını otomatik olarak koordine eder.
