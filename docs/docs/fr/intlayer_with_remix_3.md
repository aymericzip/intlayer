---
createdAt: 2026-09-09
updatedAt: 2026-09-09
title: "Remix 3 i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application Remix 3 multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Standards Web
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.0
    date: 2026-09-09
    changes: "Documentation initiale pour Remix 3"
author: aymericzip
---

# Traduisez votre site web Remix 3 avec Intlayer | Internationalisation (i18n)

Ce guide montre comment intégrer **Intlayer** pour une internationalisation fluide dans les applications **Remix 3** avec un routage sensible à la locale, des déclarations de contenu typées, des templates HTML sécurisés et un support multi-runtime sur Node.js, Bun, Deno et Cloudflare Workers.

## Qu'est-ce que Remix 3 ?

**Remix 3** représente une évolution architecturale majeure vers un **framework web composable et agnostique au runtime, entièrement basé sur les standards web**. Plutôt que d'être lié à des bundlers spécifiques ou à des API serveur propriétaires, Remix 3 est distribué sous forme de packages composables à usage unique :

- **`remix/fetch-router`** (ou `remix/router`) : Routage léger et conforme aux standards basé sur l'API Fetch (`Request` et `Response`).
- **`remix/html-template`** : Littéraux de gabarit HTML sécurisés avec protection automatique contre les failles XSS et composition de fragments.
- **`remix/response/html`** : Utilitaires pour servir du HTML avec la sémantique HTTP standard.
- **`remix/node-fetch-server`** : Adaptateurs de serveur pour Node.js, avec support natif pour Bun, Deno et les runtimes edge.
- **`remix/cookie`** : Analyse et sérialisation de cookies sécurisées par chiffrement.

Associé à **Intlayer**, vous bénéficiez d'un système d'internationalisation complet offrant une sécurité au moment de la compilation, des traductions automatisées par IA, un rendu serveur sans surcharge et un routage fluide par locale.

## Table des matières

<TOC/>

## Pourquoi choisir Intlayer plutôt que les alternatives ?

Comparé aux solutions traditionnelles telles que `i18next` ou aux chargeurs de traduction sur mesure, Intlayer offre une expérience développeur intégrée, optimisée pour l'architecture web moderne :

<AccordionGroup>
<Accordion header="Couverture complète de Remix 3 et des standards web">

Intlayer est conçu pour fonctionner nativement avec les standards web (`Request`, `Response`, `Headers` et `URL`). Il s'intègre naturellement dans le Fetch router de Remix 3 via un middleware léger, extrayant les locales des chemins d'URL, des cookies ou des en-têtes `Accept-Language` sans dépendre d'un runtime spécifique.

</Accordion>
<Accordion header="Déclarations de contenu sécurisées par le typage">

Fini les clés JSON non vérifiées et les erreurs de clés manquantes au runtime. Intlayer applique les vérifications TypeScript sur toutes les locales déclarées, vous avertissant dès la compilation si une traduction est absente ou invalide.

</Accordion>
<Accordion header="Zéro surcharge de bundle côté serveur">

Avec les templates HTML rendus côté serveur de Remix 3 (`remix/html-template`), seul le texte résolu pour la locale demandée est injecté dans le flux de sortie. Aucun bundle d'hydratation client ni catalogue de traduction encombrant n'est requis, sauf si nécessaire.

</Accordion>
<Accordion header="Prêt pour les agents IA et l'automatisation">

Intlayer colocalise les déclarations de contenu (`.content.ts`) avec la logique de vos routes, réduisant le contexte de tokens nécessaire pour les grands modèles de langage (LLM). Les commandes CLI intégrées telles que `intlayer fill` et `intlayer test` vous permettent d'automatiser les traductions dans vos pipelines CI/CD au coût direct de votre fournisseur d'IA.

</Accordion>
<Accordion header="Éditeur visuel et intégration CMS">

Au-delà des flux de travail orientés code, Intlayer propose un [Éditeur Visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) auto-hébergé et un [CMS Distant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), permettant aux éditeurs, traducteurs et rédacteurs de modifier le contenu sans redéployer l'application.

</Accordion>
</AccordionGroup>

## Guide étape par étape

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Démo" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo Template Remix 3 Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Consultez le [Modèle d'Application](https://github.com/aymericzip/intlayer-remix-3-template) sur GitHub.

<Steps>
<Step number={1} title="Installer les dépendances">

Installez `intlayer` et `remix` (version 3) à l'aide de votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`** : Moteur d'internationalisation de base gérant la configuration, la déclaration des dictionnaires (`t()`, `Dictionary`), les outils CLI et l'interpréteur de runtime.
- **`remix`** : Package unifié du framework Remix 3 exportant `remix/router`, `remix/routes`, `remix/html-template` et `remix/node-fetch-server`.

</Step>
<Step number={2} title="Configurer Intlayer">

Créez un fichier `intlayer.config.ts` à la racine de votre projet pour déclarer les langues prises en charge et les paramètres d'internationalisation :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Pour d'autres paramètres de configuration (comme le mode strict ou les préférences de stockage de routage), consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>
<Step number={3} title="Déclarer votre contenu multilingue">

