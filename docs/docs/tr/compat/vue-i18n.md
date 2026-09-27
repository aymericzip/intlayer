---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/vue-i18n: vue-i18n için uyumluluk adaptörü"
description: "vue-i18n kodunuzu koruyun ve Intlayer ile sunun: @intlayer/vue-i18n paketini kurun, import'lar için alias tanımlayın ve adaptörün arka planda neyi değiştirdiğini görün."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/vue-i18n: vue-i18n için uyumluluk adaptörü

Vue uygulamanız şu anda `vue-i18n` kullanıyorsa, bileşenlerinizi yeniden yazmadan ve çeviri hook'larını çevirme olmadan Intlayer'a geçebilirsiniz. Intlayer, Intlayer'ın güçlü özelliklerini arka planda kullanmakta olan `vue-i18n`'in API'sini mükemmel şekilde yansıtan bir uyumluluk adaptörü sağlar.

## Ne yapmalı

Başlamak için projede başlatma komutunu çalıştırın:

```bash
npx intlayer init --interactive
```

Başlatma sırasında Intlayer konfigürasyon dosyasını (`intlayer.config.ts`) kuracak ve projenizi göç için hazırlayacaktır. Sadece Intlayer plugin'ini Vite konfigürasyonunuza eklemeniz gerekecektir, böylece `vue-i18n` importlarını otomatik olarak takma ad olarak atayabilir.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## Arka Planda Neler Olur

`vueI18nVitePlugin`, bundler'a bir modül takma adı enjekte eder. Codebase'deki `vue-i18n`'in herhangi bir import'u `@intlayer/vue-i18n`'ye saydam olarak yeniden yönlendirilecektir.

**Arka planda, adaptör karmaşık `vue-i18n` sözdizimini doğal olarak işler:**

- **Interpolasyon & Çoğullar:** `{name}` ve list `{0}` interpolasyonlarını çözer. Pipe çoğulları (`"car | cars"`) konumsal semantiklere dayalı olarak Intlayer enumeration/plural düğümlerine dönüştürülür.
- **Biçimler:** `d()` ve `n()` gibi işlevler Intl'yi sarmalamakta, konfigürasyonunuzda tanımlanan `datetimeFormats` ve `numberFormats`'ı onurlandırmaktadır.
- **Global & Yerel Durum:** `global.locale`, Intlayer client'ı tarafından desteklenen bir `WritableComputedRef`'e eşleştirilmiştir, böylece reaktivite tamamen beklenildiği gibi davranır (örneğin `locale.value = 'fr'`).
- **Direktifler:** `v-t` direktifi kaydedilir ve normal şekilde çalışır.

Uygulamanız, içerik Intlayer sözlükleri tarafından desteklendiği için, yazılı kontrol güvenliği, daha iyi bundle optimizasyonu ve sorunsuz CMS entegrasyonu sayesinde tam olarak eskisi gibi render edilmeye devam eder.

> Bu kütüphanelerin nereden geldiğini anlamak için JavaScript i18n tarihini okuyun.

- [JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md)
