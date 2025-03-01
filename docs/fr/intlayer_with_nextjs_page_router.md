# Démarrage avec l'internationalisation (i18n) avec Intlayer et Next.js en utilisant le Page Router

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque open-source innovante d'internationalisation (i18n) conçue pour simplifier la prise en charge multilingue dans les applications web modernes. Intlayer s'intègre parfaitement avec le dernier framework **Next.js**, y compris son traditionnel **Page Router**.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamiques de langue.

> Intlayer est compatible avec Next.js 12, 13, 14 et 15. Si vous utilisez le App Router de Next.js, consultez le [guide App Router](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_14.md). Pour Next.js 15, suivez ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).

---

## Guide étape par étape pour configurer Intlayer dans une application Next.js en utilisant le Page Router

### Étape 1 : Installer les dépendances

Installez les packages nécessaires en utilisant votre gestionnaire de packages préféré :

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

  Le package qui intègre Intlayer avec Next.js. Il fournit des context providers et des hooks pour l'internationalisation avec Next.js. De plus, il inclut le plugin Next.js pour intégrer Intlayer avec [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), ainsi qu'un middleware pour détecter la langue préférée de l'utilisateur, gérer les cookies et rediriger les URL.

### Étape 2 : Configurer votre projet

Créez un fichier de configuration pour définir les langues prises en charge par votre application :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalisation: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ajoutez vos autres langues ici
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
      // Ajoutez vos autres langues ici
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
      // Ajoutez vos autres langues ici
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer les URL localisées, la redirection middleware, les noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer avec la configuration Next.js

Modifiez votre configuration Next.js pour intégrer Intlayer :

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Votre configuration Next.js existante
};

