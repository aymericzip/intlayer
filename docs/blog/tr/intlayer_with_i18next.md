---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Intlayer ve i18next
description: Optimal uluslararasılaştırma için Intlayer'ı i18next ile entegre edin. İki çerçeveyi karşılaştırın ve birlikte yapılandırmayı öğrenin.
keywords:
  - Intlayer
  - i18next
  - Internationalisation
  - i18n
  - Localisation
  - Translation
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - blog
  - intlayer-with-i18next
---

# Intlayer ve i18next ile Uluslararasılaştırma

i18next, JavaScript uygulamaları için tasarlanmış açık kaynaklı bir uluslararasılaştırma (i18n) çerçevesidir. Yazılım projelerinde çevirileri, yerelleştirmeyi ve dil değiştirmeyi yönetmek için yaygın olarak kullanılır. Ancak, ölçeklenebilirliği ve geliştirmeyi karmaşıklaştırabilecek bazı sınırlamaları vardır.

Intlayer, bu sınırlamaları ele alan başka bir uluslararasılaştırma çerçevesidir ve içerik beyanı ve yönetimine daha esnek bir yaklaşım sunar. i18next ve Intlayer arasındaki bazı temel farkları keşfedelim ve her ikisini de optimal uluslararasılaştırma için nasıl yapılandıracağımızı görelim.

## Intlayer vs. i18next: Temel Farklılıklar

### 1. Sözlük

i18next ile çeviri sözlükleri belirli bir klasörde beyan edilmelidir, bu da uygulama ölçeklenebilirliğini karmaşıklaştırabilir. Aksine, Intlayer içeriğin bileşenle aynı dizinde beyan edilmesine izin verir. Bunun birkaç avantajı vardır:

- **Basitleştirilmiş İçerik Düzenleme**: Kullanıcıların doğru sözlüğü aramak zorunda kalmadan düzenleme yapmaları, hataları azaltır.
- **Otomatik Uyum**: Bir bileşen konum değiştirirse veya kaldırılırsa, Intlayer bunu algılar ve otomatik olarak uyum sağlar.

### 2. Yapılandırma Karmaşıklığı

i18next'i yapılandırmak, Next.js gibi çerçevelerde sunucu tarafı bileşenlerle entegrasyon veya ara yazılım yapılandırma sırasında karmaşık olabilir. Intlayer bu süreci basitleştirir, daha basit yapılandırma sunar.

### 3. Çeviri Sözlüklerinin Tutarlılığı

i18next ile çeviri sözlüklerinin farklı diller arasında tutarlı olmasını sağlamak zor olabilir. Bu tutarsızlık, düzgün ele alınmazsa uygulama çökmelerine yol açabilir. Intlayer, çevrilmiş içeriğe kısıtlamalar uygulayarak hiçbir çevirinin kaçırılmamasını ve çevrilmiş içeriğin doğru olmasını sağlar.

### 4. TypeScript Entegrasyonu

Intlayer, kodunuzda içeriğin otomatik önerilerini sağlayarak geliştirme verimliliğini artıran daha iyi TypeScript entegrasyonu sunar.

### 5. İçeriği Uygulamalar Arasında Paylaşma

Intlayer, içerik beyan dosyalarının birden fazla uygulama ve paylaşılan kütüphane arasında paylaşılmasını kolaylaştırır. Bu özellik, daha büyük bir kod tabanında tutarlı çevirileri korumayı kolaylaştırır.

## Intlayer ile i18next Sözlükleri Nasıl Oluşturulur

### i18next Sözlüklerini Dışa Aktarmak İçin Intlayer'ı Yapılandırma

> Önemli Notlar

> i18next sözlüklerinin dışa aktarılması şu anda beta aşamasındadır ve diğer çerçevelerle 1:1 uyumluluk sağlamaz. Sorunları en aza indirmek için Intlayer tabanlı bir yapılandırmaya bağlı kalmak önerilir.

i18next sözlüklerini dışa aktarmak için Intlayer'ı uygun şekilde yapılandırmanız gerekir. Aşağıda Intlayer'ı hem Intlayer hem de i18next sözlüklerini dışa aktarmak için nasıl ayarlayacağınızın bir örneği vardır.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // Intlayer'ın hem Intlayer hem de i18next sözlüklerini dışa aktaracağını belirt
    dictionaryOutput: ["intlayer", "i18next"],
    // Proje kökünden i18n sözlüklerinin dışa aktarılacağı dizine göreli yol
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // Intlayer'ın hem Intlayer hem de i18next sözlüklerini dışa aktaracağını belirt
    dictionaryOutput: ["intlayer", "i18next"],
    // Proje kökünden i18n sözlüklerinin dışa aktarılacağı dizine göreli yol
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // Intlayer'ın hem Intlayer hem de i18next sözlüklerini dışa aktaracağını belirt
    dictionaryOutput: ["intlayer", "i18next"],
    // Proje kökünden i18n sözlüklerinin dışa aktarılacağı dizine göreli yol
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

module.exports = config;
```

Yapılandırmaya 'i18next' dahil ederek, Intlayer Intlayer sözlüklerine ek olarak özel i18next sözlükleri oluşturur. Yapılandırmadan 'intlayer'ı kaldırmanın React-Intlayer veya Next-Intlayer ile uyumluluğu bozabileceğini unutmayın.

### Sözlükleri i18next Yapılandırmanıza İçe Aktarma

Oluşturulan sözlükleri i18next yapılandırmanıza içe aktarmak için 'i18next-resources-to-backend' kullanabilirsiniz. i18next sözlüklerinizi içe aktarmanın bir örneği burada:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
// i18n/client.ts

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // Sizin i18next yapılandırmanız
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
// i18n/client.mjs

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // Sizin i18next yapılandırmanız
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
// i18n/client.cjs

const i18next = require("i18next");
const resourcesToBackend = "i18next-resources-to-backend";

i18next
  // Sizin i18next yapılandırmanız
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```
