---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer and next-i18next
description: Integrate Intlayer with next-i18next for a comprehensive Next.js internationalization solution
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
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Change to syncJSON plugin and comprehensive rewrite
---

# Next.js Internationalization (i18n) with next-i18next and Intlayer

## Table of Contents

<TOC>

## What is next-i18next?

**next-i18next** is one of the most popular internationalization (i18n) frameworks for Next.js applications. Built on top of the powerful **i18next** ecosystem, it provides a comprehensive solution for managing translations, localization, and language switching in Next.js projects.

However, next-i18next comes with some challenges:

- **Complex configuration**: Setting up next-i18next requires multiple configuration files and careful setup of server-side and client-side i18n instances.
- **Scattered translations**: Translation files are typically stored in separate directories from components, making it harder to maintain consistency.
- **Manual namespace management**: Developers need to manually manage namespaces and ensure proper loading of translation resources.
- **Limited type safety**: TypeScript support requires additional configuration and doesn't provide automatic type generation for translations.

## What is Intlayer?

**Intlayer** is an innovative, open-source internationalization library designed to address the shortcomings of traditional i18n solutions. It offers a modern approach to content management in Next.js applications.

Key advantages of Intlayer:

- **Declarative content management**: Translations are defined alongside components, improving maintainability.
- **Type-safe by design**: Auto-generated TypeScript types ensure type safety and autocompletion.
- **Flexible content structure**: Supports complex content structures beyond simple key-value pairs.
- **Built-in Visual Editor**: Optional visual editing capabilities for non-technical team members.
- **Framework optimization**: Deep integration with Next.js for optimal performance.

## Why Combine Intlayer with next-i18next?

While Intlayer provides an excellent standalone i18n solution (see our [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)), you might want to combine it with next-i18next for several reasons:

1. **Existing codebase**: You have an established next-i18next implementation and want to gradually migrate to Intlayer's improved developer experience.
2. **Legacy requirements**: Your project requires compatibility with existing i18next plugins or workflows.
3. **Team familiarity**: Your team is comfortable with next-i18next but wants better content management.

This guide shows you how to leverage Intlayer's superior content declaration system while maintaining compatibility with next-i18next.

## Intlayer vs. next-i18next: Key Differences

For a detailed comparison of different i18n solutions including next-i18next and Intlayer, check out our [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) blog post.

Key differences:

| Feature           | next-i18next                 | Intlayer with next-i18next |
| ----------------- | ---------------------------- | -------------------------- |
| Content Location  | Separate translation folders | Co-located with components |
| Type Safety       | Manual setup required        | Auto-generated types       |
| Content Structure | Flat key-value pairs         | Nested, structured objects |
| Visual Editor     | Not included                 | Built-in optional editor   |
| Setup Complexity  | Multiple config files        | Minimal configuration      |

---

## Step-by-Step Guide to Set Up Intlayer with next-i18next

### Step 1: Install Dependencies

Install the necessary packages using your preferred package manager:

```bash packageManager="npm"
npm install intlayer next-intlayer i18next next-i18next i18next-resources-to-backend @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer i18next next-i18next i18next-resources-to-backend @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer i18next next-i18next i18next-resources-to-backend @intlayer/sync-json-plugin
```

**Package explanations:**

- **intlayer**: Core library for content declaration and management
- **next-intlayer**: Next.js integration layer with build plugins
- **i18next**: Core i18n framework
- **next-i18next**: Next.js wrapper for i18next
- **i18next-resources-to-backend**: Dynamic resource loading for i18next
- **@intlayer/sync-json-plugin**: Plugin to sync Intlayer content declarations to i18next JSON format

### Step 2: Configure Your Project

Create an Intlayer configuration file to define your locales and set up the sync plugin:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Add your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // Specify where i18next JSON files should be generated
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Add your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { syncJSON } = require("@intlayer/sync-json-plugin");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Add your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

module.exports = config;
```

> The `syncJSON` plugin automatically converts Intlayer content declarations to i18next-compatible JSON files. For more configuration options, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Step 3: Integrate Intlayer in Your Next.js Configuration

Configure your Next.js setup to use Intlayer's build plugin:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* your Next.js config options */
};

export default withIntlayer(nextConfig);
```

