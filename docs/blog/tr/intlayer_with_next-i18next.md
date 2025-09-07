---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Intlayer ve next-i18next
description: Next.js uygulaması için Intlayer'ı next-i18next ile entegre edin
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
---

# next-i18next ve Intlayer ile Next.js Uluslararasılaştırma (i18n)

Hem next-i18next hem de Intlayer, Next.js uygulamaları için tasarlanmış açık kaynaklı uluslararasılaştırma (i18n) çerçeveleridir. Yazılım projelerinde çevirileri, yerelleştirmeyi ve dil değiştirmeyi yönetmek için yaygın olarak kullanılırlar.

Her iki çözüm de üç temel kavramı içerir:

1. **Sözlük**: Uygulamanızın çevrilebilir içeriğini tanımlama yöntemi.
   - `i18next` durumunda `resource` olarak adlandırılır, içerik beyanı bir veya daha fazla dilde çeviriler için anahtar-değer çiftleri içeren yapılandırılmış bir JSON nesnesidir. Daha fazla bilgi için [i18next dokümantasyonuna](https://www.i18next.com/translation-function/essentials) bakın.
   - `Intlayer` durumunda `content declaration file` olarak adlandırılır, içerik beyanı yapılandırılmış veriyi dışa aktaran bir JSON, JS veya TS dosyası olabilir. Daha fazla bilgi için [Intlayer dokümantasyonuna](https://intlayer.org/fr/doc/concept/content) bakın.

2. **Araçlar**: Uygulamada içerik beyanlarını oluşturmak ve yorumlamak için araçlar, örneğin next-i18next için `getI18n()`, `useCurrentLocale()` veya `useChangeLocale()`, Intlayer için `useIntlayer()` veya `useLocale()`.

3. **Eklentiler ve Ara Yazılımlar**: URL yönlendirmesini, paket optimizasyonunu vb. yönetmek için özellikler, örneğin next-i18next için `next-i18next/middleware` veya Intlayer için `intlayerMiddleware`.

## Intlayer vs. i18next: Temel Farklılıklar

i18next ve Intlayer arasındaki farkları keşfetmek için [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18next_vs_next-intl_vs_intlayer.md) blog yazımıza bakın.

## Intlayer ile next-i18next Sözlükleri Nasıl Oluşturulur

### Neden Intlayer'ı next-i18next ile Kullanmalı?

Intlayer içerik beyan dosyaları genellikle daha iyi bir geliştirici deneyimi sunar. İki ana avantaj nedeniyle daha esnek ve sürdürülebilirlerdir:

1. **Esnek Yerleştirme**: Bir Intlayer içerik beyan dosyası uygulamanın dosya ağacında herhangi bir yere yerleştirilebilir, kullanılmayan içerik beyanları bırakmadan yinelenen veya silinen bileşenlerin yönetimini basitleştirir.

   Örnek dosya yapıları:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # İçerik beyan dosyası
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # İçerik beyan dosyası
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # İçerik beyan dosyası
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # İçerik beyan dosyası
               └── index.jsx
   ```

2. **Merkezi Çeviriler**: Intlayer tüm çevirileri tek bir dosyada depolar, hiçbir çevirinin eksik olmasını sağlar. TypeScript kullanırken, eksik çeviriler otomatik olarak algılanır ve hatalar olarak raporlanır.

### Kurulum

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### i18next Sözlüklerini Dışa Aktarmak İçin Intlayer'ı Yapılandırma

> i18next kaynaklarını dışa aktarmak diğer çerçevelerle 1:1 uyumluluk sağlamaz. Sorunları en aza indirmek için Intlayer tabanlı bir yapılandırmaya bağlı kalmak önerilir.

i18next kaynaklarını dışa aktarmak için Intlayer'ı bir `intlayer.config.ts` dosyasında yapılandırın. Örnek yapılandırmalar:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
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
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
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
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

Burada belgenizin kalan kısımlarının devamı ve düzeltmesi:

---

### Sözlükleri i18next Yapılandırmanıza İçe Aktarma

Oluşturulan kaynakları i18next yapılandırmanıza içe aktarmak için `i18next-resources-to-backend` kullanın. Aşağıda örnekler:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### Sözlük

Çeşitli formatlardaki içerik beyan dosyalarının örnekleri:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### next-i18next Kaynaklarını Oluştur

next-i18next kaynaklarını oluşturmak için aşağıdaki komutu çalıştırın:

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Bu, `./i18next/resources` dizininde kaynaklar oluşturacaktır. Beklenen çıktı:

```bash
.
└── i18next
    └── resources
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Not: i18next ad alanı Intlayer beyan anahtarına karşılık gelir.

### Next.js Eklentisini Uygula

Yapılandırıldıktan sonra, Intlayer içerik beyan dosyaları güncellendiğinde i18next kaynaklarınızı yeniden oluşturmak için Next.js eklentisini uygulayın.

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Next.js Bileşenlerinde İçeriği Kullanma

Next.js eklentisini uyguladıktan sonra, içeriği bileşenlerinizde kullanabilirsiniz:

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```
