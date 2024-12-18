# Commencer à internationaliser (i18n) avec Intlayer et Next.js 15 App Router

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque innovante et open-source d'internationalisation (i18n) conçue pour simplifier le support multilingue dans les applications web modernes. Intlayer s'intègre parfaitement avec le dernier framework **Next.js 15**, y compris son puissant **App Router**. Il est optimisé pour fonctionner avec les **Server Components** pour un rendu efficace et est entièrement compatible avec [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau du composant.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Accéder aux traductions dans les composants côté client et côté serveur**.
- **Assurer la prise en charge de TypeScript** avec des types autogénérés, améliorant l'autocomplétion et la détection d'erreurs.
- **Profiter de fonctionnalités avancées**, comme la détection et le changement dynamiques de locale.

> Remarque : Intlayer est compatible avec Next.js 12, 13, 14 et 15. Si vous utilisez Next.js Page Router, vous pouvez vous référer à ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_page_router.md). Pour Next.js 12, 13, 14 avec App Router, reportez-vous à ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_14.md).

---

## Guide étape par étape pour configurer Intlayer dans une application Next.js

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires en utilisant npm :

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Étape 2 : Configurer votre projet

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Pour voir tous les paramètres disponibles, consultez la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Next.js

Configurez votre installation Next.js pour utiliser Intlayer :

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Étape 4 : Configurer le middleware pour la détection de locale

Mettez en place un middleware pour détecter la locale préférée de l'utilisateur :

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Étape 5 : Définir des routes dynamiques pour les locales

Implémentez un routage dynamique pour un contenu localisé :

Changez `src/app/page.ts` en `src/app/[locale]/page.ts`

Ensuite, implémentez la fonction generateStaticParams dans la mise en page de votre application.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // Ligne à insérer

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

Ajoutez ensuite un nouveau layout dans votre répertoire `[locale]` :

```tsx
// src/app/[locale]/layout.tsx

import { type NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

### Étape 6 : Déclarer votre contenu

Créez et gérez vos dictionnaires de contenu :

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies DeclarationContent;

export default pageContent;
```

[Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md).

### Étape 7 : Utiliser le contenu dans votre code

Accédez à vos dictionnaires de contenu dans toute votre application :

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      {/**
       *   IntlayerServerProvider est utilisé pour fournir la locale aux enfants du serveur
       *   Ne fonctionne pas s'il est défini dans la mise en page
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider est utilisé pour fournir la locale aux enfants du client
       *   Peut être défini dans n'importe quel composant parent, y compris la mise en page
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Créez la déclaration de contenu associée

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Créez la déclaration de contenu associée

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Remarque : Si vous souhaitez utiliser votre contenu dans un attribut `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous devez appeler la valeur de la fonction, comme :
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Pour un usage plus détaillé d'intlayer dans le Client ou le composant Serveur, consultez l'[exemple Next.js ici](https://github.com/aymericzip/intlayer/tree/main/examples/nextjs-15-app).

### (Optionnel) Étape 8 : Internationalisation de vos métadonnées

Dans le cas où vous souhaitez internationaliser vos métadonnées, telles que le titre de votre page, vous pouvez utiliser la fonction `generateMetadata` fournie par Next.js. À l'intérieur de la fonction, utilisez la fonction `getTranslationContent` pour traduire vos métadonnées.

````typescript
// src/app/[locale]/layout.tsx ou src/app/[locale]/page.tsx

import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  /**
   * Génère un objet contenant toutes les URL pour chaque locale.
   *
   * Exemple :
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Renvoie
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: url,
      languages: multilingualUrls,
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Reste du code
````

> En savoir plus sur l'optimisation des métadonnées [dans la documentation officielle de Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Optionnel) Étape 9 : Internationalisation de votre sitemap.xml et robots.txt

Pour internationaliser votre `sitemap.xml` et `robots.txt`, vous pouvez utiliser la fonction `getMultilingualUrls` fournie par Intlayer. Cette fonction vous permet de générer des URL multilingues pour votre sitemap.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

export default sitemap;
```

```tsx
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> En savoir plus sur l'optimisation du sitemap [dans la documentation officielle de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). En savoir plus sur l'optimisation du robots.txt [dans la documentation officielle de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Optionnel) Étape 10 : Changer la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction vous permet de définir la locale de l'application et de mettre à jour le contenu en conséquence.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.French)}>Changer de langue</button>
  );
};
```

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et renforcer votre code.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types autogénérés.

```json5
// tsconfig.json

{
  // votre configuration personnalisée
  include: [
    "src",
    "types", // <- Incluez les types auto-générés
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les valider dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```gitignore
# Ignorer les fichiers générés par Intlayer
.intlayer
```
