---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Paket Dokümantasyonu | next-intlayer
description: next-intlayer paketinin nasıl kullanılacağını görün
keywords:
  - Intlayer
  - next-intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
---

# next-intlayer: Next.js uygulamasını uluslararasılaştırmak (i18n) için NPM Paketi

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, Next.js ve Express.js gibi çerçevelerle uyumludur.

**`next-intlayer` paketi**, Next.js uygulamanızı uluslararasılaştırmanızı sağlar. Next.js uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sağlar. Ek olarak, Intlayer'ı [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ile entegre etmek için Next.js eklentisini ve kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için ara yazılımı içerir.

## Neden Next.js Uygulamanızı Uluslararasılaştırasınız?

Next.js uygulamanızı uluslararasılaştırmak, küresel bir kitleye etkili bir şekilde hizmet etmek için gereklidir. Uygulamanızın her kullanıcının tercih ettiği dilde içerik ve mesajlar sunmasına izin verir. Bu yetenek, kullanıcı deneyimini geliştirir ve uygulamanızın farklı dilsel geçmişlere sahip insanlara daha erişilebilir ve ilgili hale getirerek erişimini genişletir.

## Neden Intlayer'ı entegre etmeli?

- **JavaScript Güçlü İçerik Yönetimi**: İçeriğinizi verimli bir şekilde tanımlamak ve yönetmek için JavaScript'in esnekliğini kullanın.
- **Tür Güvenli Ortam**: Tüm içerik tanımlarınızın doğru ve hatasız olmasını sağlamak için TypeScript'i kullanın.
- **Entegre İçerik Dosyaları**: Çevirilerinizi ilgili bileşenlere yakın tutarak sürdürülebilirliği ve netliği artırın.

## Kurulum

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketi yükleyin:

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## Kullanım Örneği

Intlayer ile, kod tabanınızın herhangi bir yerinde içeriğinizi yapılandırılmış bir şekilde bildirebilirsiniz.

Varsayılan olarak, Intlayer `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` uzantısına sahip dosyaları tarar.

> [yapılandırma dosyasında](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) `contentDir` özelliğini ayarlayarak varsayılan uzantıyı değiştirebilirsiniz.

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.ts
        │   └── index.tsx
        └── ServerComponent
            ├── index.content.ts
            └── index.tsx
```

### İçeriğinizi Bildirin

`next-intlayer`, [`intlayer` paketi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/index.md) ile çalışacak şekilde yapılmıştır. `intlayer`, kodunuzun herhangi bir yerinde içeriğinizi bildirmenizi sağlayan bir pakettir. Çok dilli içerik bildirimlerini uygulamanıza sorunsuz bir şekilde entegre olan yapılandırılmış sözlüklere dönüştürür.

İçerik bildirim örneği:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "Eksi bir arabadan az",
      "-1": "Eksi bir araba",
      "0": "Araba yok",
      "1": "Bir araba",
      ">5": "Bazı arabalar",
      ">19": "Çok araba",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

### Kodunuzda İçeriği Kullanın

İçeriğinizi bildirdikten sonra, kodunuzda kullanabilirsiniz. İşte React bileşeninde içeriği kullanma örneği:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // İlgili içerik bildirimini oluşturun

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Next.js uygulamanızın uluslararasılaştırmasını ustalaşın

Intlayer, Next.js uygulamanızı uluslararasılaştırmanıza yardımcı olacak birçok özellik sağlar. İşte bazı temel özellikler:

- **Sunucu bileşenlerinin uluslararasılaştırması**: Intlayer, sunucu bileşenlerinizi istemci bileşenlerinizle aynı şekilde uluslararasılaştırmanızı sağlar. Bu, hem istemci hem de sunucu bileşenleri için aynı içerik bildirimlerini kullanabileceğiniz anlamına gelir.
- **Yerel Ayar Algılama için Ara Yazılım**: Intlayer, kullanıcının tercih ettiği yerel ayarı algılamak için ara yazılım sağlar. Bu ara yazılım, kullanıcının tercih ettiği yerel ayarı algılamak ve [yapılandırmada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) belirtildiği gibi uygun URL'ye yönlendirmek için kullanılır.
- **Meta verilerin uluslararasılaştırması**: Intlayer, Next.js tarafından sağlanan `generateMetadata` fonksiyonunu kullanarak sayfa başlığı gibi meta verilerinizi uluslararasılaştırmanız için bir yol sağlar. Meta verilerinizi çevirmek için `getTranslation` fonksiyonunu kullanabilirsiniz.
- **sitemap.xml ve robots.txt'nin uluslararasılaştırması**: Intlayer, sitemap.xml ve robots.txt dosyalarınızı uluslararasılaştırmanızı sağlar. Siteniz için çok dilli URL'ler oluşturmak için `getMultilingualUrls` fonksiyonunu kullanabilirsiniz.
- **URL'lerin uluslararasılaştırması**: Intlayer, `getMultilingualUrls` fonksiyonunu kullanarak URL'lerinizi uluslararasılaştırmanızı sağlar. Bu fonksiyon, siteniz için çok dilli URL'ler oluşturur.

**Bu özellikler hakkında daha fazla bilgi için [Next.js Internationalization (i18n) with Intlayer and Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md) kılavuzuna bakın.**

## `next-intlayer` paketi tarafından sağlanan fonksiyonlar

`next-intlayer` paketi ayrıca uygulamanızı uluslararasılaştırmanıza yardımcı olacak bazı fonksiyonlar sağlar.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md)

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