Déclarez votre contenu localisé dans un fichier `.content.ts` :

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      fr: "Bienvenue sur Remix 3",
      en: "Welcome to Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      fr: "Une application composable basée sur les standards web avec i18n native.",
      en: "A composable, web-standard application with native i18n.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      fr: "Changer de langue :",
      en: "Switch language:",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer prend également en charge les formats JSON, YAML et CommonJS. Voir la [Documentation sur la Déclaration de Contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

</Step>
<Step number={4} title="Générer les dictionnaires Intlayer">

Compilez les définitions de dictionnaires pour générer les types TypeScript et les registres de runtime :

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

Cette commande compile votre contenu dans le répertoire `.intlayer`, offrant une auto-complétion TypeScript complète et un accès rapide aux dictionnaires.

</Step>
<Step number={5} title="Implémenter le middleware Intlayer">

Remix 3 propose un pipeline de middlewares composable via `createRouter({ middleware: [...] })`.

Créez un middleware Intlayer qui résout la locale de chaque requête entrante selon :

1. Le préfixe d'URL via `getLocaleFromPath` d'Intlayer (par exemple `/fr` ou `/es`).
2. L'utilitaire `getLocale` d'Intlayer, qui négocie automatiquement via les cookies de stockage (`INTLAYER_LOCALE`), les en-têtes personnalisés (`x-intlayer-locale`), l'en-tête standard `Accept-Language` et votre `defaultLocale`.

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * Clé de contexte typée pour récupérer la locale résolue depuis le RequestContext de Remix 3.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Middleware Intlayer pour Remix 3.
 *
 * Résout la locale de la requête selon l'ordre de priorité suivant :
 * 1. Préfixe du chemin d'URL (ex. `/fr/...`) via `getLocaleFromPath`
 * 2. Négociation des en-têtes et du stockage via `getLocale` (cookie, en-tête personnalisé, négociation Accept-Language, repli sur defaultLocale)
 *
 * Attache la locale résolue au RequestContext de Remix 3.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // Détection du chemin (/fr/about -> "fr", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // Attacher la locale résolue au contexte de requête Remix 3
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // Attacher la locale résolue au contexte de requête Remix 3
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

</Step>
<Step number={6} title="Définir des routes typées">

Définissez vos routes d'application à l'aide de `route()` issu de `remix/routes` :

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Route pour la locale par défaut
  home: "/",

  // Route localisée avec segment dynamique :locale
  localizedHome: "/:locale",
});
```

L'utilisation de `route()` garantit la génération d'URL typées dans toute votre application :

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "fr" }); // "/fr"
```

</Step>
<Step number={7} title="Afficher les gabarits HTML localisés">

Remix 3 utilise `remix/html-template` pour générer du HTML sécurisé et échappé automatiquement. Créez une fonction de vue qui extrait le dictionnaire localisé avec `getIntlayer`, applique les attributs `<html lang="..." dir="...">` et affiche un sélecteur de langue :

```typescript fileName="src/views/home.ts" codeFormat={["typescript", "esm"]}
import { html, type SafeHtml } from "remix/html-template";
import {
  getIntlayer,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import { routes } from "../routes";

export const renderHomePage = (locale: Locale): SafeHtml => {
  const home = getIntlayer("home", locale);

  return html`
    <!doctype html>
    <html lang="${locale}" dir="${getHTMLTextDir(locale)}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${home.title}</title>
      </head>
      <body>
        <header>
          <nav aria-label="Languages">
            <span>${home.switchLanguage}</span>
            ${locales.map((loc) => {
              const href = getLocalizedPath(routes.home.href(), loc);
              const isActive = loc === locale;
              return html`
                <a
                  href="${href}"
                  class="${isActive ? "active" : ""}"
                  aria-current="${isActive ? "true" : "false"}"
                >
                  ${getLocaleName(loc, locale)}
                </a>
              `;
            })}
          </nav>
        </header>
        <main>
          <h1>${home.title}</h1>
          <p>${home.description}</p>
        </main>
      </body>
    </html>
  `;
};
```

</Step>
<Step number={8} title="Connecter l'application serveur">

Associez votre routeur, vos middlewares et vos actions de route dans `src/server.ts` :

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRouter } from "remix/router";
import { createRequestListener } from "remix/node-fetch-server";
import { createHtmlResponse } from "remix/response/html";
import { isDeclaredLocale } from "intlayer";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { renderHomePage } from "./views/home";

// 1. Initialiser le routeur avec le middleware Intlayer
export const router = createRouter({
  middleware: [intlayer()],
});

// 2. Associer les gestionnaires de route
router.map(routes, {
  actions: {
    // Route de locale par défaut
    home(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },

    // Route localisée
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
  },
});

// 3. Démarrer le serveur
const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Auditer et auto-compléter les traductions">

Intlayer fournit un CLI pour auditer les traductions manquantes et les compléter automatiquement grâce à l'IA :

```bash packageManager="npm"
# Auditer les traductions manquantes
npx intlayer test

# Compléter les traductions manquantes via l'IA
npx intlayer fill
```

```bash packageManager="pnpm"
# Auditer les traductions manquantes
pnpm dlx intlayer test

# Compléter les traductions manquantes via l'IA
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# Auditer les traductions manquantes
yarn dlx intlayer test

# Compléter les traductions manquantes via l'IA
yarn dlx intlayer fill
```

```bash packageManager="bun"
# Auditer les traductions manquantes
bun x intlayer test

# Compléter les traductions manquantes via l'IA
bun x intlayer fill
```

</Step>
</Steps>

## Configuration TypeScript

Assurez-vous que votre `tsconfig.json` inclut les types générés par `.intlayer` :

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

## Conclusion

Avec Remix 3 et Intlayer, vous bénéficiez d'une stack légère, typée et portable, conforme aux standards du web ouvert. Votre application peut évoluer aisément de pages marketing simples à des services distribués mondialement et rendus en périphérie (edge).
