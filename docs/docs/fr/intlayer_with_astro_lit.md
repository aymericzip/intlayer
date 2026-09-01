---
createdAt: 2026-04-24
updatedAt: 2026-08-29
title: "Astro + Lit i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application Astro + Lit multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Astro
  - Lit
  - Web Components
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - lit
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentation initiale pour Astro + Lit"
author: aymericzip
---

# Traduire votre site Astro + Lit avec Intlayer | Internationalisation (i18n)

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

## Guide étape par étape pour configurer Intlayer dans Astro + Lit

Voir le [Modèle d'application](https://github.com/aymericzip/intlayer-astro-template) sur GitHub.

<Steps>

<Step number={1} title="Installer les dépendances">

Installez les packages nécessaires en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> l'indicateur `--interactive` est facultatif. Utilisez `intlayer-cli init` si vous êtes un agent IA.

> Cette commande détectera votre environnement et installera les packages requis. Par exemple :

```bash packageManager="npm"
npm install intlayer astro-intlayer lit lit-intlayer @astrojs/lit
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer lit lit-intlayer @astrojs/lit
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer lit lit-intlayer @astrojs/lit
```

```bash packageManager="bun"
bun add intlayer astro-intlayer lit lit-intlayer @astrojs/lit
```

- **intlayer**
  Le package de base qui fournit des outils d'internationalisation pour la gestion de la configuration, les traductions, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **astro-intlayer**
  Inclut le plugin d'intégration pour Astro pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi qu'un middleware pour détecter la locale préférée de l'utilisateur, gérer les cookies et traiter les redirections d'URL.

- **lit**
  Le package Lit de base pour construire des Web Components rapides et légers.

- **lit-intlayer**
  Le package qui intègre Intlayer avec les applications Lit. Il fournit des hooks basés sur le `ReactiveController` (`useIntlayer`, `useLocale`, etc.) pour re-rendre automatiquement les LitElements lors des changements de langue.

- **@astrojs/lit**
  L'intégration Astro officielle qui permet d'utiliser des éléments personnalisés Lit sur vos pages Astro.

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

Ajoutez le plugin intlayer et l'intégration Lit à votre configuration Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), lit()],
});
```

> Le plugin d'intégration `intlayer()` est utilisé pour intégrer Intlayer avec Astro. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Astro. De plus, il fournit des alias pour optimiser les performances.

> L'intégration `lit()` permet d'utiliser des éléments personnalisés Lit sur vos pages Astro.

</Step>

<Step number={4} title="Déclarer votre contenu">

Créez et gérez vos déclarations de contenu pour stocker vos traductions :

```typescript fileName="src/components/lit/app.content.ts"
import { t, type Dictionary } from "intlayer";

const litDemoContent = {
  key: "lit-demo",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    description: t({
      en: "Welcome to my multilingual Astro + Lit site.",
      fr: "Bienvenue sur mon site Astro + Lit multilingue.",
      es: "Bienvenido a mi sitio Astro + Lit multilingüe.",
    }),
  },
} satisfies Dictionary;

