---
createdAt: 2025-11-20
updatedAt: 2026-08-30
title: "SvelteKit i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application SvelteKit multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Ajouter la commande init"
  - version: 7.1.10
    date: 2025-11-20
    changes: "Historique initial"
author: aymericzip
---

# Traduisez votre site SvelteKit avec Intlayer | Internationalisation (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Démo" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table des matières

<TOC/>

## Pourquoi Intlayer plutôt que des alternatives ?

Par rapport aux solutions principales telles que `svelte-i18n` ou `i18next`, Intlayer est une solution dotée d'optimisations intégrées telles que :

<AccordionGroup>
<Accordion header="Support complet de SvelteKit">

Intlayer est optimisé pour fonctionner parfaitement avec SvelteKit en offrant le **routage multilingue**, la **prise en charge SSR** et toutes les fonctionnalités nécessaires à la mise à l'échelle de l'internationalisation (i18n).

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

## Guide étape par étape pour configurer Intlayer dans une application SvelteKit

Voir [Modèle d'application](https://github.com/aymericzip/intlayer-sveltekit-template) sur GitHub.

Pour commencer, créez un nouveau projet SvelteKit. Voici la structure finale que nous allons réaliser :

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

<Steps>

<Step number={1} title="Installer les dépendances">

Installez les paquets nécessaires en utilisant npm :

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
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer** : Le paquet principal pour l'internationalisation (i18n).
- **svelte-intlayer** : Fournit des context providers et des stores pour Svelte/SvelteKit.
- **vite-intlayer** : Le plugin Vite pour intégrer les déclarations de contenu dans le processus de build.

</Step>

<Step number={2} title="Configuration de votre projet">

Créez un fichier de configuration à la racine de votre projet :

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

</Step>

<Step number={3} title="Intégrer Intlayer dans votre configuration Vite">

Mettez à jour votre fichier `vite.config.ts` pour inclure le plugin Intlayer. Ce plugin gère la transpilation de vos fichiers de contenu.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // l'ordre est important, Intlayer doit être placé avant SvelteKit
});
```

</Step>

<Step number={4} title="Déclarez votre contenu">

Créez vos fichiers de déclaration de contenu n'importe où dans votre dossier `src` (par exemple, `src/lib/content` ou à côté de vos composants). Ces fichiers définissent le contenu traduisible pour votre application en utilisant la fonction `t()` pour chaque locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

</Step>

<Step number={5} title="Utilisez Intlayer dans vos composants">

Vous pouvez maintenant utiliser la fonction `useIntlayer` dans n'importe quel composant Svelte. Elle retourne un store réactif qui se met à jour automatiquement lorsque la locale change. La fonction respectera automatiquement la locale actuelle (à la fois lors du SSR et de la navigation côté client).

pour accéder à sa valeur réactive (par exemple, `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" correspond à la clé définie à l'Étape 4
  const content = useIntlayer("hero-section");
</script>

<!-- Afficher le contenu comme contenu simple  -->
<h1>{$content.title}</h1>
<!-- Pour rendre le contenu éditable via l'éditeur -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- Pour afficher le contenu en tant que chaîne -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="Configurer le routage" isOptional={true}>

Les étapes suivantes montrent comment configurer un routage basé sur la locale dans SvelteKit. Cela permet à vos URLs d'inclure le préfixe de la locale (par exemple, `/en/about`, `/fr/about`) pour un meilleur SEO et une meilleure expérience utilisateur.

```bash
.
└─── src
    ├── app.d.ts                  # Définir le type de la locale
    ├── hooks.server.ts           # Gérer le routage des locales
    ├── lib
    │   └── getLocale.ts          # Vérifier la locale depuis l'en-tête, les cookies
    ├── params
    │   └── locale.ts             # Définir le paramètre locale
    └── routes
        ├── [[locale=locale]]     # Encapsuler dans un groupe de routes pour définir la locale
        │   ├── +layout.svelte    # Mise en page locale pour la route
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # Mise en page racine pour les polices et styles globaux
```

</Step>

<Step number={7} title="Gérer la détection de la locale côté serveur">

Dans SvelteKit, le serveur doit connaître la locale de l'utilisateur pour rendre le contenu correct lors du SSR. Nous utilisons `hooks.server.ts` pour détecter la locale à partir de l'URL ou des cookies.

Créez ou modifiez `src/hooks.server.ts` :

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // Vérifie si le chemin actuel commence déjà par une locale (ex. /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // Si AUCUNE locale n'est présente dans l'URL (ex. l'utilisateur visite "/"), redirigez-le
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // Redirection temporaire
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