```javascript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* your Next.js config options */
};

export default withIntlayer(nextConfig);
```

```javascript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* your Next.js config options */
};

module.exports = withIntlayer(nextConfig);
```

> The `withIntlayer()` plugin ensures that Intlayer content declarations are built and monitored during development. It automatically regenerates i18next JSON files when you modify content declarations.

### Step 4: Set Up next-i18next Configuration

Create the standard next-i18next configuration file:

```javascript fileName="next-i18next.config.js"
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es"],
  },
};
```

Update your Next.js config to use next-i18next:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* your Next.js config options */
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es"],
  },
};

export default withIntlayer(nextConfig);
```

```javascript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* your Next.js config options */
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es"],
  },
};

export default withIntlayer(nextConfig);
```

```javascript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* your Next.js config options */
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es"],
  },
};

module.exports = withIntlayer(nextConfig);
```

### Step 5: Set Up i18next Client Configuration

Create an i18next configuration file to load the generated resources:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../intl/messages/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
    // Add other i18next configuration options as needed
  });

export default i18next;
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../intl/messages/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
  });

export default i18next;
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const { initReactI18next } = require("react-i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../intl/messages/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
  });

module.exports = i18next;
```

### Step 6: Declare Your Content

Create content declaration files alongside your components:

```typescript fileName="src/components/Hero/Hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({
      en: "Welcome to Our Platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    description: t({
      en: "Discover amazing features and possibilities",
      fr: "Découvrez des fonctionnalités et possibilités incroyables",
      es: "Descubre características y posibilidades increíbles",
    }),
    cta: {
      primary: t({
        en: "Get Started",
        fr: "Commencer",
        es: "Empezar",
      }),
      secondary: t({
        en: "Learn More",
        fr: "En savoir plus",
        es: "Saber más",
      }),
    },
  },
} satisfies Dictionary;

export default heroContent;
```

```javascript fileName="src/components/Hero/Hero.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const heroContent = {
  key: "hero",
  content: {
    title: t({
      en: "Welcome to Our Platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    description: t({
      en: "Discover amazing features and possibilities",
      fr: "Découvrez des fonctionnalités et possibilités incroyables",
      es: "Descubre características y posibilidades increíbles",
    }),
    cta: {
      primary: t({
        en: "Get Started",
        fr: "Commencer",
        es: "Empezar",
      }),
      secondary: t({
        en: "Learn More",
        fr: "En savoir plus",
        es: "Saber más",
      }),
    },
  },
};

export default heroContent;
```

```javascript fileName="src/components/Hero/Hero.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const heroContent = {
  key: "hero",
  content: {
    title: t({
      en: "Welcome to Our Platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    description: t({
      en: "Discover amazing features and possibilities",
      fr: "Découvrez des fonctionnalités et possibilités incroyables",
      es: "Descubre características y posibilidades increíbles",
    }),
    cta: {
      primary: t({
        en: "Get Started",
        fr: "Commencer",
        es: "Empezar",
      }),
      secondary: t({
        en: "Learn More",
        fr: "En savoir plus",
        es: "Saber más",
      }),
    },
  },
};

module.exports = heroContent;
```

```json fileName="src/components/Hero/Hero.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hero",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to Our Platform",
        "fr": "Bienvenue sur notre plateforme",
        "es": "Bienvenido a nuestra plataforma"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover amazing features and possibilities",
        "fr": "Découvrez des fonctionnalités et possibilités incroyables",
        "es": "Descubre características y posibilidades increíbles"
      }
    },
    "cta": {
      "primary": {
        "nodeType": "translation",
        "translation": {
          "en": "Get Started",
          "fr": "Commencer",
          "es": "Empezar"
        }
      },
      "secondary": {
        "nodeType": "translation",
        "translation": {
          "en": "Learn More",
          "fr": "En savoir plus",
          "es": "Saber más"
        }
      }
    }
  }
}
```

> Content declarations can be placed anywhere in your `src` directory (or configured `contentDir`). The file must match the pattern `*.content.{ts,tsx,js,jsx,mjs,cjs,json}`. For more details, see the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

