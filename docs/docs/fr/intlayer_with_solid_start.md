---
createdAt: 2025-08-06
updatedAt: 2026-08-30
title: "Solid Start i18n - Guide complet pour traduire votre application"
description: "Fini i18next. Le guide 2026 pour créer une application SolidStart multilingue (i18n). Routage de locale rendu côté serveur, hreflang, sitemap et traduction assistée par IA."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Historique initial"
author: aymericzip
---

# Traduire votre site SolidStart avec Intlayer | Internationalisation (i18n)

<Tabs defaultTab="video">
  <Tab label="Vidéo" value="video">

<iframe title="La meilleure solution i18n pour Vite et Solid ? Découvrez Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>

<Tab label="Démo" value="demo">

<iframe
  src="https://intlayer-solid-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo Intlayer Solid Start Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table des matières

<TOC/>

Ce guide couvre une application SolidStart **rendue côté serveur** : la détection de la locale se fait lors de la requête, les pages sont rendues sur le serveur dans la bonne langue, et les signaux `<html lang>`, `hreflang` et sitemap dont les moteurs de recherche ont besoin sont émis côté serveur.

## Pourquoi Intlayer plutôt que des alternatives ?

Par rapport aux principales solutions comme `@solid-primitives/i18n` ou `i18next`, Intlayer est une solution qui intègre des optimisations comme :

<AccordionGroup>
<Accordion header="Couverture complète de Solid">

Intlayer est optimisé pour fonctionner parfaitement avec Solid en offrant un **ciblage du contenu au niveau des composants**, des **traductions réactives**, et toutes les fonctionnalités nécessaires pour faire évoluer l'internationalisation (i18n).

</Accordion>

<Accordion header="Taille du bundle">

Au lieu de charger de volumineux fichiers JSON dans vos pages, chargez uniquement le contenu nécessaire. Intlayer aide à **réduire la taille de votre bundle et de vos pages jusqu'à 50 %**.

</Accordion>

<Accordion header="Maintenabilité">

Cibler le contenu de votre application **facilite la maintenance** pour les applications à grande échelle. Vous pouvez dupliquer ou supprimer un dossier de fonctionnalité individuel sans la charge mentale de vérifier l'ensemble de votre base de code de contenu. De plus, Intlayer est **entièrement typé** pour garantir l'exactitude de votre contenu.

</Accordion>

<Accordion header="Agent IA">

Colocaliser le contenu **réduit le contexte nécessaire** pour les grands modèles de langage (LLM). Intlayer est également livré avec une suite d'outils, tels qu'un **CLI** pour tester les traductions manquantes, le **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)**, le **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)**, et des **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)**, pour rendre l'expérience développeur (DX) encore plus fluide pour les agents IA.

</Accordion>

<Accordion header="Automation">

Utilisez l'automatisation pour traduire dans votre pipeline CI/CD en utilisant le LLM de votre choix au coût de votre fournisseur d'IA. Intlayer propose également un **compilateur** pour automatiser l'extraction de contenu, ainsi qu'une [plateforme web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) pour vous aider à **traduire en arrière-plan**.

</Accordion>

<Accordion header="Performance">

Connecter de volumineux fichiers JSON à des composants peut entraîner des problèmes de performance et de réactivité. Intlayer optimise le chargement de votre contenu au moment du build.

</Accordion>

<Accordion header="Évolution avec les non-développeurs">

Bien plus qu'une simple solution i18n, Intlayer fournit un **[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) auto-hébergé** et un **[CMS complet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)** pour vous aider à gérer votre contenu multilingue en **temps réel**, rendant la collaboration avec les traducteurs, rédacteurs et autres membres de l'équipe fluide. Le contenu peut être stocké localement et/ou à distance.

</Accordion>
</AccordionGroup>

---

## Guide étape par étape pour configurer Intlayer dans une application SolidStart

<Steps>

<Step number={1} title="Installer les dépendances">

Installez les paquets nécessaires en utilisant npm :

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> Le drapeau `--interactive` est optionnel. Utilisez `intlayer-cli init` si vous êtes un agent IA.

> Cette commande détectera votre environnement et installera les paquets requis. Par exemple :

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  Le paquet principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **solid-intlayer**

  Le paquet qui intègre Intlayer avec l'application Solid. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation Solid.

