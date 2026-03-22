---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: Comment configurer Intlayer avec Storybook
description: Apprenez à rendre votre système de conception multilingue en utilisant Intlayer avec Storybook — compilez les déclarations de contenu, ajoutez un sélecteur de langue et prévisualisez vos composants dans n'importe quelle langue.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
---

# Intlayer avec Storybook

## Table des matières

<TOC/>

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier le support multilingue dans les applications web modernes. Elle fonctionne au **niveau du composant** — chaque composant possède ses propres déclarations de contenu — gardant les traductions colocalisées avec le code qui les utilise.

Avec Intlayer, vous pouvez :

- **Gérer les traductions de manière déclarative** avec des fichiers de contenu par composant.
- **Bénéficier d'un support TypeScript complet** grâce aux types auto-générés et à l'autocomplétion de l'IDE.
- **Changer de langue au moment de l'exécution** sans recharger la page.
- **Traduire automatiquement** avec des intégrations intégrées de fournisseurs d'IA.

---

## Pourquoi utiliser Intlayer avec Storybook ?

Storybook est l'outil standard de l'industrie pour développer et documenter des composants UI de manière isolée. Combiner Storybook avec Intlayer vous permet de :

- **Prévisualiser chaque langue** directement dans le canvas Storybook à l'aide d'un sélecteur dans la barre d'outils.
- **Détecter les traductions manquantes** avant qu'elles n'atteignent la production.
- **Documenter des composants multilingues** avec un contenu réel et de type sécurisé plutôt qu'avec des chaînes de caractères codées en dur.

---

## Configuration étape par étape

<Tabs>
<Tab value="Vite Setup">

### Étape 1 : Installer les dépendances

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

| Paquet           | Rôle                                                       |
| ---------------- | ---------------------------------------------------------- |
| `intlayer`       | Cœur — configuration, compilation de contenu, CLI          |
| `react-intlayer` | Liaisons React — `IntlayerProvider`, hook `useIntlayer`    |
| `vite-intlayer`  | Plugin Vite — surveille et compile les fichiers de contenu |

---

### Étape 2 : Créer une configuration Intlayer

Créez `intlayer.config.ts` à la racine de votre projet (ou à l'intérieur de votre paquet design-system) :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ajoutez d'autres langues si nécessaire
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // où se trouvent vos fichiers *.content.ts
  },
};

export default config;
```

> Pour la liste complète des options, voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

---

### Étape 3 : Ajouter le plugin Vite à Storybook

Le hook `viteFinal` de Storybook vous permet d'étendre la configuration interne de Vite. Importez et ajoutez le plugin `intlayer()` ici :

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …autres addons
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [intlayer()],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

Le plugin `intlayer()` surveille vos fichiers `*.content.ts` et reconstruit automatiquement les dictionnaires lors des changements pendant le développement Storybook.

---

### Étape 4 : Ajouter le décorateur `IntlayerProvider` et une barre d'outils de langue

Le fichier `preview` de Storybook est l'endroit idéal pour envelopper chaque story avec l' `IntlayerProvider` et exposer un sélecteur de langue dans la barre d'outils :

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Envelopper chaque story dans l'IntlayerProvider
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // Exposer un sélecteur de langue dans la barre d'outils Storybook
  globalTypes: {
    locale: {
      description: "Langue active",
      defaultValue: "en",
      toolbar: {
        title: "Langue",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> Les valeurs de `locale` doivent correspondre aux langues déclarées dans votre `intlayer.config.ts`.

</Tab>
<Tab value="Webpack Setup">

### Étape 1 : Installer les dépendances

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

---

### Étape 2 : Créer une configuration Intlayer

Créez `intlayer.config.ts` à la racine de votre projet :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

---

### Étape 3 : Configurer le Webpack de Storybook

Pour les configurations Storybook basées sur Webpack (par ex. `@storybook/react-webpack5`), étendez la configuration webpack via `webpackFinal` pour ajouter les alias et le chargeur Intlayer :

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerWebpackPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [
      ...(baseConfig.plugins ?? []),
      new IntlayerWebpackPlugin(),
    ];
    return baseConfig;
  },
};

export default config;
```

---

### Étape 4 : Ajouter le décorateur `IntlayerProvider` et une barre d'outils de langue

Même chose que pour la configuration Vite — ajoutez le décorateur et le type de langue global dans `.storybook/preview.tsx` :

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "Langue active",
      defaultValue: "en",
      toolbar: {
        title: "Langue",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Tab>
</Tabs>

---

## Déclaration de contenu

Créez un fichier `*.content.ts` à côté de chaque composant. Intlayer le détecte automatiquement pendant la compilation.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat="typescript"
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

module.exports = copyButtonContent;
```

> Pour plus de formats de déclaration de contenu et de fonctionnalités, consultez la [documentation de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

---

## Utilisation de `useIntlayer` dans un composant

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      Copier
    </button>
  );
};
```

`useIntlayer` renvoie le dictionnaire compilé pour la langue actuelle fournie par le `IntlayerProvider` le plus proche. Changer de langue dans la barre d'outils Storybook rafraîchit automatiquement la story avec les traductions mises à jour.

---

## Écrire des stories pour des composants internationalisés

Avec le décorateur `IntlayerProvider` en place, vos stories fonctionnent exactement comme avant. La barre d'outils de langue contrôle la langue active pour tout le canvas :

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** Story par défaut — changez la langue dans la barre d'outils pour prévisualiser les traductions. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Affiche le bouton à l'intérieur d'un bloc de code, un cas d'utilisation courant. */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> Chaque story hérite de la globale `locale` de la barre d'outils, vous pouvez donc vérifier chaque langue sans changer le code de la story.

---

## Tester les traductions dans les stories

Utilisez les fonctions `play` de Storybook pour affirmer que le texte traduit correctement est affiché pour une langue donnée :

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Vérifier que le bouton a un nom accessible non vide
    await expect(button).toHaveAccessibleName();
    // Vérifier que le bouton n'est pas désactivé
    await expect(button).not.toBeDisabled();
    // Vérifier l'accessibilité au clavier
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Ressources supplémentaires

- [Référence de configuration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
- [Documentation de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md)
- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md)
- [Documentation Storybook](https://storybook.js.org/docs)