### Step 7: Build i18next Resources

Generate the i18next JSON files from your Intlayer content declarations:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

This will generate files in the `./intl/messages` directory:

```bash
intl
    └── messages
    ├── en
    │   └── hero.json
    ├── fr
    │   └── hero.json
       └── es
        └── hero.json
```

Each JSON file contains translations extracted from the corresponding Intlayer content declarations.

### Step 8: Utilize Content in Your Code

Access your translations using next-i18next's hooks:

```typescript fileName="src/components/Hero/Hero.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "next-i18next";

const Hero: FC = () => {
  const { t } = useTranslation("hero");

  return (
    <section>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <div>
        <button>{t("cta.primary")}</button>
        <button>{t("cta.secondary")}</button>
      </div>
    </section>
  );
};

export default Hero;
```

```jsx fileName="src/components/Hero/Hero.mjx" codeFormat="esm"
import { useTranslation } from "next-i18next";

const Hero = () => {
  const { t } = useTranslation("hero");

  return (
    <section>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <div>
        <button>{t("cta.primary")}</button>
        <button>{t("cta.secondary")}</button>
      </div>
    </section>
  );
};

export default Hero;
```

```jsx fileName="src/components/Hero/Hero.csx" codeFormat="commonjs"
const { useTranslation } = require("next-i18next");

const Hero = () => {
  const { t } = useTranslation("hero");

  return (
    <section>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <div>
        <button>{t("cta.primary")}</button>
        <button>{t("cta.secondary")}</button>
      </div>
    </section>
  );
};

module.exports = Hero;
```

> The namespace in `useTranslation("hero")` corresponds to the `key` field in your Intlayer content declaration.

### (Optional) Step 9: Internationalization of Metadata

For page metadata, use next-i18next's `serverSideTranslations`:

```typescript fileName="src/pages/index.tsx" codeFormat="typescript"
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
      </Head>
      {/* Page content */}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
```

Create a corresponding metadata content declaration:

```typescript fileName="src/content/metadata.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const metadataContent = {
  key: "common",
  content: {
    meta: {
      title: t({
        en: "My Amazing App",
        fr: "Mon Application Incroyable",
        es: "Mi Aplicación Increíble",
      }),
      description: t({
        en: "Discover the best features of our platform",
        fr: "Découvrez les meilleures fonctionnalités de notre plateforme",
        es: "Descubre las mejores características de nuestra plataforma",
      }),
    },
  },
} satisfies Dictionary;

export default metadataContent;
```

### (Optional) Step 10: Internationalization of sitemap.xml and robots.txt

For sitemap and robots.txt internationalization, you can use next-i18next's locale information:

```typescript fileName="src/pages/sitemap.xml.ts" codeFormat="typescript"
import { GetServerSideProps } from "next";

const SITE_URL = "https://example.com";

function generateSiteMap(locales: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:xhtml="http://www.w3.org/1999/xhtml">
     ${locales
       .map((locale) => {
         return `
       <url>
         <loc>${SITE_URL}/${locale}</loc>
         ${locales
           .map((altLocale) => {
             return `
           <xhtml:link 
             rel="alternate"
             hreflang="${altLocale}"
             href="${SITE_URL}/${altLocale}"/>
         `;
           })
           .join("")}
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const locales = ["en", "fr", "es"];
  const sitemap = generateSiteMap(locales);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function SiteMap() {
  return null;
}
```

### (Optional) Step 11: Change the Language of Your Content

Implement a language switcher using next-i18next:

```typescript fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import { useRouter } from "next/router";
import Link from "next/link";
import type { FC } from "react";