Ensuite, créez un helper pour obtenir la locale de l'utilisateur à partir de l'événement de requête :

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Récupère la locale de l'utilisateur à partir de l'événement de requête.
 * Cette fonction est utilisée dans le hook `handle` dans `src/hooks.server.ts`.
 *
 * Elle tente d'abord d'obtenir la locale depuis le stockage Intlayer (cookies ou en-têtes personnalisés).
 * Si la locale n'est pas trouvée, elle revient à la négociation "Accept-Language" du navigateur.
 *
 * @param event - L'événement de requête de SvelteKit
 * @returns La locale de l'utilisateur
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Tente d'obtenir la locale depuis le stockage Intlayer (cookies ou en-têtes)
  const storedLocale = getLocaleFromStorage({
    // Accès aux cookies SvelteKit
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // Accès aux headers SvelteKit
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Repli sur la négociation "Accept-Language" du navigateur
  const negotiatorHeaders: Record<string, string> = {};

  // Conversion de l'objet Headers de SvelteKit en un Record<string, string> simple
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // Vérification de la locale à partir du header `Accept-Language`
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Retourne la locale par défaut si aucune correspondance n'est trouvée
  return defaultLocale;
};
```

> `getLocaleFromStorage` vérifiera la locale à partir de l'en-tête ou du cookie selon votre configuration. Voir [Configuration](https://intlayer.org/doc/concept/configuration) pour plus de détails.

> La fonction `localeDetector` traitera l'en-tête `Accept-Language` et retournera la meilleure correspondance.

Si la locale n'est pas configurée, nous souhaitons retourner une erreur 404. Pour faciliter cela, nous pouvons créer une fonction `match` pour vérifier si la locale est valide :

```ts fileName="/src/params/locale.ts"import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
```

> **Note :** Assurez-vous que votre fichier `src/app.d.ts` inclut la définition de la locale :
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

Pour le fichier `+layout.svelte`, nous pouvons tout supprimer afin de ne conserver que le contenu statique, non lié à l’i18n :

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

Ensuite, créez une nouvelle page et un layout sous le groupe `[[locale=locale]]` :

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// Utilisez le type générique Load
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Initialiser Intlayer avec la locale provenant de la route
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// Utiliser le dictionnaire de contenu du layout
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from "svelte-intlayer";

	// Utiliser le dictionnaire de contenu de la page d'accueil
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

</Step>

<Step number={8} title="Liens internationalisés" isOptional={true}>

Pour le SEO, il est recommandé de préfixer vos routes avec la locale (par exemple, `/en/about`, `/fr/about`). Ce composant préfixe automatiquement tout lien avec la locale courante.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  let { href = "" } = $props();
  const { locale } = useLocale();

  // Aide pour préfixer l'URL avec la locale courante
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

Si vous utilisez `goto` de SvelteKit, vous pouvez utiliser la même logique avec `getLocalizedUrl` pour naviguer vers l'URL localisée :

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // Navigue vers /en/about ou /fr/about selon la locale
```

</Step>

<Step number={9} title="Sélecteur de langue" isOptional={true}>

Pour permettre aux utilisateurs de changer de langue, mettez à jour l’URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // Va définir la locale dans le store et déclencher onLocaleChange
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

</Step>

<Step number={10} title="Ajouter un proxy backend" isOptional={true}>

Pour ajouter un proxy backend à votre application SvelteKit, vous pouvez utiliser la fonction `intlayerProxy` fournie par le plugin `vite-intlayer`. Ce plugin détectera automatiquement la meilleure locale pour l'utilisateur en fonction de l'URL, des cookies et des préférences linguistiques du navigateur.

> Depuis Intlayer v9, `intlayerProxy()` est fourni directement dans le plugin `intlayer()` et activé par défaut via l'option `routing.enableProxy` (`true` par défaut). L'enregistrement séparé comme indiqué ci-dessous est désormais optionnel — il est conservé pour la compatibilité rétroactive et les configurations qui nécessitent de contrôler l'ordre des plugins. Définissez `routing.enableProxy: false` pour désactiver cette fonctionnalité. Consultez les [notes de version v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/releases/v9.md).

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    sveltekit(),
  ],],
});
```

</Step>

<Step number={11} title="Configurer l'éditeur / CMS intlayer" isOptional={true}>

Pour configurer l'éditeur intlayer, vous devez suivre la [documentation de l'éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

Pour configurer le CMS intlayer, vous devez suivre la [documentation du CMS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

Pour pouvoir visualiser le sélecteur de l'éditeur intlayer, vous devrez utiliser la syntaxe composant dans votre contenu intlayer.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Rendre le contenu comme contenu simple -->
  <h1>{$content.title}</h1>

  <!-- Rendre le contenu comme un composant (requis par l'éditeur) -->
  {@const Component = $content.component}<Component />
</div>
```

</Step>

<Step number={12} title="Extraire le contenu de vos composants" isOptional={true}>

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

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer.

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

---

### Aller plus loin

