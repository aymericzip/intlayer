---
createdAt: 2024-03-07
updatedAt: 2026-09-06
title: "Comment rendre multilingue (i18n) une application Vite et React existante après coup (Guide i18n 2026)"
description: "Le guide 2026 pour rendre multilingue (i18n) une application Vite et React existante sans refactorisation fastidieuse. Découvrez l'extraction sans effort, la traduction IA et le bundle optimisé avec Intlayer."
keywords:
  - Vite i18n
  - React i18n
  - Internationalisation
  - Traduire application Vite existante
  - Traduire application React existante
  - Intlayer
  - Multilingue
  - Compilateur
  - Traduction IA
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# Comment rendre multilingue (i18n) une application Vite et React existante après coup (Guide i18n 2026)

Ajouter l'internationalisation (i18n) à un projet Vite et React dès le premier jour est relativement simple. Mais que se passe-t-il lorsque vous disposez déjà d'une application mature en production, conçue dans une seule langue, et que vous devez la rendre multilingue **après coup** ?

Si vous avez déjà tenté l'expérience avec des bibliothèques traditionnelles comme `react-i18next` ou `react-intl`, vous connaissez le cauchemar :

- Rechercher manuellement des chaînes de texte codées en dur dans des centaines de composants JSX et TSX.
- Créer manuellement des fichiers JSON imbriqués et inventer des clés de traduction arbitraires (`components.header.title`, etc.).
- Remplacer le texte JSX par des appels de hooks verbeux (`t('...')`).
- Restructurer le routage côté client, la gestion d'état et la logique de changement de langue.

En 2026, vous n'avez plus besoin de réécrire votre base de code pour internationaliser votre application Vite et React. Avec **Intlayer**, vous pouvez intégrer l'internationalisation dans une application existante en quelques minutes grâce à l'extraction automatisée, la traduction assistée par IA et une intégration fluide.

> Vous recherchez le guide technique pas-à-pas complet pour Vite et React ? Consultez notre documentation dédiée : [Traduire Vite et React avec Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md).

## Table des matières

<TOC/>

## Le dilemme de l'adaptation : Pourquoi internationaliser une application existante est difficile

Lors de l'internationalisation d'une application Vite et React existante, les développeurs rencontrent trois obstacles majeurs :

1. **Perturbation du code** : Extraire manuellement les textes vers des dictionnaires JSON nécessite de modifier presque chaque fichier de composant, générant d'énormes diffs git, des conflits de fusion et des risques de régression.
2. **Surcharge de gestion des clés** : Inventer des clés telles que `dashboard.hero.ctaButton` pour chaque extrait de texte ralentit le développement et ajoute une charge cognitive à chaque mise à jour de l'UI.
3. **Travail fastidieux de traduction** : Une fois les chaînes extraites, traduire les dictionnaires en 5, 10 ou 20 langues nécessite des copier-coller sans fin ou des services de gestion de localisation coûteux.

Intlayer résout ces défis au niveau architectural grâce à **l'extraction assistée par compilateur**, aux **dictionnaires déclaratifs par composant** et à une **intégration transparente avec Vite**.

## Extraction automatisée du contenu (fini la recherche manuelle de textes)

Au lieu d'extraire manuellement chaque chaîne de votre JSX, Intlayer propose deux parcours sans friction :

### Option A : L'outil CLI d'extraction (`npx intlayer extract`)

Vous pouvez exécuter l'outil d'extraction d'Intlayer directement sur votre code :

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

Cette commande analyse vos composants React, extrait les textes visibles par l'utilisateur et génère automatiquement des fichiers de déclaration de contenu (`.content.ts`) directement à côté de chaque composant. Votre logique de composant reste déclarative, lisible et entièrement typée, sans devoir inventer de clés manuellement.

### Option B : Le compilateur Intlayer (Extraction à la compilation)

Avec le compilateur Intlayer activé dans votre configuration, vous continuez simplement à écrire vos composants avec du texte brut dans votre langue par défaut. Lors du build, le compilateur extrait les textes et injecte automatiquement le contenu localisé :

```tsx fileName="src/App.tsx"
// Écrivez du code React normal. Le compilateur extrait le texte automatiquement
export default function App() {
  return (
    <section>
      <h1>Bienvenue sur notre plateforme</h1>
      <p>Découvrez nos fonctionnalités modernes dès aujourd'hui.</p>
    </section>
  );
}
```

En coulisses, Intlayer construit le dictionnaire et associe le composant à son contenu localisé, éliminant totalement l'étape de refactorisation manuelle.

Dans ce cas, il générera un fichier de déclaration `src/App.content.ts` avec la structure suivante :

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    bienvenueSurNotrePlateforme: t({ fr: "Bienvenue sur notre plateforme" }),
    decouvrezNosFonctionnalitesModernes: t({
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
    }),
  },
};

