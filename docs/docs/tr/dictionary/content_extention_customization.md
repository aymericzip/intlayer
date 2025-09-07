---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: İçerik Uzantısı Özelleştirme
description: İçerik bildirim dosyalarınız için uzantıları nasıl özelleştireceğinizi öğrenin. Bu dokümantasyonu takip ederek projenizde koşulları verimli bir şekilde uygulayın.
keywords:
  - İçerik Uzantısı Özelleştirme
  - Dokümantasyon
  - Intlayer
slugs:
  - doc
  - concept
  - content
---

# İçerik Uzantısı Özelleştirme

## İçerik Dosyası Uzantıları

Intlayer, içerik bildirim dosyalarınız için uzantıları özelleştirmenize izin verir. Bu özelleştirme, büyük ölçekli projeleri yönetmede esneklik sağlar ve diğer modüllerle çakışmaları önlemeye yardımcı olur.

### Varsayılan Uzantılar

Varsayılan olarak, Intlayer içerik bildirimleri için aşağıdaki uzantılara sahip tüm dosyaları izler:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Bu varsayılan uzantılar çoğu uygulama için uygundur. Ancak, belirli gereksinimleriniz varsa, yapılandırma talimatları için yapılandırma dokümantasyonunu ziyaret edin.

### İçerik Uzantılarını Özelleştirme

İçerik bildirim dosyalarını tanımlamak için Intlayer'ın kullandığı dosya uzantılarını özelleştirmek için, bunları Intlayer yapılandırma dosyasında belirtebilirsiniz. Bu yaklaşım, izleme sürecinin kapsamını sınırlamanın yapı performansını iyileştirdiği büyük ölçekli projeler için faydalıdır.

Yapılandırmanızda özel içerik uzantılarını tanımlama örneği:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // Özel uzantılarınız
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // Özel uzantılarınız
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // Özel uzantılarınız
  },
};

module.exports = config;
```

Bu örnekte, yapılandırma iki özel uzantı belirtir: `.my_content.ts` ve `.my_content.tsx`. Intlayer, sözlükleri oluşturmak için sadece bu uzantılara sahip dosyaları izleyecektir.

### Özel Uzantıların Faydaları

- **Yapı Performansı**: Büyük projelerde izlenen dosyaların kapsamını azaltmak, yapı performansını önemli ölçüde iyileştirebilir.
- **Çakışma Önleme**: Özel uzantılar, projenizdeki diğer JavaScript veya TypeScript dosyalarıyla çakışmaları önlemeye yardımcı olur.
- **Düzenleme**: Özel uzantılar, içerik bildirim dosyalarınızı projenizin ihtiyaçlarına göre düzenlemenizi sağlar.

### Özel Uzantılar için Kılavuzlar

İçerik dosyası uzantılarını özelleştirirken aşağıdaki kılavuzları göz önünde bulundurun:

- **Benzersizlik**: Çakışmaları önlemek için projeniz içinde benzersiz uzantılar seçin.
- **Tutarlı Adlandırma**: Daha iyi kod okunabilirliği ve bakım için tutarlı adlandırma kuralları kullanın.
- **Ortak Uzantılardan Kaçınma**: Diğer modüller veya kütüphanelerle çakışmaları önlemek için `.ts` veya `.js` gibi ortak uzantıları kullanmaktan kaçının.

## Sonuç

Intlayer'da içerik dosyası uzantılarını özelleştirmek, büyük ölçekli uygulamalarda performansı optimize etmek ve çakışmaları önlemek için değerli bir özelliktir. Bu dokümantasyonda özetlenen kılavuzları takip ederek, içerik bildirimlerinizi etkili bir şekilde yönetebilir ve projenizin diğer bölümleriyle sorunsuz entegrasyonu sağlayabilirsiniz.

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
