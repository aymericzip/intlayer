---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrer de Lingui vers Intlayer"
description: "Migrez une application React de Lingui vers Intlayer étape par étape. Gardez vos macros Lingui, useLingui et <Trans> fonctionnels grâce au compat adapter @intlayer/lingui."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrer de Lingui vers Intlayer

## Pourquoi migrer de Lingui vers Intlayer ?

<AccordionGroup>
<Accordion header="Taille du bundle">

Lingui charge un catalogue compilé par locale, contenant tous les messages de l'application. Intlayer découpe le contenu par dictionnaire et ne livre que ce que chaque page utilise, ce qui **réduit la taille de vos bundles et de vos pages jusqu'à 50 %**.

</Accordion>
<Accordion header="Maintenabilité">

Les dictionnaires Intlayer sont **entièrement typés** et peuvent être co-localisés avec les composants qui les utilisent. Plus d'étape `extract` / `compile` à retenir : les dictionnaires sont buildés par le plugin du bundler.

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

1. **Compat adapter (recommandé pour les applications existantes)** : installez `@intlayer/lingui`. Il expose la même API que `@lingui/core` et `@lingui/react` (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`) et sert les messages depuis les dictionnaires Intlayer. Vos macros (`` t`…` ``, `<Trans>`, `msg`, `plural`) continuent de compiler exactement comme avant.
2. **Migration complète** : remplacez progressivement les appels Lingui par `useIntlayer` et des fichiers `.content.ts` co-localisés avec vos composants.

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
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> Gardez `@lingui/core`, `@lingui/react` et votre plugin de macros (`@lingui/babel-plugin-lingui-macro` ou `@lingui/swc-plugin`) installés. Les macros s'exécutent toujours, et les packages Lingui fournissent les types TypeScript.

</Step>
<Step number={2} title="Configurer Intlayer">

Intlayer lit vos catalogues Lingui comme source de vérité. Avec la structure par défaut de Lingui (`src/locales/{locale}/messages.po`), pointez le plugin `syncPO` vers eux :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="Utiliser des catalogues JSON">

Avec `@lingui/format-json`, utilisez `syncJSON` avec le format ICU :

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> Utilisez des ids de message explicites (`t({ id: "hero.title", message: "Welcome" })` ou `<Trans id="hero.title">`). Les ids générés à partir du texte source ne sont pas résolus dans les catalogues.

</Step>
<Step number={3} title="Remplacer le plugin Vite de Lingui">

Remplacez `@lingui/vite-plugin` par `@intlayer/lingui/plugin`. Le binding reste `lingui()` : il lance le build Intlayer et crée des alias de `@lingui/core` et `@lingui/react` vers `@intlayer/lingui`, sans aucune modification de vos fichiers source.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> Gardez le plugin de macros dans le plugin React (Babel ou `@lingui/swc-plugin`), afin que les macros soient compilées en appels `i18n._()` avant qu'Intlayer ne les résolve.

</Step>
</Steps>

Vos composants continuent de fonctionner sans changement :

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

Le changement de locale passe toujours par `i18n.activate(locale)`, qui met à jour chaque consommateur de `useLingui()`.

## Migration complète

<Steps>
<Step number={4} title="Supprimer le chargement des catalogues au runtime" isOptional={true}>

Les messages proviennent désormais des dictionnaires Intlayer compilés au build. Les appels à `i18n.load()` / `i18n.loadAndActivate()` ne servent plus que de fallback et affichent un avertissement en développement. Remplacez-les par `i18n.activate(locale)` et supprimez l'étape `lingui compile`. Gardez `lingui extract` pour collecter les nouveaux ids de message.

</Step>
<Step number={5} title="Renommage explicite des imports (optionnel)" isOptional={true}>

Le plugin Vite gère déjà les alias. Pour rendre la dépendance explicite :

| Avant                                              | Après                                                 |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="Déplacer le contenu dans des fichiers .content.ts" isOptional={true}>

Les nouveaux composants peuvent utiliser le contenu Intlayer natif, à côté des appels Lingui existants :

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

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

Les traductions complétées sont réécrites dans vos catalogues Lingui. Consultez la [documentation de la CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md) pour la configuration de l'IA.

</Step>
</Steps>

## Ce que vous pouvez supprimer après la migration

| Fichier / pattern                                | Pourquoi ce n'est plus nécessaire                                   |
| ------------------------------------------------ | ------------------------------------------------------------------- |
| `i18n.load()` / imports dynamiques de catalogues | Les dictionnaires sont compilés et chargés par Intlayer.            |
| `lingui compile` et catalogues `.js` compilés    | Intlayer build les dictionnaires directement depuis vos catalogues. |
| `@lingui/vite-plugin`                            | Remplacé par `lingui()` de `@intlayer/lingui/plugin`.               |

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

- [Compat adapter Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui.md)
- [Plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md)
- [Intlayer avec Vite et React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)
- [Éditeur visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)
- [CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md)
