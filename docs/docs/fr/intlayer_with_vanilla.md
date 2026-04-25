---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: i18n Vanilla JS - Comment traduire une application Vanilla JS en 2026
description: Découvrez comment rendre votre site web Vanilla JS multilingue. Suivez la documentation pour l'internationaliser (i18n) et le traduire.
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
history:
  - version: 8.4.10
    date: 2026-03-31
    changes: "Initialisation de l'historique"
---

# Traduisez votre site web Vanilla JS avec Intlayer | Internationalisation (i18n)

## Table des matières

<TOC/>

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier le support multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer le support TypeScript** avec des types autogénérés, améliorant l'autocomplétion et la détection d'erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le basculement dynamique de la langue.

Ce guide démontre comment utiliser Intlayer dans une application Vanilla JavaScript **sans utiliser de gestionnaire de paquets ou de bundler** (comme Vite, Webpack, etc.).

Si votre application utilise un bundler (comme Vite), nous vous recommandons de suivre le [Guide Vite + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+vanilla.md) à la place.

En utilisant le bundle standalone, vous pouvez importer Intlayer directement dans vos fichiers HTML via un seul fichier JavaScript, ce qui le rend parfait pour les projets hérités ou les sites statiques simples.

---

## Guide étape par étape pour configurer Intlayer dans une application Vanilla JS

### Étape 1 : Installer les dépendances

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

### Étape 2 : Configuration de votre projet

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

### Étape 3 : Importer le bundle dans votre HTML

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

### Étape 4 : Bootstrapper Intlayer dans votre point d'entrée

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

### Étape 5 : Déclarer votre contenu

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

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Pour plus de détails, reportez-vous à la [documentation des déclarations de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

### Étape 6 : Utiliser Intlayer dans votre JavaScript

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

### (Optionnel) Étape 7 : Changer la langue de votre contenu

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

### (Optionnel) Étape 8 : Basculer les attributs de langue et de direction HTML

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

### (Optionnel) Étape 9 : Charger les dictionnaires à la demande par locale

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
