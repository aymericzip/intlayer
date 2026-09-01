---
createdAt: 2025-04-18
updatedAt: 2026-08-29
title: "Analog i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application Analog multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Analog
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - analog
applicationTemplate: https://github.com/aymericzip/intlayer-analog-template
applicationShowcase: https://intlayer-analog-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 8.0.4
    date: 2026-01-26
    changes: "Initialisation de l'historique"
author: aymericzip
---

# Traduisez votre application Analog (Angular) avec Intlayer | Internationalisation (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-analog-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Démo" value="demo">

<iframe
  src="https://intlayer-analog-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo - intlayer-analog-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table des matières

<TOC/>

## Pourquoi Intlayer plutôt que des alternatives ?

Par rapport aux solutions principales telles que `ngx-translate` ou `angular-l10n`, Intlayer est une solution dotée d'optimisations intégrées telles que :

<AccordionGroup>
<Accordion header="Support complet de analogique">

Intlayer est optimisé pour fonctionner parfaitement avec Analog en offrant un **routage multilingue**, une **prise en charge SSR** et toutes les fonctionnalités nécessaires à l'internationalisation (i18n).

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

## Guide étape par étape pour configurer Intlayer dans une application Analog

Voir le [Modèle d'application](https://github.com/aymericzip/intlayer-analog-template) sur GitHub.

<Steps>

<Step number={1} title="Installer les dépendances">

Installez les packages nécessaires à l'aide de npm :

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> l'indicateur `--interactive` est facultatif. Utilisez `intlayer-cli init` si vous êtes un agent IA.

> Cette commande détectera votre environnement et installera les packages requis. Par exemple :

```bash packageManager="npm"
npm install intlayer angular-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer angular-intlayer vite-intlayer
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **angular-intlayer**
  Le package qui intègre Intlayer avec l'application Angular. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation d'Angular.

- **vite-intlayer**
  Le package qui intègre Intlayer avec Vite. Il fournit un plugin pour gérer les fichiers de déclaration de contenu et configure des alias pour des performances optimales.

</Step>

<Step number={2} title="Configuration de votre projet">

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, la redirection de middleware, les noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, reportez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>

<Step number={3} title="Intégrer Intlayer dans votre configuration Vite">

Pour intégrer Intlayer avec Analog, vous devez utiliser le plugin `vite-intlayer`.

Modifiez votre fichier `vite.config.ts` :

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import analog from "@analogjs/platform";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    analog(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
}));
```

> Le plugin `intlayer()` configure Vite avec Intlayer. Il gère les fichiers de déclaration de contenu et configure des alias pour des performances optimales.

</Step>

<Step number={4} title="Déclarer votre contenu">

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations ! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Pour plus de détails, reportez-vous à la [documentation de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

</Step>

<Step number={5} title="Utiliser Intlayer dans votre code">

Pour utiliser les fonctionnalités d'internationalisation d'Intlayer dans toute votre application Analog, vous devez fournir Intlayer dans la configuration de votre application.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideIntlayer } from "angular-intlayer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideIntlayer(), // Ajouter le fournisseur Intlayer ici
  ],
};
```

Ensuite, vous pouvez utiliser la fonction `useIntlayer` dans n'importe quel composant.

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  standalone: true,
  template: `
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

Le contenu Intlayer est retourné sous forme de `Signal`, vous accédez donc aux valeurs en appelant le signal : `content().title`.

</Step>

<Step number={6} title="Changer la langue de votre contenu" isOptional={true}>

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par la fonction `useLocale`. Cela vous permet de définir la locale de l'application et de mettre à jour le contenu en conséquence.

Créez un composant pour basculer entre les langues :

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Ensuite, utilisez ce composant dans vos pages :

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "../locale-switcher.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [LocaleSwitcherComponent],
  template: `
    <app-locale-switcher></app-locale-switcher>
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

</Step>

</Steps>

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et rendre votre codebase plus solide.

![Autocomplétion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erreur de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assurez-vous que votre configuration TypeScript inclut les types autogénérés.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types auto-générés
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous évite de les commettre dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```bash
#  Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'**extension officielle Intlayer VS Code**.

[Installer depuis le VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, reportez-vous à la [documentation de l'extension Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu à l'aide du [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser une application Analog ?">

Analog est un méta-framework Angular bâti sur Vite, il hérite donc des options Angular et y ajoute celles de Vite :

- **`@angular/localize`** : extraction XLIFF avec un build compilé par locale, ce qui s'accorde mal avec un routeur basé sur les fichiers et le rendu serveur.
- **`ngx-translate`** et **`Transloco`** : catalogues JSON d'exécution via un service, sans intégration avec le routage d'Analog ni le rendu côté serveur.
- **`Intlayer`** : contenu déclaré à côté de chaque composant et compilé par le plugin Vite au moment du build, entièrement typé, avec changement de locale à l'exécution, traduction par IA, un éditeur visuel et un CMS.

Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) et le [guide Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_angular_21.md) pour les API spécifiques à Angular.

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille de mon bundle Analog ?">

Bien moins qu'une configuration basée sur des espaces de noms, car une page ne télécharge jamais un catalogue qu'elle n'affiche pas. Le balisage rendu côté serveur résout son contenu sur le serveur, et le compilateur au moment du build remplace les appels `useIntlayer` par les entrées de dictionnaire exactes qu'un composant utilise, si bien que les clés inutilisées et les langues inutilisées sont éliminées, et les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) répartissent le reste par locale. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle et des pages jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md).

</Question>

<Question title="Puis-je migrer depuis `ngx-translate`, `Transloco` ou `@angular/localize` sans réécrire mes templates ?">

