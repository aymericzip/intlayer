# Documentation: `getConfiguration` Fonction dans `intlayer`

## Description:

La fonction `getConfiguration` récupère toute la configuration de l'application `intlayer` en extrayant les variables d'environnement. Cette fonction offre la flexibilité d'utiliser la même configuration à la fois côté client et serveur, assurant la cohérence de l'application.

---

## Paramètres:

La fonction ne prend aucun paramètre. Au lieu de cela, elle utilise des variables d'environnement pour la configuration.

### Retours:

- **Type**: `IntlayerConfig`
- **Description**: Un objet contenant la configuration complète pour `intlayer`. La configuration comprend les sections suivantes :

  - `internationalization`: Paramètres liés aux locales et au mode strict.
  - `middleware`: Paramètres liés à la gestion des URL et des cookies.
  - `content`: Paramètres liés aux fichiers de contenu, répertoires et modèles.
  - `editor`: Configurations spécifiques à l'éditeur.

Voir [documentation de configuration d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md) pour plus de détails.

---

## Exemple d'utilisation:

### Récupération de la configuration complète:

```typescript
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

### Extraction de `availableLocales` et `defaultLocale`:

La section `internationalization` de la configuration fournit des paramètres liés aux locales tels que `locales` (locales disponibles) et `defaultLocale` (langue par défaut).

```typescript
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Exemple de sortie: ["en", "fr", "es"]
console.log(defaultLocale); // Exemple de sortie: "en"
console.log(cookieName); // Sortie: "INTLAYER_LOCALE"
```

## Remarques:

- Assurez-vous que toutes les variables d'environnement requises sont correctement définies avant d'appeler cette fonction. Les variables manquantes provoqueront des erreurs pendant l'initialisation.
- Cette fonction peut être utilisée à la fois sur les côtés client et serveur, ce qui en fait un outil polyvalent pour gérer les configurations de manière unifiée.

## Utilisation dans les applications:

La fonction `getConfiguration` est un utilitaire fondamental pour initialiser et gérer la configuration d'une application `intlayer`. En fournissant un accès aux paramètres tels que les locales, le middleware et les répertoires de contenu, elle garantit la cohérence et l'évolutivité dans des applications multilingues et axées sur le contenu.
