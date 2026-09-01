---
createdAt: 2026-03-31
updatedAt: 2026-08-30
title: "Vanilla JS i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application Vanilla JS multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 8.4.10
    date: 2026-03-31
    changes: "Initialisation de l'historique"
author: aymericzip
---

# Traduisez votre site web Vanilla JS avec Intlayer | Internationalisation (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Démo" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table des matières

<TOC/>

## Pourquoi Intlayer plutôt que des alternatives ?

Par rapport aux solutions principales telles que `i18next` ou `i18n.js`, Intlayer est une solution dotée d'optimisations intégrées telles que :

<AccordionGroup>
<Accordion header="Support complet de Vanilla JS">

Intlayer est optimisé pour fonctionner parfaitement avec Vanilla JavaScript en offrant une **gestion de contenu indépendante du framework**, une **prise en charge de TypeScript** et toutes les fonctionnalités nécessaires à la mise à l'échelle de l'internationalisation (i18n).

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

## Guide étape par étape pour configurer Intlayer dans une application Vanilla JS

<Steps>

<Step number={1} title="Installer les dépendances">

Installez les paquets nécessaires en utilisant npm :

```bash packageManager="npm"
# Générer un bundle standalone d'intlayer et vanilla-intlayer
# Ce fichier sera importé dans votre fichier HTML
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialiser intlayer avec le fichier de configuration
npx intlayer init --no-gitignore

# Construire les dictionnaires
npx intlayer build
```

```bash packageManager="pnpm"
# Générer un bundle standalone d'intlayer et vanilla-intlayer
# Ce fichier sera importé dans votre fichier HTML
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialiser intlayer avec le fichier de configuration
pnpm intlayer init --no-gitignore

# Construire les dictionnaires
pnpm intlayer build
```

```bash packageManager="yarn"
# Générer un bundle standalone d'intlayer et vanilla-intlayer
# Ce fichier sera importé dans votre fichier HTML
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialiser le fichier de configuration intlayer, TypeScript si configuré, variable d'env
yarn intlayer init --no-gitignore

# Construire les dictionnaires
yarn intlayer build
```

```bash packageManager="bun"
# Générer un bundle standalone d'intlayer et vanilla-intlayer
# Ce fichier sera importé dans votre fichier HTML
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialiser intlayer avec le fichier de configuration
bun x intlayer init --no-gitignore

# Construire les dictionnaires
bun x intlayer build
```

- **intlayer**
  Le paquet principal qui fournit les outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **vanilla-intlayer**
  Le paquet qui intègre Intlayer avec les applications JavaScript / TypeScript pures. Il fournit un singleton pub/sub (`IntlayerClient`) et des helpers basés sur des callbacks (`useIntlayer`, `useLocale`, etc.) afin que n'importe quelle partie de votre application puisse réagir aux changements de langue sans dépendre d'un framework UI.

> L'exportation de regroupement (bundling) du CLI `intlayer standalone` produit une version optimisée en éliminant le code mort (tree-shaking) des paquets inutilisés, des locales et de la logique non essentielle (telle que la redirection ou les préfixes) spécifique à votre configuration.

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
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Via ce fichier de configuration, vous pouvez configurer des URLs localisées, la redirection middleware, les noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, reportez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>

<Step number={3} title="Importer le bundle dans votre HTML">

Une fois que vous avez généré le bundle `intlayer.js`, vous pouvez l'importer dans votre fichier HTML :

```html fileName="index.html"
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />

    <!-- Importer le bundle -->
    <script src="./intlayer.js" defer></script>
    <!-- Importer votre script principal -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

Le bundle expose `Intlayer` et `VanillaIntlayer` comme objets globaux sur `window`.

</Step>

<Step number={4} title="Bootstrapper Intlayer dans votre point d'entrée">

Dans votre `src/main.js`, appelez `installIntlayer()` **avant** que tout contenu ne soit rendu afin que le singleton global de locale soit prêt.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Doit être appelé avant de rendre tout contenu i18n.
installIntlayer();
```

