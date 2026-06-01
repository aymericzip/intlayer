---
createdAt: 2024-03-07
updatedAt: 2026-05-31
title: Astro i18n - Guide complet pour traduire Astro
description: Meilleure solution pour la taille du bundle, le SEO, les performances & la maintenabilité. Rendez votre Astro site web multilingue en 2026, traduction LLM, Agent Skills & MCP.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Ajout de la commande init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Mise à jour de l'intégration Astro, de la configuration et de l'utilisation"
---

# Traduire votre site Astro avec Intlayer | Internationalisation (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Démo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table des matières

<TOC/>

## Pourquoi Intlayer plutôt que des alternatives ?

Par rapport aux solutions principales telles que `astro-i18n` ou `i18next`, Intlayer est une solution dotée d'optimisations intégrées telles que :

<AccordionGroup>
<Accordion header="Support complet d'Astro">

Intlayer est optimisé pour s'intégrer parfaitement avec Astro en proposant le **routage multilingue**, la génération de **sitemap** et toutes les fonctionnalités nécessaires pour mettre à l'échelle votre internationalisation (i18n).

</Accordion>
<Accordion header="Taille du bundle">

Au lieu de charger de lourds fichiers JSON dans vos pages, ne chargez que le contenu strictement nécessaire. Intlayer vous aide à **réduire la taille de votre bundle et de vos pages jusqu'à 50 %**.

</Accordion>
<Accordion header="Maintenabilité">

Déclarer le contenu directement au plus près de vos composants **facilite la maintenance** des applications de grande envergure. Vous pouvez dupliquer ou supprimer le dossier d'une fonctionnalité sans le fardeau mental de devoir passer en revue toute votre base de code de contenu. De plus, Intlayer est **entièrement typé** pour garantir l'exactitude de vos traductions.

</Accordion>
<Accordion header="Prêt pour les agents IA">

La colocalisation du contenu **réduit le contexte nécessaire** aux grands modèles de langage (LLM). Intlayer est également livré avec une suite d'outils, tels qu'une **CLI** pour vérifier les traductions manquantes, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)**, un **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** et des **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)**, afin de rendre l'expérience développeur (DX) encore plus fluide pour les agents IA.

</Accordion>
<Accordion header="Automatisation">

Automatisez les traductions dans votre pipeline CI/CD en utilisant le LLM de votre choix au coût de votre propre fournisseur d'IA. Intlayer propose également un **compilateur** pour automatiser l'extraction de contenu, ainsi qu'une [plateforme web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) pour vous aider à **traduire en arrière-plan**.

</Accordion>
<Accordion header="Performances">

Associer de gros fichiers JSON à vos composants peut ralentir les performances et impacter la réactivité. Intlayer optimise le chargement du contenu directement au moment du **build**.

</Accordion>
<Accordion header="Collaboration avec les non-développeurs">

Bien plus qu'une simple solution i18n, Intlayer propose un **[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)** auto-hébergé et un **[CMS complet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)** pour gérer votre contenu multilingue en **temps réel**. Cela rend la collaboration avec les traducteurs, concepteurs-rédacteurs et autres membres de l'équipe extrêmement simple. Le contenu peut être stocké localement et/ou à distance.

</Accordion>
</AccordionGroup>

---

## Guide étape par étape pour configurer Intlayer dans Astro

