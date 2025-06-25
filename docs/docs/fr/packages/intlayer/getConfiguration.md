---
docName: package__intlayer__getConfiguration
url: https://intlayer.org/doc/packages/intlayer/getConfiguration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getConfiguration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentation de la fonction getConfiguration | intlayer
description: Découvrez commengetConfiguration utiliser la fonction getConfiguration pour le package intlayer
keywords:
  - getConfiguration
  - traduction
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# Documentation: `getConfiguration` Fonction dans `intlayer`

## Description

La fonction `getConfiguration` récupère l'intégralité de la configuration de l'application `intlayer` en extrayant les variables d'environnement. Cette fonction offre la flexibilité d'utiliser la même configuration à la fois côté client et côté serveur, garantissant la cohérence dans toute l'application.

---

## Paramètres

La fonction ne prend aucun paramètre. Elle utilise à la place des variables d'environnement pour la configuration.

### Retourne

- **Type**: `IntlayerConfig`
- **Description**: Un objet contenant la configuration complète pour `intlayer`. La configuration inclut les sections suivantes :

  - `internationalization`: Paramètres liés aux locales et au mode strict.
  - `middleware`: Paramètres liés à la gestion des URL et des cookies.
  - `content`: Paramètres liés aux fichiers de contenu, aux répertoires et aux modèles.
  - `editor`: Configurations spécifiques à l'éditeur.

Voir [Documentation de configuration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) pour plus de détails.

---

## Exemple d'utilisation

### Récupération de la configuration complète

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Sortie :
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Sortie :
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// Sortie :
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Extraction de `availableLocales` et `defaultLocale`

La section `internationalization` de la configuration fournit des paramètres liés aux locales tels que `locales` (locales disponibles) et `defaultLocale` (langue de secours).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Exemple de sortie : ["en", "fr", "es"]
console.log(defaultLocale); // Exemple de sortie : "en"
console.log(cookieName); // Sortie : "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Exemple de sortie : ["en", "fr", "es"]
console.log(defaultLocale); // Exemple de sortie : "en"
console.log(cookieName); // Sortie : "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Exemple de sortie : ["en", "fr", "es"]
console.log(defaultLocale); // Exemple de sortie : "en"
console.log(cookieName); // Sortie : "INTLAYER_LOCALE"
```

## Notes

- Assurez-vous que toutes les variables d'environnement requises sont correctement définies avant d'appeler cette fonction. Les variables manquantes entraîneront des erreurs lors de l'initialisation.
- Cette fonction peut être utilisée à la fois côté client et côté serveur, ce qui en fait un outil polyvalent pour gérer les configurations de manière unifiée.

## Utilisation dans les applications

La fonction `getConfiguration` est un utilitaire clé pour initialiser et gérer la configuration d'une application `intlayer`. En fournissant un accès à des paramètres tels que les locales, le middleware et les répertoires de contenu, elle garantit la cohérence et l'évolutivité des applications multilingues et axées sur le contenu.
