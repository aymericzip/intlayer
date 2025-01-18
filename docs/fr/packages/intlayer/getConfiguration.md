# Documentation: `getConfiguration` Fonction dans `intlayer`

## Description

La fonction `getConfiguration` récupère la configuration complète pour l'application `intlayer` en extrayant les variables d'environnement. Cette fonction offre la flexibilité d'utiliser la même configuration à la fois côté client et serveur, garantissant ainsi la cohérence de l'application.

---

## Paramètres:

La fonction ne prend aucun paramètre. Au lieu de cela, elle utilise les variables d'environnement pour la configuration.

### Retours:

- **Type**: `IntlayerConfig`
- **Description**: Un objet contenant la configuration complète pour `intlayer`. La configuration comprend les sections suivantes :

  - `internationalization`: Paramètres liés aux locales et au mode strict.
  - `middleware`: Paramètres liés à la gestion des URL et des cookies.
  - `content`: Paramètres liés aux fichiers de contenu, aux répertoires et aux modèles.
  - `editor`: Configurations spécifiques à l'éditeur.

Voir [documentation de configuration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md) pour plus de détails.

---

## Exemple d'Utilisation:

### Récupération de la Configuration Complète:

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Sortie:
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
// Sortie:
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
// Sortie:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Extraction de `availableLocales` et `defaultLocale`:

La section `internationalization` de la configuration fournit des paramètres liés aux locales comme `locales` (locales disponibles) et `defaultLocale` (langue par défaut).

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

## Remarques:

- Assurez-vous que toutes les variables d'environnement requises sont correctement définies avant d'appeler cette fonction. Des variables manquantes provoqueront des erreurs lors de l'initialisation.
- Cette fonction peut être utilisée à la fois côté client et serveur, ce qui en fait un outil polyvalent pour gérer les configurations de manière unifiée.

## Utilisation dans les Applications:

La fonction `getConfiguration` est un outil fondamental pour l'initialisation et la gestion de la configuration d'une application `intlayer`. En fournissant un accès à des paramètres tels que les locales, le middleware et les répertoires de contenu, elle assure la cohérence et l'évolutivité des applications multilingues et axées sur le contenu.
