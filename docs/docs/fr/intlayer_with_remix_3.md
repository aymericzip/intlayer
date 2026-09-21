---
createdAt: 2026-09-09
updatedAt: 2026-09-21
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
  - version: 9.5.5
    date: 2026-09-19
    changes: "Utilisation du middleware et des hooks de remix-intlayer"
  - version: 9.5.0
    date: 2026-09-09
    changes: "Documentation initiale pour Remix 3"
author: aymericzip
---

# Traduisez votre site web Remix 3 avec Intlayer | Internationalisation (i18n)

Ce guide montre comment intégrer **Intlayer** pour une internationalisation fluide dans les applications **Remix 3** avec un routage sensible à la locale, des déclarations de contenu typées, des composants JSX rendus côté serveur et un support multi-runtime sur Node.js, Bun, Deno et Cloudflare Workers.

## Qu'est-ce que Remix 3 ?

**Remix 3** représente une évolution architecturale majeure vers un **framework web composable et agnostique au runtime, entièrement basé sur les standards web**. Plutôt que d'être lié à des bundlers spécifiques ou à des API serveur propriétaires, Remix 3 est distribué sous forme de packages composables à usage unique :

- **`remix/fetch-router`** (ou `remix/router`) : Routage léger et conforme aux standards basé sur l'API Fetch (`Request` et `Response`).
- **`remix/ui`** : Un modèle de composant JSX (`jsxImportSource: "remix/ui"`). Un composant est une fonction de setup qui renvoie une fonction de rendu, ce qui ressemble à React mais conserve l'état dans des fermetures JavaScript simples.
- **`remix/middleware/render`** : Installe `context.render(<Page />)` sur chaque requête, diffusant l'arbre JSX sous forme de `Response` HTML.
- **`remix/node-fetch-server`** : Adaptateurs de serveur pour Node.js, avec support natif pour Bun, Deno et les runtimes edge.
- **`remix/cookie`** : Analyse et sérialisation de cookies sécurisées par chiffrement.

Associé à **Intlayer** et au package **`remix-intlayer`**, un middleware de locale ainsi que les mêmes hooks `useIntlayer` / `useDictionary` / `useLocale` que `react-intlayer`, liés au contexte de requête de Remix, vous bénéficiez d'un système d'internationalisation complet offrant une sécurité au moment de la compilation, des traductions automatisées par IA, un rendu serveur sans surcharge et un routage fluide par locale.

## Table des matières

<TOC/>

## Pourquoi choisir Intlayer plutôt que les alternatives ?

Comparé aux solutions traditionnelles telles que `i18next` ou aux chargeurs de traduction sur mesure, Intlayer offre une expérience développeur intégrée, optimisée pour l'architecture web moderne :

<AccordionGroup>
<Accordion header="Couverture complète de Remix 3 et des standards web">

Intlayer est conçu pour fonctionner nativement avec les standards web (`Request`, `Response`, `Headers` et `URL`). `remix-intlayer` s'intègre au Fetch router de Remix 3 sous la forme d'un middleware léger, extrayant la locale des chemins d'URL, des cookies ou des en-têtes `Accept-Language` et l'exposant au reste de la requête, handlers, vues et composants `remix/ui`, sans avoir à la transmettre manuellement ni dépendre d'un runtime spécifique.

</Accordion>
<Accordion header="Déclarations de contenu sécurisées par le typage">

Fini les clés JSON non vérifiées et les erreurs de clés manquantes au runtime. Intlayer applique les vérifications TypeScript sur toutes les locales déclarées, vous avertissant dès la compilation si une traduction est absente ou invalide.

</Accordion>
<Accordion header="Zéro surcharge de bundle côté serveur">

Remix 3 effectue le rendu des composants JSX sur le serveur et diffuse le flux HTML vers le client. Seul le texte résolu pour la locale demandée se retrouve dans le flux de sortie. Aucun bundle d'hydratation client ni catalogue de traduction encombrant n'est requis, sauf si un composant est explicitement marqué comme `clientEntry`.

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

