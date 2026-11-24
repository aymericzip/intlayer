---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrer de ngx-translate vers Intlayer"
description: "Migrez une application Angular de ngx-translate vers Intlayer étape par étape. Gardez le pipe translate, la directive translate et TranslateService fonctionnels grâce au compat adapter @intlayer/ngx-translate."
keywords:
  - ngx-translate
  - "@ngx-translate/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - Angular
slugs:
  - doc
  - migration
  - ngx-translate
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrer de ngx-translate vers Intlayer

## Pourquoi migrer de ngx-translate vers Intlayer ?

<AccordionGroup>
<Accordion header="Pas de loader HTTP">

ngx-translate récupère les fichiers de locale au runtime via `TranslateHttpLoader`, ce qui retarde le premier rendu. Intlayer compile les dictionnaires au build, les traductions sont donc disponibles immédiatement.

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

1. **Compat adapter (recommandé pour les applications existantes)** : installez `@intlayer/ngx-translate`. Il expose la même API que `@ngx-translate/core` (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`) et sert les messages depuis les dictionnaires Intlayer. Vos templates restent inchangés.
2. **Migration complète** : remplacez progressivement les appels ngx-translate par `useIntlayer` de `angular-intlayer` et des fichiers `.content.ts` co-localisés avec vos composants.

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
npm install intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
npm install -D @angular-builders/custom-esbuild
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
pnpm add -D @angular-builders/custom-esbuild
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
yarn add -D @angular-builders/custom-esbuild
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
bun add -D @angular-builders/custom-esbuild
```

> Gardez `@ngx-translate/core` installé : il fournit les types TypeScript. `@ngx-translate/http-loader` peut être supprimé.

</Step>
<Step number={2} title="Configurer Intlayer">

Pointez le plugin `syncJSON` vers vos fichiers de traduction existants. Avec un fichier par namespace (`src/i18n/en/home.json`), chaque fichier devient un dictionnaire :

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
      // matches ngx-translate placeholder syntax: {{name}}
      format: "i18next",
      // ./src/i18n/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/i18n/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `'home.title' | translate` se résout vers le champ `title` du dictionnaire `home`. Si vous utilisez un seul fichier par locale (`src/assets/i18n/en.json`) avec des clés imbriquées, utilisez plutôt `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\`` : chaque clé de premier niveau devient un dictionnaire.

</Step>
<Step number={3} title="Ajouter le plugin esbuild">

L'Angular CLI accepte des plugins esbuild via `@angular-builders/custom-esbuild`. Créez un fichier de plugins :

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

Puis référencez-le dans `angular.json` :

```json5 fileName="angular.json"
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-esbuild:application",
      "options": {
        "plugins": ["./esbuild.plugins.ts"],
        // ... your existing options
      },
    },
    "serve": {
      "builder": "@angular-builders/custom-esbuild:dev-server",
    },
  },
}
```

Le plugin lance le build Intlayer et résout `@ngx-translate/core` vers `@intlayer/ngx-translate`, sans aucune modification de vos fichiers source.

> Vous buildez avec Vite (Analog) ? Utilisez plutôt `ngxTranslateVitePlugin()` de `@intlayer/ngx-translate/plugin`.

</Step>
<Step number={4} title="Supprimer le loader HTTP">

Gardez `provideTranslateService()`, mais retirez l'option `loader` : les messages proviennent des dictionnaires Intlayer.

```typescript fileName="src/app/app.config.ts"
import type { ApplicationConfig } from "@angular/core";
import { provideTranslateService } from "@ngx-translate/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      lang: "en",
      fallbackLang: "en",
    }),
  ],
};
```

> Les traductions ne passent plus par un loader, donc `TranslateHttpLoader` et `@ngx-translate/http-loader` peuvent être supprimés.

</Step>
</Steps>

Vos templates et services continuent de fonctionner sans changement :

```html fileName="src/app/app.html"
<h1>{{ 'home.title' | translate }}</h1>
<p [translate]="'home.greeting'" [translateParams]="{ name: 'Ada' }"></p>
<h2 translate>home.serviceSection</h2>
```

```typescript fileName="src/app/app.ts"
import { Component, inject } from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  imports: [TranslatePipe],
  templateUrl: "./app.html",
})
export class App {
  private readonly translate = inject(TranslateService);

  readonly message = this.translate.instant("home.title");

  switchTo = (lang: string) => this.translate.use(lang);
}
```

## Migration complète

<Steps>
<Step number={5} title="Renommage explicite des imports (optionnel)" isOptional={true}>

Le plugin esbuild gère déjà les alias. Pour rendre la dépendance explicite :

| Avant                                                           | Après                                                               |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="Déplacer le contenu dans des fichiers .content.ts" isOptional={true}>

Les nouveaux composants peuvent utiliser le contenu Intlayer natif, à côté des appels ngx-translate existants. Enregistrez `provideIntlayer()` de `angular-intlayer` à côté de `provideTranslateService()` dans `app.config.ts`, puis :

```typescript fileName="src/app/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```typescript fileName="src/app/home.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  template: `<h1>{{ content().title }}</h1>`,
})
export class HomeComponent {
  content = useIntlayer("home");
}
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

| Fichier / pattern                                                  | Pourquoi ce n'est plus nécessaire                           |
| ------------------------------------------------------------------ | ----------------------------------------------------------- |
| `TranslateHttpLoader` / loaders personnalisés                      | Les dictionnaires sont compilés et chargés par Intlayer.    |
| `@ngx-translate/http-loader`                                       | Plus de récupération des fichiers de traduction au runtime. |
| `provideHttpClient()` (si utilisé uniquement pour les traductions) | Même raison.                                                |

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

- [Compat adapter ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/ngx-translate.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md)
- [Intlayer avec Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_angular_21.md)
- [Éditeur visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)
