---
createdAt: 2025-12-07
updatedAt: 2026-08-30
title: "React Router v7 i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application React Router v7 multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - React Router v7
  - fs-routes
  - Routes basées sur le système de fichiers
  - React
  - i18n
  - TypeScript
  - Routage par locale
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7-fs-routes
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-fs-routes-template
applicationShowcase: https://intlayer-react-router-v7-fs-routes.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Ajouter la commande init"
  - version: 7.3.4
    date: 2025-12-08
    changes: "Historique initial"
author: aymericzip
---

# Traduire votre React Router v7 (File-System Routes) avec Intlayer | Internationalisation (i18n)

Ce guide montre comment intégrer **Intlayer** pour une internationalisation fluide dans les projets React Router v7 en utilisant un **routage basé sur le système de fichiers** (`@react-router/fs-routes`) avec un routage sensible à la locale, la prise en charge de TypeScript, et des pratiques de développement modernes.

Pour le routage côté client, consultez le guide [Intlayer avec React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_react_router_v7.md).

## Table des matières

<TOC/>

## Pourquoi Intlayer plutôt que des alternatives ?

Par rapport aux solutions principales telles que `react-i18next` ou `i18next`, Intlayer est une solution dotée d'optimisations intégrées telles que :

<AccordionGroup>
<Accordion header="Couverture complète du routeur React">

Intlayer est optimisé pour fonctionner parfaitement avec React Router en offrant un **routage compatible avec les paramètres régionaux**, un **middleware pour la détection des paramètres régionaux** et toutes les fonctionnalités nécessaires à la mise à l'échelle de l'internationalisation (i18n).

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

## Guide étape par étape pour configurer Intlayer dans une application React Router v7 avec des routes basées sur le système de fichiers

<Tabs defaultTab="video">
  <Tab label="Vidéo" value="video">

<iframe title="Comment traduire une application React Router v7 (File-System Routes) avec Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-fs-routes-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Démo" value="demo">

<iframe
  src="https://intlayer-react-router-v7-fs-routes.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo - intlayer-react-router-v7-fs-routes-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Voir le [Modèle d'Application](https://github.com/aymericzip/intlayer-react-router-v7-fs-routes-template) sur GitHub.

<Steps>

<Step number={1} title="Installer les dépendances">

Installez les paquets nécessaires en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npm install @react-router/fs-routes --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm add @react-router/fs-routes --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bun add @react-router/fs-routes --dev
bun x intlayer init
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation, et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **react-intlayer**
  Le package qui intègre Intlayer avec une application React. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation dans React.

- **vite-intlayer**
  Comprend le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi que des middlewares pour détecter la locale préférée de l'utilisateur, gérer les cookies, et gérer la redirection des URL.

- **@react-router/fs-routes**
  Le package qui active le routage basé sur le système de fichiers pour React Router v7.

</Step>

<Step number={2} title="Configuration de votre projet">

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer les URLs localisées, la redirection via middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et bien plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>

<Step number={3} title="Intégrer Intlayer dans votre configuration Vite">

Ajoutez le plugin intlayer dans votre configuration :

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

> Le plugin Vite `intlayer()` est utilisé pour intégrer Intlayer avec Vite. Il assure la génération des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Vite. De plus, il fournit des alias pour optimiser les performances.

</Step>

<Step number={4} title="Configurer les routes basées sur le système de fichiers de React Router v7">

Configurez votre routage pour utiliser des routes basées sur le système de fichiers avec `flatRoutes` :

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // Ignorer les fichiers de déclaration de contenu pour qu'ils ne soient pas traités comme des routes
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> La fonction `flatRoutes` de `@react-router/fs-routes` active le routage basé sur le système de fichiers, où la structure des fichiers dans le répertoire `routes/` détermine les routes de votre application. L'option `ignoredRouteFiles` garantit que les fichiers de déclaration de contenu Intlayer (`.content.ts`, etc.) ne sont pas traités comme des fichiers de route.

</Step>

<Step number={5} title="Créer des fichiers de route avec les conventions du système de fichiers">

Avec le routage basé sur le système de fichiers, vous utilisez une convention de nommage plate où les points (`.`) représentent les segments de chemin et les parenthèses `()` désignent les segments optionnels.

Créez les fichiers suivants dans votre répertoire `app/routes/` :

#### Structure des fichiers

```bash
app/
├── root.tsx                         # Wrapper de mise en page pour les routes de locale
└──routes/
    ├── ($locale)._index.tsx         # Page d'accueil (/, /es, etc.)
    ├── ($locale)._index.content.ts  # Contenu de la page d'accueil
    ├── ($locale).about.tsx          # Page À propos (/about, /es/about, etc.)
    └── ($locale).about.content.ts   # Contenu de la page À propos
```

Les conventions de nommage :

