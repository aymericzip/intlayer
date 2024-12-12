# Bien démarrer avec l'internationalisation (i18n) avec Intlayer et Next.js 14 avec App Router

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source, conçue pour simplifier le support multilingue dans les applications web modernes. Intlayer s'intègre parfaitement avec le dernier framework **Next.js 14**, y compris son puissant **App Router**. Il est optimisé pour travailler avec les **Server Components** pour un rendu efficace et est entièrement compatible avec [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (à partir de Next.js >= 15).

Avec Intlayer, vous pouvez :

- **Gérer facilement des traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Accéder aux traductions à la fois dans les composants côté client et côté serveur**.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement de locale dynamiques.

> Remarque : Intlayer est compatible avec Next.js 12, 13, 14 et 15. Si vous utilisez le Page Router de Next.js, vous pouvez vous référer à ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_page_router.md). Pour Next.js 15 avec ou sans turbopack, référez-vous à ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).

---

## Guide étape par étape pour configurer Intlayer dans une application Next.js

### Étape 1 : Installer les dépendances

Installez les packages nécessaires en utilisant npm :

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

Pour voir tous les paramètres disponibles, référez-vous à la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Next.js

Configurez votre installation Next.js pour utiliser Intlayer :

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Étape 4 : Configurer le middleware pour la détection des locales

Mettez en place un middleware pour détecter la locale préférée de l'utilisateur :

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Étape 5 : Définir des routes locales dynamiques

Implémentez le routage dynamique pour le contenu localisé :

Changez `src/app/page.ts` en `src/app/[locale]/page.ts`

Ensuite, implémentez la fonction `generateStaticParams` dans votre mise en page d'application.

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

Ajoutez ensuite une nouvelle mise en page dans votre répertoire `[locale]` :

```tsx
// src/app/[locale]/layout.tsx

import { type Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

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

[Voyez comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md).

### Étape 7 : Utiliser le contenu dans votre code

Accédez à vos dictionnaires de contenu dans toute votre application :

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>
      {/**
       *   IntlayerServerProvider est utilisé pour fournir la locale aux enfants du serveur
       *   Ne fonctionne pas si défini dans la mise en page
       */}
      <IntlayerServerProvider locale={locale}>
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
  const content = useIntlayer("client-component-example"); // Créez la déclaration de contenu liée

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
  const content = useIntlayer("server-component-example"); // Créez la déclaration de contenu liée

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Remarque : Si vous souhaitez utiliser votre contenu dans un attribut de `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous devez appeler la valeur de la fonction, comme :
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Pour une utilisation plus détaillée d'intlayer dans un composant Client ou Serveur, consultez l'[exemple NextJS ici](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (Optionnel) Étape 8 : Internationalisation de vos métadonnées

Dans le cas où vous souhaitez internationaliser vos métadonnées, comme le titre de votre page, vous pouvez utiliser la fonction `generateMetadata` fournie par NextJS. À l'intérieur de la fonction, utilisez la fonction `getTranslationContent` pour traduire vos métadonnées.

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

  const url = `/`;

  /**
   * Génère un objet contenant toutes les URL pour chaque locale.
   *
   * Exemple :
   * ```ts
   *  getLocalizedUrl('/about');
   *
   *  // Retourne
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * Obtenez l'URL localisée pour la locale actuelle
   *
   * Exemple :
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * Retourne :
   * '/fr/about' pour la locale française
   * ```
   */
  const localizedUrl = getLocalizedUrl(url, locale);

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
      url: localizedUrl,
    },
  };
};

// ... Reste du code
````

> En savoir plus sur l'optimisation des métadonnées [dans la documentation officielle de Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Optionnel) Étape 9 : Internationalisation de votre sitemap

Pour internationaliser votre sitemap, vous pouvez utiliser la fonction `getMultilingualUrls` fournie par Intlayer. Cette fonction vous permet de générer des URL multilingues pour votre sitemap.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const url = `https://example.com`;

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: getMultilingualUrls(url),
    },
  },
];

export default sitemap;
```

> En savoir plus sur l'optimisation des sitemaps [dans la documentation officielle de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

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

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et rendre votre code plus robuste.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement.

```json5
// tsconfig.json

{
  // votre configuration personnalisée
  include: [
    "src",
    "types", // <- Inclure les types générés automatiquement
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les engager dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```gitignore
# Ignorer les fichiers générés par Intlayer
.intlayer
```
