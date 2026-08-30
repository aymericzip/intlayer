---
createdAt: 2024-08-11
updatedAt: 2026-08-29
title: Éditeur Visual Intlayer | Modifiez votre contenu en utilisant un éditeur visuel
description: Découvrez comment utiliser l'Éditeur Intlayer pour gérer votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.
keywords:
  - Éditeur
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historique initial"
author: aymericzip
---

# Documentation de l'Éditeur Visuel Intlayer

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

L'Éditeur Visuel Intlayer est un outil qui enveloppe votre site web pour interagir avec vos fichiers de déclaration de contenu à l'aide d'un éditeur visuel.

![Interface de l'Éditeur Visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

Le package `intlayer-editor` est basé sur Intlayer et est disponible pour les applications JavaScript, telles que React (Create React App), Vite + React, et Next.js.

## Éditeur visuel vs CMS

L'Éditeur Visuel Intlayer est un outil qui vous permet de gérer votre contenu dans un éditeur visuel pour des dictionnaires locaux. Une fois une modification effectuée, le contenu sera remplacé dans la base de code. Cela signifie que l'application sera reconstruite et que la page sera rechargée pour afficher le nouveau contenu.

En revanche, le [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) est un outil qui vous permet de gérer votre contenu dans un éditeur visuel pour des dictionnaires distants. Une fois une modification effectuée, le contenu **n'affectera pas** votre base de code. Et le site web affichera automatiquement le contenu modifié.

## Intégrer Intlayer dans votre application

Pour plus de détails sur l'intégration d'Intlayer, consultez la section correspondante ci-dessous :

### Intégration avec Next.js

Pour l'intégration avec Next.js, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md).

### Intégration avec Create React App

Pour l'intégration avec Create React App, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md).

### Intégration avec Vite + React

Pour l'intégration avec Vite + React, consultez le [guide d'installation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md).

## Comment fonctionne l'Éditeur Intlayer

L'éditeur visuel dans une application comprend deux éléments :

- Une application frontend qui affichera votre site web dans une iframe. Si votre site web utilise Intlayer, l'éditeur visuel détectera automatiquement votre contenu et vous permettra d'interagir avec lui. Une fois une modification effectuée, vous pourrez télécharger vos changements.

- Une fois que vous avez cliqué sur le bouton de téléchargement, l'éditeur visuel enverra une requête au serveur pour remplacer vos fichiers de déclaration de contenu par le nouveau contenu (où que ces fichiers soient déclarés dans votre projet).

> Notez que pour l'instant, l'Éditeur Intlayer écrira vos fichiers de déclaration de contenu sous forme de fichiers JSON.

## Installation

Une fois Intlayer configuré dans votre projet, installez simplement `intlayer-editor` en tant que dépendance de développement :

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

Avec le flag `--with`, vous pouvez démarrer l'éditeur en parallèle avec une autre commande :

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## Configuration

