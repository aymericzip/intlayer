# Commencer avec l'internationalisation (i18n) avec Intlayer et Next.js 14 avec App Router

Voir [Application Template](https://github.com/aymericzip/intlayer-next-14-template) sur GitHub.

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier la prise en charge multilingue dans les applications web modernes. Intlayer s'intègre parfaitement avec le dernier framework **Next.js 14**, y compris son puissant **App Router**. Elle est optimisée pour fonctionner avec les **Server Components** pour un rendu efficace et est entièrement compatible avec [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (à partir de Next.js >= 15).

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Accéder aux traductions dans les composants côté client et côté serveur**.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamiques de langue.

> Intlayer est compatible avec Next.js 12, 13, 14 et 15. Si vous utilisez le Page Router de Next.js, vous pouvez consulter ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_page_router.md). Pour Next.js 15 avec ou sans turbopack, consultez ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).

---

## Guide étape par étape pour configurer Intlayer dans une application Next.js

### Étape 1 : Installer les dépendances

Installez les packages nécessaires avec npm :

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion des configurations, les traductions, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).

- **next-intlayer**

  Le package qui intègre Intlayer avec Next.js. Il fournit des context providers et des hooks pour l'internationalisation de Next.js. De plus, il inclut le plugin Next.js pour intégrer Intlayer avec [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), ainsi qu'un middleware pour détecter la langue préférée de l'utilisateur, gérer les cookies et rediriger les URL.

### Étape 2 : Configurer votre projet

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalisation: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalisation: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalisation: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, des redirections middleware, des noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et bien plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Next.js

Configurez votre projet Next.js pour utiliser Intlayer :

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> Le plugin `withIntlayer()` de Next.js est utilisé pour intégrer Intlayer avec Next.js. Il garantit la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer dans les environnements [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). De plus, il fournit des alias pour optimiser les performances et garantir la compatibilité avec les composants serveur.

### Étape 4 : Configurer le middleware pour la détection de langue

Configurez le middleware pour détecter la langue préférée de l'utilisateur :

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> Le `intlayerMiddleware` est utilisé pour détecter la langue préférée de l'utilisateur et le rediriger vers l'URL appropriée comme spécifié dans la [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md). De plus, il permet de sauvegarder la langue préférée de l'utilisateur dans un cookie.

> Adaptez le paramètre `matcher` pour correspondre aux routes de votre application. Pour plus de détails, consultez la [documentation Next.js sur la configuration du matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Étape 5 : Définir des routes dynamiques pour les langues

Supprimez tout le contenu de `RootLayout` et remplacez-le par le code suivant :

```tsx fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Garder le composant `RootLayout` vide permet de définir les attributs [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) et [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) sur la balise `<html>`.

Pour implémenter le routage dynamique, fournissez le chemin pour la langue en ajoutant une nouvelle mise en page dans votre répertoire `[locale]` :

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { Next14LayoutIntlayer } from "next-intlayer";
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

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

module.exports = LocaleLayout;
```

> Le segment de chemin `[locale]` est utilisé pour définir la langue. Exemple : `/en-US/about` fera référence à `en-US` et `/fr/about` à `fr`.

Ensuite, implémentez la fonction `generateStaticParams` dans la mise en page de votre application.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Ligne à insérer

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... Reste du code*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Ligne à insérer

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... Reste du code*/
};

export default LocaleLayout;
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Ligne à insérer

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... Reste du code*/
};

