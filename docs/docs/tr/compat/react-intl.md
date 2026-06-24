---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "React Intl'den Intlayer'a Geçiş Yapın"
description: "Uyumluluk adaptörünü kullanarak React uygulamanızı react-intl'den Intlayer'a nasıl geçireceğinizi öğrenin."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# React Intl'den Intlayer'a Geçiş Yapın

React uygulamanız `react-intl` (FormatJS) kullanıyorsa, Intlayer'a geçiş kolaydır. Uyumluluk katmanımız sorunsuzca ICU MessageFormat ve mevcut tüm `Formatted*` bileşenlerini işler.

## Ne yapmalı

Projede başlatma komutunu çalıştırarak başlayın:

```bash
npx intlayer init
```

Ardından konfigürasyonunuzda Intlayer Vite veya Next.js plugin'ini ayarlayın. Bu plugin, `react-intl` importlarını `@intlayer/react-intl`'ye yönlendirmek için build zamanı takma adlarını enjekte eder.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## Arka Planda Neler Olur

Bundler plugin'i `react-intl`'yi `@intlayer/react-intl`'ye takma ad olarak atamaktadır. Büyük JSON dosyalarını manuel olarak ayrıştırmak ve uygulamanızı bir `IntlProvider`'da sarmalamak yerine, Intlayer plugin'i statik olarak anahtarları ayıklar ve çalışma zamanında Intlayer sözlükleri kullanır.

Arka Planda:

- **ICU MessageFormat:** Intlayer, ICU çoğullaştırmasını, seçimini, tarih/sayı biçimlendirmesini ve zengin metin etiketlerini doğal olarak destekleyen `resolveMessage(..., 'icu')` çözümleyicisini kullanır.
- **Method & JSX Çağırıcılar:** `intl.formatMessage({ id: 'a.b' })` ve `<FormattedMessage id="a.b">` Intlayer compiler plugin'leri (`@intlayer/babel` / `@intlayer/swc`) tarafından tanımlanır, düz noktalı anahtarlar dönüştürülür, böylece ilk segment Intlayer sözlük anahtarına doğru çözülür.
- **Formatter'lar:** `<FormattedNumber>`, `<FormattedDate>`, vb., `Intl` kullanan yerel `core/formatters`'a köprü atılmaktadır.