Dans votre fichier de configuration Intlayer, vous pouvez personnaliser les paramètres de l'éditeur :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... autres paramètres de configuration
  editor: {
    /**
     * Obligatoire
     * L'URL de l'application.
     * C'est l'URL ciblée par l'éditeur visuel.
     * Exemple : 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optionnel
     * Par défaut à `true`. Si `false`, l'éditeur est inactif et ne peut pas être accessible.
     * Peut être utilisé pour désactiver l'éditeur pour des environnements spécifiques pour des raisons de sécurité, comme la production.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Optionnel
     * Par défaut à `8000`.
     * Le port du serveur de l'éditeur.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optionnel
     * Par défaut à "http://localhost:8000"
     * L'URL du serveur de l'éditeur.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> Pour voir tous les paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

## Utilisation de l'Éditeur

1. Une fois l'éditeur installé, vous pouvez démarrer l'éditeur en utilisant la commande suivante :

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Notez que vous devez exécuter votre application en parallèle.** L'URL de l'application doit correspondre à celle que vous avez définie dans la configuration de l'éditeur (`applicationURL`).

   > **Notez que la commande est réexportée par le package `intlayer`. Vous pouvez utiliser `npx intlayer editor start` à la place.**

2. Ensuite, ouvrez l'URL fournie. Par défaut `http://localhost:8000`.

   Vous pouvez visualiser chaque champ indexé par Intlayer en survolant votre contenu avec votre curseur.

   ![Survoler le contenu](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Si votre contenu est encadré, vous pouvez effectuer un appui long pour afficher le tiroir d'édition.

## Configuration de l'environnement

L'éditeur peut être configuré pour utiliser un fichier d'environnement spécifique. Cela est utile lorsque vous souhaitez utiliser le même fichier de configuration pour le développement et la production.

Pour utiliser un fichier d'environnement spécifique, vous pouvez utiliser le flag `--env-file` ou `-f` lors du démarrage de l'éditeur :

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Notez que le fichier d'environnement doit être situé à la racine de votre projet.

Ou vous pouvez utiliser le flag `--env` ou `-e` pour spécifier l'environnement :

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Débogage

Si vous rencontrez des problèmes avec l'éditeur visuel, vérifiez les points suivants :

- L'éditeur visuel et l'application sont en cours d'exécution.

- La [configuration de l'éditeur](https://intlayer.org/doc/concept/configuration#editor-configuration) est correctement définie dans votre fichier de configuration Intlayer.
  - Champs obligatoires :
    - L'URL de l'application doit correspondre à celle que vous avez définie dans la configuration de l'éditeur (`applicationURL`).

- L'éditeur visuel utilise une iframe pour afficher votre site web. Assurez-vous que la politique de sécurité du contenu (CSP) de votre site web autorise l'URL du CMS en tant que `frame-ancestors` ('http://localhost:8000' par défaut). Vérifiez la console de l'éditeur pour toute erreur.

## Questions fréquentes

<FAQ>

<Question title="Quelle est la différence entre l'éditeur visuel et le CMS ?">

L'éditeur visuel modifie les dictionnaires locaux et réécrit le changement dans votre base de code, si bien qu'il passe par votre relecture et votre déploiement habituels. Le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) modifie les dictionnaires distants, qui changent sur le site en cours d'exécution sans déploiement. L'éditeur convient au contenu appartenant aux développeurs ; le CMS convient au contenu appartenant à une équipe marketing.

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille de mon bundle ?">

Bien moins qu'une configuration basée sur des espaces de noms, car une page ne télécharge jamais un catalogue qu'elle n'affiche pas. Le balisage rendu côté serveur résout son contenu sur le serveur, et le compilateur au moment du build remplace les appels `useIntlayer` par les entrées de dictionnaire exactes qu'un composant utilise, si bien que les clés inutilisées et les langues inutilisées sont éliminées. Les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) répartissent le reste par locale. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle et des pages jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md).

</Question>

<Question title="Puis-je migrer depuis `i18next`, `next-intl` ou `react-i18next` sans réécrire mes composants ?">

Oui, et il existe deux voies. Vous pouvez migrer le contenu progressivement avec le [guide de migration i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md) ou le [guide de migration next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_next-intl_to_intlayer.md). Ou vous pouvez conserver entièrement votre API actuelle : les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) exposent exactement la même API que `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` et `Lingui`, mais servie par des dictionnaires Intlayer : seuls les imports changent, pas le code des composants.

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

<Question title="Où s'exécute l'éditeur visuel ?">

Sur votre propre infrastructure. Il charge votre application dans une iframe et communique avec un serveur d'édition local, si bien que votre contenu ne quitte jamais votre environnement. C'est ce qui le rend utilisable pour des projets qui ne peuvent pas envoyer de texte à un service hébergé.

</Question>

<Question title="Les éditeurs doivent-ils savoir coder ?">

Non. Ils ouvrent le site, cliquent sur un morceau de texte et le modifient sur place. L'éditeur résout quelle entrée de dictionnaire sous-tend ce texte et écrit le changement dans le bon fichier de contenu, si bien qu'un traducteur n'a pas besoin de trouver le fichier ni de connaître la clé.

</Question>

<Question title="Modifier via l'éditeur visuel change-t-il mes fichiers source ?">

Oui, c'est l'intention. Le changement arrive dans le fichier de déclaration de contenu de votre base de code, il apparaît donc comme un diff normal que vous pouvez relire et valider, et l'application se reconstruit pour l'afficher.

</Question>

<Question title="L'éditeur affiche une page blanche ou refuse de charger mon site. Que dois-je vérifier ?">

L'éditeur affiche votre application dans une iframe, votre Content Security Policy doit donc autoriser l'origine de l'éditeur comme `frame-ancestors`, c'est-à-dire `http://localhost:8000` par défaut. Vérifiez aussi que l'`applicationURL` de votre configuration d'éditeur correspond à l'URL depuis laquelle votre application est réellement servie. La console de l'éditeur signale les deux échecs.

</Question>

<Question title="Puis-je utiliser l'éditeur visuel en production ?">

Il est conçu pour le développement et la préproduction, où une reconstruction après une modification est acceptable. Pour modifier du contenu sur un site en direct sans déploiement, utilisez plutôt le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) et ses dictionnaires distants.

</Question>

<Question title="L'éditeur visuel est-il gratuit ?">

Oui. L'éditeur visuel fait partie du projet open source, sous licence Apache 2.0, usage commercial inclus. Seul le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) hébergé est un service payant, et il peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
