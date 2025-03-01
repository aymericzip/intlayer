# Démarrage avec l'internationalisation (i18n) avec Intlayer et Next.js en utilisant le Page Router

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque innovante et open-source d'internationalisation (i18n) conçue pour simplifier la prise en charge multilingue dans les applications web modernes. Intlayer s'intègre parfaitement avec le dernier framework **Next.js**, y compris son traditionnel **Page Router**.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamiques de langue.

> Intlayer est compatible avec Next.js 12, 13, 14 et 15. Si vous utilisez le Next.js App Router, consultez le [guide App Router](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_14.md). Pour Next.js 15, suivez ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).

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

  Le package principal qui fournit des outils d'internationalisation pour la gestion des configurations, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).

- **next-intlayer**

  Le package qui intègre Intlayer avec Next.js. Il fournit des contextes et des hooks pour l'internationalisation avec Next.js. De plus, il inclut le plugin Next.js pour intégrer Intlayer avec [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), ainsi qu'un middleware pour détecter la langue préférée de l'utilisateur, gérer les cookies et rediriger les URL.

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

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, des redirections middleware, des noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer avec la configuration de Next.js

Modifiez votre configuration Next.js pour intégrer Intlayer :

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Votre configuration Next.js existante
};

export default withIntlayer(nextConfig);
```

> Le plugin `withIntlayer()` de Next.js est utilisé pour intégrer Intlayer avec Next.js. Il garantit la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer dans les environnements [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). De plus, il fournit des alias pour optimiser les performances et garantir la compatibilité avec les composants serveur.

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

    Modifiez votre `_app.tsx` pour inclure les fournisseurs Intlayer.

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

    export default HomePage;
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
