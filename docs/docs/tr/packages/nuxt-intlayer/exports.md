---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: nuxt-intlayer Paket Dokümantasyonu
description: Intlayer için Nuxt entegrasyonu, Nuxt uygulamaları için bir modül sağlar.
keywords:
  - nuxt-intlayer
  - nuxt
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm export'lar için birleştirilmiş dokümantasyon
---

# nuxt-intlayer Paketi

`nuxt-intlayer` paketi, Intlayer'ı Nuxt projenize entegre etmek için bir Nuxt modülü sağlar.

## Kurulum

```bash
npm install nuxt-intlayer
```

## Dışa Aktarımlar

### Modül

`nuxt-intlayer` paketi, Intlayer'ı Nuxt projenize entegre etmek için bir Nuxt modülü sağlar.

İçe Aktarma:

```tsx
import "nuxt-intlayer";
```

veya `nuxt.config.ts`'ye ekleyerek:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Dışa Aktarım | Tür          | Açıklama                                                         |
| ------------ | ------------ | ---------------------------------------------------------------- |
| `default`    | `NuxtModule` | Varsayılan dışa aktarım, Intlayer'ı yapılandıran Nuxt modülüdür. |
