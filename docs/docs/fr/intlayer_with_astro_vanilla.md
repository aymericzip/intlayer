---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Vanilla JS i18n - Comment traduire une application Astro + Vanilla JS en 2026
description: Apprenez comment ajouter l'internationalisation (i18n) à votre site Astro + Vanilla JS en utilisant Intlayer. Suivez ce guide pour rendre votre site multilingue.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Astro
  - Vanilla JS
  - JavaScript
  - TypeScript
slugs:
  - doc
  - environnement
  - astro
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentation initiale pour Astro + Vanilla JS"
---

# Traduisez votre site Astro + Vanilla JS avec Intlayer | Internationalisation (i18n)

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier le support multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer le support de TypeScript** avec des types autogénérés, améliorant l'autocomplétion et la détection d'erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamique de locale.

---

## Guide étape par étape pour configurer Intlayer dans Astro + Vanilla JS

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Voir le [Modèle d'Application](https://github.com/aymericzip/intlayer-astro-template) sur GitHub.

### Étape 1 : Installer les Dépendances

Installez les paquets nécessaires à l'aide de votre gestionnaire de paquets :

```bash packageManager="npm"
npm install intlayer astro-intlayer vanilla-intlayer

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vanilla-intlayer

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vanilla-intlayer

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vanilla-intlayer

bun x intlayer init
```

- **intlayer**
  Le paquet central qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **astro-intlayer**
  Inclut le plugin d'intégration Astro pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi qu'un middleware pour détecter la locale préférée de l'utilisateur, gérer les cookies et gérer la redirection d'URL.

- **vanilla-intlayer**
  Le paquet qui intègre Intlayer avec les applications JavaScript / TypeScript pures. Il fournit un singleton pub/sub (`IntlayerClient`) et des helpers basés sur des callbacks (`useIntlayer`, `useLocale`, etc.) afin que n'importe quelle partie de vos blocs `<script>` Astro puisse réagir aux changements de locale sans framework UI.

### Étape 2 : Configuration de votre projet

Créez un fichier de configuration pour configurer les langues de votre application :

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

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, la redirection du middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, reportez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Astro

Ajoutez le plugin intlayer dans votre configuration. Aucune intégration supplémentaire de framework UI n'est nécessaire pour Vanilla JS.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Le plugin d'intégration Astro `intlayer()` est utilisé pour intégrer Intlayer avec Astro. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer dans l'application Astro. De plus, il fournit des alias pour optimiser les performances.

### Étape 4 : Déclarer votre Contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    description: t({
      en: "Welcome to my multilingual Astro site.",
      fr: "Bienvenue sur mon site Astro multilingue.",
      es: "Bienvenido a mi sitio Astro multilingüe.",
    }),
    switchLocale: t({
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès lors qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`) et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Pour plus de détails, reportez-vous à la [documentation de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

### Étape 5 : Utiliser votre contenu dans Astro

Avec Vanilla JS, tout le rendu est effectué directement dans le fichier `.astro` en utilisant `getIntlayer` pour le rendu initial côté serveur. Un bloc `<script>` initialise ensuite `vanilla-intlayer` côté client pour le changement de locale.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  getLocaleName,
  localeMap,
  locales,
  defaultLocale,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
const { greeting, description, switchLocale } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Lien canonique -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Liens Hreflang -->
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
    <main>
      <h1 id="greeting">{greeting}</h1>
      <p id="description">{description}</p>

      <div class="locale-switcher">
        <span class="switcher-label">{switchLocale}</span>
        <div class="locale-buttons">
          {
            locales.map((localeItem) => (
              <a
                href={localeItem === locale ? undefined : getLocalizedUrl(pathWithoutLocale, localeItem)}
                class={`locale-btn ${localeItem === locale ? "active" : ""}`}
                data-locale={localeItem}
                aria-disabled={localeItem === locale}
              >
                {getLocaleName(localeItem)}
              </a>
            ))
          }
        </div>
      </div>
    </main>
  </body>
</html>
```

> **Note sur la configuration du routage :**
> La structure de répertoire que vous utilisez dépend du paramètre `middleware.routing` dans votre `intlayer.config.ts` :
>
> - **`prefix-no-default` (par défaut) :** Conserve la locale par défaut à la racine (pas de préfixe) et préfixe les autres. Utilisez `[...locale]` pour intercepter tous les cas.
> - **`prefix-all` :** Toutes les URL sont préfixées par la locale. Vous pouvez utiliser un `[locale]` standard si vous n'avez pas besoin de gérer la racine séparément.
> - **`search-param` ou `no-prefix` :** Aucun dossier de locale n'est nécessaire. La locale est gérée via des paramètres de recherche ou des cookies.

### Étape 6 : Ajouter un Sélecteur de Locale

Avec Vanilla JS dans Astro, le sélecteur de locale est rendu côté serveur sous forme de liens d'ancrage et hydraté côté client via un bloc `<script>`. Lorsque l'utilisateur clique sur un lien de locale, `vanilla-intlayer` définit le cookie de locale via `setLocale` avant de naviguer vers l'URL localisée.

```astro fileName="src/pages/[...locale]/index.astro"
<!-- balisage côté serveur montré à l'étape 5 ci-dessus -->

<script>
  import { installIntlayer, useLocale } from "vanilla-intlayer";
  import { getLocaleFromPath, getLocalizedUrl, type LocalesValues } from "intlayer";

  // Initialiser Intlayer sur le client en utilisant la locale de l'URL actuelle
  const locale = getLocaleFromPath(window.location.pathname);
  installIntlayer({ locale: locale as LocalesValues });

  const { setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  // Attacher les gestionnaires de clic aux liens d'ancrage de locale
  const localeLinks = document.querySelectorAll("[data-locale]");
  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const localeValue = link.getAttribute("data-locale") as LocalesValues;
      if (localeValue && localeValue !== locale) {
        e.preventDefault();
        setLocale(localeValue);
      }
    });
  });
</script>
```

> **Note sur la persistance :**
> `installIntlayer` initialise le singleton Intlayer avec la locale détectée par le serveur. `useLocale` avec `onLocaleChange` définit ensuite le cookie de locale via le middleware avant la navigation, afin que la préférence de l'utilisateur soit mémorisée lors des visites futures.

> **Note sur l'amélioration progressive :**
> Les liens de locale fonctionnent comme des balises `<a>` standard même sans JavaScript. Lorsque JS est disponible, l'appel à `setLocale` met à jour le cookie avant la navigation afin que le middleware puisse rediriger correctement.

### Étape 7 : Sitemap et Robots.txt

Intlayer fournit des utilitaires pour générer dynamiquement des sitemaps localisés et des fichiers robots.txt.

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

Créez `src/pages/robots.txt.ts` pour contrôler l'indexation par les moteurs de recherche.

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

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et rendre votre codebase plus robuste.

![Autocomplétion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erreur de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assurez-vous que votre configuration TypeScript inclut les types autogénérés.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  include: [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types auto-générés
  ],
}
```

### Configuration du Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les commettre dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```bash
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'**Extension VS Code officielle Intlayer**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, reportez-vous à la [documentation de l'extension VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu via le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).
