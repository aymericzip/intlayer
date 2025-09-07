---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Paket Dokümantasyonu | intlayer
description: intlayer paketinin nasıl kullanılacağını görün
keywords:
  - Intlayer
  - intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
---

# intlayer: Çok Dilli Sözlük Yönetmek için NPM Paketi (i18n)

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, Next.js ve Express.js gibi çerçevelerle uyumludur.

**`intlayer` paketi**, kodunuzun herhangi bir yerinde içeriğinizi bildirmenizi sağlar. Çok dilli içerik bildirimlerini uygulamanıza sorunsuz bir şekilde entegre olan yapılandırılmış sözlüklere dönüştürür. TypeScript ile **Intlayer**, geliştirme sürecinizi daha güçlü ve verimli araçlar sağlayarak geliştirir.

## Neden Intlayer'ı entegre etmeli?

- **JavaScript Güçlü İçerik Yönetimi**: İçeriğinizi verimli bir şekilde tanımlamak ve yönetmek için JavaScript'in esnekliğini kullanın.
- **Tür Güvenli Ortam**: Tüm içerik tanımlarınızın doğru ve hatasız olmasını sağlamak için TypeScript'i kullanın.
- **Entegre İçerik Dosyaları**: Çevirilerinizi ilgili bileşenlere yakın tutarak sürdürülebilirliği ve netliği artırın.

## Kurulum

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketi yükleyin:

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### Intlayer'ı Yapılandırın

Intlayer, projenizi kurmak için bir yapılandırma dosyası sağlar. Bu dosyayı projenizin köküne yerleştirin.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

## Kullanım Örneği

Intlayer ile, kod tabanınızın herhangi bir yerinde içeriğinizi yapılandırılmış bir şekilde bildirebilirsiniz.

Varsayılan olarak, Intlayer `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` uzantısına sahip dosyaları tarar.

> [yapılandırma dosyasında](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) `contentDir` özelliğini ayarlayarak varsayılan uzantıyı değiştirebilirsiniz.

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    ├── ClientComponent
    │   ├── index.content.ts
    │   └── index.tsx
    └── ServerComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    ├── ClientComponent
    │   ├── index.content.mjs
    │   └── index.mjx
    └── ServerComponent
        ├── index.content.mjs
        └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### İçeriğinizi Bildirin

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

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
};

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Eksi bir arabadan az",
        "-1": "Eksi bir araba",
        "0": "Araba yok",
        "1": "Bir araba",
        ">5": "Bazı arabalar",
        ">19": "Çok araba"
      }
    }
  }
}
```

### Sözlüklerinizi Oluşturun

Sözlüklerinizi [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md) kullanarak oluşturabilirsiniz.

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Bu komut tüm `*.content.*` dosyalarını tarar, bunları derler ve sonuçları **`intlayer.config.ts`**'nizde belirtilen dizine yazar (varsayılan olarak `./.intlayer`).

Tipik bir çıktı şöyle görünebilir:

```bash
.
└── .intlayer
    ├── dictionary  # İçeriğinizin sözlüğünü içerir
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # Uygulamanızda kullanılacak sözlüğünüzün giriş noktasını içerir
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # Sözlüğünüzün otomatik oluşturulan tür tanımlarını içerir
        ├── intlayer.d.ts  # Intlayer'ın otomatik oluşturulan tür tanımlarını içerir
        ├── client-component.d.ts
        └── server-component.d.ts
```

### i18next kaynaklarını oluşturun

Intlayer, [i18next](https://www.i18next.com/) için sözlükler oluşturacak şekilde yapılandırılabilir. Bunun için `intlayer.config.ts` dosyanıza aşağıdaki yapılandırmayı eklemeniz gerekir:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer'a i18next için mesaj dosyaları oluşturmasını söyler
    dictionaryOutput: ["i18next"],

    // Intlayer'ın mesaj JSON dosyalarınızı yazacağı dizin
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer'a i18next için mesaj dosyaları oluşturmasını söyler
    dictionaryOutput: ["i18next"],

    // Intlayer'ın mesaj JSON dosyalarınızı yazacağı dizin
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer'a i18next için mesaj dosyaları oluşturmasını söyler
    dictionaryOutput: ["i18next"],

    // Intlayer'ın mesaj JSON dosyalarınızı yazacağı dizin
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

Çıktı:

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Örneğin, **en/client-component.json** şöyle görünebilir:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "Araba yok",
  "one_numberOfCar": "Bir araba",
  "two_numberOfCar": "İki araba",
  "other_numberOfCar": "Bazı arabalar"
}
```

### next-intl sözlüklerini oluşturun

Intlayer, [i18next](https://www.i18next.com/) veya [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl) için sözlükler oluşturacak şekilde yapılandırılabilir. Bunun için `intlayer.config.ts` dosyanıza aşağıdaki yapılandırmayı eklemeniz gerekir:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer'a i18next için mesaj dosyaları oluşturmasını söyler
    dictionaryOutput: ["next-intl"],

    // Intlayer'ın mesaj JSON dosyalarınızı yazacağı dizin
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer'a i18next için mesaj dosyaları oluşturmasını söyler
    dictionaryOutput: ["next-intl"],

    // Intlayer'ın mesaj JSON dosyalarınızı yazacağı dizin
    nextIntlMessagesDir: "./i18next/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer'a i18next için mesaj dosyaları oluşturmasını söyler
    dictionaryOutput: ["next-intl"],

    // Intlayer'ın mesaj JSON dosyalarınızı yazacağı dizin
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

Çıktı:

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Örneğin, **en/client-component.json** şöyle görünebilir:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "Araba yok",
  "one_numberOfCar": "Bir araba",
  "two_numberOfCar": "İki araba",
  "other_numberOfCar": "Bazı arabalar"
}
```

## CLI araçları

Intlayer, şunları yapmak için bir CLI aracı sağlar:

- içerik bildirimlerinizi denetleyin ve eksik çevirileri tamamlayın
- içerik bildirimlerinizden sözlükler oluşturun
- uzak sözlükleri CMS'nizden yerel projenize itin ve çekin

Daha fazla bilgi için [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md)'ye danışın.

## Intlayer'ı uygulamanızda kullanın

İçeriğiniz bildirildikten sonra, Intlayer sözlüklerinizi uygulamanızda tüketebilirsiniz.

Intlayer, uygulamanız için bir paket olarak kullanılabilir.

### React Uygulaması

React uygulamanızda Intlayer'ı kullanmak için [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md)'ı kullanabilirsiniz.

### Next.js Uygulaması

Next.js uygulamanızda Intlayer'ı kullanmak için [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md)'ı kullanabilirsiniz.

### Express Uygulaması

Express uygulamanızda Intlayer'ı kullanmak için [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/express-intlayer/index.md)'ı kullanabilirsiniz.

## `intlayer` paketi tarafından sağlanan fonksiyonlar

`intlayer` paketi ayrıca uygulamanızı uluslararasılaştırmanıza yardımcı olacak bazı fonksiyonlar sağlar.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md)

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