module.exports = LocaleLayout;
```

> `generateStaticParams` garantit que votre application pré-construit les pages nécessaires pour toutes les langues, réduisant ainsi les calculs au moment de l'exécution et améliorant l'expérience utilisateur. Pour plus de détails, consultez la [documentation Next.js sur generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

### Étape 6 : Déclarer votre contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

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
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).
> Pour plus de détails, consultez la [documentation sur les déclarations de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md).

### Étape 7 : Utiliser le contenu dans votre code

Accédez à vos dictionnaires de contenu dans toute votre application :

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
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

      <IntlayerServerProvider locale={locale}>
        <IntlayerClientProvider locale={locale}>
          <ServerComponentExample />
          <ClientComponentExample />
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider, useIntlayer } = require("next-intlayer/server");

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

- **`IntlayerClientProvider`** est utilisé pour fournir la langue aux composants côté client. Il peut être placé dans n'importe quel composant parent, y compris la mise en page. Cependant, il est recommandé de le placer dans une mise en page car Next.js partage le code de mise en page entre les pages, ce qui le rend plus efficace. En utilisant `IntlayerClientProvider` dans la mise en page, vous évitez de le réinitialiser pour chaque page, améliorant ainsi les performances et maintenant un contexte de localisation cohérent dans toute votre application.
- **`IntlayerServerProvider`** est utilisé pour fournir la langue aux enfants côté serveur. Il ne peut pas être défini dans la mise en page.

  > La mise en page et la page ne peuvent pas partager un contexte serveur commun car le système de contexte serveur est basé sur un magasin de données par requête (via le mécanisme de [cache de React](https://react.dev/reference/react/cache)), ce qui entraîne la recréation de chaque “contexte” pour différents segments de l'application. Placer le provider dans une mise en page partagée briserait cette isolation, empêchant la propagation correcte des valeurs du contexte serveur à vos composants serveur.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Créez une déclaration de contenu associée

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Créez une déclaration de contenu associée

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Créez une déclaration de contenu associée

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Créez une déclaration de contenu associée

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Créez une déclaration de contenu associée

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Créez une déclaration de contenu associée

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Si vous souhaitez utiliser votre contenu dans un attribut `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous devez appeler la valeur de la fonction, comme :
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Pour en savoir plus sur le hook `useIntlayer`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useIntlayer.md).

### (Optionnel) Étape 8 : Internationalisation de vos métadonnées

