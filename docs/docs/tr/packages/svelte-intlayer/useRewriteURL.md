---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Hook Dokümantasyonu
description: Intlayer'da yerelleştirilmiş URL yeniden yazmalarını yönetmek için Svelte'e özgü hook.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# useRewriteURL Kancası

Svelte için `useRewriteURL` hook'u, istemci tarafında yerelleştirilmiş URL yeniden yazmalarını yönetmek üzere tasarlanmıştır. Mevcut locale ve `intlayer.config.ts` içindeki yapılandırmaya göre tarayıcının URL'sini otomatik olarak daha okunaklı yerelleştirilmiş sürümüne düzeltir.

Tam SvelteKit navigasyonlarını tetiklemeden, URL'yi `window.history.replaceState` kullanarak sessizce günceller.

## Kullanım

Hook'u bir Svelte bileşeni içinde çağırın.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // Yeniden yazma kuralı varsa adres çubuğunda /fr/tests'i otomatik olarak /fr/essais olarak düzeltir
  useRewriteURL();
</script>

<slot />
```

## Nasıl çalışır

1. **Reaktif Güncellemeler**: Hook, Intlayer `locale` deposuna abone olur.
2. **Algılama**: Locale her değiştiğinde (veya mount sırasında), mevcut `window.location.pathname`'in yeniden yazma kurallarınızda tanımlı daha 'pretty' (göze hoş gelen) yerelleştirilmiş bir takma ada sahip olup olmadığını hesaplar.
3. **URL Düzeltme**: Eğer daha 'pretty' bir yol bulunursa, hook adres çubuğunu tam sayfa yeniden yüklemesi veya SvelteKit navigasyon mantığını tetiklemeden güncellemek için `window.history.replaceState` çağırır.

## Neden kullanılır?

- **SEO En İyi Uygulamaları**: Arama motorlarının yalnızca URL'lerinizin pretty, yerelleştirilmiş sürümünü dizine eklediğinden emin olur.
- **Geliştirilmiş UX**: Elle girilen URL'leri tercih ettiğiniz adlandırma yapısını yansıtacak şekilde düzeltir.
- **Sessiz Güncellemeler**: Adres çubuğunu bileşen ağacını veya gezinme geçmişini etkilemeden değiştirir.
