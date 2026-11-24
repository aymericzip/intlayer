---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrer de svelte-i18n vers Intlayer"
description: "Migrez une application Svelte ou SvelteKit de svelte-i18n vers Intlayer étape par étape. Gardez les stores $_, $date et $number fonctionnels grâce au compat adapter @intlayer/svelte-i18n."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrer de svelte-i18n vers Intlayer

## Pourquoi migrer de svelte-i18n vers Intlayer ?

<AccordionGroup>
<Accordion header="Taille du bundle">

svelte-i18n enregistre des fichiers de locale entiers au démarrage. Intlayer ne livre que les dictionnaires utilisés par chaque page, ce qui **réduit la taille de vos bundles et de vos pages jusqu'à 50 %**.

</Accordion>
<Accordion header="Maintenabilité">

Les clés sont **typées** selon vos dictionnaires : une clé invalide échoue au build. Le contenu peut être co-localisé avec les composants qui l'utilisent.

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

1. **Compat adapter (recommandé pour les applications existantes)** : installez `@intlayer/svelte-i18n`. Il expose la même API que `svelte-i18n` (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…) et sert les messages depuis les dictionnaires Intlayer. ICU MessageFormat fonctionne comme avant.
2. **Migration complète** : remplacez progressivement les stores svelte-i18n par `useIntlayer` de `svelte-intlayer` et des fichiers `.content.ts` co-localisés avec vos composants.

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
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> Gardez `svelte-i18n` installé : il fournit les types TypeScript.

</Step>
<Step number={2} title="Configurer Intlayer">

Pointez le plugin `syncJSON` vers vos fichiers de messages existants. Avec un fichier par namespace (`src/locales/en/home.json`), chaque fichier devient un dictionnaire :

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
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` se résout vers le champ `title` du dictionnaire `home`. Si vous utilisez un seul fichier par locale (`src/locales/en.json`) avec des namespaces imbriqués, utilisez plutôt `source: ({ locale }) => \`./src/locales/${locale}.json\`` : chaque clé de premier niveau devient un dictionnaire.

</Step>
<Step number={3} title="Ajouter le plugin Vite">

`svelteI18nVitePlugin()` lance le build Intlayer et crée un alias de `svelte-i18n` vers `@intlayer/svelte-i18n`, sans aucune modification de vos fichiers source.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> Pour SvelteKit, ajoutez `svelteI18nVitePlugin()` après `sveltekit()` dans le même tableau `plugins`.

</Step>
<Step number={4} title="Simplifier la configuration i18n">

Gardez `init()`, mais supprimez `register()` et `addMessages()` : les messages proviennent des dictionnaires Intlayer.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

Vos composants continuent de fonctionner sans changement :

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

Définir `$locale = 'fr'` change la langue à la fois pour les stores svelte-i18n et pour `useIntlayer`.

## Migration complète

<Steps>
<Step number={5} title="Renommage explicite des imports (optionnel)" isOptional={true}>

Le plugin Vite gère déjà les alias. Pour rendre la dépendance explicite :

| Avant                                        | Après                                                  |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="Déplacer le contenu dans des fichiers .content.ts" isOptional={true}>

Les nouveaux composants peuvent utiliser le contenu Intlayer natif, à côté des appels svelte-i18n existants :

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
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

| Fichier / pattern                     | Pourquoi ce n'est plus nécessaire                            |
| ------------------------------------- | ------------------------------------------------------------ |
| Appels `register()` / `addMessages()` | Les dictionnaires sont compilés et chargés par Intlayer.     |
| `waitLocale()` avant le rendu         | Les messages sont disponibles dès que la locale est définie. |

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

- [Compat adapter svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/svelte-i18n.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md)
- [Intlayer avec Vite et Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+svelte.md)
- [Intlayer avec SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_svelte_kit.md)
- [Éditeur visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)
