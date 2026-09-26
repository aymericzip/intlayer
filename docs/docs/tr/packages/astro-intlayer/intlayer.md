---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: intlayer Entegrasyon Dokümantasyonu | astro-intlayer
description: astro.config.mjs dosyasında intlayer Astro entegrasyonunu nasıl yapılandıracağınızı ve kullanacağınızı öğrenin.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - entegrasyon
  - i18n
  - uluslararasılaştırma
  - dokümantasyon
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Entegrasyon dokümantasyonu ara yazılım ve hook ayrıntılarıyla güncellendi"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Başlangıç dokümantasyonu"
author: aymericzip
---

# intlayer Astro Entegrasyon Dokümantasyonu

Astro için `intlayer` entegrasyonu, projenizi çok dilli uluslararasılaştırma (i18n) için yapılandırır. Derleme zamanı sözlük hazırlığı, Vite eklenti enjeksiyonu, otomatik istek ara yazılımı kaydı ve yerelleştirilmiş önceden oluşturulmuş sayfaların çıktısını yönetir.

## Kullanım

`astro.config.mjs` dosyanıza `intlayer()` ekleyin:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Astro CLI'nin codemod'u (`astro add astro-intlayer`) da desteklenen varsayılan bir içe aktarma oluşturur:

```ts
import intlayer from "astro-intlayer";
```

## Açıklama

Entegrasyon, Astro'nun derleme ve çalışma zamanı yaşam döngüsüne kancalanır:

1. **Yapılandırma Kurulumu (`astro:config:setup`)**:
   - **Sözlük Hazırlığı**: Derleme çalışmadan önce Intlayer sözlüklerini ve oluşturulan tipleri hazırlar.
   - **Vite Eklentileri**: Vite takma adları (sorunsuz sözlük içe aktarımlarını etkinleştiren), yerel ayar yönlendirme proxy'leri ve derleme budaması için eklentiler enjekte eder.
   - **Ara Yazılım Kaydı**: Projenizin ara yazılım zincirine `astro-intlayer/middleware`'i otomatik olarak enjekte eder ve gelen her istekte `Astro.locals.intlayer`'ı doldurur.
2. **Derleme Tamamlandı (`astro:build:done`)**:
   - **Sayfa Yeniden Yazımları**: Yerelleştirilmiş URL yeniden yazım kurallarını inceler ve önceden oluşturulmuş HTML sayfalarını bunlara karşılık gelen yerelleştirilmiş yollarda yayınlar.

## Kutudan Çıktığı Gibi Sağlananlar

Yapılandırıldıktan sonra, Astro uygulamanız hemen şunları kullanabilir:

- `.astro` bileşen frontmatter'ı içinde `useIntlayer`, `useDictionary` ve `useLocale` hook'ları.
- Astro uç noktalarında ve sayfalarında `Astro.locals.intlayer` nesnesi.
- Reaktif güncellemelerle aynı API'yi yansıtan `<script>` bloklarındaki istemci tarafı içe aktarımları.
- `astro-intlayer/format` altındaki yerleşik biçimlendiriciler (`useDate`, `useNumber`, `useCurrency`, vb.).

## İlgili Dokümantasyon

- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useLocale.md)
- [Ara Yazılım `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/onRequest.md)
