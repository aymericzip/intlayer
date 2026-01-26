---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Package Documentation
description: The core package of Intlayer, providing the base functions and types for internationalization.
keywords:
  - intlayer
  - core
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Package intlayer

Le package `intlayer` est la bibliothèque centrale de l'écosystème Intlayer. Il fournit les fonctions, types et utilitaires essentiels pour gérer le contenu multilingue dans des applications JavaScript et TypeScript.

## Installation

```bash
npm install intlayer
```

## Exports

### Configuration

Import :

```tsx
import "intlayer";
```

| Variable           | Type                   | Description                                                                                     | Documentation associée                                                                                                  |
| ------------------ | ---------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | L'objet de configuration d'Intlayer.                                                            | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Renvoie l'objet de configuration Intlayer. (**Obsolète** : utilisez `configuration` à la place) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | La liste de toutes les locales prises en charge.                                                | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | La liste de toutes les locales requises.                                                        | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | La locale par défaut.                                                                           | -                                                                                                                       |

### Types

Importer :

```tsx
import "intlayer";
```

| Type                  | Description                                                                  |
| --------------------- | ---------------------------------------------------------------------------- |
| `Dictionary`          | Le type de dictionnaire utilisé pour définir la structure d'un dictionnaire. |
| `DeclarationContent`  | (**Obsolète**) Utilisez `Dictionary<T>` à la place.                          |
| `IntlayerConfig`      | Le type définissant la configuration d'Intlayer.                             |
| `ContentNode`         | Un nœud du contenu du dictionnaire.                                          |
| `Locale`              | Le type représentant une locale.                                             |
| `LocalesValues`       | Les valeurs possibles pour une locale.                                       |
| `StrictModeLocaleMap` | Une map de locales avec une vérification stricte des types.                  |

### Fonctions de contenu

Import:

```tsx
import "intlayer";
```

| Fonction                 | Type       | Description                                                                                                                   | Documentation liée                                                                                     |
| ------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t` / `getTranslation`   | `Function` | Sélectionne du contenu en fonction de la locale courante.                                                                     | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md) |
| `enu` / `getEnumeration` | `Function` | Sélectionne du contenu en fonction d'une quantité.                                                                            | [enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | Sélectionne du contenu en fonction d'une condition booléenne.                                                                 | [condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/condition.md)     |
| `gender`                 | `Function` | Sélectionne du contenu en fonction du genre.                                                                                  | [gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender.md)           |
| `insert`                 | `Function` | Insère des valeurs dans une chaîne de contenu.                                                                                | [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md)     |
| `nest` / `getNesting`    | `Function` | Imbrique un autre dictionnaire.                                                                                               | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/nesting.md)         |
| `md`                     | `Function` | Traite le contenu Markdown.                                                                                                   | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md)       |
| `html`                   | `Function` | Traite le contenu HTML.                                                                                                       | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/html.md)               |
| `file`                   | `Function` | Gère le contenu des fichiers.                                                                                                 | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/file.md)               |
| `getDictionary`          | `Function` | Traite les objets qui ressemblent à des dictionnaires (clé, contenu). Il traite les traductions `t()`, les énumérations, etc. | -                                                                                                      |
| `getIntlayer`            | `Function` | Basé sur `getDictionary`, mais injecte une version optimisée du dictionnaire provenant de la déclaration générée.             | -                                                                                                      |

### Utilitaires de localisation

Import :

```tsx
import "intlayer";
```

| Fonction               | Type       | Description                                               | Documentation associée                                                                                                          |
| ---------------------- | ---------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Fonction` | Détecte la locale à partir d'une chaîne ou d'un chemin.   | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | Obtient la partie langue d'une locale.                    | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | Obtient le nom d'affichage d'une locale.                  | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | Résout un chemin canonique vers sa version localisée.     | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | Résout un chemin localisé vers sa forme canonique.        | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | Génère une URL localisée.                                 | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | Génère des URLs pour toutes les locales prises en charge. | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | Supprime le préfixe de locale d'un chemin.                | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | Récupère le préfixe de locale d'un chemin.                | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | Obtient la direction du texte (LTR/RTL).                  | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | Valide un préfixe de locale.                              | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/validatePrefix.md)             |

### Utilitaires du navigateur

Import :

```tsx
import "intlayer";
```

| Fonction               | Type       | Description                               |
| ---------------------- | ---------- | ----------------------------------------- |
| `getBrowserLocale`     | `Function` | Détecte la locale préférée du navigateur. |
| `getCookie`            | `Function` | Récupère la valeur d'un cookie.           |
| `getLocaleFromStorage` | `Function` | Récupère la locale depuis le stockage.    |
| `setLocaleInStorage`   | `Function` | Enregistre la locale dans le stockage.    |

### Outils de formatage

Import :

```tsx
import "intlayer";
```

| Fonction       | Description                          |
| -------------- | ------------------------------------ |
| `number`       | Formate un nombre.                   |
| `currency`     | Formate une valeur monétaire.        |
| `percentage`   | Formate un pourcentage.              |
| `compact`      | Formate un nombre au format compact. |
| `date`         | Formate une date.                    |
| `relativeTime` | Formate un temps relatif.            |
| `units`        | Formate une valeur avec des unités.  |
| `Intl`         | L'objet Intl standard.               |
