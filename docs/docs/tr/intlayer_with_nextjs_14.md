---
title: Next.js 14 and App Router uygulamanızı nasıl çevirirsiniz – i18n rehberi 2025
description: Next.js 14 ile Intlayer entegrasyonu. Next.js 14 uygulamanızda çok dilli içerik yönetimi için Intlayer'ı nasıl kuracağınızı ve kullanacağınızı öğrenin.
keywords:
  - nextjs
  - intlayer
  - internationalization
  - i18n
  - typescript
  - react
  - nextjs-14
slugs:
  - doc
  - environment
  - nextjs
  - 14
history:
  - version: 5.6.0
    date: 2025-07-06
    changes: `withIntlayer()` fonksiyonunu promise tabanlı fonksiyona dönüştür
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmişi başlat
---

# Intlayer ile Next.js 14 and App Router çevirin | Uluslararasılaştırma (i18n)

Bu kılavuz, Next.js 14 uygulamanızda Intlayer'ı nasıl kuracağınızı ve kullanacağınızı adım adım açıklar. Intlayer, Next.js 14 ile sorunsuz bir şekilde entegre olur ve çok dilli içerik yönetimi sağlar.

## Ön Koşullar

Bu kılavuzu takip etmek için aşağıdaki araçlara ihtiyacınız olacak:

- Node.js 18 veya üzeri
- npm, pnpm veya yarn paket yöneticisi
- Next.js 14 projesi

## Adım 1: Intlayer Paketlerini Kurma

İlk olarak, Intlayer paketlerini projenize kurun:

```bash packageManager="npm"
npm install next-intlayer intlayer --save
```

```bash packageManager="pnpm"
pnpm add next-intlayer intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer intlayer
```

## Adım 2: Intlayer Yapılandırma Dosyası Oluşturma

Proje kök dizininizde `intlayer.config.ts` dosyasını oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales } from "intlayer";
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.TURKISH,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // İçerik dosyalarınızın bulunduğu dizin
    fileExtensions: [".content.ts", ".content.js", ".content.json"],
    baseDir: "./src",
    contentDirName: "content",
    // İçerik dosyalarınızın türlerini belirtin
    types: {
      filePath: "./types/intlayer.d.ts",
      moduleAugmentation: true,
    },
  },
};

export default config;
```

```javascript fileName="intlayer.config.js" codeFormat="esm"
import { Locales } from "intlayer";

const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.TURKISH,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // İçerik dosyalarınızın bulunduğu dizin
    fileExtensions: [".content.ts", ".content.js", ".content.json"],
    baseDir: "./src",
    contentDirName: "content",
    // İçerik dosyalarınızın türlerini belirtin
    types: {
      filePath: "./types/intlayer.d.ts",
      moduleAugmentation: true,
    },
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.TURKISH,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // İçerik dosyalarınızın bulunduğu dizin
    fileExtensions: [".content.ts", ".content.js", ".content.json"],
    baseDir: "./src",
    contentDirName: "content",
    // İçerik dosyalarınızın türlerini belirtin
    types: {
      filePath: "./types/intlayer.d.ts",
      moduleAugmentation: true,
    },
  },
};

module.exports = default = config;
```

## Adım 3: Next.js Yapılandırmasını Güncelleme

Next.js yapılandırma dosyanızı Intlayer ile uyumlu hale getirin:

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/async";

const config = {
  // ... Mevcut Next.js yapılandırmanız
};

export default withIntlayer(config);
```

```javascript fileName="next.config.js" codeFormat="esm"
import { withIntlayer } from "next-intlayer/async";

const config = {
  // ... Mevcut Next.js yapılandırmanız
};

export default withIntlayer(config);
```

```javascript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/async");

const config = {
  // ... Mevcut Next.js yapılandırmanız
};

module.exports = withIntlayer(config);
```

## Adım 4: İçerik Bildirimi