Installez `intlayer`, `remix-intlayer` et `remix` (version 3) à l'aide de votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`** : Moteur d'internationalisation de base gérant la configuration, la déclaration des dictionnaires (`t()`, `Dictionary`), les outils CLI et l'interpréteur de runtime.
- **`remix-intlayer`** : L'intégration Remix 3 : le middleware de routeur `intlayer()` qui résout la locale de chaque requête, et les hooks `useIntlayer`, `useDictionary` et `useLocale` qui la lisent n'importe où en aval.
- **`remix`** : Package unifié du framework Remix 3 exportant `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render` et `remix/node-fetch-server`.

</Step>
<Step number={2} title="Configurer Intlayer">

### Architecture

Dans cette architecture, le middleware `intlayer()` de `remix-intlayer` est enregistré dans `createRouter()` avant le middleware `render()`. Il retire le préfixe de locale avant la résolution par le routeur, de sorte que les routes ne sont déclarées qu'une seule fois dans `src/routes.ts` sans segment `:locale`, et il exécute le reste de la requête dans un scope `AsyncLocalStorage`, ce qui permet à `useIntlayer` / `useLocale` de lire la locale sans argument dans les gestionnaires de routes et les vues `remix/ui`. Les déclarations de contenu sont placées aux côtés de vos vues dans `src/` :

```bash
.
├── src
│   ├── home.content.ts               # Home page content declaration
│   ├── router.tsx                    # createRouter() with the intlayer() and render() middleware
│   ├── routes.ts                     # Type-safe routes, declared once without locale segment
│   ├── server.ts                     # fetch handler (Node.js, Bun, Deno, Cloudflare Workers)
│   └── views
│       ├── document.tsx              # HTML shell setting <html lang dir> from the locale
│       └── home.tsx                  # Localized page using useIntlayer / useLocale
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### Configuration

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
<Step number={5} title="Ajouter le middleware Intlayer">

Remix 3 propose un pipeline de middlewares composable via `createRouter({ middleware: [...] })`.

`remix-intlayer` fournit le middleware `intlayer()`, le pendant Remix des proxies de `next-intlayer` et `vite-intlayer`. Pour chaque requête entrante, il :

1. **Route la locale**, selon `routing.mode` (`prefix-no-default` par défaut). Une URL sans préfixe de locale est redirigée vers l'URL localisée de la locale détectée — le cookie de stockage (`INTLAYER_LOCALE`) ou l'en-tête personnalisé (`x-intlayer-locale`), puis la négociation standard `Accept-Language`, puis votre `defaultLocale` — à moins que cette locale ne nécessite pas de préfixe. Une URL préfixée telle que `/fr/about` est servie **depuis la route `/about`** en français, `/en/about` est redirigée vers `/about`, et les règles de réécriture `routing.rewrite` sont appliquées dans les deux sens (`/fr/about` → `/fr/a-propos`). Les ressources statiques et, dans les configurations avec `routing.domains`, les domaines de locale sont gérés de la même manière que dans les autres intégrations.
2. **Résout la locale** dans le contexte de requête Remix sous `context.intlayer` (ou `context.get(Intlayer)`), avec `locale`, `defaultLocale` et `availableLocales`.
3. **Persiste la locale** via le cookie / en-tête configuré, de sorte que les requêtes suivantes résolvent la même locale.

Parce que le préfixe de locale est supprimé avant la mise en correspondance du routeur, vos routes sont déclarées une seule fois, sans segment `:locale`, quel que soit le mode de routage. Le middleware exécute ensuite le reste de la requête dans une portée `AsyncLocalStorage` liée au contexte de requête, ce qui permet aux hooks du package de lire la locale sans aucun argument — aussi bien dans les gestionnaires de routes, les vues que les composants `remix/ui` :

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// N'importe où en aval du middleware
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` ou `useIntlayer("faq", { item: 2 })` surchargent la locale de la requête pour un appel, et `useDictionary(homeContent)` lit un dictionnaire importé au lieu d'une clé. En dehors d'une requête, les hooks se replient sur la locale par défaut.

