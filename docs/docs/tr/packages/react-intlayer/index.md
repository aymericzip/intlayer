---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Paket Dokümantasyonu | react-intlayer
description: react-intlayer paketinin nasıl kullanılacağını görün
keywords:
  - Intlayer
  - react-intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
---

# react-intlayer: React uygulamasını uluslararasılaştırmak (i18n) için NPM Paketi

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, React ve Express.js gibi çerçevelerle uyumludur.

**`react-intlayer` paketi**, React uygulamanızı uluslararasılaştırmanızı sağlar. React uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sağlar.

## Neden React Uygulamanızı Uluslararasılaştırasınız?

React uygulamanızı uluslararasılaştırmak, küresel bir kitleye etkili bir şekilde hizmet etmek için gereklidir. Uygulamanızın her kullanıcının tercih ettiği dilde içerik ve mesajlar sunmasına izin verir. Bu yetenek, kullanıcı deneyimini geliştirir ve uygulamanızın farklı dilsel geçmişlere sahip insanlara daha erişilebilir ve ilgili hale getirerek erişimini genişletir.

## Neden Intlayer'ı entegre etmeli?

- **JavaScript Güçlü İçerik Yönetimi**: İçeriğinizi verimli bir şekilde tanımlamak ve yönetmek için JavaScript'in esnekliğini kullanın.
- **Tür Güvenli Ortam**: Tüm içerik tanımlarınızın doğru ve hatasız olmasını sağlamak için TypeScript'i kullanın.
- **Entegre İçerik Dosyaları**: Çevirilerinizi ilgili bileşenlere yakın tutarak sürdürülebilirliği ve netliği artırın.

## Kurulum

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketi yükleyin:

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
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
        ├── Component1
        │   ├── index.content.ts
        │   └── index.tsx
        └── Component2
            ├── index.content.ts
            └── index.tsx
```

### İçeriğinizi Bildirin

`react-intlayer`, [`intlayer` paketi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/index.md) ile çalışacak şekilde yapılmıştır. `intlayer`, kodunuzun herhangi bir yerinde içeriğinizi bildirmenizi sağlayan bir pakettir. Çok dilli içerik bildirimlerini uygulamanıza sorunsuz bir şekilde entegre olan yapılandırılmış sözlüklere dönüştürür.

İçerik bildirim örneği:

```tsx fileName="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
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

export default component1Content;
```

### Kodunuzda İçeriği Kullanın

İçeriğinizi bildirdikten sonra, kodunuzda kullanabilirsiniz. İşte React bileşeninde içeriği kullanma örneği:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // İlgili içerik bildirimini oluşturun

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## React uygulamanızın uluslararasılaştırmasını ustalaşın

Intlayer, React uygulamanızı uluslararasılaştırmanıza yardımcı olacak birçok özellik sağlar.

**Bu özellikler hakkında daha fazla bilgi için [React Internationalization (i18n) with Intlayer and Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md) kılavuzuna Vite ve React uygulaması için, veya [React Internationalization (i18n) with Intlayer and React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md) kılavuzuna React Create App için bakın.**

## `react-intlayer` paketi tarafından sağlanan fonksiyonlar

`react-intlayer` paketi ayrıca uygulamanızı uluslararasılaştırmanıza yardımcı olacak bazı fonksiyonlar sağlar.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