- **vite-intlayer**

  Inclut le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi que le gestionnaire de routage de locale qui détecte la locale préférée de l'utilisateur, gère les cookies et s'occupe de la redirection d'URL.

> `vite-intlayer` est ici une préoccupation côté serveur, et pas seulement au moment du build : il fournit le gestionnaire de requête exécuté par le serveur Nitro de SolidStart. Le conserver dans `dependencies` est l'option sécurisée par défaut — vous ne pouvez le déplacer dans `devDependencies` que si vous déployez le répertoire `.output` construit, dans lequel Nitro intègre le gestionnaire.

</Step>

<Step number={2} title="Configuration de votre projet">

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

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
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

Avec `prefix-no-default`, la locale par défaut est servie depuis des URL sans préfixe :

```plaintext
/            /about          → Anglais  (locale par défaut)
/fr          /fr/about       → Français
/es          /es/about       → Espagnol
```

> Grâce à ce fichier de configuration, vous pouvez configurer les URL localisées, la redirection middleware, les noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, reportez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>

<Step number={3} title="Intégrer Intlayer dans votre configuration Vite">

Ajoutez le plugin Intlayer à votre configuration :

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> Le plugin Vite `intlayer()` construit vos fichiers de déclaration de contenu, les surveille en mode développement et définit les variables d'environnement Intlayer dans l'application. Il fournit également des alias qui optimisent les performances.

### Le routage de locale est inclus avec le plugin