export default content;
```

## Traduction assistée par IA avec votre LLM favori

Une fois votre contenu extrait, le traduire en plusieurs langues ne devrait pas prendre des jours. Intlayer intègre une CLI de traduction IA compatible avec OpenAI, Anthropic, DeepSeek ou Mistral en utilisant vos propres clés d'API :

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

Configurez vos langues et votre fournisseur d'IA dans `intlayer.config.ts` :

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.FRENCH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Application SaaS moderne et tableau de bord conçus avec Vite et React",
  },
};

export default config;
```

L'exécution de `npx intlayer fill` remplit automatiquement vos déclarations de contenu avec des traductions de haute qualité pour toutes les langues configurées :

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    bienvenueSurNotrePlateforme: t({
      fr: "Bienvenue sur notre plateforme",
      en: "Welcome to our platform",
      es: "Bienvenido a nuestra plataforma",
      de: "Willkommen auf unserer Plattform",
    }),
    decouvrezNosFonctionnalitesModernes: t({
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      en: "Start exploring our modern features today.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      de: "Entdecken Sie noch heute unsere modernen Funktionen.",
    }),
  },
};

export default content;
```

Parce qu'Intlayer fournit l'`applicationContext` au LLM, les traductions générées respectent le contexte technique, la voix de la marque et les nuances grammaticales bien mieux que les outils génériques.

Pour vérifier qu'aucune chaîne n'a été oubliée avant la mise en production :

```bash
npx intlayer test
```

## Intégration Vite et configuration du Provider

Intégrer Intlayer dans Vite consiste simplement à ajouter le plugin dans `vite.config.ts` et à envelopper votre composant racine avec `IntlayerProvider` :

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Depuis Intlayer v9, le compilateur est inclus directement dans le plugin `intlayer()` et s'active automatiquement dès que `compiler.enabled` est défini dans `intlayer.config.ts`.

Enveloppez votre application avec `IntlayerProvider` dans votre composant racine :

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### Changer de langue dynamiquement

Changez de langue facilement n'importe où dans votre application grâce au hook `useLocale` :

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## SEO Multilingue (Sitemap et Robots.txt)

Intlayer inclut des formateurs tels que `generateSitemap` et `getMultilingualUrls` qui produisent des fichiers `sitemap.xml` et `robots.txt` multilingues prêts pour les moteurs de recherche :

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("Fichiers SEO générés avec succès.");
```

Ajoutez un hook `prebuild` dans votre `package.json` pour exécuter ce script avant `vite build` :

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## En savoir plus : Prêt pour la mise en place pas-à-pas ?

Ce guide présente une vue d'ensemble conceptuelle pour moderniser et internationaliser une application Vite et React existante en 2026 sans refactorisation complexe.

Si vous souhaitez configurer chaque partie de votre application en détail, y compris le typage strict TypeScript, les dictionnaires dynamiques et l'éditeur visuel, consultez notre guide complet :

👉 **[Guide complet pour traduire Vite et React avec Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)**

## Foire aux questions (FAQ)

<FAQ>

<Question title="Puis-je rendre mon application Vite et React multilingue sans refactoriser manuellement toutes les chaînes ?">

Oui. Vous pouvez utiliser `npx intlayer extract` pour détecter et extraire automatiquement les textes codés en dur dans des déclarations de contenu localisées, ou utiliser le compilateur Intlayer pour transformer les composants au moment du build pendant que vous continuez à écrire du JSX standard.

</Question>
<Question title="Comment Intlayer réduit-il la taille du bundle Vite par rapport à react-i18next ou react-intl ?">

Intlayer utilise des définitions de dictionnaires par composant et une optimisation par macros à la compilation. Vos bundles ne reçoivent que les champs exacts requis par les composants affichés, au lieu d'importer de volumineux fichiers JSON. Les dictionnaires dynamiques permettent également de charger les langues à la demande.

</Question>
<Question title="Puis-je utiliser l'IA pour traduire mes composants existants dans plusieurs langues ?">

Oui. La CLI d'Intlayer inclut la commande `npx intlayer fill`, qui se connecte au fournisseur d'IA de votre choix (OpenAI, Anthropic, Mistral, DeepSeek) pour générer des traductions contextuelles pour toutes les langues configurées.

</Question>
<Question title="Puis-je migrer depuis react-i18next ou react-intl sans réécrire mes composants ?">

Oui. Intlayer fournit des adaptateurs de compatibilité pour `react-i18next` et `react-intl`, ainsi que des plugins pour synchroniser vos fichiers de traduction JSON existants (`sync-json`).

</Question>

</FAQ>
