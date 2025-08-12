---
createdAt: 2025-08-11
updatedAt: 2025-08-11
title: Prise en main d'Intlayer avec TanStack Start (React)
description: Ajoutez l'internationalisation à votre application TanStack Start avec Intlayer — dictionnaires au niveau des composants, URLs localisées et métadonnées optimisées pour le SEO.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - TanStack Start
  - TanStack Router
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - tanstack-start
---

# Prise en main de l'internationalisation (i18n) avec Intlayer et TanStack Start (React)

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une boîte à outils open-source d'internationalisation pour les applications React. Elle vous offre :

- **Dictionnaires locaux aux composants** avec la sécurité de TypeScript.
- **Métadonnées et routes dynamiques** (prêtes pour le SEO).
- **Changement de locale à l'exécution** (et helpers pour détecter/persister les locales).
- **Plugin Vite** pour les transformations au moment de la build + expérience développeur améliorée.

Ce guide montre comment intégrer Intlayer dans un projet **TanStack Start** (qui utilise Vite en interne et TanStack Router pour le routage/SSR).

---

## Étape 1 : Installer les dépendances

```bash
# npm
npm i intlayer react-intlayer
npm i -D vite-intlayer

# pnpm
pnpm add intlayer react-intlayer
pnpm add -D vite-intlayer

# yarn
yarn add intlayer react-intlayer
yarn add -D vite-intlayer
```

- **intlayer** : cœur (configuration, dictionnaires, CLI/transformations).
- **react-intlayer** : `<IntlayerProvider>` + hooks pour React.
- **vite-intlayer** : plugin Vite, plus middleware optionnel pour la détection/redirection de locale (fonctionne en dev & SSR/preview ; déplacer dans `dependencies` pour le SSR en production).

---

## Étape 2 : Configurer Intlayer

Créez `intlayer.config.ts` à la racine de votre projet :

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  // Vous pouvez aussi ajuster : contentDir, contentFileExtensions, options du middleware, etc.
};

export default config;
```

Les variantes CommonJS/ESM sont identiques à votre doc originale si vous préférez `cjs`/`mjs`.

> Référence complète de la configuration : voir la documentation de configuration d’Intlayer.

---

## Étape 3 : Ajouter le plugin Vite (et middleware optionnel)

**TanStack Start utilise Vite**, donc ajoutez le(s) plugin(s) d’Intlayer dans votre `vite.config.ts` :

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    // Optionnel mais recommandé pour la détection de la locale, les cookies et les redirections :
    intLayerMiddlewarePlugin(),
  ],
});
```

> Si vous déployez en SSR, déplacez `vite-intlayer` dans les `dependencies` pour que le middleware fonctionne en production.

---

## Étape 4 : Déclarez Votre Contenu