SolidStart fonctionne sur [Nitro](https://nitro.build), et `intlayer()` enregistre son gestionnaire de routage de locale directement dans le pipeline serveur de Nitro (via l'option `routing.enableProxy`, à `true` par défaut). Rien d'autre à câbler : sur un serveur construit, chaque requête est inspectée avant d'atteindre le routeur, et

- la locale est lue depuis le préfixe de l'URL, puis le cookie `INTLAYER_LOCALE`, puis l'en-tête `Accept-Language` ;
- une URL non préfixée est redirigée vers sa contrepartie localisée lorsque la locale résolue n'est pas celle par défaut (`/` → `/fr`) ;
- une URL préfixée de manière redundante est redirigée vers sa forme canonique (`/en/about` → `/about`) ;
- le cookie de locale est réécrit sur la réponse.

</Step>

<Step number={4} title="Déclarer votre contenu">

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **Piège spécifique à SolidStart** : chaque fichier `.ts` / `.tsx` sous `src/routes` devient une route, et un fichier `.content.ts` a un export par défaut, donc il serait considéré comme une page. Conservez les déclarations de contenu de vos **pages** en dehors du répertoire des routes (`src/contents/` fonctionne très bien). Le contenu des **composants** peut rester colocalisé, car `src/components` n'est pas scanné par le routeur basé sur le système de fichiers.

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès lors qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`), et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Pour plus de détails, reportez-vous à la [documentation de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

</Step>

<Step number={5} title="Ajouter le routage localisé">

L'objectif de cette étape est de donner à chaque langue sa propre URL, ce que les moteurs de recherche indexent.

Déplacez vos pages sous un **segment dynamique optionnel**. Dans le routeur basé sur le système de fichiers de SolidStart, `[[locale]]` se compile selon le motif de chemin `:locale?` :

```plaintext
src/routes/
  [[locale]].tsx          ← layout qui valide le segment
  [[locale]]/
    index.tsx             → /        et /fr        et /es
    about.tsx             → /about   et /fr/about  et /es/about
  [...404].tsx            → catch-all pour tout le reste
```

Le seul rôle du fichier de layout est de restreindre le segment à une locale configurée :

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` développe `:locale?` en deux motifs — un avec le segment et un sans — et les tente par ordre de spécificité décroissante. `matchFilters` est ce qui fait la différence entre une configuration fonctionnelle et une configuration confuse :

| URL         | Sans `matchFilters`                                        | Avec `matchFilters`                         |
| ----------- | ---------------------------------------------------------- | ------------------------------------------- |
| `/fr/about` | Page à propos en français                                  | Page à propos en français                   |
| `/about`    | Page à propos (le segment statique gagne)                  | Page à propos                               |
| `/unknown`  | **Page d'accueil**, silencieusement, avec `locale=unknown` | Pas de correspondance → passe au 404 global |

> Préférez `[locale]` (obligatoire) à `[[locale]]` si vous utilisez le mode de routage `'prefix-all'`, et supprimez complètement le segment pour `'no-prefix'` ou `'search-params'`.

</Step>

<Step number={6} title="Fournir la locale à votre application">

L'URL est la source unique de vérité pour la locale : le middleware a déjà redirigé la requête vers son chemin localisé, donc lire le chemin dans le layout racine maintient le rendu serveur et l'hydratation client en accord, et permet à chaque navigation côté client de mettre à jour la locale gratuitement.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // Le serveur rend <html> dans entry-server.tsx ; les navigations côté client
  // entre les locales doivent mettre à jour les attributs elles-mêmes.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` réagit à sa prop `locale`, donc passer l'appel d'accesseur `locale()` dans le JSX est suffisant — Solid le compile en un getter, et l'ensemble de l'arbre se ré-affiche dans la nouvelle langue lorsque l'URL change.

</Step>

<Step number={7} title="Définir les attributs HTML lang et dir sur le serveur">

L'élément `<html>` est rendu par `entry-server.tsx`, en dehors du `Router`. Lisez plutôt la locale depuis l'URL de la requête :

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

Les robots d'indexation reçoivent désormais la bonne langue dès le premier octet :

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="Utiliser Intlayer dans vos pages">

Accédez à vos dictionnaires de contenu dans l'ensemble de votre application :

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> Dans Solid, `useIntlayer` renvoie du contenu réactif (ex. `content`). Vous pouvez accéder directement à ses propriétés.

> Si vous souhaitez utiliser votre contenu dans un attribut `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous pouvez utiliser la valeur de la fonction, comme :
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Pour en savoir plus sur le hook `useIntlayer`, reportez-vous à la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/useIntlayer.md).

Les nœuds de contenu ne se limitent pas à de simples traductions. Un compteur pluralisé, par exemple :

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` sélectionne la catégorie via `Intl.PluralRules` pour la locale active, ainsi les langues ayant plus de deux formes pluriel fonctionnent sans aucun code supplémentaire.

</Step>

<Step number={9} title="Créer un composant Link localisé">

Créez un composant `Link` personnalisé qui préfixe automatiquement les URL internes avec la langue actuelle :

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

Écrire `href="/about"` une seule fois produit désormais `/about`, `/fr/about` ou `/es/about` selon la locale active — aucun préfixage manuel n'est nécessaire dans vos pages.

</Step>

<Step number={10} title="Créer un composant de changement de locale">

Rendez le sélecteur sous forme de **vrais ancres** plutôt qu'un `<select>` : chaque langue de la page actuelle devient un lien explorable pouvant être ouvert dans un nouvel onglet, ce qu'un contrôle uniquement basé sur JavaScript ne peut pas offrir.

`getPathWithoutLocale` supprime le segment de locale du chemin actuel, et `getLocalizedUrl` le reconstruit pour la locale cible, afin que les liens suivent votre mode de routage sans rien coder en dur. La navigation est ce qui modifie la locale rendue — la route `[[locale]]` la déduit de l'URL — tandis que `setLocale` persiste le choix dans le cookie `INTLAYER_LOCALE` afin qu'une visite ultérieure sur une URL sans locale soit résolue dans la même langue.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // Chemin canonique (sans locale) de la page actuellement affichée
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Correspondance exacte uniquement, afin que le lien de la locale par défaut ne soit pas marqué
              // actif sur chaque page
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // S'assure que le bouton "retour" du navigateur revienne à la page précédente
              replace
            >
              {/* Langue dans sa propre locale - ex. Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> Dans Solid, `locale` provenant de `useLocale` est un **accesseur de signal**. Utilisez `locale()` (avec parenthèses) pour lire sa valeur actuelle de manière réactive.
>
> `getLocaleName(localeItem)` rend chaque langue dans sa propre langue — `English / Français / Español`. Passez un second argument pour traduire les noms dans la langue actuellement affichée à la place : `getLocaleName(localeItem, locale())` donne `English / French / Spanish` en anglais, `anglais / français / espagnol` en français.
>
> `<A>` définit déjà `aria-current="page"` sur le lien correspondant à l'URL actuelle, il n'y a donc rien à ajouter pour cela. `replace` est lu depuis l'attribut rendu par le routeur : il remplace l'entrée d'historique au lieu d'en ajouter une, ainsi le bouton "retour" du navigateur revient à la page visitée avant le changement plutôt qu'à la même page dans la langue précédente.
>
> `dir` et `hreflang` sur chaque lien permettent de conserver les noms de langues de droite à gauche correctement orientés et d'indiquer aux technologies d'assistance et aux robots d'indexation la langue vers laquelle pointe chaque lien.
>
> Pour en savoir plus sur le hook `useLocale`, reportez-vous à la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Émettre les liens canoniques et hreflang" isOptional={true}>

Les annotations `hreflang` indiquent aux moteurs de recherche que `/about`, `/fr/about` et `/es/about` représentent la même page dans des langues différentes. `getMultilingualUrls` les déduit du chemin canonique (sans locale), en suivant votre mode de routage, afin que rien ne soit codé en dur :

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** URL absolue de la page en cours de rendu. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

Rendez-le dans l'en-tête du document, où l'URL de la requête est disponible :

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … à l'intérieur de <head>, à côté des autres balises meta :
<AlternateLinks url={url} />;
```

`GET /fr/about` sert alors :

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **Note sur `@solidjs/meta`** : au moment d'écrire ces lignes, `<Title>` et `<Meta>` de `@solidjs/meta` sont appliqués sur le client après l'hydratation mais ne sont **pas** émis dans le `<head>` rendu côté serveur dans SolidStart v2. En attendant que cela soit corrigé en amont, rendez les balises que les robots doivent voir sans JavaScript — `canonical`, `hreflang`, et si nécessaire `title` / `description` — directement dans `entry-server.tsx`, comme montré ci-dessus.

</Step>

<Step number={12} title="Gérer les pages non trouvées" isOptional={true}>

Une route splat à la racine de `src/routes` intercepte tous les chemins que le segment de locale n'a pas fait correspondre — y compris les préfixes de locale invalides rejetés par `matchFilters`. Parce que la locale provient toujours de l'URL à travers le layout racine, la page 404 est affichée dans la langue du visiteur :

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| Requête           | Résultat                                     |
| ----------------- | -------------------------------------------- |
| `/xx`             | `404` — `xx` n'est pas une locale configurée |
| `/nonexistent`    | `404` dans la locale par défaut              |
| `/fr/nonexistent` | `404` en français (`Page introuvable`)       |

</Step>

<Step number={13} title="Générer un sitemap multilingue" isOptional={true}>

Le générateurs de sitemap d'Intlayer étend chaque chemin en une entrée par locale et câble les alternatives `xhtml:link` entre elles, de sorte que la route n'a qu'à lister les chemins canoniques sans locale.

> Contrairement aux générateurs de base qui n'émettent que des URL plates, Intlayer câble des liens bidirectionnels entre chaque variante localisée de chaque page, ce qui aide les moteurs de recherche à relier les URL localisées et à servir la bonne au bon public.

SolidStart transforme un fichier exportant une méthode HTTP en route d'API, et supprime l'extension `.ts` du chemin — ainsi `src/routes/sitemap.xml.ts` est servi sur `/sitemap.xml` :

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="sortie de GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> Les routes d'API ne prennent pas en charge les paramètres optionnels, conservez donc ce fichier à la racine de `src/routes`, en dehors du segment `[[locale]]`. Le sitemap contient déjà chaque locale.

Vous pouvez construire un `robots.txt` de la même manière avec `getMultilingualUrls`, de sorte que les entrées `Disallow` couvraient chaque orthographe localisée d'un chemin sensible :

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="Récupérer la locale dans vos fonctions serveur" isOptional={true}>

Vous souhaiterez peut-être accéder à la locale actuelle depuis une fonction serveur ou une route d'API.

Dans une configuration basée sur des préfixes comme celle-ci, **l'URL fait foi** : `getLocaleFromPath` lit le préfixe depuis l'URL de la requête. `getLocale` est la solution de repli pour les requêtes qui ne portent pas de préfixe de locale — elle inspecte le cookie `INTLAYER_LOCALE`, puis l'en-tête `x-intlayer-locale`, puis négocie `Accept-Language`.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // Récupérer le cookie depuis la requête (par défaut : 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // Récupérer l'en-tête depuis la requête (par défaut : 'x-intlayer-locale'),
      // avec repli sur la négociation Accept-Language
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // Récupérer du contenu en dehors d'un composant en utilisant getIntlayer()
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> Ne vous fiez pas uniquement à `getLocale` ici : le cookie de locale n'est écrit qu'une fois qu'un visiteur change activement de langue, donc une première visite sur `/fr/...` serait résolue avec la locale par défaut.

</Step>

<Step number={15} title="Extraire le contenu de vos composants" isOptional={true}>

Si vous avez une base de code existante, transformer des milliers de fichiers peut prendre du temps.

Pour faciliter ce processus, Intlayer propose un [compilateur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) / [extracteur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md) pour transformer vos composants et en extraire le contenu.

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
     * Indique si les composants doivent être enregistrés après avoir été transformés.
     *
     * - Si `true`, le compilateur réécrira le fichier du composant sur le disque. La transformation sera donc permanente et le compilateur ignorera la transformation lors du processus suivant. De cette façon, le compilateur peut transformer l'application, puis être retiré.
     *
     * - Si `false`, le compilateur injectera l'appel de fonction `useIntlayer()` dans le code dans le résultat du build uniquement, et gardera la base de code intacte. La transformation sera effectuée uniquement en mémoire.
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
 <Tab value="Commande d'extraction">

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

> Déplacez ensuite les fichiers de contenu générés de vos pages hors de `src/routes`, pour la raison expliquée à l'étape 5.

 </Tab>
 <Tab value="Compilateur Babel">

> Depuis la v9, le `intlayerCompiler` est inclus dans le plugin `intlayer`. Vous n'avez donc pas besoin de l'ajouter manuellement.

Mettez à jour votre `vite.config.ts` pour inclure le plugin `intlayerCompiler` :

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // Ajoute le plugin de compilateur
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
bun run build # Ou bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Configurer TypeScript">

Intlayer utilise l'augmentation de module pour bénéficier des avantages de TypeScript et rendre votre base de code plus solide.

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement :

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... vos configurations existantes
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

Les clés de dictionnaire et les chemins de contenu sont désormais vérifiés au moment de la compilation :

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## Vérification de votre configuration

Construisez et démarrez le serveur, puis vérifiez que ces requêtes se comportent comme prévu :

```bash
npm run build
node .output/server/index.mjs
```

| Requête                                  | Réponse attendue                         |
| ---------------------------------------- | ---------------------------------------- |
| `GET /`                                  | `200` — Anglais                          |
| `GET /` avec `Accept-Language: fr`       | `302` → `/fr`                            |
| `GET /` avec cookie `INTLAYER_LOCALE=es` | `302` → `/es`                            |
| `GET /fr`                                | `200` — Français, `<html lang="fr">`     |
| `GET /fr/about`                          | `200` — Page à propos en français        |
| `GET /en/about`                          | `302` → `/about` (redirection canonique) |
| `GET /xx`                                | `404`                                    |
| `GET /fr/nonexistent`                    | `404` en français                        |
| `GET /sitemap.xml`                       | `200` — Sitemap XML multilingue          |

Les lignes qui rendent une page se comportent à l'identique sous `vite dev`. Les trois lignes de redirection s'appliquent uniquement à un serveur construit, sauf si vous enregistrez vous-même le gestionnaire comme middleware — voir l'étape 3.

> Exécutez le serveur dev sur Node (`vite dev`) plutôt que sur Bun (`bun --bun vite dev`) : le SSR de SolidStart échoue actuellement sous le runtime Bun avec `Expected a Response object, but received 'NodeResponse'`. Ceci n'a aucun lien avec Intlayer — cela se reproduit sur le modèle de base — et n'affecte que le serveur dev, pas `vite build`.

---

## Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les commiter dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

---

## Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'**extension VS Code officielle Intlayer**.

[Installer depuis le VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **L'autocomplétion** pour les clés de traduction.
- **La détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

---

## Pour aller plus loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu à l'aide du [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

---

## Références de documentation

- [Documentation Intlayer](https://intlayer.org)
- [Documentation SolidStart](https://start.solidjs.com)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/useLocale.md)
- [Déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser une application Solid Start ?">

- **`@solid-primitives/i18n`** : la primitive communautaire, un dictionnaire plat que vous assemblez, chargez et typez vous-même.
- **`i18next`** avec un wrapper Solid : des catalogues matures, mais rien pour le routage sensible à la locale ni le rendu serveur dans Solid Start.
- **`Intlayer`** : contenu déclaré à côté de chaque composant et compilé au moment du build, avec des routes localisées, la résolution de la locale côté serveur, des liens canoniques et hreflang, un sitemap multilingue, la traduction par IA, un éditeur visuel et un CMS.

Sur Solid Start, la différence se voit dans les éléments serveur, que ce guide couvre en étapes dédiées plutôt que de vous les laisser. Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) et le [benchmark Solid i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/solid.md).

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille de mon bundle Solid Start ?">

Bien moins qu'une configuration basée sur des espaces de noms, car une page ne télécharge jamais un catalogue qu'elle n'affiche pas. Le balisage rendu côté serveur résout son contenu sur le serveur, et le compilateur au moment du build remplace les appels `useIntlayer` par les entrées de dictionnaire exactes qu'un composant utilise, si bien que les clés inutilisées et les langues inutilisées sont éliminées, et les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) répartissent le reste par locale. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle et des pages jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/solid.md).

</Question>

<Question title="Puis-je migrer depuis `@solid-primitives/i18n` ou `i18next` sans réécrire mes composants ?">

En grande partie. Suivez le [guide de migration i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md) pour transférer le contenu. Vous pouvez aussi migrer progressivement : le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos catalogues JSON existants comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, si bien que les deux couches restent synchronisées pendant que vous déplacez les composants un par un.

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

<Question title="Intlayer fonctionne-t-il avec le rendu côté serveur de Solid Start ?">

Oui. L'étape 6 fournit la locale à l'application sur le serveur et l'étape 7 y définit les attributs `lang` et `dir`, si bien que la première réponse HTML porte déjà la bonne langue, ce que lisent les crawlers et les robots d'aperçu social.

</Question>

<Question title="Changer la locale réaffiche-t-il toute mon application ?">

Non. Le contenu est soutenu par des signals Solid, si bien que changer de langue met à jour uniquement les nœuds du DOM qui lisent les valeurs modifiées, sans réexécuter les composants autour d'eux.

</Question>

<Question title="Comment ajouter des liens canoniques et hreflang ?">

L'étape 11 le couvre. `getMultilingualUrls` construit les alternates pour chaque locale déclarée, y compris `x-default`, et l'étape 13 alimente les mêmes données dans un sitemap multilingue afin que chaque version linguistique d'une page renvoie vers les autres.

</Question>

<Question title="Comment gérer les pages 404 sur les routes localisées ?">

L'étape 12 le couvre. `validatePrefix` vous indique si le segment de locale de l'URL est une locale déclarée, si bien que `/xx/about` renvoie un vrai 404 au lieu d'être traité comme un chemin et indexé comme une page dupliquée.

</Question>

<Question title="Dois-je mettre la locale dans l'URL ?">

Non. `routing.mode` accepte `"prefix-no-default"` (la valeur par défaut), `"prefix-all"`, `"no-prefix"` et `"search-params"`, et `routing.domains` associe chaque locale à son propre domaine. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Question>

<Question title="Comment obtenir la locale dans une fonction serveur ?">

L'étape 14 le couvre. La locale résolue pour la requête est disponible à l'intérieur des fonctions serveur, si bien que les données récupérées à cet endroit peuvent être localisées dans la même passe au lieu d'être traduites à nouveau sur le client.

</Question>

<Question title="Comment traduire l'application automatiquement avec l'IA ?">

Lancez `npx intlayer fill`. Il remplit les traductions manquantes avec le LLM de votre choix, en utilisant votre propre fournisseur et votre clé d'API, et `--git-diff` limite l'exécution au contenu modifié sur la branche. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

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
