---
createdAt: 2025-03-09
updatedAt: 2025-12-30
title: Comment traduire votre Lynx and React mobile app – guide i18n 2026
description: Découvrez comment rendre votre application mobile Lynx et React multilingue. Suivez la documentation pour l’internationaliser (i18n) et le traduire.
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
  - version: 7.5.9
    date: 2025-12-30
    changes: Ajouter la commande init
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Traduire votre Lynx and React mobile app avec Intlayer | Internationalisation (i18n)

Voir [Application Template](https://github.com/aymericzip/intlayer-lynx-template) sur GitHub.

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une **bibliothèque d'internationalisation (i18n) innovante et open-source** qui simplifie la prise en charge multilingue dans les applications modernes. Elle fonctionne dans de nombreux environnements JavaScript/TypeScript, **y compris Lynx** (via le package `react-intlayer`).

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement.
- **Localiser dynamiquement** le contenu, y compris les **chaînes d'interface utilisateur** (et dans React pour le web, il peut également localiser les métadonnées HTML, etc.).
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamiques de la langue.

---

## Étape 1 : Installer les dépendances

Depuis votre projet Lynx, installez les packages suivants :

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
bunx intlayer init
```

### Packages

- **intlayer**  
  L'outil i18n principal pour la configuration, le contenu des dictionnaires, la génération de types et les commandes CLI.

- **react-intlayer**  
  Intégration React qui fournit les fournisseurs de contexte et les hooks React que vous utiliserez dans Lynx pour obtenir et changer les langues.

- **lynx-intlayer**  
  Intégration Lynx qui fournit le plugin pour intégrer Intlayer avec le bundler Lynx.

---

## Étape 2 : Créer une configuration Intlayer

À la racine de votre projet (ou à tout endroit pratique), créez un fichier de **configuration Intlayer**. Cela pourrait ressembler à ceci :

```ts fileName="intlayer.config.ts" codeFormat="typescript"
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

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Dans cette configuration, vous pouvez :

- Configurer votre **liste de langues prises en charge**.
- Définir une langue **par défaut**.
- Plus tard, vous pourrez ajouter des options plus avancées (par exemple, journaux, répertoires de contenu personnalisés, etc.).
- Consultez la [documentation de configuration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) pour plus d'informations.

## Étape 3 : Ajouter le plugin Intlayer au bundler Lynx

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

## Étape 4 : Ajouter le fournisseur Intlayer

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

## Étape 5 : Déclarez votre contenu

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

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
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
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
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
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

module.exports = appContent;
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

> Pour plus de détails sur les déclarations de contenu, consultez [la documentation sur le contenu d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

---

## Étape 4 : Utiliser Intlayer dans vos composants

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

## (Optionnel) Étape 5 : Changer la langue de l'application

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

```plaintext
# Ignorer les fichiers générés par Intlayer
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
- **Commandes CLI** : Explorez le [CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md) pour des tâches comme **extraire des traductions** ou **vérifier les clés manquantes**.

---
