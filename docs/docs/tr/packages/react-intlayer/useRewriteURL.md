---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Hook Dokümantasyonu
description: Intlayer'da yerelleştirilmiş URL yeniden yazımlarını yönetmek için React'e özgü hook.
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# useRewriteURL Hook

`useRewriteURL` hook'u, istemci tarafında yerelleştirilmiş URL yeniden yazımlarını yönetmek için tasarlanmıştır. Kullanıcının locale'ına ve `intlayer.config.ts` içinde tanımlı yeniden yazım kurallarına göre mevcut URL'nin daha "pretty" bir yerelleştirilmiş sürüme düzeltilmesi gerekip gerekmediğini otomatik olarak algılar.

Standart navigasyondan farklı olarak, bu hook adres çubuğundaki URL'yi tam sayfa yenilemesi veya router navigasyon döngüsü tetiklemeden güncellemek için `window.history.replaceState` kullanır.

## Kullanım

Kancayı istemci tarafı bir bileşende basitçe çağırın.

```tsx
import { useRewriteURL } from "react.intlayer";

const MyComponent = () => {
  // Yeniden yazma kuralı varsa adres çubuğunda /fr/tests'i /fr/essais olarak otomatik düzeltir
  useRewriteURL();

  return <div>Bileşenim</div>;
};
```

## Nasıl çalışır

1. **Algılama**: Hook, mevcut `window.location.pathname` ve kullanıcının `locale`'sini izler.
2. **Eşleme**: Geçerli pathname'in, geçerli locale için daha okunaklı bir yerelleştirilmiş takma ada (alias) sahip kanonik bir rota ile eşleşip eşleşmediğini kontrol etmek için dahili Intlayer motorunu kullanır.
3. **URL Düzeltme**: Eğer daha iyi bir alias bulunursa (ve mevcut yoldan farklıysa), hook aynı kanonik içerik ve durumu koruyarak tarayıcı URL'sini güncellemek için `window.history.replaceState` çağrısını yapar.

## Neden kullanmalı?

- **SEO**: Kullanıcıların belirli bir dil için tek, yetkili pretty URL'ye her zaman ulaşmasını sağlar.
- **Tutarlılık**: Bir kullanıcının kanonik bir yolu (ör. `/fr/privacy-notice`) yerel sürümün yerine (ör. `/fr/politique-de-confidentialite`) manuel olarak yazması durumunda oluşabilecek tutarsızlıkları önler.
- **Performans**: Adres çubuğunu, istenmeyen router yan etkilerini veya bileşenlerin yeniden mount edilmesini tetiklemeden günceller.
