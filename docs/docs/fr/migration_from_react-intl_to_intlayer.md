---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrer de react-intl (FormatJS) vers Intlayer"
description: "Migrez une application React de react-intl vers Intlayer étape par étape. Gardez useIntl, FormattedMessage et tous les composants Formatted* fonctionnels grâce au compat adapter @intlayer/react-intl."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrer de react-intl (FormatJS) vers Intlayer

## Pourquoi migrer de react-intl vers Intlayer ?

<AccordionGroup>
<Accordion header="Taille du bundle">

Avec react-intl, tous les messages de la locale sont passés à `IntlProvider`, donc chaque page embarque le catalogue entier. Intlayer ne livre que les dictionnaires utilisés par chaque page, ce qui **réduit la taille de vos bundles et de vos pages jusqu'à 50 %**.

</Accordion>
<Accordion header="Maintenabilité">

Les ids de message sont **typés** selon vos dictionnaires : un id invalide échoue au build. Le contenu peut être co-localisé avec les composants qui l'utilisent.

</Accordion>
<Accordion header="Agent IA">

Le contenu co-localisé **réduit le contexte nécessaire** aux LLM. Intlayer fournit une **CLI** pour tester les traductions manquantes, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)**, un **[serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** et des **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)**.

</Accordion>
<Accordion header="Automatisation">

Traduisez les messages manquants dans votre pipeline CI/CD avec le LLM de votre choix, ou en arrière-plan avec la [plateforme web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

</Accordion>
<Accordion header="Passage à l'échelle avec les non-développeurs">

Intlayer fournit un **[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)** auto-hébergé et un **[CMS complet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)** pour que traducteurs et rédacteurs modifient le contenu en temps réel.

</Accordion>
</AccordionGroup>

> Pour comprendre d'où viennent ces bibliothèques, lisez [l'histoire de l'i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md).

## Stratégies de migration

1. **Compat adapter (recommandé pour les applications existantes)** : installez `@intlayer/react-intl`. Il expose la même API que `react-intl` (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…) et sert les messages depuis les dictionnaires Intlayer. ICU MessageFormat, pluriels, selects et balises rich text fonctionnent comme avant.
2. **Migration complète** : remplacez progressivement les appels react-intl par `useIntlayer` et des fichiers `.content.ts` co-localisés avec vos composants.

## Table des matières

<TOC/>

## Migration rapide

<Steps>
<Step number={1} title="Installer les dépendances">

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

> Le flag `--interactive` est optionnel. Utilisez `intlayer-cli init` si vous êtes un agent IA.

La commande détecte votre environnement et installe les packages nécessaires, par exemple :

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> Gardez `react-intl` installé : il fournit les types TypeScript.

</Step>
<Step number={2} title="Configurer Intlayer">

Pointez le plugin `syncJSON` vers vos fichiers de messages existants. Les catalogues react-intl sont des maps plates d'ids à points :

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> Le premier segment de chaque id (`home`) devient un dictionnaire Intlayer, donc chaque page ne charge que les dictionnaires qu'elle utilise. Quand Intlayer réécrit les traductions, le fichier garde sa forme plate.

</Step>
<Step number={3} title="Ajouter le plugin Vite">

`reactIntlVitePlugin()` lance le build Intlayer et crée un alias de `react-intl` vers `@intlayer/react-intl`, sans aucune modification de vos fichiers source.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> Vous utilisez un autre bundler ? Renommez les imports en `@intlayer/react-intl` (voir l'étape 5) et utilisez le plugin Intlayer de votre bundler, par exemple `withIntlayer` de `next-intlayer` pour Next.js.

</Step>
<Step number={4} title="Ne plus passer les messages à IntlProvider">

`IntlProvider` continue de fonctionner, mais les messages sont désormais chargés par Intlayer. Supprimez la prop `messages` et l'import du catalogue :

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> Si `messages` est encore passé, il est ignoré et un avertissement s'affiche en développement.

</Step>
</Steps>

Vos composants continuent de fonctionner sans changement, avec des ids typés :

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## Migration complète

<Steps>
<Step number={5} title="Renommage explicite des imports (optionnel)" isOptional={true}>

Le plugin Vite gère déjà les alias. Pour rendre la dépendance explicite :

| Avant                                           | Après                                                     |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="Déplacer le contenu dans des fichiers .content.ts" isOptional={true}>

Les nouveaux composants peuvent utiliser le contenu Intlayer natif, à côté des appels react-intl existants :

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

</Step>
<Step number={7} title="Activer la traduction par IA" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Les traductions complétées sont réécrites dans vos fichiers JSON. Consultez la [documentation de la CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md) pour la configuration de l'IA.

</Step>
</Steps>

## Ce que vous pouvez supprimer après la migration

| Fichier / pattern                            | Pourquoi ce n'est plus nécessaire                                                      |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| Prop `messages` et chargement du catalogue   | Les dictionnaires sont compilés et chargés par Intlayer.                               |
| Étape `formatjs compile`                     | Intlayer parse les messages ICU directement depuis les fichiers JSON.                  |
| Génération d'ids par `babel-plugin-formatjs` | Utilisez des ids explicites à points pour que chaque id corresponde à un dictionnaire. |

## Configurer TypeScript

Incluez les types générés dans votre `tsconfig.json` :

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Configuration Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/react-intl.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md)
- [Intlayer avec Vite et React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)
- [Migrer depuis react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_react-i18next_to_intlayer.md)
- [Éditeur visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)
