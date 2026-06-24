---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "react-i18next'ten Intlayer'a Geçiş Yapın"
description: "Uyumluluk adaptörünü kullanarak React uygulamanızı react-i18next'ten Intlayer'a nasıl geçireceğinizi öğrenin."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# react-i18next'ten Intlayer'a Geçiş Yapın

Kapsamlı ve ayrıntılı adım adım eğitim için lütfen tam [react-i18next Göç Kılavuzuna](../migration_from_react-i18next_to_intlayer.md) bakın.

Intlayer'ın uyumluluk adaptörünü kullanmak, kaynak kod importlarında hiçbir değişiklik yapmadan `react-i18next`'ten geçiş yapmanıza izin verir.

## Ne yapmalı

Projeyi başlatmak için şunu çalıştırın:

```bash
npx intlayer init
```

Başlatma sırasında Intlayer, `@intlayer/react-i18next` yükleyecek ve `intlayer.config.ts` oluşturacaktır. Bundler'da (Vite gibi) Intlayer plugin'ini uygulayın:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## Arka Planda Neler Olur

`reactI18nextVitePlugin`, core `vite-intlayer` plugin'ini sarmalamakta ve `react-i18next` ve `i18next` için çözüm takma adları enjekte etmektedir, onları `@intlayer/react-i18next` ve `@intlayer/i18next`'e yönlendirmektedir.

Arka Planda:

- **`useTranslation` & `withTranslation`:** Intlayer'ın yerel hook'larını kullanmak için yeniden yazılmıştır, sözlük anahtarlarınız için otomatik TypeScript tamamlama verir. Ad alanlarını sorunsuzca destekler (örneğin `t('namespace:key')`).
- **Çoğullar & Bağlam:** i18next'in sonek tabanlı çoğullaştırmasını (`key_one`, `key_other`) yerel `Intl.PluralRules` ve bağlam sonekleri (`key_male`) kullanarak işler.
- **`<Trans>` Bileşeni:** `components` prop'u, object ve array biçimlerini ve sayılı etiketleri `<1>...</1>` doğrudan React düğümlerinize eşlemesini desteklemek için yeniden uygulanmıştır.
- **`i18n` Instance:** Anahtarları büyük JSON dosyalarını getirmek olmadan doğrudan Intlayer'dan çözer, önemli ölçüde daha düşük bundle boyutlarına neden olur.
