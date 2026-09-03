---
createdAt: 2024-03-07
updatedAt: 2026-08-30
title: "Vite + React i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application Vite + React multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Vite
  - React
  - Compilateur
  - IA
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Sortie initiale"
author: aymericzip
---

# Comment rendre multilingue (i18n) une application Vite et React existante après coup (guide i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vidéo" value="video">

<iframe title="La meilleure solution i18n pour Vite et React ? Découvrez Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application à l'aide d'Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Démo" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Voir le [Modèle d'application](https://github.com/aymericzip/intlayer-vite-react-template) sur GitHub.

## Table des matières

<TOC/>

## Pourquoi est-il difficile d'internationaliser une application existante ?

Si vous avez déjà essayé d'ajouter plusieurs langues à une application conçue pour une seule, vous connaissez la douleur. Ce n'est pas seulement « difficile », c'est fastidieux. Vous devez passer au peigne fin chaque fichier, traquer chaque chaîne de texte et les déplacer dans des fichiers de dictionnaire séparés.

Vient ensuite la partie risquée : remplacer tout ce texte par des hooks de code sans casser votre mise en page ou votre logique. C'est le genre de travail qui interrompt le développement de nouvelles fonctionnalités pendant des semaines et ressemble à un refactoring sans fin.

## Qu'est-ce que l'Intlayer Compiler ?

L'**Intlayer Compiler** a été conçu pour éviter ce travail manuel ingrat. Au lieu que vous extrayiez manuellement les chaînes, le compilateur le fait pour vous. Il scanne votre code, trouve le texte et utilise l'IA pour générer les dictionnaires en coulisses.
Ensuite, il modifie votre code pendant le build pour injecter les hooks i18n nécessaires. Fondamentalement, vous continuez à écrire votre application comme s'il s'agissait d'une application unilingue, et le compilateur gère automatiquement la transformation multilingue.

> Doc Compiler : [https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md)

### Limitations

Parce que le compilateur effectue l'analyse et la transformation du code (insertion de hooks et génération de dictionnaires) au moment de la **compilation**, il peut **ralentir le processus de build** de votre application.

Pour atténuer cet impact pendant le développement, vous pouvez configurer le compilateur pour qu'il s'exécute en mode [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) ou le désactiver lorsque vous n'en avez pas besoin.

---

## Guide étape par étape pour configurer Intlayer dans une application Vite et React

<Steps>

<Step number={1} title="Installer les dépendances">

Installez les packages nécessaires avec npm :

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

> l'indicateur `--interactive` est facultatif. Utilisez `intlayer-cli init` si vous êtes un agent IA.

> Cette commande détectera votre environnement et installera les packages requis. Par exemple :

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **react-intlayer**
  Le package qui intègre Intlayer avec l'application React. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation de React.

- **vite-intlayer**
  Comprend le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi qu'un middleware pour détecter la langue préférée de l'utilisateur, gérer les cookies et gérer la redirection d'URL.

</Step>

<Step number={2} title="Configurer votre projet">

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * Indique si le compilateur doit être activé.
     */
    enabled: true,

    /**
     * Répertoire de sortie pour les dictionnaires optimisés.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Insérer uniquement le contenu dans le fichier généré, sans clé.
     */
    noMetadata: false,

    /**
     * Préfixe de clé de dictionnaire
     */
    dictionaryKeyPrefix: "", // Supprimer le préfixe de base

    /**
     * Indique si les composants doivent être sauvegardés après avoir été transformés.
     * De cette façon, le compilateur peut être exécuté une seule fois pour transformer l'application, puis il peut être supprimé.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "This app is an map app", // Note : vous pouvez personnaliser cette description de l'application
  },
};

export default config;
```

> **Note** : Assurez-vous d'avoir votre `OPEN_AI_API_KEY` définie dans vos variables d'environnement.

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, la redirection du middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, reportez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>

<Step number={3} title="Intégrer Intlayer dans votre configuration Vite">

Ajoutez le plugin intlayer dans votre configuration.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> Le plugin Vite `intlayer()` est utilisé pour intégrer Intlayer avec Vite. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Vite. De plus, il fournit des alias pour optimiser les performances.

> Le plugin Vite `intlayerCompiler()` est utilisé pour extraire le contenu des composants et écrire des fichiers `.content`.

> Depuis Intlayer v9, le compilateur est intégré directement dans le plugin `intlayer()` et s'active automatiquement une fois que `compiler.enabled` est défini avec un chemin `compiler.output`. L'enregistrement de `intlayerCompiler()` séparément comme indiqué ci-dessous est maintenant optionnel — il se déduplique lui-même s'il est également ajouté. Consultez les [notes de version v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/releases/v9.md).

</Step>

<Step number={4} title="Compiler votre code">

Écrivez simplement vos composants avec des chaînes codées en dur dans votre langue par défaut. Le compilateur s'occupe du reste.

Exemple de ce à quoi pourrait ressembler votre page :

<Tabs>
 <Tab value="Code">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Sortie">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      fr: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "compte est",
        editMessage: "Modifier",
        hmrMessage: "et enregistrer pour tester HMR",
        readTheDocs: "Cliquez sur les logos Vite et React pour en savoir plus",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** est utilisé pour fournir la langue aux composants imbriqués.

</Step>

<Step number={6} title="Changer la langue de votre contenu" isOptional={true}>

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction vous permet de définir la langue de l'application et de mettre à jour le contenu en conséquence.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> Pour en savoir plus sur le hook `useLocale`, reportez-vous à la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md).

</Step>

<Step number={7} title="Remplir les traductions manquantes" isOptional={true}>

Intlayer fournit un outil CLI pour vous aider à remplir les traductions manquantes. Vous pouvez utiliser la commande `intlayer` pour tester et remplir les traductions manquantes à partir de votre code.

```bash packageManager="npm"
npx intlayer test         # Tester s'il y a des traductions manquantes
```

```bash packageManager="yarn"
yarn intlayer test         # Tester s'il y a des traductions manquantes
```

```bash packageManager="pnpm"
pnpm intlayer test         # Tester s'il y a des traductions manquantes
```

```bash packageManager="bun"
bun x intlayer test         # Tester s'il y a des traductions manquantes
```

```bash packageManager="npm"
npx intlayer fill         # Remplir les traductions manquantes
```

```bash packageManager="yarn"
yarn intlayer fill         # Remplir les traductions manquantes
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Remplir les traductions manquantes
```

```bash packageManager="bun"
bun x intlayer fill         # Remplir les traductions manquantes
```

> Pour plus de détails, consultez la [documentation CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/ci.md)

</Step>

</Steps>

### (Facultatif) Sitemap et robots.txt (génération au build)

Intlayer fournit des utilitaires - `generateSitemap` et `getMultilingualUrls` - pour produire un `sitemap.xml` multilingue et un `robots.txt` prêts pour les crawlers, que vous pouvez écrire automatiquement dans `public/`. En pratique, exécutez un petit script Node **avant** Vite (par exemple les hooks npm `predev` / `prebuild`) afin que ces fichiers soient présents au build ou au serveur de développement.

#### Sitemap

Le générateur de sitemap Intlayer tient compte de vos locales et ajoute les métadonnées attendues par les moteurs.

> Le sitemap généré prend en charge l’espace de noms `xhtml:link` (extensions hreflang). Contrairement aux générateurs qui ne listent que des URL brutes, Intlayer relie de façon bidirectionnelle toutes les versions linguistiques d’une même page (par ex. `/about`, `/fr/about` ou `/about?lang=fr` selon votre mode de routage), ce qui aide les crawlers.

#### Robots.txt

Utilisez `getMultilingualUrls` pour que les règles `Disallow` couvrent toutes les variantes localisées des chemins sensibles.

#### 1. Créer `generate-seo.mjs` à la racine du projet

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Le paquet `intlayer` doit être installé pour que le script puisse l’importer. Définissez `SITE_URL` dans l’environnement pour la production (par ex. en CI).

> Préférez `generate-seo.mjs` pour l’ESM Node. Avec `generate-seo.js`, assurez-vous que `"type": "module"` est présent dans `package.json`, ou activez l’ESM côté Node.

#### 2. Lancer le script avant Vite

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

Adaptez les commandes si vous utilisez pnpm ou yarn. Vous pouvez aussi appeler ce script depuis la CI ou une autre étape de votre pipeline.

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les committer dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'officielle **Extension Intlayer VS Code**.

[Installer depuis le VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **L'autocomplétion** pour les clés de traduction.
- **La détection d'erreurs en temps réel** for les traductions manquantes.
- **Des aperçus en ligne** du contenu traduit.
- **Des actions rapides** pour créer et mettre à jour facilement des traductions.

Pour plus de détails sur l'utilisation de l'extension, reportez-vous à la [documentation de l'extension Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu à l'aide du [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser une application Vite et React ?">

- **`react-i18next` / `i18next`** : des espaces de noms JSON chargés à l'exécution, avec des clés écrites à la main à chaque appel.
- **`react-intl`** et **`Lingui`** : des messages ICU avec une étape d'extraction que vous exécutez vous-même.
- **`Intlayer`** : contenu compilé à partir de vos composants au moment du build, entièrement typé, avec traduction par IA, un éditeur visuel et un CMS.

Ce guide utilise la configuration avec compilateur, où vous continuez d'écrire des chaînes simples dans vos composants et où les dictionnaires sont générés pour vous. Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md).

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille de mon bundle Vite ?">

Bien moins qu'une configuration basée sur des espaces de noms, car une page ne télécharge jamais un catalogue qu'elle n'affiche pas. Le compilateur au moment du build remplace les appels `useIntlayer` par les entrées de dictionnaire exactes qu'un composant utilise, si bien que les clés inutilisées et les langues inutilisées sont éliminées, et les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) répartissent le reste par locale. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle et des pages jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md).

</Question>

<Question title="Puis-je migrer depuis `react-i18next` ou `react-intl` sans réécrire mes composants ?">

Oui, et il existe deux voies. Vous pouvez migrer le contenu progressivement avec le [guide de migration react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_react-i18next_to_intlayer.md) ou le [guide de migration i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md). Ou vous pouvez conserver entièrement votre API actuelle : les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) exposent exactement la même API que `react-i18next`, `react-intl` et `i18next`, mais servie par des dictionnaires Intlayer : seuls les imports changent, pas le code des composants.

</Question>

<Question title="Puis-je conserver mes fichiers de traduction JSON existants ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos fichiers `/messages/{locale}/{namespace}.json` comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, dans les deux sens. Un [plugin de synchronisation PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) fait de même pour les catalogues gettext, et les [fichiers par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) permettent de séparer le contenu par langue au lieu de regrouper les locales dans un seul fichier.

</Question>

<Question title="Dois-je déplacer mon contenu clé par clé ?">

Non, et c'est ce que ce guide met en place. Vous écrivez vos composants avec des chaînes simples dans votre locale par défaut, et le [compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) analyse le code source à chaque build, extrait le texte destiné aux utilisateurs et génère les dictionnaires, de sorte qu'il n'y a aucune clé à créer ou à maintenir à la main.

Deux limites méritent d'être connues. Le compilateur fonctionne par analyse statique : les chaînes qui n'existent qu'à l'exécution, comme les codes d'erreur d'API ou les champs de CMS, restent hors de portée et nécessitent encore un dictionnaire déclaré. Et il doit distinguer le texte destiné aux utilisateurs de la logique applicative comme `className="active"` ou un code de statut, ce qui nécessite quelques annotations dans une grande base de code.

Si vous préférez garder le contrôle, `npx intlayer extract` effectue la même extraction une seule fois, sur les fichiers que vous choisissez, et écrit un fichier `.content` à côté de chaque composant pour que vous le relisiez. Voir la [commande extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md).

</Question>

<Question title="Quels outils d'éditeur et d'agent IA sont disponibles ?">

Cinq éléments, tous optionnels :

- **[Extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)** : passez d'une clé `useIntlayer` au fichier de contenu qui la déclare, extrayez du contenu depuis un composant, et lancez build, fill, test, push et pull depuis la palette de commandes ou un onglet Intlayer dédié.
- **[Serveur LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)** : la même connaissance dans tout éditeur qui parle LSP, avec aller à la définition, rechercher toutes les références, aperçus au survol d'une valeur traduite, autocomplétion des clés et des champs, et un avertissement lorsqu'une clé n'est déclarée nulle part. Il résout aussi les appels `i18next`, `react-i18next`, `next-intl` et `use-intl`, ce qui aide pendant la migration.
- **[Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** : expose la documentation et la CLI d'Intlayer à Cursor, VS Code, Claude Desktop, Claude Code et ChatGPT, afin qu'un assistant réponde à partir de la documentation actuelle au lieu de deviner, et puisse exécuter lui-même des commandes telles que `intlayer fill`.
- **[Compétences d'agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)** : des compétences ciblées telles que `intlayer-config`, `intlayer-cli` et `intlayer-content`, plus une par framework, qui apprennent à un agent votre configuration de routage et les types de nœuds de contenu.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md)** : `no-raw-text` signale les chaînes codées en dur, avec d'autres règles pour les clés de dictionnaire statiques et le contenu inutilisé.

</Question>

<Question title="Dois-je utiliser le compilateur ou déclarer mon contenu moi-même ?">

Utilisez le compilateur lorsque vous voulez ajouter l'i18n à une base de code existante avec le moins de perturbation : vous gardez vos composants tels quels et les dictionnaires suivent. Déclarez le contenu vous-même, comme le montre le [guide Vite et React standard](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md), lorsque vous voulez un contrôle explicite sur les clés, la structure et la réutilisation entre composants. Les deux peuvent coexister : le contenu compilé et le contenu déclaré vivent dans la même couche de dictionnaires.

</Question>

<Question title="Qu'advient-il des chaînes que le compilateur ne peut pas voir ?">

Elles restent non traduites, car le compilateur fonctionne par analyse statique. Tout ce qui est assemblé à l'exécution, comme un message d'erreur d'API, un champ de CMS ou une chaîne construite par concaténation, doit être déclaré dans un fichier de contenu de la manière habituelle. Lancez `npx intlayer test` pour trouver ce qui manque.

</Question>

<Question title="Comment le compilateur décide-t-il ce qui est du texte destiné aux utilisateurs ?">

Par heuristiques sur votre JSX, c'est pourquoi il peut se tromper dans les deux sens : une valeur de `className` ou un code de statut peut ressembler à du texte, et un motif inhabituel peut être manqué. Dans une grande base de code, vous corrigez les cas limites avec des annotations. Si ce compromis ne vous convient pas, `npx intlayer extract` effectue la même extraction une seule fois et laisse le résultat sous forme de diff à relire. Voir la [commande extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md).

</Question>

<Question title="Comment remplir les traductions manquantes ?">

L'étape 7 le couvre. `npx intlayer fill` envoie le contenu extrait au LLM de votre choix, en utilisant votre propre fournisseur et votre clé d'API, et `--git-diff` limite l'exécution à ce qui a changé sur la branche. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

</Question>

<Question title="Comment changer la langue à l'exécution ?">

L'étape 6 le couvre. `useLocale` expose la locale active, les locales déclarées et un setter qui persiste le choix, et les composants qui lisent du contenu compilé se réaffichent dans la nouvelle langue sans rechargement de page.

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