export default litDemoContent;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application, à condition qu'elles soient incluses dans le répertoire `contentDir` (par défaut `./src`) et correspondent à l'extension du fichier de déclaration de contenu (par défaut `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Pour plus d'informations, consultez la [documentation de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

</Step>

<Step number={5} title="Utiliser le contenu dans Astro">

Vous pouvez consommer les dictionnaires directement dans vos fichiers `.astro` en utilisant les helpers de base exportés par `intlayer`. Vous devez également ajouter des métadonnées SEO, telles que hreflang et des liens canoniques, sur chaque page. L'élément personnalisé Lit est importé via un `<script>` client et placé dans le body.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getHTMLTextDir,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { greeting } = getIntlayer("lit-demo", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Lien Canonique -->
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
    <!-- Élément personnalisé Lit - reçoit la locale détectée par le serveur via une propriété -->
    <lit-demo locale={locale}></lit-demo>
  </body>
</html>

<script>
  import "../../components/lit/LitDemo";
</script>
```

> Si vous souhaitez utiliser votre contenu dans un attribut de type `chaîne`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous pouvez utiliser la valeur de la fonction, comme :

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> **Note sur la configuration du routage :**
> La structure de répertoire que vous utilisez dépend du paramètre `middleware.routing` dans votre `intlayer.config.ts` :
>
> - **`prefix-no-default` (par défaut) :** Conserve la langue par défaut à la racine (pas de préfixe) et préfixe les autres. Utilisez `[...locale]` pour intercepter tous les cas.
> - **`prefix-all` :** Toutes les URL ont un préfixe de langue. Vous pouvez utiliser un `[locale]` standard si vous n'avez pas besoin de gérer la racine séparément.
> - **`search-param` ou `no-prefix` :** Pas besoin de dossier de locale. La locale est gérée via les paramètres de recherche ou les cookies.

</Step>

<Step number={6} title="Créer l'élément personnalisé Lit">

Créez l'élément personnalisé Lit. Appelez `installIntlayer` dans le `connectedCallback` avec la `locale` définie par le serveur pour initialiser le singleton Intlayer sur le client.

```typescript fileName="src/components/lit/LitDemo.ts"
import { LitElement, html } from "lit";
import { installIntlayer, useIntlayer, useLocale } from "lit-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
  };

  locale: LocalesValues = "en" as LocalesValues;

  private _content = useIntlayer(this, "lit-demo");
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  override connectedCallback() {
    super.connectedCallback();
    // Initialiser avec la locale détectée par le serveur
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div>
        <h1>${greeting}</h1>
        <p>${description}</p>
        <!-- Le sélecteur de langue est rendu au sein du LitElement -->
        <div class="locale-switcher">
          <span class="switcher-label">Changer de langue :</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${
                    localeItem === currentLocale ? "active" : ""
                  }"
                  ?disabled=${localeItem === currentLocale}
                  @click=${() => setLocale(localeItem)}
                >
                  <span class="ls-own-name">{getLocaleName(localeItem)}</span>
                  <span class="ls-current-name"
                    >{getLocaleName(localeItem, currentLocale)}</span
                  >
                  <span class="ls-code">{localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-demo", LitDemo);
```

> La prop `locale` est transmise de la page Astro (détection serveur) et utilisée pour initialiser `installIntlayer` dans le `connectedCallback`, ce qui en fait la locale initiale pour tous les hooks `ReactiveController` de l'élément.

> `useIntlayer` est enregistré en tant que `ReactiveController`. L'élément se re-rendra automatiquement lors des changements de langue - aucun setup supplémentaire requis.

</Step>

<Step number={7} title="Ajouter un sélecteur de langue">

La fonctionnalité de changement de langue est directement intégrée dans la méthode `render()` de l'élément personnalisé Lit (voir Étape 6 ci-dessus). Elle utilise `useLocale` de `lit-intlayer` et navigue vers l'URL localisée lorsqu'un utilisateur sélectionne une nouvelle langue :

```typescript fileName="src/components/lit/LitDemo.ts"
// Au sein de la classe LitElement, après le setup de useLocale (de l'Étape 6) :

private _localeCtrl = useLocale(this, {
  onLocaleChange: (newLocale: LocalesValues) => {
    // Naviguer vers l'URL localisée lors du changement de langue
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

override render() {
  const { locale: currentLocale, availableLocales, setLocale } = this._localeCtrl;

  return html`
    <div class="locale-switcher">
      <span class="switcher-label">Changer de langue :</span>
      <div class="locale-buttons">
        ${availableLocales.map(
          (localeItem) => html`
            <button
              class="locale-btn ${localeItem === currentLocale ? "active" : ""}"
              ?disabled=${localeItem === currentLocale}
              @click=${() => setLocale(localeItem)}
            >
              <span class="ls-own-name">{getLocaleName(localeItem)}</span>
              <span class="ls-current-name">{getLocaleName(localeItem, currentLocale)}</span>
              <span class="ls-code">{localeItem.toUpperCase()}</span>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
```

> **Note sur la réactivité de Lit :**
> `useLocale` retourne un `ReactiveController`. Lorsque `setLocale` est appelé, le contrôleur planifie automatiquement un re-rendu - ainsi, l'état du bouton actif est mis à jour sans manipulation manuelle du DOM.

> **Note sur la persistance :**
> L’utilisation de `onLocaleChange` pour rediriger via `window.location.href` garantit que la nouvelle URL de langue est bien visitée, permettant au middleware Intlayer de définir le cookie de langue et de mémoriser la préférence de l’utilisateur pour les visites futures.

</Step>

<Step number={8} title="Sitemap et Robots.txt">

Intlayer fournit des utilitaires pour créer dynamiquement vos sitemaps localisés et fichiers robots.txt.

#### Sitemap

Intlayer est livré avec un générateur de sitemap intégré pour vous aider à créer facilement un sitemap pour votre application. Il gère les routes localisées et ajoute les métadonnées nécessaires pour les moteurs de recherche.

> Le sitemap généré par Intlayer prend en charge l'espace de noms `xhtml:link` (Hreflang XML Extensions). Contrairement aux générateurs de sitemap par défaut qui ne répertorient que les URL brutes, Intlayer crée automatiquement les liens bidirectionnels requis entre toutes les versions linguistiques d'une page (par exemple, `/about`, `/about?lang=fr` et `/about?lang=es`). Cela garantit que les moteurs de recherche indexent et servent correctement la bonne version linguistique au bon public.

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

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Mettez à jour votre fichier `vite.config.ts` pour inclure le plugin `intlayerCompiler` :

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
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

</Step>

</Steps>

### Configuration TypeScript

Intlayer utilise l'augmentation de module pour tirer parti de TypeScript et rendre votre codebase plus robuste. Lit nécessite l'activation des `experimentalDecorators` si vous utilisez la syntaxe de décorateurs.

![Autocomplétion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erreur de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assurez-vous que votre configuration TypeScript inclut les types autogénérés.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    experimentalDecorators: true,
    useDefineForClassFields: false, // Requis par Lit pour que les décorateurs fonctionnent
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

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser un site Astro avec des îlots Lit ?">

L'option `i18n` intégrée d'Astro gère les préfixes de locale et les redirections, mais pas le contenu lui-même : vous avez donc toujours besoin d'une couche de messages, et un îlot ajoute un second problème : l'îlot exécute Lit, pas Astro.

- **`i18n` d'Astro plus des dictionnaires écrits à la main**, avec **`@lit/localize`** à l'intérieur de l'îlot : deux sources de contenu à garder synchronisées, et aucun typage partagé entre elles.
- **`Intlayer`** : une seule couche de contenu pour les deux. `astro-intlayer` couvre les pages `.astro` et `lit-intlayer` couvre les îlots Lit, en lisant les mêmes déclarations.

Déclarer un libellé une seule fois et l'utiliser à la fois dans une page statique et dans un îlot interactif est la raison de choisir une seule couche de contenu ici. Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md).

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille de mon bundle Astro ?">

Bien moins qu'une configuration basée sur des espaces de noms, car une page ne télécharge jamais un catalogue qu'elle n'affiche pas. Les pages Astro sont rendues au moment du build, elles livrent donc du HTML traduit et aucun dictionnaire ; seuls les îlots en reçoivent un. Le compilateur au moment du build résout les appels de contenu vers les entrées exactes qu'un composant utilise, et les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) répartissent le reste par locale. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle et des pages jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md).

</Question>

<Question title="Puis-je migrer depuis `@lit/localize` sans réécrire mes composants ?">

En grande partie. Suivez l'[aperçu des adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) pour transférer le contenu. Vous pouvez aussi migrer progressivement : le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos catalogues JSON existants comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, si bien que les deux couches restent synchronisées pendant que vous déplacez les composants un par un.

</Question>

<Question title="Puis-je conserver mes fichiers de traduction JSON existants ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos fichiers `/messages/{locale}/{namespace}.json` comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, dans les deux sens. Un [plugin de synchronisation PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) fait de même pour les catalogues gettext, et les [fichiers par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) permettent de séparer le contenu par langue au lieu de regrouper les locales dans un seul fichier.

</Question>

<Question title="Dois-je déplacer mon contenu clé par clé ?">

Non. Lancez `npx intlayer extract` et Intlayer lit vos composants, en extrait les chaînes destinées aux utilisateurs et écrit un fichier `.content` à côté de chacun, de sorte que vous relisez un diff plutôt que de copier des chaînes dans un catalogue une par une. L'étape 15 de ce guide le détaille.

Pour un pipeline entièrement automatisé, le [compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) fait la même chose au moment du build : il analyse votre code source JSX, TSX, Vue et Svelte à chaque changement, génère les dictionnaires et les garde synchronisés via le remplacement de module à chaud, de sorte qu'il n'y a plus aucune clé à maintenir à la main.

Deux limites méritent d'être connues avant d'activer le compilateur. Il fonctionne par analyse statique : les chaînes qui n'existent qu'à l'exécution, comme les codes d'erreur d'API ou les champs de CMS, restent hors de portée. Et il doit distinguer le texte destiné aux utilisateurs de la logique applicative comme `className="active"` ou un code de statut, ce qui nécessite quelques annotations dans une grande base de code. La [commande extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md) évite les deux en vous gardant dans la boucle.

</Question>

<Question title="Quels outils d'éditeur et d'agent IA sont disponibles ?">

Cinq éléments, tous optionnels :

- **[Extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)** : passez d'une clé `useIntlayer` au fichier de contenu qui la déclare, extrayez du contenu depuis un composant, et lancez build, fill, test, push et pull depuis la palette de commandes ou un onglet Intlayer dédié.
- **[Serveur LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)** : la même connaissance dans tout éditeur qui parle LSP, avec aller à la définition, rechercher toutes les références, aperçus au survol d'une valeur traduite, autocomplétion des clés et des champs, et un avertissement lorsqu'une clé n'est déclarée nulle part. Il résout aussi les appels `i18next`, `react-i18next`, `next-intl` et `use-intl`, ce qui aide pendant la migration.
- **[Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** : expose la documentation et la CLI d'Intlayer à Cursor, VS Code, Claude Desktop, Claude Code et ChatGPT, afin qu'un assistant réponde à partir de la documentation actuelle au lieu de deviner, et puisse exécuter lui-même des commandes telles que `intlayer fill`.
- **[Compétences d'agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)** : des compétences ciblées telles que `intlayer-config`, `intlayer-cli` et `intlayer-content`, plus une par framework, qui apprennent à un agent votre configuration de routage et les types de nœuds de contenu.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md)** : `no-raw-text` signale les chaînes codées en dur, avec d'autres règles pour les clés de dictionnaire statiques et le contenu inutilisé.

</Question>

<Question title="Ai-je besoin d'une bibliothèque d'i18n séparée à l'intérieur de mon îlot Lit ?">

Non. `lit-intlayer` lit les mêmes dictionnaires que le côté Astro, vous n'installez donc pas `@lit/localize` à côté. L'étape 6 montre le composant d'îlot recevant la locale active de la page au lieu de la résoudre à nouveau.

</Question>

<Question title="Comment l'îlot sait-il quelle locale la page affiche ?">

La page Astro la transmet en prop et le provider Intlayer de l'îlot la récupère, si bien que l'îlot s'hydrate dans la même langue que celle rendue par le serveur. C'est ce qui empêche le bref affichage de la langue par défaut que vous obtenez lorsqu'un îlot détecte la locale lui-même dans le navigateur.

</Question>

<Question title="Le contenu traduit est-il livré en HTML statique ?">

Oui pour les parties Astro, qui sont rendues au moment du build, si bien que les pages localisées sont du HTML statique simple que les crawlers lisent sans exécuter de JavaScript. Seuls les îlots reçoivent un dictionnaire, et uniquement pour la locale qu'ils affichent.

</Question>

<Question title="Comment mettre en place un routage localisé et un sélecteur de langue ?">

L'étape 7 couvre le sélecteur. `routing.mode` décide du schéma d'URL : `"prefix-no-default"` (la valeur par défaut, `/about` et `/fr/about`), `"prefix-all"`, `"no-prefix"` ou `"search-params"`, et `routing.domains` associe une locale à son propre domaine. `getLocalizedUrl` réécrit le chemin actuel afin que le changement de langue garde le lecteur sur la même page. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Question>

<Question title="Comment générer un sitemap localisé et des balises hreflang ?">

L'étape 8 couvre `sitemap.xml` et `robots.txt`. `getMultilingualUrls` construit les alternates pour chaque locale déclarée, y compris `x-default`, ce que les moteurs de recherche utilisent pour servir la bonne version linguistique.

</Question>

<Question title="Comment traduire le site automatiquement avec l'IA ?">

Lancez `npx intlayer fill`. Il remplit les traductions manquantes avec le LLM de votre choix, en utilisant votre propre fournisseur et votre clé d'API, et `--git-diff` limite l'exécution au contenu modifié sur la branche. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

</Question>

<Question title="Intlayer prend-il en charge les pluriels, le genre et le texte enrichi ?">

Oui : les [formes plurielles](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/plurial.md), le [contenu basé sur le genre](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender.md), les conditions, les [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md), le [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md) pour le texte long, et les [formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) pour les nombres, les dates et les devises.

</Question>

<Question title="Comment les traducteurs peuvent-ils modifier le contenu sans toucher au code ?">

Via l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md), qui tourne sur votre propre infrastructure et permet à quiconque de modifier le texte sur place sur l'application en cours d'exécution, ou le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), qui externalise le contenu afin qu'il puisse changer sans déploiement.

</Question>

<Question title="Intlayer est-il gratuit et open source ?">

Oui, sous licence Apache 2.0, usage commercial inclus. Le CMS hébergé est un service payant optionnel qui peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
