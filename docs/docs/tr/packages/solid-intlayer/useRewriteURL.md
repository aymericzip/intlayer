---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Hook Dokümantasyonu
description: Intlayer'da yerelleştirilmiş URL yeniden yazmalarını yönetmek için Solid'e özgü hook.
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# useRewriteURL Hook

SolidJS için `useRewriteURL` hook'u, istemci tarafında yerelleştirilmiş URL yeniden yazmalarını yönetmek üzere tasarlanmıştır. Geçerli locale ve `intlayer.config.ts` içindeki yapılandırmaya göre tarayıcı adres çubuğunu otomatik olarak daha "gösterişli" yerelleştirilmiş sürüme düzeltir.

`window.history.replaceState` kullanarak gereksiz Solid Router navigasyonlarının önüne geçer.

## Kullanım

Hook'u uygulamanızın bir parçası olan bir bileşen içinde çağırın.

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // Yeniden yazma kuralı varsa adres çubuğundaki /fr/tests'i otomatik olarak /fr/essais şeklinde düzeltir
  useRewriteURL();

  return <>{props.children}</>;
};
```

## Nasıl çalışır

1. **Tespit**: Hook, reaktif `locale()` içindeki değişiklikleri izlemek için `createEffect` kullanır.
2. **Eşleme**: Geçerli `window.location.pathname`'in, mevcut dil için daha 'güzel' yerelleştirilmiş bir takma ada (alias) sahip canonical bir rota olup olmadığını belirler.
3. **URL Düzeltme**: Daha uygun bir takma ad bulunursa, hook adres çubuğunu iç gezinme durumunu etkilemeden veya bileşen yeniden render'larına neden olmadan güncellemek için `window.history.replaceState` çağırır.

## Neden kullanılır?

/// **Yetkili URL'ler**: Her yerelleştirilmiş içerik sürümü için tek bir URL uygulanmasını sağlar; bu SEO için çok önemlidir.

- **Geliştirici Kolaylığı**: İç rota tanımlarınızı kanonik tutmanıza izin verirken, dışarıya kullanıcı dostu, yerelleştirilmiş yollar sunmanızı sağlar.
- **Tutarlılık**: Kullanıcılar tercih ettiğiniz yerelleştirme kurallarına uymayan bir yolu elle yazdığında URL'leri düzeltir.

---
