---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Preact i18n - Comment traduire une application Astro + Preact en 2026
description: Apprenez à ajouter l'internationalisation (i18n) à votre site Astro + Preact avec Intlayer. Suivez ce guide pour rendre votre site multilingue.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Astro
  - Preact
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - preact
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentation initiale pour Astro + Preact"
---

# Traduire votre site Astro + Preact avec Intlayer | Internationalisation (i18n)

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier le support multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement vos traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer le support de TypeScript** avec des types autogénérés, améliorant l'autocomplétion et la détection d'erreurs.
- **Bénéficier de fonctionnalités avancées** comme la détection dynamique de la locale et le changement de langue.

---

## Guide étape par étape pour configurer Intlayer dans Astro + Preact

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Voir le [Modèle d'application](https://github.com/aymericzip/intlayer-astro-template) sur GitHub.

### Étape 1 : Installer les dépendances

Installez les packages nécessaires en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install intlayer astro-intlayer preact preact-intlayer @astrojs/preact

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer preact preact-intlayer @astrojs/preact

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer preact preact-intlayer @astrojs/preact

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer preact preact-intlayer @astrojs/preact

bun x intlayer init
```

- **intlayer**
  Le package de base qui fournit des outils d'internationalisation pour la gestion de la configuration, les traductions, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **astro-intlayer**
  Inclut le plugin d'intégration pour Astro pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi qu'un middleware pour détecter la locale préférée de l'utilisateur, gérer les cookies et traiter les redirections d'URL.

- **preact**
  Le package Preact de base — une alternative rapide et légère à React.

- **preact-intlayer**
  Le package qui intègre Intlayer avec les applications Preact. Il fournit l'`IntlayerProvider`, ainsi que les hooks `useIntlayer` et `useLocale` pour l'internationalisation dans Preact.

- **@astrojs/preact**
  L'intégration Astro officielle qui permet d'utiliser des îles (islands) de composants Preact.

### Étape 2 : Configurer votre projet

Créez un fichier de configuration pour définir les langues de votre application :

```typescript fileName="intlayer.config.ts"
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

> Via ce fichier de configuration, vous pouvez configurer les URL localisées, les redirections du middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Astro

Ajoutez le plugin intlayer et l'intégration Preact à votre configuration Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import preact from "@astrojs/preact";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), preact()],
});
```

> Le plugin d'intégration `intlayer()` est utilisé pour intégrer Intlayer avec Astro. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Astro. De plus, il fournit des alias pour optimiser les performances.

> L'intégration `preact()` permet d'utiliser des îles de composants Preact via `client:only="preact"`.

### Étape 4 : Déclarer votre contenu

Créez et gérez vos déclarations de contenu pour stocker vos traductions :

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application, à condition qu'elles soient incluses dans le répertoire `contentDir` (par défaut `./src`) et correspondent à l'extension du fichier de déclaration de contenu (par défaut `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Pour plus d'informations, consultez la [documentation de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

> Si votre fichier de contenu inclut du code TSX, vous devrez peut-être importer `import { h } from "preact";` ou vous assurer que votre pragma JSX est correctement configurée pour Preact.

### Étape 5 : Utiliser le contenu dans Astro

Vous pouvez consommer les dictionnaires directement dans vos fichiers `.astro` en utilisant les helpers de base exportés par `intlayer`. Vous devez également ajouter des métadonnées SEO, telles que hreflang et des liens canoniques, sur chaque page et intégrer une île Preact pour le contenu interactif côté client.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import { PreactIsland } from "../../components/preact/PreactIsland";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Lien Canonique : Informe les moteurs de recherche de la version principale de cette page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang : Informe Google de toutes les versions localisées -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default : Option de repli pour les utilisateurs avec des langues non correspondantes -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- L'île Preact rend tout le contenu interactif, y compris le sélecteur de langue -->
    <PreactIsland locale={locale} client:only="preact" />
  </body>