İçerik dosyalarınızı oluşturun. Bu dosyalar, uygulamanızdaki çok dilli içeriği tanımlar.

```typescript fileName="src/content/home.content.ts" codeFormat="typescript"
import { t } from "intlayer";
import { type ILocaleContent } from "intlayer";

const homeContent = {
  title: t({
    en: "Welcome to My App",
    fr: "Bienvenue dans mon application",
    es: "Bienvenido a mi aplicación",
    tr: "Uygulamama Hoş Geldiniz",
  }),
  description: t({
    en: "This is a sample Next.js application with Intlayer",
    fr: "Ceci est un exemple d'application Next.js avec Intlayer",
    es: "Esta es una aplicación de ejemplo de Next.js con Intlayer",
    tr: "Bu, Intlayer ile örnek bir Next.js uygulamasıdır",
  }),
} satisfies ILocaleContent;

export default homeContent;
```

```javascript fileName="src/content/home.content.js" codeFormat="esm"
import { t } from "intlayer";

const homeContent = {
  title: t({
    en: "Welcome to My App",
    fr: "Bienvenue dans mon application",
    es: "Bienvenido a mi aplicación",
    tr: "Uygulamama Hoş Geldiniz",
  }),
  description: t({
    en: "This is a sample Next.js application with Intlayer",
    fr: "Ceci est un exemple d'application Next.js avec Intlayer",
    es: "Esta es una aplicación de ejemplo de Next.js con Intlayer",
    tr: "Bu, Intlayer ile örnek bir Next.js uygulamasıdır",
  }),
};

export default homeContent;
```

```json fileName="src/content/home.content.json"
{
  "title": {
    "en": "Welcome to My App",
    "fr": "Bienvenue dans mon application",
    "es": "Bienvenido a mi aplicación",
    "tr": "Uygulamama Hoş Geldiniz"
  },
  "description": {
    "en": "This is a sample Next.js application with Intlayer",
    "fr": "Ceci est un exemple d'application Next.js avec Intlayer",
    "es": "Esta es una aplicación de ejemplo de Next.js con Intlayer",
    "tr": "Bu, Intlayer ile örnek bir Next.js uygulamasıdır"
  }
}
```

## Adım 5: İçerik Kullanımı

İçeriğinizi bileşenlerinizde kullanın:

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";

