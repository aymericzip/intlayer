---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Intlayer ve react-i18next
description: React uygulaması için Intlayer'ı react-i18next ile karşılaştırın
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-react-i18next
---

# React Uluslararasılaştırma (i18n) ile react-i18next ve Intlayer

## Genel Bakış

- **Intlayer**, çevirileri **bileşen düzeyinde** içerik beyan dosyaları aracılığıyla yönetmenize yardımcı olur.
- **react-i18next**, bileşenlerinizde yerelleştirilmiş dizeleri getirmek için `useTranslation` gibi hook'lar sağlayan **i18next** için popüler bir React entegrasyonudur.

Birleştirildiğinde, Intlayer **i18next-uyumlu JSON** olarak sözlükleri **dışa aktarabilir**, böylece react-i18next bunları çalışma zamanında **tüketebilir**.

## Neden Intlayer'ı react-i18next ile Kullanmalı?

**Intlayer** içerik beyan dosyaları daha iyi bir geliştirici deneyimi sunar çünkü:

1. **Dosya Yerleşiminde Esnek**  
   Her içerik beyan dosyasını ihtiyacı olan bileşenin yanına koyun. Bu yapı, çevirileri birlikte konumlandırarak bileşenler taşındığında veya silindiğinde yetim çevirileri önler.

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

2. **Merkezi Çeviriler**  
   Tek bir içerik beyan dosyası bir bileşen için gerekli tüm çevirileri toplar, eksik çevirileri yakalamayı kolaylaştırır.  
   TypeScript ile, çeviriler eksikse derleme zamanı hataları bile alırsınız.

## Kurulum

Create React App projesinde, bu bağımlılıkları yükleyin:

```bash
# npm ile
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# yarn ile
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# pnpm ile
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### Bu Paketler Nedir?

- **intlayer** – i18n yapılandırmalarını, içerik beyanlarını yönetmek ve sözlük çıktılarını oluşturmak için CLI ve çekirdek kütüphane.
- **react-intlayer** – Intlayer için React'e özel entegrasyon, özellikle sözlüklerin otomatik oluşturulmasını sağlayan bazı script'ler sağlar.
- **react-i18next** – i18next için React'e özel entegrasyon kütüphanesi, `useTranslation` hook'unu içerir.
- **i18next** – Çeviri işlemeyi yöneten temel çerçeve.
- **i18next-resources-to-backend** – JSON kaynaklarını dinamik olarak içe aktaran bir i18next arka ucu.

## i18next Sözlüklerini Dışa Aktarmak İçin Intlayer'ı Yapılandırma

Projenizin kökünde `intlayer.config.ts` dosyasını oluşturun (veya güncelleyin):

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // İstediğiniz kadar yerel ekleyin
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Intlayer'a i18next-uyumlu JSON oluşturmasını söyleyin
    dictionaryOutput: ["i18next"],

    // Oluşturulan kaynaklar için bir çıktı dizini seçin
    // Bu klasör henüz yoksa oluşturulacaktır.
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

> **Not**: TypeScript kullanmıyorsanız, bu yapılandırma dosyasını `.cjs`, `.mjs` veya `.js` olarak oluşturabilirsiniz (detaylar için [Intlayer dokümantasyonuna](https://intlayer.org/en/doc/concept/configuration) bakın).

## i18next Kaynaklarını Oluşturma

İçerik beyanlarınız yerleştirildikten sonra (sonraki bölüm), **Intlayer build komutunu** çalıştırın:

```bash
# npm ile
npx run intlayer build
```

```bash
# yarn ile
yarn intlayer build
```

```bash
# pnpm ile
pnpm intlayer build
```

> Bu, varsayılan olarak `./i18next/resources` dizini içinde i18next kaynaklarınızı oluşturacaktır.

Tipik bir çıktı şöyle görünebilir:

```bash
.
└── i18next
    └── resources
       ├── en
       │   └── my-content.json
       ├── fr
       │   └── my-content.json
       └── es
           └── my-content.json
```

Burada her **Intlayer** beyan anahtarı bir **i18next ad alanı** olarak kullanılır (örneğin, `my-content.json`).

## Sözlükleri react-i18next Yapılandırmanıza İçe Aktarma

Bu kaynakları çalışma zamanında dinamik olarak yüklemek için [`i18next-resources-to-backend`](https://www.npmjs.com/package/i18next-resources-to-backend) kullanın. Örneğin, projenizde bir `i18n.ts` (veya `.js`) dosyası oluşturun:

```typescript title="i18n.ts"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // react-i18next eklentisi
  .use(initReactI18next)
  // kaynakları dinamik olarak yükle
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // İçe aktarma yolunu kaynak dizininize göre ayarlayın
      return import(`../i18next/resources/${language}/${namespace}.json`);
    })
  )
  // i18next'i başlat
  .init({
    // Yedek yerel
    fallbackLng: "en",

    // Diğer i18next yapılandırma seçeneklerini buraya ekleyebilirsiniz, bkz.:
    // https://www.i18next.com/overview/configuration-options
  });

