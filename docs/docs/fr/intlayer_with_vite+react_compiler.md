---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite + React i18n - Transformer une application existante en une application multilingue en 2026
description: Découvrez comment rendre votre application Vite et React existante multilingue à l'aide d'Intlayer Compiler. Suivez la documentation pour l'internationaliser (i18n) et la traduire avec l'IA.
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
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Sortie initiale
---

# Comment rendre multilingue (i18n) une application Vite et React existante après coup (guide i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vidéo" value="video">
  
<iframe title="La meilleure solution i18n pour Vite et React ? Découvrez Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application à l'aide d'Intlayer"
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

### Étape 1 : Installer les dépendances

Installez les packages nécessaires avec npm :

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **react-intlayer**
  Le package qui intègre Intlayer avec l'application React. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation de React.

- **vite-intlayer**
  Comprend le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi qu'un middleware pour détecter la langue préférée de l'utilisateur, gérer les cookies et gérer la redirection d'URL.

### Étape 2 : Configurer votre projet

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
    outputDir: "compiler",

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

### Étape 3 : Intégrer Intlayer dans votre configuration Vite

Ajoutez le plugin intlayer dans votre configuration.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> Le plugin Vite `intlayer()` est utilisé pour intégrer Intlayer avec Vite. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Vite. De plus, il fournit des alias pour optimiser les performances.

> Le plugin Vite `intlayerCompiler()` est utilisé pour extraire le contenu des composants et écrire des fichiers `.content`.

### Étape 4 : Compiler votre code

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

### (Facultatif) Étape 6 : Changer la langue de votre contenu

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

### (Facultatif) Étape 7 : Remplir les traductions manquantes

Intlayer fournit un outil CLI pour vous aider à remplir les traductions manquantes. Vous pouvez utiliser la commande `intlayer` pour tester et remplir les traductions manquantes à partir de votre code.

```bash
npx intlayer test         # Tester s'il y a des traductions manquantes
```

```bash
npx intlayer fill         # Remplir les traductions manquantes
```

> Pour plus de détails, consultez la [documentation CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/ci.md)

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