export default function HomePage() {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

```jsx fileName="src/app/page.jsx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

export default function HomePage() {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

## Adım 6: Middleware Kurulumu

Next.js 14'te çok dilli yönlendirme için middleware kurun:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
import { createMiddleware } from "next-intlayer/middleware";
import { type NextRequest } from "next/server";

export default createMiddleware({
  // Alternatif olarak, middleware seçeneklerini özelleştirebilirsiniz
  // locales: ['en', 'fr', 'es'],
  // defaultLocale: 'en',
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

```javascript fileName="src/middleware.js" codeFormat="esm"
import { createMiddleware } from "next-intlayer/middleware";

export default createMiddleware({
  // Alternatif olarak, middleware seçeneklerini özelleştirebilirsiniz
  // locales: ['en', 'fr', 'es'],
  // defaultLocale: 'en',
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { createMiddleware } = require("next-intlayer/middleware");

module.exports = createMiddleware({
  // Alternatif olarak, middleware seçeneklerini özelleştirebilirsiniz
  // locales: ['en', 'fr', 'es'],
  // defaultLocale: 'en',
});

module.exports.config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

## Adım 7: Düzen Dosyası (Layout)

Kök düzen dosyanızı çok dilli hale getirin:

```tsx fileName="src/app/layout.tsx" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { getLocaleName } from "intlayer";
import { Inter } from "next/font/google";
import { type Metadata } from "next/types";
import { getIntlayer } from "next-intlayer/server";
import { type Locales } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = (params: {
  params: { locale: Locales };
}): Metadata => {
  const { locale } = params.params;
  const t = getIntlayer(locale);

  return {
    title: t({
      en: "My App",
      fr: "Mon Application",
      es: "Mi Aplicación",
      tr: "Uygulamam",
    }),
    description: t({
      en: "This is my Next.js app with Intlayer",
      fr: "Ceci est mon application Next.js avec Intlayer",
      es: "Esta es mi aplicación Next.js con Intlayer",
      tr: "Bu, Intlayer ile Next.js uygulamamdır",
    }),
  };
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locales };
}) {
  const { locale } = params;
  const localeName = getLocaleName(locale);
  const textDirection = getHTMLTextDir(locale);

  return (
    <html lang={locale} dir={textDirection}>
      <body className={inter.className}>
        <header>
          <h1>{localeName}</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
```

```jsx fileName="src/app/layout.jsx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";
import { getLocaleName } from "intlayer";
import { Inter } from "next/font/google";
import { getIntlayer } from "next-intlayer/server";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = (params) => {
  const { locale } = params.params;
  const t = getIntlayer(locale);

  return {
    title: t({
      en: "My App",
      fr: "Mon Application",
      es: "Mi Aplicación",
      tr: "Uygulamam",
    }),
    description: t({
      en: "This is my Next.js app with Intlayer",
      fr: "Ceci est mon application Next.js avec Intlayer",
      es: "Esta es mi aplicación Next.js con Intlayer",
      tr: "Bu, Intlayer ile Next.js uygulamamdır",
    }),
  };
};

export default function RootLayout({ children, params }) {
  const { locale } = params;
  const localeName = getLocaleName(locale);
  const textDirection = getHTMLTextDir(locale);

  return (
    <html lang={locale} dir={textDirection}>
      <body className={inter.className}>
        <header>
          <h1>{localeName}</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
```

## Adım 8: Sayfa Yönlendirme

Sayfa yönlendirmelerini çok dilli hale getirin:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";

export default function HomePage() {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

```jsx fileName="src/app/[locale]/page.jsx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

export default function HomePage() {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

## Adım 9: Meta Verilerin Uluslararasılaştırılması

Sayfa meta verilerini uluslararasılaştırın:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import { getIntlayer } from "next-intlayer/server";
import { type Locales } from "intlayer";
import { type Metadata } from "next/types";

export const generateMetadata = (params: {
  params: { locale: Locales };
}): Metadata => {
  const { locale } = params.params;
  const t = getIntlayer(locale);

  return {
    title: t({
      en: "Home Page",
      fr: "Page d'accueil",
      es: "Página de inicio",
      tr: "Ana Sayfa",
    }),
    description: t({
      en: "Welcome to the home page",
      fr: "Bienvenue sur la page d'accueil",
      es: "Bienvenido a la página de inicio",
      tr: "Ana sayfaya hoş geldiniz",
    }),
  };
};

export default function HomePage() {
  const content = getIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

```jsx fileName="src/app/[locale]/page.jsx" codeFormat="esm"
import { getIntlayer } from "next-intlayer/server";

export const generateMetadata = (params) => {
  const { locale } = params.params;
  const t = getIntlayer(locale);

  return {
    title: t({
      en: "Home Page",
      fr: "Page d'accueil",
      es: "Página de inicio",
      tr: "Ana Sayfa",
    }),
    description: t({
      en: "Welcome to the home page",
      fr: "Bienvenue sur la page d'accueil",
      es: "Bienvenido a la página de inicio",
      tr: "Ana sayfaya hoş geldiniz",
    }),
  };
};

export default function HomePage() {
  const content = getIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

## Adım 10: Site Haritası ve Robots.txt Kurulumu

Site haritanızı ve robots.txt dosyanızı çok dilli hale getirin:

```typescript fileName="src/app/[locale]/sitemap.ts" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { Locales } from "intlayer";
import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = [
    Locales.ENGLISH,
    Locales.FRENCH,
    Locales.SPANISH,
    Locales.TURKISH,
  ];

  return [
    {
      url: getLocalizedUrl("/", Locales.ENGLISH),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
      alternates: {
        languages: locales.reduce(
          (acc, locale) => ({
            ...acc,
            [locale]: getLocalizedUrl("/", locale),
          }),
          {}
        ),
      },
    },
  ];
}
```

```javascript fileName="src/app/[locale]/sitemap.js" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { Locales } from "intlayer";

export default function sitemap() {
  const locales = [
    Locales.ENGLISH,
    Locales.FRENCH,
    Locales.SPANISH,
    Locales.TURKISH,
  ];

  return [
    {
      url: getLocalizedUrl("/", Locales.ENGLISH),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
      alternates: {
        languages: locales.reduce(
          (acc, locale) => ({
            ...acc,
            [locale]: getLocalizedUrl("/", locale),
          }),
          {}
        ),
      },
    },
  ];
}
```

```typescript fileName="src/app/[locale]/robots.ts" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { Locales } from "intlayer";
import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: getLocalizedUrl("/sitemap.xml", Locales.ENGLISH),
  };
}
```

```javascript fileName="src/app/[locale]/robots.js" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { Locales } from "intlayer";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: getLocalizedUrl("/sitemap.xml", Locales.ENGLISH),
  };
}
```

## (İsteğe Bağlı) Adım 11: Yerel Anahtarlayıcı Bileşeni Oluşturma

Uygulamanızın mevcut yerel ayarı saygı göstermesini sağlamak için, bir yerel anahtarlayıcı bileşeni oluşturabilirsiniz. Bu bileşen, dahili URL'leri otomatik olarak mevcut dille önekler, böylece örneğin Fransızca konuşan bir kullanıcı "Hakkında" sayfasına bir bağlantıya tıkladığında, `/fr/hakkinda` yerine `/hakkinda`ya yönlendirilir.

Bu davranış birkaç nedenden dolayı kullanışlıdır:

- **SEO ve Kullanıcı Deneyimi**: Yerelleştirilmiş URL'ler, arama motorlarının dil özel sayfalarını doğru şekilde indekslemesine yardımcı olur ve kullanıcılara tercih ettikleri dilde içerik sağlar.
- **Tutarlılık**: Uygulamanız boyunca yerelleştirilmiş bir bağlantı kullanarak, navigasyonun mevcut yerel ayar içinde kalmasını garanti edersiniz, beklenmedik dil anahtarlarını önlersiniz.
- **Bakım Kolaylığı**: URL yönetim mantığını tek bir bileşende merkezileştirmek, kod tabanınızı yönetmeyi ve uygulamanız büyüdükçe genişletmeyi basitleştirir.

Aşağıda, TypeScript'te yerelleştirilmiş bir `Link` bileşeninin uygulanması bulunmaktadır:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";
import { Locales } from "intlayer";

const LocaleSwitcher = () => {
  const router = useRouter();
  const { locale } = useLocale();

  const handleLocaleChange = (newLocale: Locales) => {
    const pathWithoutLocale = window.location.pathname.replace(
      /^\/[a-z]{2}/,
      ""
    );
    router.push(getLocalizedUrl(pathWithoutLocale, newLocale));
  };

  return (
    <div>
      <h2>Dil Seçin</h2>
      <div>
        {Object.values(Locales).map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => handleLocaleChange(localeItem)}
            disabled={locale === localeItem}
          >
            {localeItem.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";
import { Locales } from "intlayer";

const LocaleSwitcher = () => {
  const router = useRouter();
  const { locale } = useLocale();

  const handleLocaleChange = (newLocale) => {
    const pathWithoutLocale = window.location.pathname.replace(
      /^\/[a-z]{2}/,
      ""
    );
    router.push(getLocalizedUrl(pathWithoutLocale, newLocale));
  };

  return (
    <div>
      <h2>Dil Seçin</h2>
      <div>
        {Object.values(Locales).map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => handleLocaleChange(localeItem)}
            disabled={locale === localeItem}
          >
            {localeItem.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjs" codeFormat="commonjs"
"use client";

const { useRouter } = require("next/navigation");
const { useLocale } = require("next-intlayer");
const { getLocalizedUrl } = require("intlayer");
const { Locales } = require("intlayer");

const LocaleSwitcher = () => {
  const router = useRouter();
  const { locale } = useLocale();

  const handleLocaleChange = (newLocale) => {
    const pathWithoutLocale = window.location.pathname.replace(
      /^\/[a-z]{2}/,
      ""
    );
    router.push(getLocalizedUrl(pathWithoutLocale, newLocale));
  };

  return (
    <div>
      <h2>Dil Seçin</h2>
      <div>
        {Object.values(Locales).map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => handleLocaleChange(localeItem)}
            disabled={locale === localeItem}
          >
            {localeItem.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

module.exports = LocaleSwitcher;
```

> Alternatif bir yol, `useLocale` kancası tarafından sağlanan `setLocale` fonksiyonunu kullanmaktır. Bu fonksiyon, sayfa ön yüklemesine izin vermez ve sayfayı yeniden yükler.

> Bu durumda, `router.push` kullanarak yönlendirme olmadan, sadece sunucu tarafı kodunuz içeriğin yerel ayarını değiştirecektir.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Geri kalan kod

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Fransızca'ya Geç</button>
);
```

> Dokümantasyon referansları:
>
> - [`useLocale` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` özelliği](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` özelliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` özelliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` özelliği](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (İsteğe Bağlı) Adım 12: Yerelleştirilmiş Bağlantı Bileşeni Oluşturma

Uygulamanızın navigasyonunun mevcut yerel ayarı saygı göstermesini sağlamak için, özel bir `Link` bileşeni oluşturabilirsiniz. Bu bileşen, dahili URL'leri otomatik olarak mevcut dille önekler, böylece örneğin Fransızca konuşan bir kullanıcı "Hakkında" sayfasına bir bağlantıya tıkladığında, `/fr/hakkinda` yerine `/hakkinda`ya yönlendirilir.

Bu davranış birkaç nedenden dolayı kullanışlıdır:

- **SEO ve Kullanıcı Deneyimi**: Yerelleştirilmiş URL'ler, arama motorlarının dil özel sayfalarını doğru şekilde indekslemesine yardımcı olur ve kullanıcılara tercih ettikleri dilde içerik sağlar.
- **Tutarlılık**: Uygulamanız boyunca yerelleştirilmiş bir bağlantı kullanarak, navigasyonun mevcut yerel ayar içinde kalmasını garanti edersiniz, beklenmedik dil anahtarlarını önlersiniz.
- **Bakım Kolaylığı**: URL yönetim mantığını tek bir bileşende merkezileştirmek, kod tabanınızı yönetmeyi ve uygulamanız büyüdükçe genişletmeyi basitleştirir.

Aşağıda, TypeScript'te yerelleştirilmiş bir `Link` bileşeninin uygulanması bulunmaktadır:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Verilen bir URL'nin harici olup olmadığını kontrol eden yardımcı fonksiyon.
 * URL http:// veya https:// ile başlıyorsa, harici olarak kabul edilir.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Href özelliğini mevcut yerel ayar temelinde uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, `getLocalizedUrl` kullanarak URL'yi yerel ayar ile önekler (örneğin, /fr/hakkinda).
 * Bu, navigasyonun aynı yerel ayar bağlamında kalmasını sağlar.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahili ise ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
'use client';

import { getLocalizedUrl } from 'intlayer';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { forwardRef, PropsWithChildren, type ForwardedRef } from 'react';

/**
 * Verilen bir URL'nin harici olup olmadığını kontrol eden yardımcı fonksiyon.
 * URL http:// veya https:// ile başlıyorsa, harici olarak kabul edilir.
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * Href özelliğini mevcut yerel ayar temelinde uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, `getLocalizedUrl` kullanarak URL'yi yerel ayar ile önekler (örneğin, /fr/hakkinda).
 * Bu, navigasyonun aynı yerel ayar bağlamında kalmasını sağlar.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahili ise ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
'use client';

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");
const { forwardRef } = require("react");

/**
 * Verilen bir URL'nin harici olup olmadığını kontrol eden yardımcı fonksiyon.
 * URL http:// veya https:// ile başlıyorsa, harici olarak kabul edilir.
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahili ise ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
  const hrefI18n: NextLinkProps['href'] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

#### Nasıl Çalışır

- **Harici Bağlantıları Algılama**:  
  Yardımcı fonksiyon `checkIsExternalLink`, bir URL'nin harici olup olmadığını belirler. Harici bağlantılar değişmeden bırakılır çünkü yerelleştirmeye ihtiyaçları yoktur.

- **Mevcut Yerel Ayarı Alma**:  
  `useLocale` kancası mevcut yerel ayarı sağlar (örneğin, Fransızca için `fr`).

- **URL'yi Yerelleştirme**:  
  Dahili bağlantılar (yani harici olmayan) için, `getLocalizedUrl` kullanarak URL'yi otomatik olarak mevcut yerel ayar ile önekler. Bu, kullanıcınız Fransızca ise, `/hakkinda` href'ini geçmek onu `/fr/hakkinda`ya dönüştürür.

- **Bağlantıyı Döndürme**:  
  Bileşen, yerelleştirilmiş URL ile bir `<a>` elementi döndürür, böylece navigasyon yerel ayar ile tutarlı olur.

Bu `Link` bileşenini uygulamanız boyunca entegre ederek, tutarlı ve dil bilincine sahip bir kullanıcı deneyimi sürdürürsünüzken aynı zamanda gelişmiş SEO ve kullanılabilirlikten de yararlanırsınız.

### (İsteğe Bağlı) Adım 13: Paket Boyutunuzu Optimize Edin

`next-intlayer` kullanırken, sözlükler varsayılan olarak her sayfa için pakete dahil edilir. Paket boyutunu optimize etmek için, Intlayer isteğe bağlı bir SWC eklentisi sağlar ki bu, `useIntlayer` çağrılarını akıllıca makrolar kullanarak değiştirir. Bu, sözlüklerin sadece onları gerçekten kullanan sayfalar için paketlere dahil edilmesini sağlar.

Bu optimizasyonu etkinleştirmek için, `@intlayer/swc` paketini kurun. Kurulduktan sonra, `next-intlayer` eklentiyi otomatik olarak algılayacak ve kullanacaktır:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> Not: Bu optimizasyon sadece Next.js 13 ve üzeri için kullanılabilir.

> Not: Bu paket varsayılan olarak kurulmaz çünkü SWC eklentileri Next.js'te hala deneyseldir. Gelecekte değişebilir.

### TypeScript Yapılandırma

Intlayer, TypeScript'ten faydalanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletmesi kullanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik olarak oluşturulan türleri dahil edin
  ],
}
```

### Git Yapılandırma

Intlayer tarafından oluşturulan dosyaları yok saymanız önerilir. Bu, onları Git deposuna göndermemenizi sağlar.

Bunu yapmak için, `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yok say
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi geliştirmek için, resmi **Intlayer VS Code Uzantısı**'nı kurabilirsiniz.

[VS Code Marketplace'ten Kurun](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama**.
- **Eksik çeviriler için gerçek zamanlı hata algılama**.
- **Çevrilmiş içeriğin satır içi önizlemeleri**.
- **Çevirileri kolayca oluşturmak ve güncellemek için hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla detay için, [Intlayer VS Code Uzantısı dokümantasyonu](https://intlayer.org/doc/vs-code-extension)na bakın.

### Daha Fazla Bilgi Edinin

Daha fazla ilerlemek için, [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)yi uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) kullanarak harici hale getirebilirsiniz.
