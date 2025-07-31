---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Fonction getTranslation - Documentation JavaScript Intlayer
description: Documentation pour la fonction getTranslation dans Intlayer, qui récupère le contenu localisé pour des locales spécifiques avec un retour au contenu par défaut.
keywords:
  - getTranslation
  - intlayer
  - fonction
  - localisation
  - i18n
  - JavaScript
  - traduction
  - locale
slugs:
  - doc
  - package
  - intlayer
  - getTranslationContent
---

# Documentation : Fonction `getTranslation` dans `intlayer`

## Description

La fonction `getTranslation` récupère le contenu correspondant à une locale spécifique à partir d'un ensemble de contenus linguistiques personnalisables. Si la locale spécifiée n'est pas trouvée, elle retourne par défaut le contenu de la locale par défaut configurée dans le projet.

## Paramètres

- `languageContent: CustomizableLanguageContent<Content>`

  - **Description** : Un objet contenant les traductions pour différentes locales. Chaque clé représente une locale, et sa valeur est le contenu correspondant.
  - **Type** : `CustomizableLanguageContent<Content>`
    - `Content` peut être de n'importe quel type, par défaut `string`.

- `locale: Locales`

  - **Description** : La locale pour laquelle le contenu doit être récupéré.
  - **Type** : `Locales`

## Retour

- **Type** : `Content`
- **Description** : Le contenu correspondant à la locale spécifiée. Si la locale n'est pas trouvée, le contenu de la locale par défaut est retourné.

## Exemple d'utilisation

### Utilisation de base

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Sortie : "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Sortie : "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Sortie : "Bonjour"
```

### Locale manquante :

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Sortie : "Hello" (contenu de la locale par défaut)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Sortie : "Hello" (contenu de la locale par défaut)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Sortie : "Hello" (contenu de la locale par défaut)
```

### Utilisation de types de contenu personnalisés :

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Sortie : "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Sortie : "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Sortie : "Bonjour"
```

## Cas particuliers

- **Locale non trouvée :**
  - Lorsque la `locale` n'est pas trouvée dans le `languageContent`, la fonction retourne le contenu de la locale par défaut.
- **Contenu linguistique incomplet :**
  - Si une locale est partiellement définie, la fonction ne fusionne pas les contenus. Elle récupère strictement la valeur de la locale spécifiée ou revient à la valeur par défaut.
- **Application stricte de TypeScript :**
  - Si les locales dans `languageContent` ne correspondent pas à la configuration du projet, TypeScript exigera que toutes les locales requises soient définies, garantissant que le contenu est complet et sûr au niveau du typage.

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