Placez vos dictionnaires n'importe où sous `./src` (contentDir par défaut). Exemple :

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({ en: "Vite logo", fr: "Logo Vite", es: "Logo Vite" }),
    reactLogo: t({ en: "React logo", fr: "Logo React", es: "Logo React" }),
    title: t({
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t<ReactNode>({
      en: (
        <>
          Edit <code>src/routes/index.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/routes/index.tsx</code> et enregistrez pour tester
          HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
    }),
    readTheDocs: t({
      en: "Cliquez sur les logos pour en savoir plus",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

Les variantes JSON/ESM/CJS fonctionnent de la même manière que dans votre document original.

> Contenu TSX ? N’oubliez pas `import React from "react"` si votre configuration en a besoin.

---

## Étape 5 : Envelopper TanStack Start avec Intlayer

Avec TanStack Start, votre **route racine** est l’endroit idéal pour définir les fournisseurs.

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // Exemple d’utilisation d’un dictionnaire au niveau supérieur :
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/about">À propos</RouterLink>
      </nav>
      <main className="p-6">
        <h1>{content.title}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      <AppShell />
    </IntlayerProvider>
  ),
});
```

Ensuite, utilisez votre contenu dans les pages :

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/")({
  component: () => {
    const content = useIntlayer("app");
    return (
      <>
        <button>{content.count}0</button>
        <p>{content.edit}</p>
        <img
          src={reactLogo}
          alt={content.reactLogo.value}
          width={48}
          height={48}
        />
        <p className="opacity-70">{content.readTheDocs}</p>
      </>
    );
  },
});
```

> Les attributs de type chaîne (`alt`, `title`, `aria-label`, …) nécessitent `.value` :
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## (Optionnel) Étape 6 : Changement de langue (Client)

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## (Optionnel) Étape 7 : Routage localisé (URLs optimisées pour le SEO)

Vous avez **deux bons modèles** avec TanStack Start. Choisissez-en un.

Créez un dossier de segment dynamique `src/routes/$locale/` pour que vos URLs soient `/:locale/...`. Dans le layout `$locale`, validez le `params.locale`, définissez `<IntlayerProvider locale=...>`, et affichez un `<Outlet />`. Cette approche est simple, mais vous monterez le reste de vos routes sous `$locale`, et vous aurez besoin d’un arbre supplémentaire sans préfixe si vous ne souhaitez pas que la locale par défaut soit préfixée.

---

## (Optionnel) Étape 8 : Mettre à jour l’URL lors du changement de langue

Avec le Modèle A (basepath), changer de langue signifie **naviguer vers un basepath différent** :

```tsx fileName="src/components/LocaleSwitcherNavigate.tsx"
import { useRouter } from "@tanstack/react-router";
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcherNavigate() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const change = async (next: Locales) => {
    if (next === locale) return;
    const nextPath = getLocalizedUrl(
      window.location.pathname + window.location.search,
      next
    );
    await router.navigate({ to: nextPath }); // préserve l’historique
    setLocale(next);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => change(Locales.ENGLISH)}>English</button>
      <button onClick={() => change(Locales.FRENCH)}>Français</button>
      <button onClick={() => change(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## (Optionnel) Étape 9 : `<html lang>` et `dir` (Document TanStack Start)

TanStack Start expose un **Document** (coquille HTML racine) que vous pouvez personnaliser. Définissez `lang` et `dir` pour l’accessibilité/SEO :

```tsx fileName="src/routes/__root.tsx" {4,15}
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { IntlayerProvider } from "react.intlayer";
import { getHTMLTextDir } from "intlayer";

function Document({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      {/* Si vous calculez la locale côté serveur, transmettez-la dans Document ; sinon le client corrigera après l'hydratation */}
      <Document locale={document?.documentElement?.lang || "en"}>
        <Outlet />
      </Document>
    </IntlayerProvider>
  ),
});
```

Pour la correction côté client, vous pouvez aussi conserver votre petit hook :

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

---

## (Optionnel) Étape 10 : Composant Link localisé

TanStack Router fournit un `<Link/>`, mais si vous avez besoin d'un simple `<a>` qui préfixe automatiquement les URL internes :

```tsx fileName="src/components/Link.tsx"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const isExternal = (href?: string) => /^https?:\/\//.test(href ?? "");

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const hrefI18n =
      href && !isExternal(href) ? getLocalizedUrl(href, locale) : href;
    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";
```

> Si vous utilisez le Modèle A (basepath), le `<Link to="/about" />` de TanStack résout déjà vers `/fr/about` via `basepath`, donc un lien personnalisé est optionnel.

---

## TypeScript

Inclure les types générés par Intlayer :

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

Ignorer les artefacts générés par Intlayer :

```gitignore
.intlayer
```

---

## Extension VS Code

- **Extension Intlayer pour VS Code** → autocomplétion, erreurs, aperçus en ligne, actions rapides.
  Marketplace : `intlayer.intlayer-vs-code-extension`

---

## Aller Plus Loin

- Éditeur Visuel
- Mode CMS
- Détection de la locale à la périphérie / adaptateurs

---

## Historique de la Documentation

| Version | Date       | Modifications                     |
| ------- | ---------- | --------------------------------- |
| 1.0.0   | 2025-08-11 | Adaptation TanStack Start ajoutée |