Voir le [Modèle d'application](https://github.com/aymericzip/intlayer-astro-template) sur GitHub.

<Steps>

<Step number={1} title="Installer les dépendances">

Installez les packages nécessaires en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Optionnel : Ajoutez le support pour les îles React
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Optionnel : Ajoutez le support pour les îles React
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Optionnel : Ajoutez le support pour les îles React
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Le package de base qui fournit des outils d’internationalisation pour la gestion de la configuration, les traductions, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **astro-intlayer**
  Inclut le plugin d’intégration pour Astro pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi qu'un middleware pour détecter la locale préférée de l'utilisateur, gérer les cookies et traiter les redirections d'URL.

</Step>

<Step number={2} title="Configurer votre projet">

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

</Step>

<Step number={3} title="Intégrer Intlayer dans votre configuration Astro">

Ajoutez le plugin intlayer à votre configuration Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Le plugin d'intégration `intlayer()` est utilisé pour intégrer Intlayer avec Astro. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Astro. De plus, il fournit des alias pour optimiser les performances.

</Step>

<Step number={4} title="Déclarer votre contenu">

Créez et gérez vos déclarations de contenu pour stocker vos traductions :

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

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

</Step>

<Step number={5} title="Utiliser le contenu dans Astro">

Vous pouvez consommer les dictionnaires directement dans vos fichiers `.astro` en utilisant les helpers de base exportés par `intlayer`.

```astro fileName="src/pages/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  defaultLocale,
  localeMap,
  getHTMLTextDir,
  type LocalesValues,
} from "intlayer";
import LocaleSwitcher from "../components/LocaleSwitcher.astro";

// Get the current locale from the URL (e.g. /es/about -> 'es')
const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;

// Get the content for the 'app' dictionary
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical link: Tells search engines which is the primary version of this page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Tell Google about all localized versions -->
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

    <!-- x-default: Fallback for users in unmatched languages -->
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
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <h1>{title}</h1>
    </main>
  </body>
</html>
```

</Step>

<Step number={6} title="Routage localisé">

Créez des segments de route dynamiques pour servir des pages localisées (par exemple, `src/pages/[locale]/index.astro`) :

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

L'intégration Astro ajoute un middleware Vite qui aide au routage sensible à la langue et aux définitions d'environnement pendant le développement. Vous pouvez également créer des liens entre les langues en utilisant votre propre logique ou des utilitaires comme `getLocalizedUrl` de `intlayer`.

</Step>

<Step number={7} title="Continuer l'utilisation de vos frameworks préférés">

Continuez à construire votre application en utilisant vos frameworks préférés.

- Intlayer + React : [Intlayer avec React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)
- Intlayer + Vue : [Intlayer avec Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+vue.md)
- Intlayer + Svelte : [Intlayer avec Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+svelte.md)
- Intlayer + Solid : [Intlayer avec Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+solid.md)
- Intlayer + Preact : [Intlayer avec Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+preact.md)
  </Step>

<Step number={15} title="Extracter le contenu de vos composants" isOptional={true}>

Si vous avez une base de code existante, transformer des milliers de fichiers peut prendre beaucoup de temps.

Pour faciliter ce processus, Intlayer propose un [compilateur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) / [extracteur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md) pour transformer vos composants et extraire le contenu.

Pour le configurer, vous pouvez ajouter une section `compiler` dans votre fichier `intlayer.config.ts` :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Reste de votre configuration
  compiler: {
    /**
     * Indique si le compilateur doit être activé.
     */
    enabled: true,

    /**
     * Définit le chemin des fichiers de sortie
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indique si les composants doivent être sauvegardés après avoir été transformés. De cette façon, le compilateur peut être exécuté une seule fois pour transformer l'application, puis il peut être supprimé.
     */
    saveComponents: false,

    /**
     * Préfixe de clé de dictionnaire
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Commande d'extraction'>

Exécutez l'extracteur pour transformer vos composants et extraire le contenu

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Compilateur Babel'>

Mettez à jour votre fichier `vite.config.ts` pour inclure le plugin `intlayerCompiler` :

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Ajoute le plugin du compilateur
  ],
});
```

```bash packageManager="npm"
npm run build # Ou npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Ou pnpm run dev
```

```bash packageManager="yarn"
yarn build # Ou yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

---

</Step>

</Steps>

### Configuration TypeScript

Intlayer utilise l'augmentation de module pour tirer parti de TypeScript et rendre votre codebase plus robuste.

![Autocomplétion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erreur de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assurez-vous que votre configuration TypeScript inclut les types autogénérés.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
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
