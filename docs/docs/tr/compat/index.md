---
createdAt: 2026-06-13
updatedAt: 2026-06-13
priority: 7
title: "Intlayer Uyumluluk Adaptörleri"
description: "Mevcut i18n çözümünüzü sıfır zorlukla Intlayer'a geçirin uyumluluk adaptörleri kullanarak."
keywords:
  - uyumluluk
  - göç
  - uluslararasılaştırma
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Intlayer Uyumluluk Adaptörleri

Büyük bir uygulamayı yeni bir uluslararasılaştırma kütüphanesine geçirmek sinir bozucu olabilir. Bu geçişi kolaylaştırmak için Intlayer, ekosistemde en popüler i18n kütüphaneleri için **uyumluluk adaptörleri** sağlar.

Bu adapter paketleri, mevcut i18n kütüphanelerinizle **tamamen aynı genel API'yi** ortaya koymakla birlikte, çalışma zamanında tüm çeviri işini Intlayer'a devredederler.

## Nasıl çalışır

Bir uyumluluk adaptörü kullandığınızda, uygulamanızın importlarını yeniden yazmanız veya çeviri hook'larınızı ve bileşenlerinizi nasıl kullandığınızı değiştirmenize gerek yoktur. Bunun yerine, Intlayer'ın bundler plugin'leri mevcut importlarınızı otomatik olarak Intlayer uyumluluk paketlerine takma ad olarak atarlar.

Örneğin, bir geliştirici `import { useTranslation } from 'react-i18next'` yerine `import { useTranslation } from '@intlayer/react-i18next'` kullanır (bundler plugin'i tarafından otomatik olarak yapılır) ve uygulama Intlayer sözlüklerinden sunulan çevirilerle çalışmaya devam eder. Anahtarlar ayrıca Intlayer sözlüklerinizle yazılı kontrol edilir\!

## Kullanılabilir Uyumluluk Adaptörleri

Mevcut kütüphanenizi seçin ve sorunsuzca nasıl geçiş yapacağınızı öğrenin:

- [Vue I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/vue-i18n.md)
- [React Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/react-intl.md)
- [Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/svelte-i18n.md)
- [React i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/react-i18next.md)
- [NuxtJS I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/nuxtjs-i18n.md)
- [NGX Translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/ngx-translate.md)
- [Next Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/next-intl.md)
- [Next i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/next-i18next.md)
- [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/i18next.md)
- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/lingui.md)
