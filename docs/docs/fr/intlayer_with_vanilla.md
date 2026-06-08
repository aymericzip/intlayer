---
createdAt: 2026-03-31
updatedAt: 2026-05-31
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
> </Step>

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