- `($locale)` - Segment dynamique optionnel pour le paramètre de locale
- `_layout` - Route de mise en page qui enveloppe les routes enfants
- `_index` - Route d'index (s'affiche au chemin parent)
- `.` (point) - Sépare les segments de chemin (par exemple, `($locale).about` → `/:locale?/about`)

#### Composant de mise en page

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  isRouteErrorResponse,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

// links and ErrorBoundary code

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

#### Page d'index

```tsx fileName="app/routes/($locale)._index.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";
import { Navbar } from "~/components/navbar";

import type { Route } from "./+types/($locale)._index";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("page", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

#### Page À propos

```tsx fileName="app/routes/($locale).about.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";
import { Navbar } from "~/components/navbar";

import type { Route } from "./+types/($locale).about";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("about", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function AboutPage() {
  const { title, content, homeLink } = useIntlayer("about");

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <nav>
        <LocalizedLink to="/">{homeLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

</Step>

<Step number={6} title="Déclarez votre contenu">

Créez et gérez vos déclarations de contenu pour stocker les traductions. Placez les fichiers de contenu à côté de vos fichiers de route :

```tsx fileName="app/routes/($locale)._index.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

```tsx fileName="app/routes/($locale).about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      en: "About Us",
      es: "Sobre Nosotros",
      fr: "À propos de nous",
    }),
    content: t({
      en: "This is the about page content.",
      es: "Este es el contenido de la página de información.",
      fr: "Ceci est le contenu de la page à propos.",
    }),
    homeLink: t({
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./app`). Et correspondent à l'extension des fichiers de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Pour plus de détails, référez-vous à la [documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

> Si votre application existe déjà, vous pouvez utiliser le [Compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md), ainsi que la [commande d'extraction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md), pour transformer des milliers de composants en une seconde.

</Step>

<Step number={7} title="Créez des composants sensibles à la locale">

Créez un composant `LocalizedLink` pour la navigation sensible à la locale :

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

// Vérifie si le lien est externe
export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

// Composant LocalizedLink pour la navigation locale
export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

Dans le cas où vous souhaitez naviguer vers les routes localisées, vous pouvez utiliser le hook `useLocalizedNavigate` :

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

</Step>

<Step number={8} title="Créer un composant de changement de langue">

Créez un composant pour permettre aux utilisateurs de changer de langue :

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            reloadDocument // Recharger la page pour appliquer la nouvelle locale
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Locale - par exemple FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre locale - par exemple Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale actuelle - par exemple Francés avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par exemple French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> Pour en savoir plus sur le hook `useLocale`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md).

</Step>

<Step number={9} title="Ajouter la gestion des attributs HTML">

Créez un hook pour gérer les attributs lang et dir du HTML :

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Ce hook est déjà utilisé dans le composant de mise en page (`root.tsx`) montré à l'Étape 5.

</Step>

<Step number={10} title="Ajouter un middleware">

Vous pouvez également utiliser `intlayerProxy` pour ajouter du routage côté serveur à votre application. Ce plugin détectera automatiquement la locale actuelle en fonction de l'URL et définira le cookie de locale approprié. Si aucune locale n'est spécifiée, le plugin déterminera la locale la plus appropriée en fonction des préférences de langue du navigateur de l'utilisateur. Si aucune locale n'est détectée, il redirigera vers la locale par défaut.

> Notez que pour utiliser `intlayerProxy` en production, vous devez basculer le package `vite-intlayer` de `devDependencies` à `dependencies`.

> Depuis Intlayer v9, `intlayerProxy()` est intégré directement dans le plugin `intlayer()` et activé par défaut via l'option `routing.enableProxy` (`true` par défaut). Son enregistrement séparé comme montré ci-dessous est maintenant optionnel — il est conservé pour la compatibilité rétroactive et pour les configurations qui doivent contrôler l'ordre des plugins. Définissez `routing.enableProxy: false` pour refuser. Voir les [notes de version v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/releases/v9.md).

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    reactRouter(),

    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={11} title="Extraire le contenu de vos composants" isOptional={true}>

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
     * Indique si les composants doivent être sauvegardés après avoir été transformés.
     * De cette façon, le compilateur peut être exécuté une seule fois pour transformer l'application, puis il peut être supprimé.
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
bun run build # Ou bun run dev
```

 </Tab>
</Tabs>

</Step>

</Steps>

## Configurer TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et renforcer votre base de code.

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement :

```json5 fileName="tsconfig.json"
{
  // ... vos configurations existantes
  include: [
    // ... vos inclusions existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

---

## Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les commettre dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

---

## Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l’**extension officielle Intlayer pour VS Code**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension offre :

- **L’autocomplétion** pour les clés de traduction.
- **La détection d’erreurs en temps réel** pour les traductions manquantes.
- **Des aperçus en ligne** du contenu traduit.
- **Des actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l’utilisation de l’extension, consultez la [documentation de l’extension Intlayer pour VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Aller plus loin

Pour aller plus loin, vous pouvez implémenter l’[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

---

## Références de la documentation

- [Documentation Intlayer](https://intlayer.org)
- [Documentation React Router v7](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md)
- [Déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)

Ce guide complet vous fournit tout ce dont vous avez besoin pour intégrer Intlayer avec React Router v7 afin d’obtenir une application entièrement internationalisée avec un routage sensible à la locale et une prise en charge de TypeScript.

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser une application React Router v7 ?">

- **`react-i18next` / `i18next`** : des espaces de noms JSON chargés à l'exécution, avec un détecteur de locale séparé câblé à la main dans le routeur.
- **`react-intl`** et **`Lingui`** : des messages ICU avec une étape d'extraction.
- **`Intlayer`** : contenu déclaré à côté de chaque composant et compilé au moment du build, typé de bout en bout, avec des utilitaires de routage sensibles à la locale, la traduction par IA, un éditeur visuel et un CMS.

Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md).

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille de mon bundle React Router ?">

Bien moins qu'une configuration basée sur des espaces de noms, car une page ne télécharge jamais un catalogue qu'elle n'affiche pas. Le balisage rendu côté serveur résout son contenu sur le serveur, et le compilateur au moment du build remplace les appels `useIntlayer` par les entrées de dictionnaire exactes qu'un composant utilise, si bien que les clés inutilisées et les langues inutilisées sont éliminées, et les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) répartissent le reste par locale. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle et des pages jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md).

</Question>

<Question title="Puis-je migrer depuis `react-i18next` ou `react-intl` sans réécrire mes composants ?">

Oui, et il existe deux voies. Vous pouvez migrer le contenu progressivement avec le [guide de migration react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_react-i18next_to_intlayer.md) ou le [guide de migration i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md). Ou vous pouvez conserver entièrement votre API actuelle : les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) exposent exactement la même API que `react-i18next`, `react-intl` et `i18next`, mais servie par des dictionnaires Intlayer : seuls les imports changent, pas le code des composants.

</Question>

<Question title="Puis-je conserver mes fichiers de traduction JSON existants ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos fichiers `/messages/{locale}/{namespace}.json` comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, dans les deux sens. Un [plugin de synchronisation PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) fait de même pour les catalogues gettext, et les [fichiers par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) permettent de séparer le contenu par langue au lieu de regrouper les locales dans un seul fichier.

</Question>

<Question title="Dois-je déplacer mon contenu clé par clé ?">

Non. Lancez `npx intlayer extract` et Intlayer lit vos composants, en extrait les chaînes destinées aux utilisateurs et écrit un fichier `.content` à côté de chacun, de sorte que vous relisez un diff plutôt que de copier des chaînes dans un catalogue une par une. L'étape 11 de ce guide le détaille.

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

<Question title="Quelle est la différence entre ce guide et le guide React Router basé sur la configuration ?">

Uniquement la manière dont les routes sont déclarées. Ce guide utilise les conventions de routes du système de fichiers, où le segment de locale provient des noms de fichiers, tandis que le [guide basé sur la configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_react_router_v7.md) déclare le même arbre dans `routes.ts`. Les déclarations de contenu, les hooks et la configuration sont identiques dans les deux, vous pouvez donc changer de convention sans toucher à votre i18n.

</Question>

<Question title="Comment ajouter un segment de locale avec les routes du système de fichiers ?">

Les étapes 4 et 5 le couvrent : la locale devient un segment dynamique dans les noms de fichiers de route, si bien que chaque page en dessous reçoit la locale active. `validatePrefix` vous indique si ce segment est une locale déclarée, si bien que `/xx/about` renvoie un vrai 404 au lieu d'afficher une page dupliquée, et `getLocalizedUrl` réécrit n'importe quel chemin dans la langue cible.

</Question>

<Question title="Dois-je mettre la locale dans l'URL ?">

Non. `routing.mode` accepte `"prefix-no-default"` (la valeur par défaut), `"prefix-all"`, `"no-prefix"` et `"search-params"`, et `routing.domains` associe chaque locale à son propre domaine. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Question>

<Question title="Comment ajouter des balises hreflang pour le SEO ?">

Construisez la carte des alternates avec `getMultilingualUrls` et émettez-la depuis l'export `meta` ou `links` de votre route, y compris une entrée `x-default`. Le même utilitaire alimente un `sitemap.xml` localisé.

</Question>

<Question title="Comment construire un sélecteur de langue qui reste sur la page courante ?">

L'étape 8 montre le composant. `useLocale` expose la locale active, les locales déclarées et un setter qui persiste le choix, tandis que `getLocalizedUrl` réécrit le chemin actuel dans la langue cible, si bien que le lecteur reste sur la même route au lieu d'être renvoyé à la page d'accueil.

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
