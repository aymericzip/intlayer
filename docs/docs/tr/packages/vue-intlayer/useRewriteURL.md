---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Composable Dokümantasyonu
description: Intlayer'da yerelleştirilmiş URL yeniden yazmalarını yönetmek için Vue'ye özgü composable.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# useRewriteURL Composable

Vue 3 için `useRewriteURL` composable'ı, istemci tarafında yerelleştirilmiş URL yeniden yazmalarını yönetmek için tasarlanmıştır. Kullanıcının mevcut localesine ve `intlayer.config.ts` içindeki yapılandırmaya göre tarayıcıdaki URL'yi otomatik olarak daha okunaklı yerelleştirilmiş sürüme düzeltir.

Çalışması `window.history.replaceState` kullanılarak gerçekleşir; bu, istenmeyen Vue Router gezinmelerinin tetiklenmesini önler.

## Kullanım

Composable'i `setup()` fonksiyonunuz içinde veya `<script setup>` içinde çağırın.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// Yazım kuralı varsa adres çubuğundaki /fr/tests'i otomatik olarak /fr/essais olarak düzeltir
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## Nasıl çalışır

1. **Reaktif İzleme**: Bu composable, kullanıcının `locale`'u üzerinde bir `watch` kurar.
2. **Yeniden Yazma Eşleştirmesi**: Locale değiştiğinde (veya mount sırasında) mevcut `window.location.pathname`'in daha güzel bir yerelleştirilmiş takma ada sahip kanonik bir route ile eşleşip eşleşmediğini kontrol eder.
3. **URL Düzeltme**: Daha güzel bir takma ad bulunursa, composable sayfayı yeniden yüklemeden veya router durumunu kaybetmeden adres çubuğunu güncellemek için `window.history.replaceState` çağırır.

## Neden kullanmalı?

- **SEO Optimizasyonu**: Arama motorlarının URL'lerinizin yetkili yerelleştirilmiş sürümünü indekslemesini sağlar.
- **Geliştirilmiş UX**: Manuel girilen URL'leri tercih ettiğiniz isimlendirmeye göre düzeltir (ör. `/fr/a-propos` yerine `/fr/about`).
- **Düşük Yük**: URL'yi bileşen yaşam döngülerini veya navigation guard'ları yeniden tetiklemeden sessizce günceller.

---
