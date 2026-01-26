---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Hook Dokümantasyonu
description: Intlayer içinde yerelleştirilmiş URL yeniden yazmalarını yönetmek için Next.js'e özgü hook.
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# useRewriteURL Hook

Next.js için olan `useRewriteURL` hook'u, istemci tarafında çalışan ve yerelleştirilmiş URL yeniden yazmalarını otomatik olarak yöneten bir hook'tur. Kullanıcı locale önekiyle canonical bir yolu manuel olarak yazsa bile, tarayıcı URL'sinin `intlayer.config.ts` içinde tanımlı olan "güzel" yerelleştirilmiş yolu her zaman yansıtmasını sağlar.

Bu hook, gereksiz Next.js router gezinmelerini veya sayfa yenilemelerini önleyerek `window.history.replaceState` kullanarak sessizce çalışır.

## Kullanım

Kancayı layout'unuzun bir parçası olan bir Client Component içinde basitçe çağırın.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // Adres çubuğunda /fr/privacy-notice adresini /fr/politique-de-confidentialite olarak otomatik düzeltir
  useRewriteURL();

  return null;
};
```

## Nasıl çalışır

1. **Yol İzleme**: Hook kullanıcının `locale` değişikliklerini dinler.
2. **Yeniden Yazma Tespiti**: Geçerli `window.location.pathname` değerini yapılandırmanızdaki yeniden yazma kurallarıyla karşılaştırır.
3. **URL Düzeltmesi**: Mevcut yol için daha "güzel" bir yerelleştirilmiş takma ad bulunursa, hook adres çubuğunu güncellemek için `window.history.replaceState` tetikler; kullanıcı aynı dahili sayfada kalır.

## Next.js'te neden kullanmalısınız?

While the `intlayerMiddleware` handles server-side rewrites and initial redirects, the `useRewriteURL` hook ensures that the browser URL stays consistent with your preferred SEO structure even after client-side transitions.

- **Temiz URL'ler**: `/fr/tests` yerine `/fr/essais` gibi yerelleştirilmiş segmentlerin kullanılmasını zorunlu kılar.
- **Performans**: Tam bir router döngüsü başlatmadan veya veriyi yeniden getirmeden adres çubuğunu günceller.
- **SEO Uyumu**: Kullanıcıya ve arama motoru botlarına yalnızca tek bir URL sürümünün görünmesini sağlayarak yinelenen içerik sorunlarını önler.
