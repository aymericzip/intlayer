---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Intlayer ve next-intl
description: React uygulaması için Intlayer'ı next-intl ile entegre edin
keywords:
  - next-intl
  - Intlayer
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
---

# next-intl ve Intlayer ile Next.js Uluslararasılaştırma (i18n)

Hem next-intl hem de Intlayer, Next.js uygulamaları için tasarlanmış açık kaynaklı uluslararasılaştırma (i18n) çerçeveleridir. Yazılım projelerinde çevirileri, yerelleştirmeyi ve dil değiştirmeyi yönetmek için yaygın olarak kullanılırlar.

Üç temel kavramı paylaşırlar:

1. **Sözlük**: Uygulamanızın çevrilebilir içeriğini tanımlama yöntemi.
   - Intlayer'da `content declaration file` olarak adlandırılır, yapılandırılmış veriyi dışa aktaran bir JSON, JS veya TS dosyası olabilir. Daha fazla bilgi için [Intlayer dokümantasyonuna](https://intlayer.org/fr/doc/concept/content) bakın.
   - next-intl'de `messages` veya `locale messages` olarak adlandırılır, genellikle JSON dosyalarında. Daha fazla bilgi için [next-intl dokümantasyonuna](https://github.com/amannn/next-intl) bakın.

2. **Araçlar**: Uygulamada içerik beyanlarını oluşturmak ve yorumlamak için araçlar, örneğin Intlayer için `useIntlayer()` veya `useLocale()`, next-intl için `useTranslations()`.