export default i18next;
```

```javascript title="i18n.js"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/resources/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
  });

export default i18next;
```

Sonra, **kök** veya **index** dosyanızda (örneğin, `src/index.tsx`), bu `i18n` kurulumunu `App` render edilmeden **önce** içe aktarın:

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
// Her şeyden önce i18n'i başlat
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Sözlüklerinizi Oluşturma ve Yönetme

Intlayer çevirileri `./src` altında (varsayılan olarak) bulunan "içerik beyan dosyalarından" çıkarır.  
TypeScript'te minimal bir örnek burada:

```typescript title="src/components/MyComponent/MyComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key" sizin i18next ad alanınız olacak (örneğin, "my-component")
  key: "my-component",
  content: {
    // Her "t" çağrısı ayrı bir çeviri düğümüdür
    heading: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    description: t({
      en: "My i18n description text...",
      fr: "Ma description en i18n...",
      es: "Mi descripción en i18n...",
    }),
  },
} satisfies Dictionary;

export default content;
```

JSON, `.cjs` veya `.mjs` tercih ederseniz, [Intlayer dokümantasyonuna](https://intlayer.org/en/doc/concept/content) bakın.

> Varsayılan olarak, geçerli içerik beyanları dosya uzantısı kalıbıyla eşleşir:

> `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`

## React Bileşenlerinde Çevirileri Kullanma

Intlayer kaynaklarınızı **oluşturduktan** ve react-i18next'i yapılandırdıktan sonra, **react-i18next**'ten `useTranslation` hook'unu doğrudan kullanabilirsiniz.  
Örneğin:

```tsx title="src/components/MyComponent/MyComponent.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * i18next "ad alanı" "MyComponent.content.ts" dosyasındaki Intlayer `key`'dir
 * bu yüzden useTranslation()'a "my-component" geçireceğiz.
 */
const MyComponent: FC = () => {
  const { t } = useTranslation("my-component");

  return (
    <div>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default MyComponent;
```

> `t` fonksiyonunun oluşturulan JSON içindeki **anahtarlara** başvurduğunu unutmayın. `heading` adlı bir Intlayer içerik girişi için `t("heading")` kullanacaksınız.

## İsteğe Bağlı: Create React App Scripts (CRACO) ile Entegrasyon

**react-intlayer**, özel yapılar ve dev sunucu yapılandırması için CRACO tabanlı bir yaklaşım sağlar. Intlayer'ın build adımını sorunsuz bir şekilde entegre etmek istiyorsanız:

1. **react-intlayer** yükleyin (henüz yüklemediyseniz):
   ```bash
   npm install react-intlayer --save-dev
   ```
2. **`package.json` script'lerinizi** `react-intlayer` script'lerini kullanacak şekilde ayarlayın:

   ```jsonc
   "scripts": {
     "start": "react-intlayer start",
     "build": "react-intlayer build",
     "transpile": "intlayer build"
   }
   ```

   > `react-intlayer` script'leri [CRACO](https://craco.js.org/) tabanlıdır. intlayer craco eklentisine dayalı kendi kurulumunuzu da uygulayabilirsiniz. [Örneğe buradan bakın](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

Şimdi, `npm run build`, `yarn build` veya `pnpm build` çalıştırmak hem Intlayer hem de CRA yapılarını tetikler.

## TypeScript Yapılandırması

**Intlayer**, içeriğiniz için **otomatik oluşturulan tip tanımlarını** sağlar. TypeScript'in bunları almasını sağlamak için **`types`** (veya farklı yapılandırdıysanız `types`) dizinini `tsconfig.json` **include** dizisine ekleyin:

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

> Bu, TypeScript'in çevirilerinizin şeklini çıkararak daha iyi otomatik tamamlama ve hata algılama sağlamasına izin verir.

## Git Yapılandırması

Intlayer tarafından otomatik oluşturulan dosyaları ve klasörleri **yoksaymak** önerilir. `.gitignore` dosyanıza bu satırı ekleyin:

```plaintext
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
i18next
```

Genellikle bu kaynakları veya `.intlayer` iç yapı eserlerini **commit etmezsiniz**, çünkü her yapıda yeniden oluşturulabilirler.