export default withIntlayer(nextConfig);
```

> Le plugin `withIntlayer()` pour Next.js est utilisé pour intégrer Intlayer avec Next.js. Il garantit la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer dans les environnements [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). De plus, il fournit des alias pour optimiser les performances et garantir la compatibilité avec les composants serveur.

### Étape 4 : Configurer le middleware pour la détection de langue

Configurez un middleware pour détecter et gérer automatiquement la langue préférée de l'utilisateur :

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

> Adaptez le paramètre `matcher` pour correspondre aux routes de votre application. Pour plus de détails, consultez la [documentation Next.js sur la configuration du matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Étape 5 : Définir des routes dynamiques localisées

Implémentez un routage dynamique pour servir du contenu localisé en fonction de la langue de l'utilisateur.

1.  **Créer des pages spécifiques à une langue :**

    Renommez votre fichier de page principal pour inclure le segment dynamique `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Mettre à jour `_app.tsx` pour gérer la localisation :**

    Modifiez votre `_app.tsx` pour inclure les providers Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App = FC<AppProps>({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    }

    export default MyApp;
    ```

    ```jsx fileName="src/pages/_app.mjx" codeFormat="esm"
    import { IntlayerClientProvider } from "next-intlayer";

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    export default App;
    ```

    ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"
    const { IntlayerClientProvider } = require("next-intlayer");

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    module.exports = App;
    ```

3.  **Configurer `getStaticPaths` et `getStaticProps` :**

    Dans votre `[locale]/index.tsx`, définissez les chemins et les props pour gérer différentes langues.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* Votre contenu ici */}</div>;

    export const getStaticPaths: GetStaticPaths = () => {
      const { internationalisation } = getConfiguration();
      const { locales } = internationalisation;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps: GetStaticProps = ({ params }) => {
      const locale = params?.locale as string;

      return {
        props: {
          locale,
        },
      };
    };

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
    import { getConfiguration } from "intlayer";
    import { ComponentExample } from "@components/ComponentExample";

    const HomePage = () => <div>{/* Votre contenu ici */}</div>;

    export const getStaticPaths = () => {
      const { internationalisation } = getConfiguration();
      const { locales } = internationalisation;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps = ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* Votre contenu ici */}</div>;

    const getStaticPaths = async () => {
      const { internationalisation } = getConfiguration();
      const { locales } = internationalisation;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    const getStaticProps = async ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };

    module.exports = {
      getStaticProps,
      getStaticPaths,
      default: HomePage,
    };
    ```

> `getStaticPaths` et `getStaticProps` garantissent que votre application pré-construit les pages nécessaires pour toutes les langues dans le Page Router de Next.js. Cette approche réduit les calculs au moment de l'exécution et améliore l'expérience utilisateur. Pour plus de détails, consultez la documentation Next.js sur [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) et [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### Étape 6 : Déclarer votre contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing this page.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
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

Pour plus d'informations sur la déclaration de contenu, consultez le [guide de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md).

### Étape 7 : Utiliser le contenu dans votre code

Accédez à vos dictionnaires de contenu dans toute votre application pour afficher du contenu traduit.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* Composants supplémentaires */}
    </div>
  );
};

// ... Reste du code, y compris getStaticPaths et getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Composants supplémentaires */}
    </div>
  );
};

// ... Reste du code, y compris getStaticPaths et getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Composants supplémentaires */}
    </div>
  );
};

// ... Reste du code, y compris getStaticPaths et getStaticProps
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // Assurez-vous d'avoir une déclaration de contenu correspondante

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Assurez-vous d'avoir une déclaration de contenu correspondante

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Assurez-vous d'avoir une déclaration de contenu correspondante

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Lorsque vous utilisez des traductions dans des attributs `string` (par exemple, `alt`, `title`, `href`, `aria-label`), appelez la valeur de la fonction comme suit :
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Pour en savoir plus sur le hook `useIntlayer`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useIntlayer.md).

### (Optionnel) Étape 8 : Internationaliser vos métadonnées

Pour internationaliser des métadonnées telles que les titres et descriptions de pages, utilisez la fonction `getStaticProps` en conjonction avec la fonction `getTranslation` d'Intlayer.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // Les métadonnées peuvent être utilisées dans le head ou d'autres composants si nécessaire
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Contenu supplémentaire */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... Reste du code, y compris getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";



const HomePage = ({ metadata }) => {
  // Les métadonnées peuvent être utilisées dans le head ou d'autres composants si nécessaire
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Contenu supplémentaire */}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = (content) =>
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... Reste du code, y compris getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslation, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");


const HomePage = ({ metadata }) => {
  // Les métadonnées peuvent être utilisées dans le head ou d'autres composants si nécessaire
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Contenu supplémentaire */}
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const t = (content) =>
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... Reste du code, y compris getStaticPaths
```

### (Optionnel) Étape 9 : Changer la langue de votre contenu

Pour permettre aux utilisateurs de changer de langue dynamiquement, utilisez la fonction `setLocale` fournie par le hook `useLocale`.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

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
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Locale - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre Locale - ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la Locale actuelle - ex. Francés avec la locale actuelle définie sur Locales.SPANISH */}
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

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="esm"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

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
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Locale - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre Locale - ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la Locale actuelle - ex. Francés avec la locale actuelle définie sur Locales.SPANISH */}
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

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="commonjs"
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocalePageRouter } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <select>
      {availableLocales.map((localeItem) => (
        <option value={localeItem} key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Locale - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre Locale - ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la Locale actuelle - ex. Francés avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        </option>
      ))}
    </select>
  );
};
```

> L'API `useLocalePageRouter` est la même que `useLocale`. Pour en savoir plus sur le hook `useLocale`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useLocale.md).

> Références de documentation :
>
> - [Hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocaleName.md)
> - [Hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocalizedUrl.md)
> - [Hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getHTMLTextDir.md)
> - [Attribut `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [Attribut `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [Attribut `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [Attribut `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Optionnel) Étape 10 : Créer un composant de lien localisé

Pour garantir que la navigation de votre application respecte la langue actuelle, vous pouvez créer un composant `Link` personnalisé. Ce composant préfixe automatiquement les URL internes avec la langue actuelle, de sorte que, par exemple, lorsqu'un utilisateur francophone clique sur un lien vers la page "À propos", il est redirigé vers `/fr/about` au lieu de `/about`.

Ce comportement est utile pour plusieurs raisons :

- **SEO et expérience utilisateur** : Les URL localisées aident les moteurs de recherche à indexer correctement les pages spécifiques à une langue et fournissent aux utilisateurs un contenu dans leur langue préférée.
- **Cohérence** : En utilisant un lien localisé dans toute votre application, vous garantissez que la navigation reste dans la langue actuelle, évitant ainsi des changements de langue inattendus.
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
 * Pour les liens internes, il utilise `getLocalizedUrl` pour préfixer l'URL avec la langue (par exemple, /fr/about).
 * Cela garantit que la navigation reste dans le même contexte de langue.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Si le lien est interne et qu'un href valide est fourni, obtenir l'URL localisée.
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
 * Pour les liens internes, il utilise `getLocalizedUrl` pour préfixer l'URL avec la langue (par exemple, /fr/about).
 * Cela garantit que la navigation reste dans le même contexte de langue.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Si le lien est interne et qu'un href valide est fourni, obtenir l'URL localisée.
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

  // Si le lien est interne et qu'un href valide est fourni, obtenir l'URL localisée.
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
  Le hook `useLocale` fournit la langue actuelle (par exemple, `fr` pour le français).

- **Localisation de l'URL** :  
  Pour les liens internes (c'est-à-dire non externes), `getLocalizedUrl` est utilisé pour préfixer automatiquement l'URL avec la langue actuelle. Cela signifie que si votre utilisateur est en français, passer `/about` comme `href` le transformera en `/fr/about`.

- **Retour du lien** :  
  Le composant retourne un élément `<a>` avec l'URL localisée, garantissant que la navigation est cohérente avec la langue.

En intégrant ce composant `Link` dans toute votre application, vous maintenez une expérience utilisateur cohérente et adaptée à la langue tout en bénéficiant d'un meilleur SEO et d'une meilleure convivialité.

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

Pour garder votre dépôt propre et éviter de commettre des fichiers générés, il est recommandé d'ignorer les fichiers créés par Intlayer.

Ajoutez les lignes suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

## Ressources supplémentaires

- **Documentation Intlayer :** [Dépôt GitHub](https://github.com/aymericzip/intlayer)
- **Guide des dictionnaires :** [Dictionnaire](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md)
- **Documentation de configuration :** [Guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md)

En suivant ce guide, vous pouvez intégrer efficacement Intlayer dans votre application Next.js en utilisant le Page Router, permettant une prise en charge robuste et évolutive de l'internationalisation pour vos projets web.

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_CMS.md).