En grande partie. Suivez le [guide de migration ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/ngx-translate.md) ou le [guide de migration Transloco](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/transloco.md) pour transférer le contenu. Vous pouvez aussi migrer progressivement : le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos catalogues JSON existants comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, si bien que les deux couches restent synchronisées pendant que vous déplacez les templates un par un.

</Question>

<Question title="Puis-je conserver mes fichiers de traduction JSON existants ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos fichiers `/messages/{locale}/{namespace}.json` comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, dans les deux sens. Un [plugin de synchronisation PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) fait de même pour les catalogues gettext, et les [fichiers par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) permettent de séparer le contenu par langue au lieu de regrouper les locales dans un seul fichier.

</Question>

<Question title="Dois-je déplacer mon contenu clé par clé ?">

Non. Lancez `npx intlayer extract` et Intlayer lit vos fichiers source, en extrait les chaînes destinées aux utilisateurs et écrit un fichier `.content` à côté de chacun, de sorte que vous relisez un diff plutôt que de copier des chaînes dans un catalogue une par une. Voir la [commande extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md).

Pour un pipeline entièrement automatisé, le [compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) fait la même chose au moment du build sur du code source JSX, TSX, Vue et Svelte, en générant les dictionnaires à chaque changement, de sorte qu'il n'y a aucune clé à maintenir à la main. Il fonctionne par analyse statique : les chaînes qui n'existent qu'à l'exécution restent hors de portée, et il a besoin de quelques annotations pour distinguer le texte destiné aux utilisateurs de la logique applicative.

</Question>

<Question title="Quels outils d'éditeur et d'agent IA sont disponibles ?">

Cinq éléments, tous optionnels :

- **[Extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)** : passez d'une clé `useIntlayer` au fichier de contenu qui la déclare, extrayez du contenu depuis un composant, et lancez build, fill, test, push et pull depuis la palette de commandes ou un onglet Intlayer dédié.
- **[Serveur LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)** : la même connaissance dans tout éditeur qui parle LSP, avec aller à la définition, rechercher toutes les références, aperçus au survol d'une valeur traduite, autocomplétion des clés et des champs, et un avertissement lorsqu'une clé n'est déclarée nulle part. Il résout aussi les appels `i18next`, `react-i18next`, `next-intl` et `use-intl`, ce qui aide pendant la migration.
- **[Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** : expose la documentation et la CLI d'Intlayer à Cursor, VS Code, Claude Desktop, Claude Code et ChatGPT, afin qu'un assistant réponde à partir de la documentation actuelle au lieu de deviner, et puisse exécuter lui-même des commandes telles que `intlayer fill`.
- **[Compétences d'agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)** : des compétences ciblées telles que `intlayer-config`, `intlayer-cli` et `intlayer-content`, plus une par framework, qui apprennent à un agent votre configuration de routage et les types de nœuds de contenu.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md)** : `no-raw-text` signale les chaînes codées en dur, avec d'autres règles pour les clés de dictionnaire statiques et le contenu inutilisé.

</Question>

<Question title="Ai-je besoin d'un build par langue ?">

Non. C'est le modèle de `@angular/localize`, où chaque locale est compilée dans son propre bundle et déployée séparément. Avec Intlayer, un seul build sert toutes les locales déclarées, et la langue active est résolue à l'exécution à partir de l'URL, d'un cookie ou de l'en-tête `Accept-Language`.

</Question>

<Question title="Intlayer prend-il en charge les signals Angular et les composants standalone ?">

Oui. Le contenu est exposé via des signals, si bien qu'un template se réaffiche lorsque la locale change sans rechargement de page, et le provider est enregistré comme n'importe quel autre provider standalone.

</Question>

<Question title="Comment changer la langue à l'exécution ?">

L'étape 6 le couvre. `useLocale` expose la locale active, les locales déclarées et un setter qui persiste le choix, et `getLocalizedUrl` réécrit le chemin actuel afin que l'utilisateur reste sur la même route après le changement.

</Question>

<Question title="Cela fonctionne-t-il avec le rendu côté serveur d'Analog et Vite ?">

Oui. Le plugin Vite `intlayer()` compile votre contenu et le surveille en développement, et la locale est résolue sur le serveur afin que la première réponse HTML soit déjà dans la bonne langue. Les routes prérendues résolvent leur contenu au moment du build.

</Question>

<Question title="Comment traduire l'application automatiquement avec l'IA ?">

Lancez `npx intlayer fill`. Il remplit les traductions manquantes avec le LLM de votre choix, en utilisant votre propre fournisseur et votre clé d'API, et `--git-diff` limite l'exécution au contenu modifié sur la branche. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

</Question>

<Question title="Intlayer prend-il en charge les pluriels, le genre et le texte enrichi ?">

Oui : les [formes plurielles](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/plurial.md), le [contenu basé sur le genre](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender.md), les conditions, les [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md), le [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md) et les [formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) pour les nombres, les dates et les devises.

</Question>

<Question title="Comment détecter les traductions manquantes avant la mise en production ?">

Lancez `npx intlayer test` en CI. Il fait échouer le build lorsqu'une locale déclarée manque de contenu. L'[extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md) signale les mêmes erreurs pendant que vous tapez. Voir [tester votre contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/testing.md).

</Question>

<Question title="Comment les traducteurs peuvent-ils modifier le contenu sans toucher au code ?">

Via l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md), qui tourne sur votre propre infrastructure et permet à quiconque de modifier le texte sur place sur l'application en cours d'exécution, ou le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), qui externalise le contenu afin qu'il puisse changer sans déploiement.

</Question>

<Question title="Intlayer est-il gratuit et open source ?">

Oui, sous licence Apache 2.0, usage commercial inclus. Le CMS hébergé est un service payant optionnel qui peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
