---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "NGX-Translate'den Intlayer'a Geçiş Yapın"
description: "Uyumluluk adaptörünü kullanarak Angular uygulamanızı ngx-translate'den Intlayer'a nasıl geçireceğinizi öğrenin."
keywords:
  - ngx-translate
  - angular
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# NGX-Translate'den Intlayer'a Geçiş Yapın

Angular uygulamanızı `ngx-translate`'den Intlayer'a geçirmek uyumluluk adaptörü sayesinde kolaydır, tüm template'lerinizi yeniden yazma ihtiyacını ortadan kaldırır.

## Ne yapmalı

Aşağıdaki komutu çalıştırarak başlayın:

```bash
npx intlayer init
```

Bu, `intlayer.config.ts` ayarını yapılandırır. `TranslateModule.forRoot()` kurulumlarını ve import takma adlarını `@intlayer/ngx-translate` işaret etmek için uygun şekilde değiştirin.

## Arka Planda Neler Olur

`ngx-translate`, `TranslateService` (`instant`, `get`, `stream`), `{{ 'KEY' | translate:params }}` pipe'ı ve `[translate]` direktifini kullanır.

Arka Planda:

- **Hizmetler:** `TranslateService`, `getIntlayer` ve locale observable'ı sarmalamakta, tamamen aynı yöntemleri sağlamaktadır.
- **Pipe'lar & Direktifler:** Intlayer sözlüklerine karşı doğrudan çözüm için yeniden uygulanmıştır.
- **Yükleyiciler:** `TranslateHttpLoader` kurulumları uyarı saplamalarına dönüştürülür, çünkü Intlayer doğası gereği çevirilerinizi build zamanında (veya standart dinamik importlar aracılığıyla) çözer ve bundle'lar, HTTP yükleyicilerine olan ihtiyacı tamamen ortadan kaldırır.
