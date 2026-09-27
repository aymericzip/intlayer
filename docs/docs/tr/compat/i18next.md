---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/i18next: i18next için uyumluluk adaptörü"
description: "i18next kodunuzu koruyun ve Intlayer ile sunun: @intlayer/i18next paketini kurun, import'lar için alias tanımlayın ve adaptörün arka planda neyi değiştirdiğini görün."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/i18next: i18next için uyumluluk adaptörü

Ayrıntılı adım adım eğitim için lütfen tam [i18next Göç Kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md) bakın.

Intlayer mükemmel şekilde `i18next`'in core runtime özelliklerini çoğaltır. Uyumluluk paketini kullanarak, Vanilla uygulamalarınız veya iç modülleriniz tanıdık sözdizimini kullanmaya devam edebilir.

## Ne yapmalı

Başlamak için projede Intlayer'ı başlatın:

```bash
npx intlayer init --interactive
```

Vite kullanıyorsanız, `@intlayer/i18next` importlarını yönlendirmek için Intlayer plugin'ini ekleyin:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## Arka Planda Neler Olur

`i18nextVitePlugin`, `i18next` importlarını `@intlayer/i18next`'e takma ad olarak atamakta, JSON dosya içeriklerinden bundle şişmesini ortadan kaldırmaktadır.

Arka Planda:

- **Instance konfigürasyonu:** `createInstance` ad alanı fallback'lerini doğru ayrıştırmakta ve uygularken Intlayer'ın compilation pipeline'ını sözlük alınması için kullanmaktadır.
- **Interpolasyon:** `{{name}}` değişim ve `$t(key)` nesting'i özyinelemeli olarak destekler.
- **Bağlam & Çoğullar:** `key_male` ve `key_one`/`key_other` gibi sonek biçimlerini tanımlar ve standart `Intl.PluralRules` aracılığıyla değerlendirir.
- **Return Nesneleri:** `returnObjects: true` modu güvenli şekilde Intlayer sözlüklerinden ağaçları ayıklar.

> Bu kütüphanelerin nereden geldiğini anlamak için JavaScript i18n tarihini okuyun.

- [JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md)
