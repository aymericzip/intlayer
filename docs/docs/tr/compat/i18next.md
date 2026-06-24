---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "i18next'ten Intlayer'a Geçiş Yapın"
description: "Uyumluluk adaptörünü kullanarak Vanilla JS/TS uygulamanızı i18next'ten Intlayer'a nasıl geçireceğinizi öğrenin."
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

# i18next'ten Intlayer'a Geçiş Yapın

Ayrıntılı adım adım eğitim için lütfen tam [i18next Göç Kılavuzuna](../migration_from_i18next_to_intlayer.md) bakın.

Intlayer mükemmel şekilde `i18next`'in core runtime özelliklerini çoğaltır. Uyumluluk paketini kullanarak, Vanilla uygulamalarınız veya iç modülleriniz tanıdık sözdizimini kullanmaya devam edebilir.

## Ne yapmalı

Başlamak için projede Intlayer'ı başlatın:

```bash
npx intlayer init
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