- **Éditeur Visuel** : Intégrez l'[Éditeur Visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) pour éditer les traductions directement depuis l'interface utilisateur.
- **CMS** : Externalisez la gestion de votre contenu en utilisant le [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser une application SvelteKit ?">

- **`svelte-i18n`** et **`typesafe-i18n`** : des catalogues de messages basés sur des stores, câblés à la main dans les fonctions load.
- **`Paraglide`** : des messages compilés avec un typage solide, centré uniquement sur la couche de messages.
- **`Intlayer`** : contenu déclaré à côté de chaque composant et compilé au moment du build, avec routage sensible à la locale, détection de la locale côté serveur, traduction par IA, un éditeur visuel et un CMS.

Sur SvelteKit, la différence se voit dans les éléments côté serveur : la détection de la locale dans les hooks, les liens localisés et l'intégration de l'éditeur sont fournis avec la bibliothèque au lieu d'être assemblés par projet. Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) et le [benchmark Svelte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/svelte.md).

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille de mon bundle SvelteKit ?">

Bien moins qu'une configuration basée sur des espaces de noms, car une page ne télécharge jamais un catalogue qu'elle n'affiche pas. Le balisage rendu côté serveur résout son contenu sur le serveur, et le compilateur au moment du build remplace les appels `useIntlayer` par les entrées de dictionnaire exactes qu'un composant utilise, si bien que les clés inutilisées et les langues inutilisées sont éliminées, et les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) répartissent le reste par locale. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle et des pages jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/svelte.md).

</Question>

<Question title="Puis-je migrer depuis `svelte-i18n` ou `typesafe-i18n` sans réécrire mes composants ?">

En grande partie. Suivez le [guide de migration Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/svelte-i18n.md) pour transférer le contenu. Vous pouvez aussi migrer progressivement : le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos catalogues JSON existants comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, si bien que les deux couches restent synchronisées pendant que vous déplacez les composants un par un.

</Question>

<Question title="Puis-je conserver mes fichiers de traduction JSON existants ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos fichiers `/messages/{locale}/{namespace}.json` comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, dans les deux sens. Un [plugin de synchronisation PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) fait de même pour les catalogues gettext, et les [fichiers par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) permettent de séparer le contenu par langue au lieu de regrouper les locales dans un seul fichier.

</Question>

<Question title="Dois-je déplacer mon contenu clé par clé ?">

Non. Lancez `npx intlayer extract` et Intlayer lit vos composants, en extrait les chaînes destinées aux utilisateurs et écrit un fichier `.content` à côté de chacun, de sorte que vous relisez un diff plutôt que de copier des chaînes dans un catalogue une par une. L'étape 12 de ce guide le détaille.

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

<Question title="Intlayer fonctionne-t-il avec le rendu côté serveur et le prérendu de SvelteKit ?">

Oui. L'étape 7 couvre la détection de la locale côté serveur dans `hooks.server.ts`, si bien que la première réponse HTML porte déjà la bonne langue, ce que lisent les moteurs de recherche et les crawlers sociaux. Les routes prérendues résolvent leur contenu au moment du build.

</Question>

<Question title="Comment mettre en place des routes localisées et des liens internationalisés ?">

Les étapes 6 et 8 le couvrent. Un segment de locale sur l'arbre de routes plus `getLocalizedUrl` pour les liens garde la navigation dans la langue active, et `routing.mode` décide si la locale par défaut est préfixée. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Question>

<Question title="Comment construire un sélecteur de langue dans Svelte ?">

L'étape 9 montre le composant. `useLocale` expose la locale active, les locales déclarées et un setter qui persiste le choix dans un cookie, tandis que `getLocalizedUrl` réécrit le chemin actuel afin que le lecteur reste sur la même page après le changement.

</Question>

<Question title="Comment traduire une application SvelteKit automatiquement avec l'IA ?">

Lancez `npx intlayer fill`, qui remplit les traductions manquantes avec le LLM de votre choix en utilisant votre propre fournisseur et votre clé d'API, et `--git-diff` limite l'exécution au contenu modifié sur la branche. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

</Question>

<Question title="Intlayer prend-il en charge les pluriels, le genre et le texte enrichi ?">

Oui : les [formes plurielles](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/plurial.md), le [contenu basé sur le genre](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender.md), les conditions, les [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md), le [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md) et les [formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) pour les nombres, les dates et les devises.

</Question>

<Question title="Comment les traducteurs peuvent-ils modifier le contenu sans toucher au code ?">

Via l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md), qui tourne sur votre propre infrastructure et permet à quiconque de modifier le texte sur place sur l'application en cours d'exécution, ou le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), qui externalise le contenu afin qu'il puisse changer sans déploiement.

</Question>

<Question title="Intlayer est-il gratuit et open source ?">

Oui, sous licence Apache 2.0, usage commercial inclus. Le CMS hébergé est un service payant optionnel qui peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