3. **Eklentiler ve Ara Yazılımlar**: URL yönlendirmesini, paket optimizasyonunu vb. yönetmek için özellikler, örneğin Intlayer için `intlayerMiddleware` veya next-intl için [`createMiddleware`](https://github.com/amannn/next-intl).

## Intlayer vs. next-intl: Temel Farklılıklar

Intlayer'ın Next.js için diğer i18n kütüphaneleriyle (next-intl gibi) nasıl karşılaştırıldığına dair daha derin bir analiz için [next-i18next vs. next-intl vs. Intlayer blog yazısına](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18next_vs_next-intl_vs_intlayer.md) bakın.

## Intlayer ile next-intl Mesajları Nasıl Oluşturulur

### Neden Intlayer'ı next-intl ile Kullanmalı?

Intlayer içerik beyan dosyaları genellikle daha iyi bir geliştirici deneyimi sunar. İki ana avantaj nedeniyle daha esnek ve sürdürülebilirlerdir:

1. **Esnek Yerleştirme**: Intlayer içerik beyan dosyasını uygulamanızın dosya ağacında herhangi bir yere yerleştirebilirsiniz. Bu, kullanılmayan veya sallanan mesaj dosyaları bırakmadan bileşenleri yeniden adlandırmayı veya silmeyi kolaylaştırır.

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

2. **Merkezi Çeviriler**: Intlayer tüm çevirileri tek bir içerik beyanında depolar, hiçbir çevirinin eksik olmasını sağlar. TypeScript projelerinde, eksik çeviriler otomatik olarak tip hataları olarak işaretlenir, geliştiricilere anında geri bildirim sağlar.

### Kurulum

Intlayer ve next-intl'i birlikte kullanmak için her iki kütüphaneyi de yükleyin:

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### next-intl Mesajlarını Dışa Aktarmak İçin Intlayer'ı Yapılandırma

> **Not:** Intlayer'dan next-intl için mesajları dışa aktarmak yapıda hafif farklılıklar getirebilir. Mümkünse, entegrasyonu basitleştirmek için Intlayer-only veya next-intl-only akışını koruyun. Intlayer'dan next-intl mesajları oluşturmanız gerekiyorsa, aşağıdaki adımları takip edin.

Projenizin kökünde bir `intlayer.config.ts` dosyası oluşturun veya güncelleyin (.mjs / .cjs):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"], // next-intl çıktısını kullan
    nextIntlMessagesDir: "./intl/messages", // next-intl mesajlarının kaydedileceği yer
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
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
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
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### Sözlük

Çeşitli formatlardaki içerik beyan dosyalarının örnekleri aşağıdadır. Intlayer bunları next-intl'in tüketebileceği mesaj dosyalarına derleyecektir.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
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
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
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
  "key": "my-component",
  "content": {
    "helloWorld": {
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

### next-intl Mesajlarını Oluştur

next-intl için mesaj dosyalarını oluşturmak için şunu çalıştırın:

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Bu, `./intl/messages` dizininde kaynaklar oluşturacaktır ( `intlayer.config.*` dosyasında yapılandırıldığı gibi). Beklenen çıktı:

```bash
.
└── intl
    └── messages
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Her dosya, tüm Intlayer içerik beyanlarından derlenmiş mesajları içerir. Üst düzey anahtarlar genellikle `content.key` alanlarınızla eşleşir.

### Next.js Uygulamanızda next-intl Kullanma

> Daha fazla detay için resmi [next-intl kullanım dokümantasyonuna](https://github.com/amannn/next-intl#readme) bakın.

1. **Bir Ara Yazılım Oluşturun (isteğe bağlı):**  
   Otomatik yerel algılama veya yönlendirmeyi yönetmek istiyorsanız, next-intl’in [createMiddleware](https://github.com/amannn/next-intl#createMiddleware) özelliğini kullanın.

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["en", "fr", "es"],
     defaultLocale: "en",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **Mesajları Yüklemek İçin `layout.tsx` veya `_app.tsx` Oluşturun:**  
   App Router kullanıyorsanız (Next.js 13+), bir layout oluşturun:

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';


   export default async function RootLayout({
     children,
     params
   }: {
     children: ReactNode;
     params: { locale: string };
   }) {
     let messages;
     try {
       messages = (await import(`../../intl/messages/${params.locale}.json`)).default;
     } catch (error) {
       notFound();
     }

     return (
       <html lang={params.locale}>
         <body>
           <NextIntlClientProvider locale={params.locale} messages={messages}>
             {children}
           </NextIntlClientProvider>
         </body>
       </html>
     );
   }
   ```

   Pages Router kullanıyorsanız (Next.js 12 veya aşağı), mesajları `_app.tsx` dosyasında yükleyin:

   ```typescript fileName="pages/_app.tsx"
   import type { AppProps } from 'next/app';
   import { NextIntlProvider } from 'next-intl';

   function MyApp({ Component, pageProps }: AppProps) {
     return (
       <NextIntlProvider locale={pageProps.locale} messages={pageProps.messages}>
         <Component {...pageProps} />
       </NextIntlProvider>
     );
   }

   export default MyApp;
   ```

3. **Mesajları Sunucu Tarafında Getirin (Pages Router örneği):**

   ```typescript fileName="pages/index.tsx"
   import { GetServerSideProps } from "next";
   import HomePage from "../components/HomePage";

   export default HomePage;

   export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
     const messages = (await import(`../intl/messages/${locale}.json`)).default;

     return {
       props: {
         locale,
         messages,
       },
     };
   };
   ```

### Next.js Bileşenlerinde İçeriği Kullanma

Mesajlar next-intl'e yüklendikten sonra, `useTranslations()` hook'u aracılığıyla bileşenlerinizde kullanabilirsiniz:

```typescript fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslations } from 'next-intl';

const MyComponent: FC = () => {
  const t = useTranslations('my-component');
  // 'my-component' Intlayer'daki içerik anahtarına karşılık gelir

  return (
    <div>
      <h1>{t('helloWorld')}</h1>
    </div>
  );
};

export default MyComponent;
```

```jsx fileName="src/components/MyComponent/index.jsx" codeFormat="esm"
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("my-component");

  return (
    <div>
      <h1>{t("helloWorld")}</h1>
    </div>
  );
}
```

**Hepsi bu kadar!** Intlayer içerik beyan dosyalarınızı güncellediğinizde veya yeni eklediğinizde, next-intl JSON mesajlarınızı yeniden oluşturmak için `intlayer build` komutunu yeniden çalıştırın. next-intl güncellenmiş içeriği otomatik olarak alacak.