</html>
```

> **Note sur la configuration du routage :**
> La structure de répertoire que vous utilisez dépend du paramètre `middleware.routing` dans votre `intlayer.config.ts` :
>
> - **`prefix-no-default` (par défaut) :** Conserve la langue par défaut à la racine (pas de préfixe) et préfixe les autres. Utilisez `[...locale]` pour intercepter tous les cas.
> - **`prefix-all` :** Toutes les URL ont un préfixe de langue. Vous pouvez utiliser un `[locale]` standard si vous n'avez pas besoin de gérer la racine séparément.
> - **`search-param` ou `no-prefix` :** Pas besoin de dossier de locale. La locale est gérée via les paramètres de recherche ou les cookies.

### Étape 6 : Créer le composant Île Preact

Créez un composant île qui enveloppe votre application Preact et reçoit la locale détectée par le serveur :

```tsx fileName="src/components/preact/PreactIsland.tsx"
/** @jsxImportSource preact */
import { IntlayerProvider, useIntlayer } from "preact-intlayer";
import { type LocalesValues } from "intlayer";
import type { FunctionalComponent } from "preact";
import { LocaleSwitcher } from "./LocaleSwitcher";

const App: FunctionalComponent = () => {
  const { title } = useIntlayer("app");

  return (
    <div>
      <h1>{title}</h1>
      <LocaleSwitcher />
    </div>
  );
};

export const PreactIsland: FunctionalComponent<{ locale: LocalesValues }> = ({
  locale,
}) => (
  <IntlayerProvider locale={locale}>
    <App />
  </IntlayerProvider>
);
```

> La prop `locale` est transmise de la page Astro (détection serveur) à l' `IntlayerProvider`, ce qui en fait la locale initiale pour tous les hooks Preact de l'arbre.

> Note : Dans Preact, utilisez `class` au lieu de `className` pour les attributs HTML.

### Étape 7 : Ajouter un sélecteur de langue

Créez un composant Preact `LocaleSwitcher` qui lit les locales disponibles et navigue vers l'URL localisée lorsqu'un utilisateur sélectionne une nouvelle langue :

```tsx fileName="src/components/preact/LocaleSwitcher.tsx"
/** @jsxImportSource preact */
import { useLocale } from "preact-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";
import type { FunctionalComponent } from "preact";

export const LocaleSwitcher: FunctionalComponent = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // Naviguer vers l'URL localisée lors du changement de langue
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  return (
    <div class="locale-switcher">
      <span class="switcher-label">Changer de langue :</span>
      <div class="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => setLocale(localeItem)}
            class={`locale-btn ${localeItem === locale ? "active" : ""}`}
            disabled={localeItem === locale}
          >
            <span class="ls-own-name">{getLocaleName(localeItem)}</span>
            <span class="ls-current-name">
              {getLocaleName(localeItem, locale)}
            </span>
            <span class="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> **Note sur la persistance :**
> L'utilisation de `onLocaleChange` pour rediriger via `window.location.href` garantit que la nouvelle URL de langue est bien visitée, permettant au middleware Intlayer de définir le cookie de langue et de mémoriser la préférence de l'utilisateur pour les visites futures.

> Le `LocaleSwitcher` doit être rendu à l'intérieur de l'`IntlayerProvider` — utilisez-le dans votre composant d'île (comme montré à l'Étape 6).

### Étape 8 : Sitemap et Robots.txt

Intlayer fournit des utilitaires pour créer dynamiquement vos sitemaps localisés et fichiers robots.txt.

#### Sitemap

Créez `src/pages/sitemap.xml.ts` pour générer un sitemap incluant toutes vos routes localisées.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Créez `src/pages/robots.txt.ts` pour gérer le crawl des moteurs de recherche.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### Configuration TypeScript

Intlayer utilise l'augmentation de module pour tirer parti de TypeScript et rendre votre codebase plus robuste.

![Autocomplétion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erreur de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assurez-vous que votre configuration TypeScript inclut les types autogénérés et est configurée pour Preact :

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    jsx: "react-jsx",
    jsxImportSource: "preact", // Recommandé pour Preact 10+
  },
  include: [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types autogénérés
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les committer dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```bash
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer l'expérience de développement avec Intlayer, vous pouvez installer l'**extension VS Code Intlayer officielle**.

[Installer depuis le VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **L'autocomplétion** pour vos clés de traduction.
- **La détection d'erreurs en temps réel** pour les traductions manquantes.
- **Un aperçu en ligne** du contenu traduit.
- **Des actions rapides** pour créer et mettre à jour vos traductions facilement.

Pour plus d'informations sur l'utilisation de l'extension, consultez la [documentation de l'extension VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

Vous pouvez également implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).
