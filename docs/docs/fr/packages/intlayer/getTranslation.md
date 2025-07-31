---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation de la fonction getTranslation | intlayer
description: Découvrez comment utiliser la fonction getTranslation pour le package intlayer
keywords:
  - getTranslation
  - traduction
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getTranslation
---

# Documentation : Fonction `getTranslationContent` dans `intlayer`

## Description

La fonction `getTranslationContent` récupère le contenu correspondant à une locale spécifique à partir d'un ensemble de contenus linguistiques personnalisables. Si la locale spécifiée n'est pas trouvée, elle retourne par défaut le contenu de la locale par défaut configurée dans le projet.

## Paramètres

- `languageContent: CustomizableLanguageContent<Content>`

  - **Description** : Un objet contenant les traductions pour différentes locales. Chaque clé représente une locale, et sa valeur est le contenu correspondant.
  - **Type** : `CustomizableLanguageContent<Content>`
    - `Content` peut être de n'importe quel type, avec `string` comme valeur par défaut.

- `locale: Locales`

  - **Description** : La locale pour laquelle le contenu doit être récupéré.
  - **Type** : `Locales`

## Retour

- **Type** : `Content`
- **Description** : Le contenu correspondant à la locale spécifiée. Si la locale n'est pas trouvée, le contenu de la locale par défaut est retourné.

## Exemple d'utilisation

### Utilisation de base

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Sortie : "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Sortie : "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
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
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Sortie : "Hello" (contenu de la locale par défaut)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Sortie : "Hello" (contenu de la locale par défaut)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
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
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Sortie : "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Sortie : "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
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
- **Application de TypeScript :**
  - Si les locales dans `languageContent` ne correspondent pas à la configuration du projet, TypeScript exigera que toutes les locales requises soient définies, garantissant ainsi que le contenu est complet et sûr au niveau du typage.

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
