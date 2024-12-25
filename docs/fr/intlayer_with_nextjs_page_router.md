````markdown
# Bien Démarrer avec l'Internationalisation (i18n) avec Intlayer et Next.js en utilisant le Routeur de Page

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) open-source innovante conçue pour simplifier le support multilingue dans les applications web modernes. Intlayer s'intègre parfaitement avec le dernier framework **Next.js**, y compris son **Routeur de Page** traditionnel.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les itinéraires et le contenu.
- **Assurer le support TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection d'erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection dynamique de la langue et le changement de langue.

> Intlayer est compatible avec Next.js 12, 13, 14 et 15. Si vous utilisez le Routeur d'Application Next.js, référez-vous au [guide du Routeur d'Application](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_14.md). Pour Next.js 15, suivez ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).

---

## Guide Étape par Étape pour Configurer Intlayer dans une Application Next.js Utilisant le Routeur de Page

### Étape 1 : Installer les Dépendances

Installez les packages nécessaires en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install intlayer next-intlayer
```
````

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de configuration, la traduction, [la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md), la transpilation et [les commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).

- **next-intlayer**

  Le package qui intègre Intlayer avec Next.js. Il fournit des providers de context et des hooks pour l'internationalisation de Next.js. De plus, il comprend le plugin Next.js pour intégrer Intlayer avec [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), ainsi que des middleware pour détecter la langue préférée de l'utilisateur, gérer les cookies et gérer la redirection d'URL.

### Étape 2 : Configurer Votre Projet

Créez un fichier de configuration pour définir les langues supportées par votre application :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ajoutez vos autres locales ici
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
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ajoutez vos autres locales ici
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
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ajoutez vos autres locales ici
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer des URLs localisées, la redirection par middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs d'Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, référez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer avec la Configuration de Next.js

Modifiez votre configuration Next.js pour incorporer Intlayer :

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Votre configuration Next.js existante
};

export default withIntlayer(nextConfig);
```

> Le plugin Next.js `withIntlayer()` est utilisé pour intégrer Intlayer avec Next.js. Il garantit la création de fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein des environnements [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). De plus, il fournit des alias pour optimiser les performances et garantir la compatibilité avec les composants côté serveur.

### Étape 4 : Configurer le Middleware pour la Détection de Locale

Configurez un middleware pour détecter automatiquement et gérer la langue préférée de l'utilisateur :

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

> Adaptez le paramètre `matcher` pour correspondre aux routes de votre application. Pour plus de détails, référez-vous à la [documentation de Next.js sur la configuration du matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Étape 5 : Définir des Routes Dynamiques en Fonction de la Locale

Implémentez un routage dynamique pour servir du contenu localisé en fonction de la locale de l'utilisateur.

1.  **Créer des Pages Spécifiques à la Locale :**

    Renommez le fichier de votre page principale pour inclure le segment dynamique `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Mettre à Jour `_app.tsx` pour Gérer la Localisation :**

    Modifiez votre `_app.tsx` pour inclure les providers d'Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App: FC<AppProps> = ({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    };

    export default App;
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

    Dans votre `[locale]/index.tsx`, définissez les chemins et les props pour gérer différentes locales.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* Votre contenu ici */}</div>;

    export const getStaticPaths: GetStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

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
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

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
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

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

> `getStaticPaths` et `getStaticProps` garantissent que votre application préconstruit les pages nécessaires pour toutes les locales dans le Routeur de Page de Next.js. Cette approche réduit le calcul à l'exécution et améliore l'expérience utilisateur. Pour plus de détails, référez-vous à la documentation de Next.js sur [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) et [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### Étape 6 : Déclarer Votre Contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Bienvenue sur mon site Web",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Commencez par éditer cette page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies DeclarationContent;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Commencez par éditer cette page.",
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

/** @type {import('intlayer').DeclarationContent} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Commencez par éditer cette page.",
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
  "key": "home",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Commencez par éditer cette page.",
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

Pour plus d'informations sur la déclaration de contenu, référez-vous au [guide de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md).

### Étape 7 : Utiliser le Contenu dans Votre Code

Accédez à vos dictionnaires de contenu dans toute votre application pour afficher le contenu traduit.

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

> Pour en savoir plus sur le hook `useIntlayer`, référez-vous à la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useIntlayer.md).

### (Optionnel) Étape 8 : Internationaliser Vos Métadonnées

Pour internationaliser les métadonnées telles que les titres et descriptions de pages, utilisez la fonction `getStaticProps` en association avec la fonction `getTranslationContent` d'Intlayer.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // Les métadonnées peuvent être utilisées dans l'entête ou d'autres composants selon les besoins
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

  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "Mon Site Web",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Bienvenue sur mon site Web.",
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

// ... Reste du code y compris getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

const HomePage = ({ metadata }) => {
  // Les métadonnées peuvent être utilisées dans l'entête ou d'autres composants selon les besoins
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
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "Mon Site Web",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Bienvenue sur mon site Web.",
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

// ... Reste du code y compris getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslationContent, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");

const HomePage = ({ metadata }) => {
  // Les métadonnées peuvent être utilisées dans l'entête ou d'autres composants selon les besoins
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
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "Mon Site Web",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Bienvenue sur mon site Web.",
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

// ... Reste du code y compris getStaticPaths
```

### (Optionnel) Étape 9 : Changer la Langue de Votre Contenu

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

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
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
              {/* Langue dans sa propre Locale - par exemple Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale actuelle - par exemple Français avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par exemple Français */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Langue dans sa propre Locale - par exemple FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
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
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
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
              {/* Langue dans sa propre Locale - par exemple Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale actuelle - par exemple Français avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par exemple Français */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Langue dans sa propre Locale - par exemple FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
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
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
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
              {/* Langue dans sa propre Locale - par exemple Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale actuelle - par exemple Français avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par exemple Français */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Langue dans sa propre Locale - par exemple FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> L'API `useLocalePageRouter` est la même que `useLocale`. Pour en savoir plus sur le hook `useLocale`, référez-vous à la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useLocale.md).

> Références documentaires :
>
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

2. **Exemple des Avantages de TypeScript :**

   ![Exemple d'Autocomplétion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![Exemple d'Erreur de Traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Configuration Git

Pour garder votre dépôt propre et éviter de commettre des fichiers générés, il est recommandé d'ignorer les fichiers créés par Intlayer.

Ajoutez les lignes suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

## Ressources Supplémentaires

- **Documentation d'Intlayer :** [Dépôt GitHub](https://github.com/aymericzip/intlayer)
- **Guide de Déclaration de Contenu :** [Déclaration de Contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md)
- **Documentation de Configuration :** [Guide de Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md)

En suivant ce guide, vous pouvez intégrer efficacement Intlayer dans votre application Next.js utilisant le Routeur de Page, permettant un support de l'internationalisation robuste et évolutif pour vos projets web.

```

```
