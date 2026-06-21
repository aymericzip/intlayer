---
createdAt: 2025-03-09
updatedAt: 2026-05-31
title: "Lynx + React i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application Lynx + React multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Ajouter la commande init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historique initial"
author: aymericzip
---

# Traduire votre Lynx and React mobile app avec Intlayer | Internationalisation (i18n)

Voir [Application Template](https://github.com/aymericzip/intlayer-lynx-template) sur GitHub.

## Pourquoi Intlayer plutôt que des alternatives ?

Par rapport aux solutions principales telles que `react-native-localize` ou `i18next`, Intlayer est une solution qui comprend des optimisations intégrées telles que :

<AccordionGroup>

<Accordion header="Support complet de Lynx">

Intlayer est optimisé pour fonctionner parfaitement avec Lynx et React en offrant une **portée du contenu au niveau des composants**, une **prise en charge de TypeScript** et toutes les fonctionnalités nécessaires à la mise à l'échelle de l'internationalisation (i18n).

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

<Steps>

<Step number={1} title="Installer les dépendances">

Depuis votre projet Lynx, installez les packages suivants :

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> l'indicateur `--interactive` est facultatif. Utilisez `intlayer-cli init` si vous êtes un agent IA.

> Cette commande détectera votre environnement et installera les packages requis. Par exemple :

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
```

### Packages

- **intlayer**  
  L'outil i18n principal pour la configuration, le contenu des dictionnaires, la génération de types et les commandes CLI.

- **react-intlayer**  
  Intégration React qui fournit les fournisseurs de contexte et les hooks React que vous utiliserez dans Lynx pour obtenir et changer les langues.

- **lynx-intlayer**  
  Intégration Lynx qui fournit le plugin pour intégrer Intlayer avec le bundler Lynx.

---

</Step>

<Step number={2} title="Créer une configuration Intlayer">

À la racine de votre projet (ou à tout endroit pratique), créez un fichier de **configuration Intlayer**. Cela pourrait ressembler à ceci :

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Ajoutez toutes les autres langues dont vous avez besoin
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Dans cette configuration, vous pouvez :

- Configurer votre **liste de langues prises en charge**.
- Définir une langue **par défaut**.
- Plus tard, vous pourrez ajouter des options plus avancées (par exemple, journaux, répertoires de contenu personnalisés, etc.).
- Consultez la [documentation de configuration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) pour plus d'informations.

</Step>

<Step number={3} title="Ajouter le plugin Intlayer au bundler Lynx">

Pour utiliser Intlayer avec Lynx, vous devez ajouter le plugin à votre fichier `lynx.config.ts` :

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... autres plugins
    pluginIntlayerLynx(),
  ],
});
```

</Step>

<Step number={4} title="Ajouter le fournisseur Intlayer">

Pour synchroniser la langue de l'utilisateur dans toute votre application, vous devez envelopper votre composant racine avec le composant `IntlayerProvider` de `react-intlayer`.

De plus, vous devez ajouter le fichier de fonction `intlayerPolyfill` pour garantir qu'Intlayer fonctionne correctement.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

</Step>

<Step number={5} title="Déclarez votre contenu">

Créez des fichiers de **déclaration de contenu** n'importe où dans votre projet (généralement dans `src/`), en utilisant l'un des formats d'extension pris en charge par Intlayer :

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- etc.

Exemple :

```tsx fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      fr: "sur Lynx",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous !",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour !",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "fr": "Appuyez sur le logo et amusez-vous!",
        "en": "Tap the logo and have fun!",
        "es": "¡Toca el logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "fr": "Modifier",
          "en": "Edit",
          "es": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "fr": "pour voir les mises à jour!",
          "en": "to see updates!",
          "es": "para ver actualizaciones!"
        }
      }
    ]
  }
}
```

> Pour plus de détails sur les déclarations de contenu, consultez [la documentation sur le contenu d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

---

</Step>

<Step number={6} title="Utiliser Intlayer dans vos composants">

Utilisez le hook `useIntlayer` dans les composants enfants pour obtenir du contenu localisé.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");
  const onTap = useCallback(() => {
    // arrière-plan uniquement
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> Lorsque vous utilisez `content.someKey` dans des propriétés basées sur des chaînes (par exemple, le `title` d'un bouton ou les `children` d'un composant `Text`), **appelez `content.someKey.value`** pour obtenir la chaîne réelle.

---

</Step>

<Step number={7} title="Changer la langue de l'application" isOptional={true}>

Pour changer la langue directement depuis vos composants, vous pouvez utiliser la méthode `setLocale` du hook `useLocale` :

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

Cela déclenche un nouveau rendu de tous les composants utilisant le contenu d'Intlayer, affichant désormais les traductions pour la nouvelle langue.

> Consultez la [documentation de `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md) pour plus de détails.

</Step>

</Steps>

## Configurer TypeScript (si vous utilisez TypeScript)

Intlayer génère des définitions de types dans un dossier caché (par défaut `.intlayer`) pour améliorer l'autocomplétion et détecter les erreurs de traduction :

```json5
// tsconfig.json
{
  // ... votre configuration TS existante
  "include": [
    "src", // votre code source
    ".intlayer/types/**/*.ts", // <-- assurez-vous que les types générés automatiquement sont inclus
    // ... tout autre élément que vous incluez déjà
  ],
}
```

Cela permet des fonctionnalités comme :

- **Autocomplétion** pour les clés de votre dictionnaire.
- **Vérification des types** qui avertit si vous accédez à une clé inexistante ou si le type ne correspond pas.

---

## Configuration Git

Pour éviter de commettre les fichiers générés automatiquement par Intlayer, ajoutez ce qui suit à votre `.gitignore` :

```bash
#  Ignorer les fichiers générés par Intlayer
.intlayer
```

---

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l’extension officielle **Intlayer VS Code Extension**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension offre :

- **Autocomplétion** pour les clés de traduction.
- **Détection d’erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.
  Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension Intlayer pour VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Aller plus loin

- **Éditeur visuel** : Utilisez l'[éditeur visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) pour gérer les traductions visuellement.
- **Intégration CMS** : Vous pouvez également externaliser et récupérer le contenu de votre dictionnaire depuis un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).
- **Commandes CLI** : Explorez le [CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md) pour des tâches comme **extraire des traductions** ou **vérifier les clés manquantes**.

---