Dans le cas où vous souhaitez internationaliser vos métadonnées, telles que le titre de votre page, vous pouvez utiliser la fonction `generateMetadata` fournie par Next.js. À l'intérieur de la fonction, utilisez la fonction `getTranslation` pour traduire vos métadonnées.

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  /**
   * Génère un objet contenant toutes les URL pour chaque langue.
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
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Reste du code
````

````javascript fileName="src/app/[locale]/layout.msx or src/app/[locale]/page.msx" codeFormat="javascript"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

  /**
   * Génère un objet contenant toutes les URL pour chaque langue.
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
    title: t({
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
      canonical: multilingualUrls[locale],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Reste du code
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="javascript"
const { getTranslation, getMultilingualUrls } = require("intlayer");

module.exports.generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

  /**
   * Génère un objet contenant toutes les URL pour chaque langue.
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
    title: t({
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
      canonical: multilingualUrls[locale],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Reste du code
````

> Pour en savoir plus sur l'optimisation des métadonnées [sur la documentation officielle de Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Optionnel) Étape 9 : Internationalisation de votre sitemap.xml et robots.txt

Pour internationaliser votre `sitemap.xml` et `robots.txt`, vous pouvez utiliser la fonction `getMultilingualUrls` fournie par Intlayer. Cette fonction vous permet de générer des URL multilingues pour votre sitemap.

```tsx fileName="src/app/sitemap.ts"   codeFormat="typescript"
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

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
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

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
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

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
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

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
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

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> Pour en savoir plus sur l'optimisation du sitemap [sur la documentation officielle de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Pour en savoir plus sur l'optimisation du robots.txt [sur la documentation officielle de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Optionnel) Étape 10 : Changer la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction vous permet de définir la langue de l'application et de mettre à jour le contenu en conséquence.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Langue - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans son propre contexte - ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans le contexte actuel - ex. Francés avec le contexte actuel défini sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Langue - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans son propre contexte - ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans le contexte actuel - ex. Francés avec le contexte actuel défini sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Langue - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans son propre contexte - ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans le contexte actuel - ex. Francés avec le contexte actuel défini sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Références de documentation :
>
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useLocale.md)
> - [Hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocaleName.md)
> - [Hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocalizedUrl.md)
> - [Hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getHTMLTextDir.md)
> - [Attribut `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [Attribut `lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang)
> - [Attribut `dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir)
> - [Attribut `aria-current`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Optionnel) Étape 11 : Créer un composant de lien localisé

Pour garantir que la navigation de votre application respecte la langue actuelle, vous pouvez créer un composant `Link` personnalisé. Ce composant préfixe automatiquement les URL internes avec la langue actuelle, de sorte que, par exemple, lorsqu'un utilisateur francophone clique sur un lien vers la page "À propos", il est redirigé vers `/fr/about` au lieu de `/about`.

Ce comportement est utile pour plusieurs raisons :

- **SEO et expérience utilisateur** : Les URL localisées aident les moteurs de recherche à indexer correctement les pages spécifiques à une langue et fournissent aux utilisateurs un contenu dans leur langue préférée.
- **Cohérence** : En utilisant un lien localisé dans toute votre application, vous garantissez que la navigation reste dans le contexte de la langue actuelle, évitant ainsi des changements de langue inattendus.
- **Maintenabilité** : Centraliser la logique de localisation dans un seul composant simplifie la gestion des URL, rendant votre base de code plus facile à maintenir et à étendre à mesure que votre application se développe.

Voici l'implémentation d'un composant `Link` localisé en TypeScript :

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Fonction utilitaire pour vérifier si une URL donnée est externe.
 * Si l'URL commence par http:// ou https://, elle est considérée comme externe.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un composant Link personnalisé qui adapte l'attribut href en fonction de la langue actuelle.
 * Pour les liens internes, il utilise `getLocalizedUrl` pour préfixer l'URL avec la langue (par ex., /fr/about).
 * Cela garantit que la navigation reste dans le même contexte de langue.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Si le lien est interne et qu'un href valide est fourni, obtenez l'URL localisée.
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
 * Fonction utilitaire pour vérifier si une URL donnée est externe.
 * Si l'URL commence par http:// ou https://, elle est considérée comme externe.
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * Un composant Link personnalisé qui adapte l'attribut href en fonction de la langue actuelle.
 * Pour les liens internes, il utilise `getLocalizedUrl` pour préfixer l'URL avec la langue (par ex., /fr/about).
 * Cela garantit que la navigation reste dans le même contexte de langue.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Si le lien est interne et qu'un href valide est fourni, obtenez l'URL localisée.
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
 * Fonction utilitaire pour vérifier si une URL donnée est externe.
 * Si l'URL commence par http:// ou https://, elle est considérée comme externe.
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Si le lien est interne et qu'un href valide est fourni, obtenez l'URL localisée.
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

#### Comment cela fonctionne

- **Détection des liens externes** :  
  La fonction utilitaire `checkIsExternalLink` détermine si une URL est externe. Les liens externes restent inchangés car ils n'ont pas besoin de localisation.

- **Récupération de la langue actuelle** :  
  Le hook `useLocale` fournit la langue actuelle (par ex., `fr` pour le français).

- **Localisation de l'URL** :  
  Pour les liens internes (c'est-à-dire non externes), `getLocalizedUrl` est utilisé pour préfixer automatiquement l'URL avec la langue actuelle. Cela signifie que si votre utilisateur est en français, passer `/about` comme `href` le transformera en `/fr/about`.

- **Retour du lien** :  
  Le composant retourne un élément `<a>` avec l'URL localisée, garantissant que la navigation est cohérente avec la langue.

En intégrant ce composant `Link` dans toute votre application, vous maintenez une expérience utilisateur cohérente et respectueuse des langues tout en bénéficiant d'un meilleur SEO et d'une meilleure convivialité.

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et renforcer votre base de code.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les ajouter à votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_CMS.md).