const LanguageSwitcher: FC = () => {
  const router = useRouter();
  const { locales, locale: currentLocale, asPath } = router;

  return (
    <div>
      <p>Current Language: {currentLocale}</p>
      <ul>
        {locales?.map((locale) => (
          <li key={locale}>
            <Link href={asPath} locale={locale}>
              <a style={{ fontWeight: locale === currentLocale ? "bold" : "normal" }}>
                {locale.toUpperCase()}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
```

```jsx fileName="src/components/LanguageSwitcher.mjx" codeFormat="esm"
import { useRouter } from "next/router";
import Link from "next/link";

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locales, locale: currentLocale, asPath } = router;

  return (
    <div>
      <p>Current Language: {currentLocale}</p>
      <ul>
        {locales?.map((locale) => (
          <li key={locale}>
            <Link href={asPath} locale={locale}>
              <a
                style={{
                  fontWeight: locale === currentLocale ? "bold" : "normal",
                }}
              >
                {locale.toUpperCase()}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
```

```jsx fileName="src/components/LanguageSwitcher.csx" codeFormat="commonjs"
const { useRouter } = require("next/router");
const Link = require("next/link");

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locales, locale: currentLocale, asPath } = router;

  return (
    <div>
      <p>Current Language: {currentLocale}</p>
      <ul>
        {locales?.map((locale) => (
          <li key={locale}>
            <Link href={asPath} locale={locale}>
              <a
                style={{
                  fontWeight: locale === currentLocale ? "bold" : "normal",
                }}
              >
                {locale.toUpperCase()}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

module.exports = LanguageSwitcher;
```

### (Optional) Step 12: Creating a Localized Link Component

Create a custom Link component that preserves locale context:

```typescript fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import type { FC, PropsWithChildren } from "react";

const LocalizedLink: FC<PropsWithChildren<LinkProps>> = ({
  children,
  href,
  ...props
}) => {
  const router = useRouter();
  const { locale } = router;

  return (
    <Link href={href} locale={locale} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedLink;
```

```jsx fileName="src/components/LocalizedLink.mjx" codeFormat="esm"
import Link from "next/link";
import { useRouter } from "next/router";

const LocalizedLink = ({ children, href, ...props }) => {
  const router = useRouter();
  const { locale } = router;

  return (
    <Link href={href} locale={locale} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedLink;
```

```jsx fileName="src/components/LocalizedLink.csx" codeFormat="commonjs"
const Link = require("next/link");
const { useRouter } = require("next/router");

const LocalizedLink = ({ children, href, ...props }) => {
  const router = useRouter();
  const { locale } = router;

  return (
    <Link href={href} locale={locale} {...props}>
      {children}
    </Link>
  );
};

module.exports = LocalizedLink;
```

---

## TypeScript Configuration

Intlayer generates TypeScript type definitions for your content. To enable these types:

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // Your existing TypeScript config
  },
  "include": [
    "src",
    ".intlayer/**/*.ts", // Include Intlayer auto-generated types
  ],
}
```

This provides:

- **Autocompletion** for translation keys
- **Type checking** to catch missing translations
- **IntelliSense** support in your IDE

---

## Git Configuration

Exclude generated files from version control:

```plaintext fileName=".gitignore"
# Ignore files generated by Intlayer
.intlayer
intl
```

These files are automatically regenerated during the build process and don't need to be committed to your repository.

---

## VS Code Extension

Intlayer provides a VS Code extension to enhance your development experience:

[Install from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Features:

- **Autocompletion** for content keys
- **Inline previews** of translations
- **Error detection** for missing translations
- **Quick actions** for managing content

For more details, see the [VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

## Development Workflow

When working with this setup:

1. **Declare content** in `*.content.*` files alongside your components
2. **Build translations** with `intlayer build` (or let Next.js plugin auto-rebuild in dev mode)
3. **Use translations** in components via `useTranslation` from next-i18next
4. **Benefit from TypeScript** autocompletion and type checking

---

## Going Further

- **Visual Editor**: Consider implementing the [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) for non-technical team members
- **CMS Integration**: Externalize your content using the [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)
- **Full Intlayer Migration**: For new projects or major refactors, consider using [pure Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md) for the best developer experience

---

## Conclusion

By combining Intlayer's superior content declaration system with next-i18next's mature i18n infrastructure, you get:

✅ **Better content organization** - Co-located with components  
✅ **Type safety** - Auto-generated TypeScript types  
✅ **Easier maintenance** - Single source of truth for translations  
✅ **Compatibility** - Works with existing i18next ecosystem  
✅ **Flexibility** - Gradual migration path from pure next-i18next

This approach is ideal for teams that want to improve their i18n workflow while maintaining compatibility with the i18next ecosystem.