> Le middleware prépare également les dictionnaires Intlayer au démarrage du serveur, évitant ainsi qu'un `intlayer build` manquant ne laisse le registre vide.

> Définissez `routing.enableProxy: false` dans `intlayer.config.ts` pour conserver uniquement la résolution de locale et gérer le routage vous-même. `intlayer({ ignore })` laisse intactes les requêtes correspondantes (un préfixe d'API, par exemple), et `intlayer({ isDevServer })` contrôle si la locale stockée pilote les redirections dans le mode automatique `enableProxy` par défaut.

</Step>
<Step number={6} title="Définir des routes typées">

Définissez vos routes d'application à l'aide de `route()` issu de `remix/routes`. Déclarez-les une seule fois, sans segment de locale — le middleware sert chaque locale à partir de ces routes :

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  home: "/",
});
```

L'utilisation de `route()` garantit la génération d'URL typées dans toute votre application, et `getLocalizedPath` applique le mode de routage correspondant :

```typescript
import { getLocalizedPath } from "intlayer";

routes.home.href(); // "/"
getLocalizedPath(routes.home.href(), "fr"); // "/fr"
getLocalizedPath(routes.home.href(), "en"); // "/" (locale par défaut)
```

</Step>
<Step number={7} title="Afficher des pages localisées avec JSX">

Remix 3 effectue le rendu de l'interface utilisateur avec des composants JSX issus de `remix/ui`. Un composant est une **fonction de setup** qui reçoit un `Handle` et renvoie une **fonction de rendu**. Le setup s'exécute une seule fois par instance, le rendu s'exécute à chaque mise à jour, et les props sont lues via `handle.props`.

Commencez par un shell partagé `Document` qui applique les attributs `<html lang="..." dir="...">` à partir de la locale résolue par le middleware :

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

Créez ensuite la page d'accueil. Elle lit le dictionnaire localisé avec `useIntlayer` et affiche un sélecteur de langue :

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> Le JSX de Remix n'est pas React : `class` s'écrit tel quel (`className` est également accepté) et les nouveaux rendus sont déclenchés explicitement avec `handle.update()`. Les valeurs interpolées sont automatiquement échappées. Les hooks Intlayer sont de simples fonctions lisant la portée de la requête, ils peuvent donc être appelés aussi bien depuis la fonction de setup que depuis la fonction de rendu.

</Step>
<Step number={8} title="Connecter le routeur et le serveur">

Ajoutez le middleware `render()` de `remix/middleware/render` aux côtés du middleware Intlayer. Il installe `context.render(node, init)` sur chaque requête, ce qui diffuse l'arbre JSX dans une `Response` HTML (en ajoutant `<!DOCTYPE html>` au début et en définissant l'en-tête `Content-Type`) :

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Initialiser le routeur avec les middlewares Intlayer + render
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Associer les gestionnaires de route — `/`, `/fr`, `/es`… atteignent tous `home`
router.map(routes, {
  actions: {
    home(context) {
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render` accepte un `ResponseInit` optionnel comme second argument, par ex. `context.render(<NotFoundPage />, { status: 404 })`. La locale résolue reste accessible depuis le gestionnaire via `context.intlayer.locale`, par exemple pour construire une réponse `Response.json`.

Enfin, exposez le routeur via un gestionnaire `fetch` standard. Le même routeur fonctionne sur Node.js, Bun, Deno et Cloudflare Workers :

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

// Bun / Deno / Cloudflare Workers
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

Pointez JSX vers le runtime `remix/ui` et assurez-vous que votre `tsconfig.json` inclut les types générés par `.intlayer` :

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` est ce qui permet à `<HomePage />` d'être résolu avec le `createElement` de Remix plutôt qu'avec celui de React.

## Conclusion

Avec Remix 3 et Intlayer, vous bénéficiez d'une stack légère, typée et portable, conforme aux standards du web ouvert. Votre application peut évoluer aisément de pages marketing simples à des services distribués mondialement et rendus en périphérie (edge).
