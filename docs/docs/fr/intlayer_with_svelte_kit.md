---
createdAt: 2025-11-20
updatedAt: 2025-12-30
title: Comment traduire votre application SvelteKit – guide i18n 2026
description: Découvrez comment rendre votre site SvelteKit multilingue. Suivez la documentation pour internationaliser (i18n) et traduire votre site en utilisant le Server-Side Rendering (SSR).
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
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Ajouter la commande init
  - version: 7.1.10
    date: 2025-11-20
    changes: Historique initial
---

# Traduisez votre site SvelteKit avec Intlayer | Internationalisation (i18n)

## Table des matières

<TOC/>

## Qu'est-ce que Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier la prise en charge multilingue dans les applications web modernes. Elle fonctionne parfaitement avec les capacités de Server-Side Rendering (SSR) de **SvelteKit**.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement.
- **Exploiter le SSR de SvelteKit** pour une internationalisation optimisée pour le SEO.

---

## Guide étape par étape pour configurer Intlayer dans une application SvelteKit

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

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

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires en utilisant npm :

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer** : Le paquet principal pour l'internationalisation (i18n).
- **svelte-intlayer** : Fournit des context providers et des stores pour Svelte/SvelteKit.
- **vite-intlayer** : Le plugin Vite pour intégrer les déclarations de contenu dans le processus de build.

### Étape 2 : Configuration de votre projet

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

### Étape 3 : Intégrer Intlayer dans votre configuration Vite

Mettez à jour votre fichier `vite.config.ts` pour inclure le plugin Intlayer. Ce plugin gère la transpilation de vos fichiers de contenu.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // l'ordre est important, Intlayer doit être placé avant SvelteKit
});
```

### Étape 4 : Déclarez votre contenu

Créez vos fichiers de déclaration de contenu n'importe où dans votre dossier `src` (par exemple, `src/lib/content` ou à côté de vos composants). Ces fichiers définissent le contenu traduisible pour votre application en utilisant la fonction `t()` pour chaque locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
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

### Étape 5 : Utilisez Intlayer dans vos composants

Vous pouvez maintenant utiliser la fonction `useIntlayer` dans n'importe quel composant Svelte. Elle retourne un store réactif qui se met automatiquement à jour lorsque la locale change. La fonction respecte automatiquement la locale courante (à la fois lors du SSR et de la navigation côté client).

> **Note :** `useIntlayer` retourne un store Svelte, vous devez donc utiliser le préfixe `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: Comment traduire votre application SvelteKit – guide i18n 2026
> description: Découvrez comment rendre votre site SvelteKit multilingue. Suivez la documentation pour internationaliser (i18n) et traduire votre site en utilisant le Server-Side Rendering (SSR).
> keywords:

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
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: Historique initial

---

# Traduisez votre site SvelteKit avec Intlayer | Internationalisation (i18n)

## Table des matières

<TOC/>

## Qu'est-ce que Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier la prise en charge multilingue dans les applications web modernes. Elle fonctionne parfaitement avec les capacités de Server-Side Rendering (SSR) de **SvelteKit**.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement.
- **Exploiter le SSR de SvelteKit** pour une internationalisation optimisée pour le SEO.

---

## Guide étape par étape pour configurer Intlayer dans une application SvelteKit

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

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires en utilisant npm :

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer** : Le paquet principal pour l'internationalisation (i18n).
- **svelte-intlayer** : Fournit des context providers et des stores pour Svelte/SvelteKit.
- **vite-intlayer** : Le plugin Vite pour intégrer les déclarations de contenu dans le processus de build.

### Étape 2 : Configuration de votre projet

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

### Étape 3 : Intégrer Intlayer dans votre configuration Vite

Mettez à jour votre fichier `vite.config.ts` pour inclure le plugin Intlayer. Ce plugin gère la transpilation de vos fichiers de contenu.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // l'ordre est important, Intlayer doit être placé avant SvelteKit
});
```

### Étape 4 : Déclarez votre contenu

Créez vos fichiers de déclaration de contenu n'importe où dans votre dossier `src` (par exemple, `src/lib/content` ou à côté de vos composants). Ces fichiers définissent le contenu traduisible pour votre application en utilisant la fonction `t()` pour chaque locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
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

### Étape 5 : Utilisez Intlayer dans vos composants

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
<h1><svelte:component this={$content.title} /></h1>
<!-- Pour afficher le contenu en tant que chaîne -->
<div aria-label={$content.title.value}></div>
```

### (Optionnel) Étape 6 : Configurer le routage

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

### Étape 7 : Gérer la détection de la locale côté serveur (Hooks)

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

> `getLocaleFromStorage` vérifiera la locale à partir de l'en-tête ou du cookie selon votre configuration. Voir [Configuration](https://intlayer.org/doc/configuration) pour plus de détails.

> La fonction `localeDetector` traitera l'en-tête `Accept-Language` et retournera la meilleure correspondance.

Si la locale n'est pas configurée, nous souhaitons retourner une erreur 404. Pour faciliter cela, nous pouvons créer une fonction `match` pour vérifier si la locale est valide :

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
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
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// Utilisez le type générique Load
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
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
	import { useIntlayer } from 'svelte-intlayer';

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

### (Optionnel) Étape 8 : Liens internationalisés

Pour le SEO, il est recommandé de préfixer vos routes avec la locale (par exemple, `/en/about`, `/fr/about`). Ce composant préfixe automatiquement tout lien avec la locale courante.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

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

### (Optionnel) Étape 9 : Sélecteur de langue

Pour permettre aux utilisateurs de changer de langue, mettez à jour l’URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
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

### (Optionnel) Étape 10 : Ajouter un proxy backend

Pour ajouter un proxy backend à votre application SvelteKit, vous pouvez utiliser la fonction `intlayerProxy` fournie par le plugin `vite-intlayer`. Ce plugin détectera automatiquement la meilleure locale pour l'utilisateur en fonction de l'URL, des cookies et des préférences linguistiques du navigateur.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (Optionnel) Étape 11 : Configurer l'éditeur / CMS intlayer

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
  <svelte:component this={$content.component} />
</div>
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer.

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

---

### Aller plus loin

Pour pouvoir visualiser le sélecteur de l'éditeur intlayer, vous devrez utiliser la syntaxe composant dans votre contenu intlayer.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Rendre le contenu comme un contenu simple -->
  <h1>{$content.title}</h1>

  <!-- Rendre le contenu comme un composant (requis par l'éditeur) -->
  <svelte:component this={$content.component} />
</div>
```

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