Si vous souhaitez également utiliser le moteur de rendu markdown, appelez `installIntlayerMarkdown()` :

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="Déclarer votre contenu">

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic en el logotipo de Vite para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Pour plus de détails, reportez-vous à la [documentation des déclarations de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

</Step>

<Step number={6} title="Utiliser Intlayer dans votre JavaScript">

L'objet `window.VanillaIntlayer` fournit des helpers API : `useIntlayer(key, locale?)` retourne le contenu traduit pour une clé donnée.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Obtenir le contenu initial pour la locale actuelle.
// Chaîner .onChange() pour être notifié chaque fois que la locale change.
const content = useIntlayer("app").onChange((newContent) => {
  // Re-render ou patcher seulement les nœuds DOM affectés
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Rendu initial
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Accédez aux valeurs finales en tant que chaînes de caractères en les enveloppant dans `String()`, ce qui appelle la méthode `toString()` du nœud et retourne le texte traduit.
>
> Lorsque vous avez besoin de la valeur pour un attribut HTML natif (ex: `alt`, `aria-label`), utilisez directement `.value` :
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="Changer la langue de votre contenu" isOptional={true}>

Pour changer la langue de votre contenu, utilisez la fonction `setLocale` exposée par `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Langue");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // Garder le menu déroulant synchronisé quand la locale change d'ailleurs
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="Basculer les attributs de langue et de direction HTML" isOptional={true}>

Mettez à jour les attributs `lang` et `dir` de la balise `<html>` pour qu'ils correspondent à la locale actuelle pour l'accessibilité et le SEO.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={9} title="Charger les dictionnaires à la demande par locale" isOptional={true}>

Si vous souhaitez charger les dictionnaires à la demande par locale, vous pouvez utiliser `useDictionaryDynamic`. C'est utile si vous ne voulez pas inclure toutes les traductions dans le fichier `intlayer.js` initial.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> Note : `useDictionaryDynamic` nécessite que les dictionnaires soient disponibles en tant que fichiers ESM séparés. Cette approche est typiquement utilisée si vous avez un serveur web servant les dictionnaires.

</Step>

</Steps>

### Configurer TypeScript

Assurez-vous que votre configuration TypeScript inclut les types autogénérés.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'**extension officielle Intlayer VS Code**.

[Installer depuis le VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection des erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, reportez-vous à la [documentation de l'extension Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

## Questions fréquentes

<FAQ>

<Question title="Puis-je utiliser Intlayer sans bundler ni framework ?">

Oui. C'est ce que couvre ce guide. Vous importez le bundle `vanilla-intlayer` directement dans votre HTML comme le montre l'étape 3, l'amorcez dans votre point d'entrée, et lisez votre contenu avec `useIntlayer`. Aucun Vite, aucun webpack et aucun pipeline de build n'est requis.

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à celui de ma page ?">

Bien moins qu'un catalogue d'exécution, car une page ne télécharge jamais une langue qu'elle n'affiche pas. Le contenu est résolu à partir de dictionnaires compilés à l'avance, et le chargement paresseux par locale garde les autres langues hors de la charge initiale jusqu'à ce que le visiteur change. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle et des pages jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md), les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md).

</Question>

<Question title="Puis-je migrer depuis `i18next` sans réécrire mes scripts ?">

En grande partie. Suivez le [guide de migration i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md) pour transférer le contenu. Vous pouvez aussi migrer progressivement : le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos catalogues JSON existants comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, si bien que les deux couches restent synchronisées pendant que vous déplacez les scripts un par un.

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

<Question title="Quelles sont les différentes solutions pour internationaliser un site en JavaScript pur ?">

- **Un objet dictionnaire écrit à la main**, généralement un fichier JSON par langue chargé avec `fetch` : aucune dépendance, mais aucun typage, aucune règle de pluriel, et rien pour vous dire qu'une traduction manque.
- **`i18next`** depuis un CDN : mature et indépendant du framework, avec un écosystème de plugins, mais il ajoute un runtime et son propre chargement de catalogues.
- **`Intlayer`** : contenu déclaré avec des règles de pluriel et de genre, la détection de la locale, la prise en charge du droite à gauche et le chargement paresseux par locale, plus une CLI qui remplit les traductions manquantes avec l'IA et un éditeur visuel pour les non-développeurs.

Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md).

</Question>

<Question title="Comment lire une traduction et la placer dans le DOM ?">

Appelez `useIntlayer` avec votre clé de dictionnaire et écrivez vous-même la valeur dans le nœud, comme le montre l'étape 6. Comme il n'y a pas de framework, rien ne se réaffiche tout seul : vous mettez à jour les nœuds lorsque la locale change, ce que couvre l'étape 7.

</Question>

<Question title="Comment la langue du visiteur est-elle détectée ?">

À partir des sources listées dans `routing.storage`, généralement un cookie d'abord, puis l'en-tête `Accept-Language`, en se repliant sur votre locale par défaut. Une langue que le visiteur choisit explicitement est persistée, elle survit donc à la visite suivante. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Question>

<Question title="Comment prendre en charge les langues de droite à gauche telles que l'arabe ou l'hébreu ?">

L'étape 8 le couvre. `getHTMLTextDir` renvoie `ltr`, `rtl` ou `auto` pour une locale, vous définissez donc `lang` et `dir` sur l'élément `html` à partir de la locale active et laissez vos propriétés logiques CSS faire le reste.

</Question>

<Question title="Les visiteurs téléchargent-ils toutes les langues ?">

Pas si vous ne le souhaitez pas. L'étape 9 couvre le chargement paresseux des dictionnaires par locale, si bien que la page charge une seule langue et n'en récupère une autre que lorsque le visiteur change. Voir les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md).

</Question>

<Question title="Comment traduire l'application automatiquement avec l'IA ?">

Lancez `npx intlayer fill`. Il remplit les traductions manquantes avec le LLM de votre choix, en utilisant votre propre fournisseur et votre clé d'API, et `--git-diff` limite l'exécution au contenu modifié sur la branche. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

</Question>

<Question title="Intlayer prend-il en charge les pluriels, le genre et le texte enrichi ?">

Oui : les [formes plurielles](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/plurial.md), le [contenu basé sur le genre](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender.md), les conditions, les [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md), le [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md) et les [formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) pour les nombres, les dates et les devises.

</Question>

<Question title="Comment les traducteurs peuvent-ils modifier le contenu sans toucher au code ?">

Via l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md), qui tourne sur votre propre infrastructure et permet à quiconque de modifier le texte sur place sur l'application en cours d'exécution, ou le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), qui externalise le contenu afin qu'il puisse changer sans déploiement.

</Question>

<Question title="Intlayer est-il gratuit et open source ?">

Oui, sous licence Apache 2.0, usage commercial inclus. Le CMS hébergé est un service payant optionnel qui peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
